import React from 'react'
import "./PlaceInfoNav.css"

function PlaceInfoNav(props) {
  return (
    <div className=''>
        <hr />
        <nav className='container-fluid placeinfonav my-4 py-2 col-6'>
            <ul className='d-flex justify-content-between col-4' style={{width:'100%'}}>
                <li className='active text-uppercase' >  {props.city.city}</li>
                <li className='text-uppercase'>Stay</li>
                <li className='text-uppercase'>FOOD & DRINK</li>
                <li className='text-uppercase'>SEE & DO</li>
            </ul>
        </nav>
        <hr />

    </div>
  )
}

export default PlaceInfoNav