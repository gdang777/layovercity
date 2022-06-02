import React, { useEffect, useState } from "react";
import "./PlaceDetails.css";
import { Carousel } from "@trendyol-js/react-carousel";
import PlaceDetailsContent from "./PlaceDetailsContent";
import Footer from "../../../assets/Components/Footer/Footer";
import {
  PlacesCards,
  NearbyCard,
} from "../../../assets/Components/Cards/Cards";
import { NavLink, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../../../assets/Components/Loader/Loader";

function PlaceDetails({ setUserLoginData }) {
  let { placeID } = useParams();

  const [loading, setLoading] = useState(true);
  const [placeData, setPlaceData] = useState(null);
  const [placeComments, setPlaceComments] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fatoentrepreneur.herokuapp.com/places/${placeID}`)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.place)
        setPlaceData(json.place);
        setLoading(false);
      });
    fetch(
      `https://fatoentrepreneur.herokuapp.com/comments/places?id=${placeID}`
    )
      .then((res) => res.json())
      .then((json) => {
        //  console.log(json.result)
        setPlaceComments(json.result);
      });
  }, []);

  const placesData = [
    {
      place: "London",
      image:
        "https://layover.city/wp-content/uploads/2019/11/Bar-Fisk__2018_Sherylleysner_Bar-Fisk_RK10280-540x480.jpg",
      type: "Resturant",
      stars: 4,
      reviews: 19277,
      name: "Flor",
      linkto: "/placesInfo",
    },
    {
      place: "Delhi",
      image:
        "https://layover.city/wp-content/uploads/2019/11/Flor-London-2019-1-540x480.jpg",
      type: "Sight",
      stars: 3,
      reviews: 1758,
      name: "The 9 Streets",
      linkto: "/placesInfo",
    },
    {
      place: "London",
      image:
        "https://layover.city/wp-content/uploads/2019/10/photo-1536918861100-77e1e6a4480d-540x480.jpeg",
      type: "Sight",
      stars: 5,
      reviews: 2064,
      name: "Bar Fisk",
      linkto: "/placesInfo",
    },
  ];
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="PlacesDetails">
          <Carousel
            show={3}
            slide={1}
            swiping={true}
            autoplay={true}
            className="d-flex justify-content-center align-items-center placesDetailsCarousel"
          >
            <img
              src="https://wp.getgolo.com/city-guide/wp-content/uploads/2019/11/Guts-Glory_Muk-van-Lil_2018_CNTraveller-GutsGlory-8.jpg"
              alt=""
            />
            <img
              src="https://wp.getgolo.com/city-guide/wp-content/uploads/2019/11/Guts-Glory_Muk-van-Lil_2018_CNTraveller-GutsGlory-6.jpg"
              alt=""
            />
            <img
              src="https://wp.getgolo.com/city-guide/wp-content/uploads/2019/11/Guts-Glory_Muk-van-Lil_2018_CNTraveller-GutsGlory-8.jpg"
              alt=""
            />
            <img
              src="https://wp.getgolo.com/city-guide/wp-content/uploads/2019/10/photo-1474898856510-884a2c0be546.jpeg"
              alt=""
            />
            <img
              src="https://wp.getgolo.com/city-guide/wp-content/uploads/2019/11/Bar-Fisk__2018_bar_fisk_31389-1.jpg"
              alt=""
            />
            <img
              src="https://wp.getgolo.com/city-guide/wp-content/uploads/2019/11/Guts-Glory_Muk-van-Lil_2018_CNTraveller-GutsGlory-8.jpg"
              alt=""
            />
          </Carousel>
          <div className="container">
            <div className="row">
              <div className="col-md-7 col-sm-12">
                <PlaceDetailsContent
                  placeID={placeID}
                  setUserLoginData={setUserLoginData}
                  place={placeData}
                  comments={placeComments}
                  setPlaceComments={setPlaceComments}
                />
              </div>
            </div>

            <div className="nearBy">
              <h3 className="my-4">Similar Places</h3>
            </div>
          </div>
          <div className="otherSimilarPlaces">
            <div className="placesCards d-flex flex-wrap justify-content-center align-items-center">
              <hr />
              {placesData.map((places, index) => {
                return (
                  <Link to={places.linkto}>
                    {" "}
                    <PlacesCards
                      place={places.place}
                      image={places.image}
                      type={places.type}
                      stars={places.stars}
                      reviews={places.reviews}
                      name={places.name}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default PlaceDetails;
