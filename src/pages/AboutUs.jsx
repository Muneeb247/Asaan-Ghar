import React from 'react'
import { Link } from "react-router-dom"
import heroBanner from "../assets/hero-banner.png"
import logo from "../assets/asaanGharLogo.png"
import aboutBanner1 from "../assets/about-banner-1.png"
import aboutBanner2 from "../assets/about-banner-2.jpg"
import service1 from "../assets/service-1.png"
import service2 from "../assets/service-2.png"
import service3 from "../assets/service-3.png"

function AboutUs() {
  return (
    <>
     <section className="hero" id="home">
        <div className="container">

          <div className="hero-content">

            <p className="hero-subtitle">
            <a href="/">
            <img src={logo} alt="Logo" style={{ height: '25px', width: '25px' }} />
        </a>

              <span>Asaan Ghar</span>
            </p>

            <h2 className="h1 hero-title">Find Your Dream House By Us</h2>

            <p className="hero-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
            </p>

            <button>
            <Link to='/' className='btnAbout'>Wanna Explore</Link> 
            </button>

          </div>

          <figure className="hero-banner">
            <img src={heroBanner} alt="Modern house model" className="w-100"/>
          </figure>

        </div>
      </section>
    

      <section className="about" id="about">
        <div className="container">

          <figure className="about-banner">
            <img src={aboutBanner1} alt="House interior"/>

            <img src={aboutBanner2} alt="House interior" className="abs-img"/>
          </figure>

          <div className="about-content">

            <p className="section-subtitle">About Us</p>

            <h2 className="h2 section-title">The Leading Rental Marketplace for students in future.</h2>

            <p className="about-text">
              Over 39,000 people work for us in more than 70 countries all over the This breadth of global coverage,
              combined with
              specialist services
            </p>

            <ul className="about-list">

              <li className="about-item">
                <div className="about-item-icon">
                  <ion-icon name="home-outline"></ion-icon>
                </div>

                <p className="about-item-text">Smart Rooms Design</p>
              </li>

              <li className="about-item">
                <div className="about-item-icon">
                  <ion-icon name="leaf-outline"></ion-icon>
                </div>

                <p className="about-item-text">Beautiful Scene Around</p>
              </li>

              <li className="about-item">
                <div className="about-item-icon">
                  <ion-icon name="wine-outline"></ion-icon>
                </div>

                <p className="about-item-text">Exceptional Lifestyle</p>
              </li>

              <li className="about-item">
                <div className="about-item-icon">
                  <ion-icon name="shield-checkmark-outline"></ion-icon>
                </div>

                <p className="about-item-text">Complete 24/7 Security</p>
              </li>

            </ul>

            <p className="callout">
              "Enimad minim veniam quis nostrud exercitation
              llamco laboris. Lorem ipsum dolor sit amet"
            </p>

            <button>
                <a href="#service" className="btnAbout">Our Services</a>
                </button>

          </div>

        </div>
      </section>
      {/* Services */}
      <section className="service" id="service">
        <div className="container">

          <p className="section-subtitle">Our Services</p>

          <h2 className="h2 section-title">Our Main Focus</h2>

          <ul className="service-list">

            <li>
              <div className="service-card">

                <div className="card-icon">
                  <img src={service1} alt="Service icon"/>
                </div>

                <h3 className="h3 card-title">
                  <a href="#">Buy a home</a>
                </h3>

                <p className="card-text">
                  over 1 million+ homes for sale available on the website, we can match you with a house you will want
                  to call home.
                </p>

                <a href="#" className="card-link">
                  <span>Find A Home</span>

                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </a>

              </div>
            </li>

            <li>
              <div className="service-card">

                <div className="card-icon">
                  <img src={service2} alt="Service icon" />
                </div>

                <h3 className="h3 card-title">
                  <a href="#">Rent a home</a>
                </h3>

                <p className="card-text">
                  over 1 million+ homes for sale available on the website, we can match you with a house you will want
                  to call home.
                </p>

                <a href="#" className="card-link">
                  <span>Find A Home</span>

                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </a>

              </div>
            </li>

            <li>
              <div className="service-card">

                <div className="card-icon">
                  <img src={service3} alt="Service icon"/>
                </div>

                <h3 className="h3 card-title">
                  <a href="#">Sell a home</a>
                </h3>

                <p className="card-text">
                  over 1 million+ homes for sale available on the website, we can match you with a house you will want
                  to call home.
                </p>

                <a href="#" className="card-link">
                  <span>Find A Home</span>

                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </a>

              </div>
            </li>

          </ul>

        </div>
      </section>
    </>
  )
}

export default AboutUs