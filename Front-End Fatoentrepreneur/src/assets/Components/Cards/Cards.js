import React from "react";
import styled from "styled-components";
import "./Cards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import info1 from "../../images/info1.png";
import info2 from "../../images/info2.png";
import { Link } from "react-router-dom";

const PopularCityCards = (destination) => {
  return (
    <div className="destination" onClick={destination.click}>
      
        <img src={destination.image} alt="" />
        <h3>{destination.city}</h3>
        <span>{destination.title}</span>
        <p>{destination.subTitle}</p>
        <div className="info">
          <div className="services">
            <img src={info1} alt="" />
            <img src={info2} alt="" />
          </div>
          <h4>200</h4>
        </div>
        <div className="distance">
          <span>{destination.duration}</span>
        </div>
      
    </div>
  );
};

const PlacesCards = (props) => {
  const list = [];
  for (let index = 0; index < props.stars; index++) {
    list.push(<span className="fa fa-star checked" key={index}></span>);
  }
  return (
    <div className="placesCard" onClick={props.clickHandler}>
      <div className="imgDetails">
        <img src={props.image} alt="" />
        <div className="imageContent">
          <div className="imgtext">
            <h1> {props.name}</h1>
          </div>
          <div className="savePlace align-items-center d-flex">
            <i class="fa-solid fa-bookmark"></i>
          </div>
        </div>
      </div>
      <div className="placeCardsDetails">
        <h3>{props.place}</h3>
        <div className="placeInfo d-flex align-items-center justify-content-start">
          <p>{props.type}</p>
          <div className="placesStarRating mx-2">{list}</div>
          <span className="placeCardRating mx-2 mt-1">
            {" "}
            <span className="numberOfReview mx-4">
              ({props.reviews} Reviews)
            </span>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

const ClientCards = () => {
  return (
    <div className="clientCards">
      <div className="clientImg">
        <img
          src="https://media.istockphoto.com/photos/portrait-of-men-looking-at-camera-picture-id1181083533?k=20&m=1181083533&s=612x612&w=0&h=JRcWzFmJhmnTPkT0MU1gGGcax-_p4eT0M_eRXWRqxgU="
          alt=""
        />
      </div>
      <div className="clientContent text-center">
        <div className="clientName p-2">
          <h3>Shivanshu Singh</h3>
        </div>
        <div className="clientReview">
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus quia
            ducimus in placeat non ratione aspernatur ex molestiae optio vel.
          </p>
        </div>
      </div>
    </div>
  );
};

const NearbyCard = (props) => {
  const list = [];
  for (let index = 0; index < props.stars; index++) {
    list.push(<span className="fa fa-star checked "></span>);
  }
  return (
    <div className="nearbyCard">
      {/* <hr /> */}
      <div className="col-10 d-flex flex-row">
        <div classname="col-3 p-2 d-flex flex-column justify-content-center">
          <img className="nearImg" src={props.img} />
        </div>
        <div className="col-9 px-3 py-1  d-flex flex-column justify-content-around">
          <p className="nearPara1 p-0 m-0">{props.title}</p>
          <p className="nearPara2 p-0 m-0">{props.subTitle}</p>
        </div>
      </div>
      <div className="col-2 nearCardsReviews">
        <p className="m-0">{props.reviews} Reviews</p>
        {list}
      </div>
    </div>
  );
};

const ReviewCards = (props) => {
  const list = [];
  for (let index = 0; index < props.stars; index++) {
    list.push(<span className="fa fa-star star-review mx-1 "></span>);
  }
  return (
    <div className="reviewCards my-4">
      <div className="reviewPersonDetails d-flex">
        <img
          className="reviewPersonImage"
          src="https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <div className="reviewPersonName mx-3">
          <h2 className="m">Kevin {list}</h2>
          <p className="m-0">
            <i> 2 years ago</i>
          </p>
        </div>
      </div>
      <div className="comments mt-4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe unde
        sapiente quae obcaecati architecto, blanditiis commodi consectetur est,
        distinctio deleniti laborum quaerat ducimus tempora vel.
      </div>
    </div>
  );
};

const DashBoardCards=(props)=>{
  return(
    <div className="dashBoardcard m-4 d-flex flex-wrap align-items-center">
      <div className="dashboardDetails ">
        <h1 className="text-center">{props.title}</h1>
        <h1 className="text-center dashBoarddata">{props.entry}</h1>
      </div>
    </div>
  )
}

// export default Cards;
export { PopularCityCards, PlacesCards, ClientCards, NearbyCard, ReviewCards ,DashBoardCards };
