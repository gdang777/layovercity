import React, { useEffect, useState } from "react";
import { NavLink, Link, useParams ,useHistory} from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

import "./PLacesInfo.css";
import PlacesInfoHero from "./PlacesInfoHero";
import PlaceContentMain from "./PlaceContentMain";
import PlaceInfoNav from "./PlaceInfoNav";
import Footer from "../../assets/Components/Footer/Footer";
import { PlacesCards } from "../../assets/Components/Cards/Cards";
import Loader from "../../assets/Components/Loader/Loader";

function PlacesInfo({match}) {
  const location = useHistory();
  let {cityID} = useParams();

  const [cityData,setCityData] = useState(null);
  const [placesData,setPlacesData] = useState(null);
  const [loading,setLoading] = useState(true);
  const [loadingPlaces,setLoadingPlaces] = useState(true);

  useEffect(() => {
    setLoading(true);
    setLoadingPlaces(true);
    fetch(`https://fatoentrepreneur.herokuapp.com/city/${cityID}`)
      .then((res) => res.json())
      .then((json) => {
        setCityData(json.city)
        // console.log(json.city)
        setLoading(false);
    })

    fetch("https://fatoentrepreneur.herokuapp.com/places")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.result)
        setPlacesData(json.result)
        setLoadingPlaces(false);
    })

  },[])

  const placeClickHandler = (place) => {
    location.push(`/place/${place.category}/${place._id}`)
  }

  return (
    loading ? <Loader/> : 
    <div className="container-fluid p-0">
      <div className="placesInfo">
        <PlacesInfoHero city={cityData}/>
      </div>
      <PlaceContentMain city={cityData}/>
      <PlaceInfoNav city={cityData}/>
      
       <div className="placesCards d-flex flex-wrap justify-content-start align-items-center">
        
        <hr />
        { loadingPlaces ? <Loader/> :
          placesData.filter((item) => {
            return item.city._id==cityID //All places which have same city as their location will get filtered out
          })
          .map((place,index) => {
            return <PlacesCards key={index} clickHandler = {() => placeClickHandler(place)} place = {place.city.city} image={place.city.images[0]} type={place.subcategory} stars={4} reviews={place.comments} name={place.category}/> //yahan par images galat use ki hai kyuki array khali hai aur number of stars nahi hai
          })
        }
      </div>
      <Footer />
    </div>
  );
}

export default PlacesInfo;
