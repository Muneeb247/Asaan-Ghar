import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";
function SignUp() {
  //Component level states
  const [showPassword, setShowPassword] = useState(false); // clicl to show password
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // want to use anywhere, we're going to restructure those email and password
  const { name, email, password } = formData; //restructure from formData

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value, // id comes from below input id
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      //So we're going to put that into user credential and we want to await create user with email and password.that takes in three things off email and password from our form.
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user; // actual user here, need that in database

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      //because we dont want to change the form data state, so copy everything in it by
      //creating an object and spreading across our form data (name, eamil, password)
      const formDataCopy = { ...formData };
      delete formDataCopy.password; //delete password to go to the database
      formDataCopy.timestamp = serverTimestamp(); //asdding timestamp with data
      //await setDoc(doc(db which we imported from our config, 'users - name of the collections', user.uid - line 38 through which we get), formDataCopy -2nd arguement the data which we have in form data copy)
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      toast.success("Sign Up Successfully");
      navigate("/");
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong with registration");
    }
  };

  return (
    <>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div className="pageContainer">
              <header>
                <p className="pageHeader">Register Now!</p>
              </header>
              <main>
                <form onSubmit={onSubmit}>
                  <input
                    type="text"
                    className="nameInput"
                    placeholder="Name (Text only)"
                    id="name"
                    value={name}
                    onChange={onChange}
                    pattern="[a-zA-Z\s]+"
                  />
                  <input
                    type="email"
                    className="emailInput"
                    placeholder="Email"
                    id="email"
                    pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                    value={email}
                    onChange={onChange}
                    required
                  />

                  <div className="passwordInputDiv">
                    <input
                      type={showPassword ? "text" : "password"} //if showpassword is true than field type is test, if not than password type
                      className="passwordInput"
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={onChange}
                      minLength="8"
                      required
                    />

                    <img
                      src={visibilityIcon}
                      alt="show Password"
                      className="showPassword"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  </div>
                  <Link to="/forgot-password" className="forgotPasswordLink">
                    Forgot Password
                  </Link>
                  <div className="signUpBar">
                    {/* <p className="signUpText">Sign Up</p> */}
                    {/* <button className="signUpButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button> */}
                    <button
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                {/* Google OAuth  */}
                <OAuth />
                <Link to="/sign-in" className="registerLink">
                  Sign In Instead
                </Link>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
