import {useState} from 'react' //this will be form and it will have an email input
import {Link} from 'react-router-dom' // link back to the sign in page
import {getAuth, sendPasswordResetEmail} from "firebase/auth"
import {toast} from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'  // icon for sign in button

// const [first, setfirst] = useState(second)

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value)

  const onSubmit = async(e) =>{
    e.preventDefault() 
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email) //returns promise
      // console.log(auth,email);
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  }

    return (
      <div className='pageContainer'>
          <header>
            <p className="pageheader">Forgot Pasword</p>
          </header>

          <main>
            <form onSubmit={onSubmit}>
              <input type="email" 
              className="emailInput"
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange} />
            <Link className="forgotPasswordLink" to='/sign-in'>
              Sign In
            </Link>
            <div className="signInBar">
              <div className="signInText">Send Reset Link</div>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width="34px" height="34px" />
            </button>
            </div>
            </form>
          </main>
      </div>
    )
  }
  
  export default ForgotPassword