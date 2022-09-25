import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";

function SignIn() {
  //Component level states
  const [showPassword, setShowPassword] = useState(false); // clicl to show password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // want to use anywhere, we're going to restructure those email and password
  const { email, password } = formData; //restructure from formData

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
      const userCredendial = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredendial.user) {
        toast.success("Sign In Successfully");
        navigate("/");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Bad User Credentials");
    }
  };

  return (
    <>
    <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={onSubmit}>
          <OAuth />
          

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input type="email"  className="form-control form-control-lg"
              placeholder="Enter a valid email address" 
              id="email"
              style={{border: '1px solid #1226F1'}}
              value={email}
              pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
              onChange={onChange}/>
            {/* <label className="form-label" htmlFor="form3Example3">Email address</label> */}
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-3">
            <input   className="form-control form-control-lg"
              placeholder="Enter password" 
              type={showPassword ? "text" : "password"} //if showpassword is true than field type is test, if not than password type              
                id="password"
                value={password}
                style={{border: '1px solid #1226F1'}}
                onChange={onChange}
                // minLength="8"
                required/>
            {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
            <img
                src={visibilityIcon}
                alt="show Password"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
          </div>
          
          

          <div className="d-flex justify-content-between align-items-center">
            {/* <!-- Checkbox --> */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox"  />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="/forgot-password" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button className="btn btn-primary btn-lg"
              style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
            <a href="/sign-up"
                className="link-danger">Register</a>
                </p>
          </div>

        </form>
      </div>
    </div>
  </div>
      {/* <div classNameName="pageContainer">
        <header>
          <p classNameName="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              classNameName="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
              onChange={onChange}
            />

            <div classNameName="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"} //if showpassword is true than field type is test, if not than password type
                classNameName="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
                minlength="8"
                required
              />

              <img
                src={visibilityIcon}
                alt="show Password"
                classNameName="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to="/forgot-password" classNameName="forgotPasswordLink">
              Forgot Password
            </Link>
            <div classNameName="signInBar">
              <p classNameName="signInText">Sign In</p>
              <button classNameName="signInButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* Google OAuth  */}
          {/* <OAuth />

          <Link to="/sign-up" classNameName="registerLink">
            Sign Up Instead
          </Link>
        </main>
      </div> */} 
    </>
  );
}

export default SignIn;
