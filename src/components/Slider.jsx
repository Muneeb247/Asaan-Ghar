import React from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
import sliderPic1 from "../assets/sliderPic1.jpg"
import sliderPic2 from "../assets/sliderPic2.jpg"
import sliderPic3 from "../assets/sliderPic3.jpg"

function Slider() {
  return (
    <MDBCarousel showIndicators showControls fade>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src={sliderPic1}
        alt='...'
      >
        <h5>Welcome to Asaan Ghar</h5>
        <p>Comfortable and Affordable Hostels Rooms.</p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src={sliderPic2}
        alt='...'
      >
        <h5>Just like your Home.</h5>
        <p>A Best Place to Stay.</p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src={sliderPic3}
        alt='...'
      >
        <h5>Buy or Sale</h5>
        <p>Buy or Sale a room or an Appartment</p>
      </MDBCarouselItem>
    </MDBCarousel>
  )
}

export default Slider