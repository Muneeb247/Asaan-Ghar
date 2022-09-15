import { useNavigate, useLocation } from "react-router-dom"
import {ReactComponent as OfferIcon} from "../assets/svg/localOfferIcon.svg"
import {ReactComponent as ExploreIcon} from "../assets/svg/exploreIcon.svg"
import {ReactComponent as PersonOutlineIcon} from "../assets/svg/personOutlineIcon.svg"
import * as React from 'react';
import logo from "../assets/asaanGharLogo.png"


function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const pathMatchRoute = (route) =>{
        if(route === location.pathname) {     // ./profile page
            return true
        } 

    }

  return (
    
    <footer className="navbar">
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem">
                <a href="/">
            <img src={logo} alt="Logo" style={{ height: '50px', width: '50px' }} />
        </a>
                </li>
                <li className="navbarListItem" onClick={() => navigate('/')}>
                    <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px"/>
                <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName' }>Explore</p>
                </li>

                <li className="navbarListItem" onClick={() => navigate('/offers')}>
                    <OfferIcon fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px"/>
                <p className={pathMatchRoute('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName' }>Offers</p>
                </li>

                <li className="navbarListItem" onClick={() => navigate('/profile')}>
                    <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px"/>
                <p className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName' }>Profile</p>
                </li>
                <li className="navbarListItem" onClick={() => navigate('/about-us')}>
                    <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px"/>
                <p className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName' }>Aboout Us</p>
                </li>
            </ul>
        </nav>
    </footer>
  )
}

export default Navbar