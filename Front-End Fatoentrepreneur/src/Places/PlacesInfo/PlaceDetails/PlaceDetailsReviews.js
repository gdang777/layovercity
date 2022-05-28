import React from 'react'
import "./PlaceDetailsReviews.css"
import {ReviewCards} from "../../../assets/Components/Cards/Cards";

function PlaceDetailsReviews() {
  return (
    <div>
        <ReviewCards stars="4"/>
        <ReviewCards stars="5"/>
        <ReviewCards stars="3"/>
    </div>
  )
}

export default PlaceDetailsReviews