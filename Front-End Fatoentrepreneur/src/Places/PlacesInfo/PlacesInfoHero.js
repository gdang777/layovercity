import React from "react";
// import { Carousel } from 'react-carousel-minimal';
import "./PlacesInfoHero.css";
import { Carousel } from "3d-react-carousal";

function PlacesInfoHero(props) {
  const imageData = props.city.images.map((item, index) => (
    <img src={item} alt={index} />
  ));

  return (
    <div className="container">
      <div className="row placesInfoHero d-flex justify-content-center flex-wrap justify-content-sm-center">
        <div className="col-md-5 col-sm-12 d-flex flex-column flex-wrap justify-content-sm-center">
          <div className="placeTitle">
            <h3>{props.city.city}</h3>
            <p>{props.city.country}</p>
          </div>
          <div className="placeSubtitle">
            <p>
              {" "}
              <span>
                <i class="fa-solid fa-location-dot  px-2 "></i>
              </span>
              {props.city.caption}
            </p>
          </div>
          <div className="placeContent ">
            <ul className="d-flex justify-content-between p-3 my-2">
              <li className="mx-2">
                <div>
                  <p className="text-center">
                    <span className="px-2">
                      <i class="fa-solid fa-sack-dollar"></i>
                    </span>{" "}
                    <i>{props.city.currency}</i>{" "}
                  </p>
                  <h3 className="chgedcolor mt-2"> CURRENCY</h3>
                </div>
              </li>
              <li className="mx-2">
                <div>
                  <p className="text-center">
                    <span className="px-2">
                      <i class="fa-solid fa-language"></i>
                    </span>{" "}
                    <i>{props.city.language}</i>{" "}
                  </p>
                  <h3 className="chgedcolor mt-2"> LANGUAGE</h3>
                </div>
              </li>
              <li className="mx-2 bline">
                <div>
                  <p className="text-center">
                    {" "}
                    <span className="px-2">
                      <i class="fa-solid fa-calendar-days"></i>
                    </span>
                    <i>{props.city.bestTime}</i>{" "}
                  </p>
                  <h3 className="chgedcolor mt-2"> BEST TIME TO VISIT</h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-7 col-sm-12 carousel-main">
          <Carousel
            className="carousel"
            slides={imageData}
            autoplay={true}
            interval={3000}
            style={{ width: "100vw" }}
          />
        </div>
      </div>
    </div>
  );
}

export default PlacesInfoHero;
