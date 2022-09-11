import React from 'react'
import { MDBFooter } from 'mdb-react-ui-kit';

function Copyright() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
        <div className='text-center p-3' style={{ backgroundColor: '#6da5c6' }}>
        © 2022 Copyright:
        <a className='text-white'> Asaan Ghar </a>
      </div>
    </MDBFooter>
  )
}

export default Copyright