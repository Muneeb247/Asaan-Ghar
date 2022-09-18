import React from 'react'
import { Link } from "react-router-dom"

function Footer() {
  return (
    <>
    <section className="cta">
        <div className="container">

          <div className="cta-card">
            <div className="card-content">
              <h2 className="h2 card-title">Looking for a dream room?</h2>

              <p className="card-text">We can help you to find a room. Just like your Home</p>
            </div>

            <button className="btnAbout cta-btn">
              <span>Explore</span>
            <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
          </div>

        </div>
      </section>

      <footer className="footer">

    <div className="footer-top">
      <div className="container">

        <div className="footer-brand">

          {/* <a href="#" className="logo">
            <img src={logo} alt="logo"  style={{ height: '50px', width: '50px' }} />
          </a> */}

          <p className="section-text">
            Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsum is dummy text of the printing.
          </p>

          <ul className="contact-list paddingleft">

            <li>
              <a href="#" className="contact-link">
                <ion-icon name="location-outline"></ion-icon>

                <address>5 A-1 PIA Housing Society</address>
              </a>
            </li>

            <li>
              <a href="tel:+0123456789" className="contact-link">
                <ion-icon name="call-outline"></ion-icon>

                <span>0323-4664470</span>
              </a>
            </li>

            <li>
              <a href="mailto:contact@homeverse.com" className="contact-link">
                <ion-icon name="mail-outline"></ion-icon>

                <span>contact@asaanghar.com</span>
              </a>
            </li>

          </ul>

          <ul className="social-list paddingleft">

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-youtube"></ion-icon>
              </a>
            </li>

          </ul>

        </div>

        <div className="footer-link-box">

          <ul className="footer-list">

            <li>
              <p className="footer-list-title">Company</p>
            </li>

            <li>
              <a href="/about-us" className="footer-link">About us</a>
            </li>

            <li>
              <a href="/team" className="footer-link">Our Team</a>
            </li>

            <li>
              <a href="#" className="footer-link">All Products</a>
            </li>

            <li>
              <a href="#" className="footer-link">Locations Map</a>
            </li>

            <li>
              <a href="#" className="footer-link">FAQ</a>
            </li>

            <li>
              <a href="#" className="footer-link">Contact us</a>
            </li>

          </ul>

          <ul className="footer-list">

            <li>
              <p className="footer-list-title">Services</p>
            </li>

            <li>
              <a href="#" className="footer-link">Order tracking</a>
            </li>

            <li>
              <a href="#" className="footer-link">Wish List</a>
            </li>

            <li>
              <a href="#" className="footer-link">Login</a>
            </li>

            <li>
              <a href="#" className="footer-link">My account</a>
            </li>

            <li>
              <a href="#" className="footer-link">Terms & Conditions</a>
            </li>

            <li>
              <a href="#" className="footer-link">Promotional Offers</a>
            </li>

          </ul>

          <ul className="footer-list">

            <li>
              <p className="footer-list-title">Customer Care</p>
            </li>

            <li>
              <a href="#" className="footer-link">Login</a>
            </li>

            <li>
              <a href="#" className="footer-link">My account</a>
            </li>

            <li>
              <a href="#" className="footer-link">Wish List</a>
            </li>

            <li>
              <a href="#" className="footer-link">Order tracking</a>
            </li>

            <li>
              <a href="#" className="footer-link">FAQ</a>
            </li>

            <li>
              <a href="#" className="footer-link">Contact us</a>
            </li>

          </ul>

        </div>

      </div>
    </div>

  </footer>
    </>
  )
}

export default Footer