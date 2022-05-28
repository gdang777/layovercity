import React, { useState } from "react";

import "./addInfo.css";
import AddPlaces from "./AddPlaces";
import AddStory from "./AddStory";
import Footer from "../assets/Components/Footer/Footer";

function AddInfo() {
  const [addPlace, setAddPlace] = useState(true);
  const [placeCat, setPlaceCat] = useState("addPlace");

  const onNavigate = () => {
    if (placeCat == "addPlace") {
      setPlaceCat("addStory");
      setAddPlace(false);
    } else {
      setPlaceCat("addPlace");
      setAddPlace(true);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="navigate d-flex flex-wrap justify-content-start my-4">
          <h5
            className={`${
              placeCat == "addPlace"
                ? "my-4 addPlaceHeading  placeActive mx-4"
                : "my-4 addPlaceHeading   mx-4"
            }`}
            onClick={onNavigate}
          >
            <span className="chgedcolor">Add</span> New Place
          </h5>
          <h5
            className={`${
              placeCat == "addStory"
                ? "my-4 addPlaceHeading  placeActive mx-4"
                : "my-4 addPlaceHeading   mx-4"
            }`}
            onClick={onNavigate}
          >
            <span className="chgedcolor">Add</span> New Story
          </h5>
        </div>
      </div>
      {addPlace ? <AddPlaces /> : <AddStory />}
      <Footer/>
    </div>
  );
}

export default AddInfo;
