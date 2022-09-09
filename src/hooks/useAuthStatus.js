import {useEffect, useState} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
//onAuthStateChanged = is anytime state changes, from login to logout, this will fire off

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true) // this is like loading


    useEffect(()=>{
        const auth = getAuth()
        onAuthStateChanged(auth, (user)=>{ //takes a function ehich gives back user object
            if(user){
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })
    })

    return {loggedIn, checkingStatus}
}

//https://stackoverflow.com/questions/65505665/protected-route-with-firebase
