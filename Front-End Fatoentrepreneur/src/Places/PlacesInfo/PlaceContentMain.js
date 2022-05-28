import React from 'react'
import "./PlaceContentMain.css"

function PlaceContentMain(props) {
  return (
    <div className='container placeContentMain' >
        <h2 className='placeContentHeading py-2'><span className='' >Introducing</span> </h2>
        <div className="content col-8">
            <p className='pb-4'>{props.city.description}</p>
        </div>
    </div>
  )
}

export default PlaceContentMain