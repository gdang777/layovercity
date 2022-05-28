import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PopularCityCards } from "../assets/Components/Cards/Cards";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../assets/Components/Loader/Loader";
export default function Recommend() {
  const location = useHistory();
  const [loading,setLoading] = useState(true);
  const [countryData,setCountryData] = useState([]);

  
  const cityClickHandler = (e) => {
    // console.log("clicked",e)
    location.push(`city/${e.city}/${e._id}`)
  }

  useEffect(()=>{
    setLoading(true);
    fetch("https://fatoentrepreneur.herokuapp.com/city")
      .then((res) => res.json())
      .then((json) => {
        setCountryData(json.result)
        // console.log(json.result)
        setLoading(false);
    })
  },[]);

  return (
    <Section id="recommend" className="container">
      <div className="title ">
        <h1>Popular Cities</h1>
      </div>
      <div className="destinations d-flex flex-wrap ">
        {
          loading ? <Loader/>
          : 
          countryData.map((item) => {
            // console.log(item);
            return(
              <PopularCityCards
                key={item._id}
                image = {item.images[0]}
                city =  {item.city}
                title = {item.country}
                subTitle = {item.description}
                duration = {item.bestTime}
                click={() => cityClickHandler(item)}
              />
            )
          })
        }
      </div>
    </Section>
  );
}

const Section = styled.section`
  padding: 2rem 0 7rem;
  .title {
    text-align: center;
    text-transform: uppercase;
    font-size:44px
  }
  .packages {
    display: flex;
    justify-content: center;
    margin: 2rem 0 ;
    ul {
      display: flex;
      list-style-type: none;
      width: max-content;
      li {
        padding: 1rem 2rem;
        border-bottom: 0.1rem solid black;
        cursor:pointer;
      }
      .active {
        border-bottom: 4px solid #1683d0;
        color:#1683d0;
      }
    }
  }
  .destinations {
    // display: grid;
    // grid-template-columns: repeat(3, 1fr);
    padding: 0 4rem;
    justify-content:space-between;
    
  }
  @media screen and (max-width: 776px){
    .destinations {
      justify-content:cenetr;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .packages {
      ul {
        li {
          padding: 0 0.5rem;
          font-size: 2vh;
          padding-bottom: 1rem;
        }
        .active {
          border-bottom-width: 0.3rem;
        }
      }
    }
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
`;
