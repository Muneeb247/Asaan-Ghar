import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import Spinner from '../components/Spinner'
import createListingImg from '../assets/createListingImg.jpg'

function CreateListing() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0,
      })

    const {type,
        name,
        bedrooms,
        bathrooms,
        parking,
        furnished,
        address,
        offer,
        regularPrice,
        discountedPrice,
        images,
        latitude,
        longitude,
     } = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true) // to set to use ref and set that true initially

    useEffect(() => {
        if (isMounted) {
          onAuthStateChanged(auth, (user) => { //callback user 
            if (user) {
              setFormData({ ...formData, userRef: user.uid }) //set user .. So let's say set form data, and we want to set it to an object spread across all the current form data and then also set user ref and set that to the user dot uid.
            } else {
              navigate('/sign-in')
            }
          })
        }
    
        return () => {
          isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isMounted])

      const onSubmit = async (e) =>{
        e.preventDefault()
        // console.log(formData);

        setLoading(true)
        // on submit checks some errors msgs
        if (discountedPrice >= regularPrice) {
            setLoading(false)
            toast.error('Discounted price needs to be less than regular price')
            return
          }
          if (images.length > 6) {
            setLoading(false)
            toast.error('Max 6 images')
            return
          }

    //..........Geo Loaction Geocoding
    let geolocation = {} //onject take lng , lat and get submited to firebase
        let location

        if (geolocationEnabled) {
            const response = await fetch(
               `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}` //{address} comes from form
            )
      
            const data = await response.json()
              console.log(data);
            geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
            geolocation.lng = data.results[0]?.geometry.location.lng ?? 0
      
            location =
              data.status === 'ZERO_RESULTS'
                ? undefined
                : data.results[0]?.formatted_address //above location variable format to we get back from google
                
            if (location === undefined || location.includes('undefined')) {
              setLoading(false)
              toast.error('Please enter a correct address')
              return
            }
          } else {
            geolocation.lat = latitude //these 3 set to firebase
            geolocation.lng = longitude
            // location = address //set below on 176
          //   console.log(geolocation, location);
          }

    // Store image in firebase
    const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage() //just like getAuth()
            const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
    
            const storageRef = ref(storage, 'images/' + fileName) // images path
    
            const uploadTask = uploadBytesResumable(storageRef, image)
       
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', 
            (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                console.log('Upload is running');
                break;
            }
            }, 
            (error) => {
            // Handle unsuccessful uploads
            reject(error)
            }, 
            () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);
            resolve(downloadURL)
            });
            }
            );
        })            
        }

        //images store in firbase , each image(image), then store each image
        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image)) // if it works then it puts all download urls that we resolve up resolve(downloadURL) put in imgUrls
          ).catch(() => {
            setLoading(false)
            toast.error('Images not uploaded')
            return
          })
        //   console.log(imgUrls);

        const formDataCopy = {
            ...formData,
            imgUrls,
            geolocation,
            timestamp: serverTimestamp(),
          }

        formDataCopy.location = address
        delete formDataCopy.images
        delete formDataCopy.address
        !formDataCopy.offer && delete formDataCopy.discountedPrice
        
        //save in database
        const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
        setLoading(false)
        toast.success('Listing saved')
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    
      }

      const onMutate = (e) => { // checking if file upload or not 
        let boolean = null
        // true or false is going to come in as a string
        if (e.target.value === 'true') {
          boolean = true
        }
        if (e.target.value === 'false') {
          boolean = false
        }
    
        // Files
        if (e.target.files) {
          setFormData((prevState) => ({ //setformdata because we want to update our state
            ...prevState,
            images: e.target.files, //array of images
          }))
        }
        // Text/Booleans/Numbers
    if (!e.target.files) { //files nahi hain to
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: boolean ?? e.target.value, //id as the key set it to boolean, if that value left is null then use right value {nullish coalescing ??} na true hai na false to sedhi value a jaye
        }))
      }
    }

      if (loading) {
        return <Spinner />
      }

  return (
    <>
    <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">

      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <div className='profile'>
        <header>
            <p className='pageHeader'>Create a Listing</p>
        </header>
            <main>
                <form onSubmit={onSubmit}>
                <label className='formLabel'>Sell / Rent</label>
                <div className='formButtons'>
            <button
              type='button'
              className={type === 'sale' ? 'formButtonActive' : 'formButton'}
              id='type' //matches with state when click on button
              value='sale'
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type='button'
              className={type === 'rent' ? 'formButtonActive' : 'formButton'}
              id='type'
              value='rent'
              onClick={onMutate}
            >
              Rent
            </button>
            </div>

            <label className='formLabel'>Name</label>
          <input
            className='formInputName'
            type='text'
            id='name' //id shoule match
            value={name} //what it is in the state
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
            pattern="[a-zA-Z]*"
          />

                
            
            <div className='formRooms flex'>
            <div>
              <label className='formLabel'>Bedrooms</label>
              <input
                className='formInputSmall'
                type='number'
                id='bedrooms'
                value={bedrooms}
                onChange={onMutate}
                min='1'
                max='50'
                required
                style={{border: '1px solid #00cc66'}}
              />
            </div>
            <div>
              <label className='formLabel'>Bathrooms</label>
              <input
                className='formInputSmall'
                type='number'
                id='bathrooms'
                value={bathrooms}
                onChange={onMutate}
                min='1'
                max='50'
                required
                style={{border: '1px solid #00cc66'}}
              />
            </div>
          </div>
            {/* parking */}
            <label className='formLabel'>Parking spot</label>
          <div className='formButtons'>
            <button
              className={parking ? 'formButtonActive' : 'formButton'}
              type='button'
              id='parking'
              value={true}
              onClick={onMutate}
              min='1'
              max='50'
            >
              Yes
            </button>
            <button
              className={
                !parking && parking !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='parking'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          {/* parking end */}

               {/* Furnushed start */}
               <label className='formLabel'>Furnished</label>
          <div className='formButtons'>
            <button
              className={furnished ? 'formButtonActive' : 'formButton'}
              type='button'
              id='furnished'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? 'formButtonActive'
                  : 'formButton'
              }
              type='button'
              id='furnished'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          {/* Furnished End */}

          {/* Address Start */}
          <label className='formLabel'>Address</label>
          <textarea
            className='formInputAddress'
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            required
          />
          {/* Address End */}

          {/* Geoloaction start */}
        {!geolocationEnabled && (
            <div className='formLatLng flex'>
              <div>
                <label className='formLabel'>Latitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='latitude'
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className='formLabel'>Longitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='longitude'
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}
          {/* Geolocation end*/}

          {/* offer start */}
          <label className='formLabel'>Offer</label>
          <div className='formButtons'>
            <button
              className={offer ? 'formButtonActive' : 'formButton'}
              type='button'
              id='offer'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? 'formButtonActive' : 'formButton'
              }
              type='button'
              id='offer'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          {/* offer end */}

          {/* Regular Price Start */}
          <label className='formLabel'>Regular Price</label>
          <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='750000000'
              required
              style={{border: '1px solid #00cc66'}}
            />
            {type === 'rent' && <p className='formPriceText'>Rs. / Month</p>}
          </div>
          {/* Regular Price End */}

            {/* Offer Price Start */}
            {offer && ( //if offer then show the discounted price
            <>
              <label className='formLabel'>Discounted Price</label>
              <input
                className='formInputSmall'
                type='number'
                id='discountedPrice'
                value={discountedPrice}
                onChange={onMutate}
                min='50'
                max='750000000'
                required={offer}
                style={{border: '1px solid #00cc66'}}
              />
            </>
          )}
            {/* Offer Price End */}
            
            {/* Images start */}
            <label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          {/* images end */}
          <button type='submit' className='primaryButton createListingButton'>
            Create Listing
          </button>
          </form>
          </main>
          </div>
    </div>
    <div className="col-md-9 col-lg-6 col-xl-5">
        <img src={createListingImg}
          className="img-fluid" alt="Sample image"/>
      </div>
      </div>
      </div>
    </>
  )
}

export default CreateListing