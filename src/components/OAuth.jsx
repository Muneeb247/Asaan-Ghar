import {useLocation, useNavigate} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore' //update the database
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async() =>{
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider) //set the result,signin with popup function so we await then sign in with pop up
            const user = result.user
            //check for user
            const docRef = doc(db, 'users', user.uid) // middle one is collection
            const docSnap = await getDoc(docRef)
            //check user is already exist in our fire store , no , then add it
            //if user doesn't exist, create user
            if(!docSnap.exists()){ //(!docSnap.method)
                await setDoc(doc(db, 'users', user.uid), { //setDoc has 2 parameters 2nd that data want to add and second is
                    name:user.displayName,
                    email:user.email,
                    timeStamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            toast.error('Could not authorize with Google')
        }
    } 
  return (
    <div className='socialLogin'>
        <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
        <button className='socialIconDiv'
        onClick={onGoogleClick}>
            <img className='socialIconImg' src={googleIcon} alt="google" />
        </button>
    </div>
  )
}

export default OAuth