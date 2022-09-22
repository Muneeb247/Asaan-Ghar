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
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
              onChange={onChange}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"} //if showpassword is true than field type is test, if not than password type
                className="passwordInput"
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
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>
            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>

          {/* Google OAuth  */}
          <OAuth />

          <Link to="/sign-up" className="registerLink">
            Sign Up Instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignIn;
