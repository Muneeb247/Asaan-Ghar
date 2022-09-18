import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Copyright from "./components/Copyright";
import PrivateRoute from "./components/PrivateRoute";
import Footer from './components/Footer'
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from './pages/Listing'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs'
import Team from "./pages/Team";

function App() {
  return (
    <>
    
      <Router>
      
      <Navbar />
        <Routes>
          <Route path='/' element={<Explore/>}/>
          <Route path='/offers' element={<Offers/>}/>
          <Route path='/category/:categoryName' element={<Category />}/>
          {/* below is private route */}
          <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile/>}/>
          </Route>  

          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/create-listing' element={<CreateListing/>}/>
          <Route path='/edit-listing/:listingId' element={<EditListing/>}/>
          <Route path='/category/:categoryName/:listingId' element={<Listing/>} />
          <Route path='/contact/:landlordId' element={<Contact/>} />
          <Route path='/about-us' element={<AboutUs/>} />
          <Route path='/team' element={<Team/>} />

        </Routes>
        
      </Router>
      <Footer/>
        <Copyright />

      <ToastContainer />
     
    </>
  );
}

export default App;
