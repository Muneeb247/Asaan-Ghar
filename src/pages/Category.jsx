import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' // rent or sale in url
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit, //limit to show
  startAfter, //so we can add little bit pagination
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Category() {

    const [listings, setListings] = useState(null) 
    const [loading, setLoading] = useState(true) //before fetch listings
   
    const params = useParams()

    useEffect(() => {
        const fetchListings = async ()=> {
            try {
                //Get Reference
                const listingRef = collection(db, 'listings') //a reference to the collection not the document, listings= are collection what we want
               
                //Create a Query, take listings ref, 
                const q = query(listingRef, where('type','==', params.categoryName), orderBy('timestamp','desc'), limit(10)) //categoryName coming from app.js route :categoryName
                
                //Execute Query //snapshot
                const querySnap = await getDocs(q) //takes a query above wali, so ot get docments for the specific query
                 
                const listings = []
                
                querySnap.forEach((doc)=>{
                    //console.log(doc.data()); coming from db fb
                    return listings.push({
                        id: doc.id, //seperate from data coming, not given the id
                        data: doc.data()
                    })
                })

                setListings(listings) //set listings to listings
                setLoading(false) //false once we get the data
            } catch (error) {
                toast.error('Could not fetch listings')
            }
        }
        fetchListings()
    },[params.categoryName]) //dependency array here
  
    return (
    <div className='category'>
        <header>
            <p className="pageHeader">
                {/* we want to show here depends on the category name. so, it depends if it's rent or sell */}
                {/* if its = to rent then we want this to say places for rent else places for sale */}
                {params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}
            </p>
        </header> 
        {/* Check the loading state before we attempt to load anything */}
        {loading ? (<Spinner /> ): listings && listings.length > 0 ? 
        (<>
        <main>
            <ul className="categoryListings">
                {/* below we want to loop through our listings and create a list.map */}
                {listings.map((listing) =>(
         // in this category component our listing is an object that has .data and .id
                    <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                ))}  
            </ul>
        </main>
        </>) 
        : (<p>No listings for {params.categoryName}</p>)}
    </div>
  )
}

export default Category