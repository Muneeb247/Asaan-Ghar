import { Link } from "react-router-dom"
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from "../components/Slider"


function Explore() {
  return (
    <>
    {/* Slider */}
    <Slider />
    <div className="explore">
        <header>
          <p className="pageHeader" style={{ textAlign: "center" }}>Explore</p>
        </header>

        <main>
          
          <p className="exploreCategoryHeading">Categories</p>
          <div className="exploreCategories">
            <Link to='/category/rent'>
              <img src={rentCategoryImage} alt="rent" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Places for rent</p>
            </Link>
            <Link to='/category/sale'>
              <img src={sellCategoryImage} alt="sell" className="exploreCategoryImg" />
              <p className="exploreCategoryName">Places for sale</p>
            </Link>
          </div>
        </main>
    </div>
    </>
    
  )
}

export default Explore