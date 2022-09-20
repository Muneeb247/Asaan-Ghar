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

function Category() {
  var [listings, setListings] = useState(null);
  var [loading, setLoading] = useState(true); //before fetch listings
  var [lastFetchedListing, setLastFetchedListing] = useState(null);

  var params = useParams();

  useEffect(() => {
    var fetchListings = async () => {
      try {
        //Get Reference
        var listingRef = collection(db, "listings"); //a reference to the collection not the document, listings= are collection what we want

        //Create a Query, take listings ref,
        var q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        ); //categoryName coming from app.js route :categoryName

        //Execute Query //snapshot
        var querySnap = await getDocs(q); //takes a query above wali, so ot get docments for the specific query

        var lastVisible = querySnap.docs[querySnap.docs.length - 1]; //to get to the last one list
        setLastFetchedListing(lastVisible);

        var listings = [];

        querySnap.forEach((doc) => {
          //console.log(doc.data()); coming from db fb
          return listings.push({
            id: doc.id, //seperate from data coming, not given the id
            data: doc.data(),
          });
        });

        setListings(listings); //set listings to listings
        setLoading(false); //false once we get the data
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, [params.categoryName]); //dependency array here

  // Pagination / Load More
  var onFetchMoreListings = async () => {
    try {
      // Get reference
      var listingsRef = collection(db, "listings");

      // Create a query
      var q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing), // starts from last fetched
        limit(10)
      );

      // Execute query
      var querySnap = await getDocs(q);

      var lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      var listings = [];

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
  function handleChange(event) {
    var data = listings.filter((option) =>
      option.data.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    if (event.target.value === undefined || event.target.value === "") {
      setListings(listings); //set listings to listings
    } else {
      setListings(data); // for the new listings
    }
  }
  return (
    <div className="category">
      <input name="firstName" onChange={handleChange} />
      <header>
        <p className="pageHeader">
          {/* we want to show here depends on the category name. so, it depends if it's rent or sell */}
          {/* if its = to rent then we want this to say places for rent else places for sale */}
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>
      {/* Check the loading state before we attempt to load anything */}
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {/* below we want to loop through our listings and create a list.map */}
              {listings.map((listing) => (
                // in this category component our listing is an object that has .data and .id
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
          <br />
          <br />
          {lastFetchedListing && ( // if there is last fetch listing
            <p className="loadMore" onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
