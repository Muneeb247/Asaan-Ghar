import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // rent or sale in url
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit, //limit to show
  startAfter, //so we can add little bit pagination
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
var listings = [];
var data = [];
function Offers() {
  const [setListings] = useState(null);
  const [loading, setLoading] = useState(true); //before fetch listings
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  var [value, setValue] = useState([]);

  var handleChange = (e) => {
    data = listings.filter((option) => {
      if (e.target.value === undefined || e.target.value === "") {
        console.log("====================================");
        console.log(option);
        console.log("====================================");
        return option; //set listings to listings
      } else {
        return option.data.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      }
    });

    setValue(data);
  };
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get Reference
        const listingRef = collection(db, "listings"); //a reference to the collection not the document, listings= are collection what we want

        //Create a Query, take listings ref,
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        ); //categoryName coming from app.js route :categoryName

        //Execute Query //snapshot
        const querySnap = await getDocs(q); //takes a query above wali, so ot get docments for the specific query

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]; //to get to the last one list
        setLastFetchedListing(lastVisible);

        querySnap.forEach((doc) => {
          //console.log(doc.data()); coming from db fb
          return listings.push({
            id: doc.id, //seperate from data coming, not given the id
            data: doc.data(),
          });
        });

        setLoading(false); //false once we get the data
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };
    fetchListings();
  }, []); //dependency array here

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, "listings");

      // Create a query
      const q = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing), // starts from last fetched
        limit(10)
      );

      // Execute query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings((prevState) => [...prevState, ...listings]); // for the new listings
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch listings");
    }
  };

  return (
    <div className="category">
      <div class="input-group">
        <input
          type="search"
          class="form-control rounded"
          placeholder="Search"
          onChange={handleChange}
        />
        <button type="button" class="btn btn-outline-primary">
          search
        </button>
      </div>
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {/* Check the loading state before we attempt to load anything */}
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            {value.length === 0 ? (
              <ul className="categoryListings">
                {listings.map((listing) => (
                  // in this category component our listing is an object that has .data and .id

                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                  />
                ))}
              </ul>
            ) : (
              <ul className="categoryListings">
                {value.map((listing) => (
                  // in this category component our listing is an object that has .data and .id
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                  />
                ))}
              </ul>
            )}
          </main>

          <br />
          <br />
          {lastFetchedListing && ( // if there is last fetch listing
            <p>{/* Load More */}</p>
          )}
        </>
      ) : (
        <p>There are no current Offers</p>
      )}
    </div>
  );
}

export default Offers;
