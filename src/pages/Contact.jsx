import { useState, useEffect } from 'react'
// useParams allow us to get the ID
import { useParams, useSearchParams } from 'react-router-dom'
//get user document from firebase bcz we need the email
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Contact() {
    const [message, setMessage] = useState('')
    const [landlord, setLandlord] = useState(null)
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams() //that will allow us to get listing name that we are passing in as a search parameter

    const params = useParams() //to get the id in URL

    //useEffect = bcz we need to get user
    useEffect(() => {
        const getLandlord = async () => {
          const docRef = doc(db, 'users', params.landlordId)
          console.log(docRef);
          const docSnap = await getDoc(docRef)
          
          if (docSnap.exists()) {
            setLandlord(docSnap.data())
          } else {
            toast.error('Could not get landlord data')
          }
        }
    
        getLandlord()
      }, [params.landlordId]) //dependency 
    
      const onChange = (e) => setMessage(e.target.value)

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
            <div className='contactLandlord'>
            <p className='landlordName'>Contact {landlord?.name}</p>
          </div>

          <form className='messageForm'>
            <div className='messageDiv'>
              <label htmlFor='message' className='messageLabel'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='textarea'
                value={message}
                onChange={onChange}
              ></textarea>
            </div>

            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
            <button type='button' className='primaryButton'>
                Send Message
              </button>
            </a>
        </form>
        </main>
    )}
    </div>
  )
}

export default Contact