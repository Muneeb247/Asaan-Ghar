import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { Helmet } from 'react-helmet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.css'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';


function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true) //once it gets the data then its gonna be false 
    const [shareLinkCopied, setShareLinkCopied] = useState(false)
  
    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    //useEffect is where we do the actual fetching of listing because we want to get that as soon as we come to the page
     useEffect(()=>{
        const fetchListing = async () => { // fetch single listing
        const docRef = doc(db, 'listings', params.listingId) //Reference of document in firebase
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log(docSnap.data())
            setListing(docSnap.data())
            setLoading(false) //intitially its true
        }
        }

        fetchListing()
     },[navigate, params.listingId])

     if (loading) {
        return <Spinner />
      }

  return (
    <main>
        {/* Slider */}
        <MDBCarousel showControls>
          {listing.imgUrls.map((url, index) => (
            <MDBCarouselItem
            className='w-100 d-block'
            
            key={index}
            style={{ 
              background:`url(${listing.imgUrls[index]})
              center no-repeat`,
              backgroundSize: "cover", height: "500px"  }}
          />
          ))}
        </MDBCarousel>
      

        <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href) // copy link from link,url,href
          setShareLinkCopied(true) 
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='' />
      </div>
      {/* if share link is copied,so if that's true, then show a paragraph "link copied!" */}
      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}
    
    <div className="listingDetails">
    <p className='listingName'>
          {listing.name} - Rs. 
          {listing.offer //if offer or not, so if true then show disPrice, if false then RegPrice
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>
          For {listing.type === 'rent' ? 'Rent' : 'Sale'} 
        </p> 
        {listing.offer && (
          <p className='discountPrice'>
            Rs. {listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className="listingDetailsList">
            <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : '1 Bedroom'}
            </li>
            <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>

        <p className='listingLocationTitle'>Location</p>


        {/* Map */}
        <div className='leafletContainer'>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />

            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>


        {/* contact button here only for other users */}
        {/* if users id is not equal to userref then show button */}
        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          > 
          {/* http://localhost:3000/contact/llNoExJgAoRF1OrfoC8NtONH8vI3?listingName=Beautiful%20Stratford%20Condo */}
            Contact Landlord
          </Link>
        )}

    </div>
    </main>
  )
}

export default Listing