import React from 'react'
import styled from "styled-components";

import "./HomePage.css"
import PopularCity from './PopularCity'
import Footer from '../assets/Components/Footer/Footer';
import Stories from './HomePageStories';
import bgimage from "../assets/images/hero.png"
import service1 from "../assets/images/service1.png";
import service2 from "../assets/images/service2.png";
import service3 from "../assets/images/service3.png";
import service4 from "../assets/images/service4.png";


function Homepage() {
  const data = [
    {
      icon: service1,
      title: "Service 1",
      subTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere natus, enim ipsam magnam odit deserunt itaque? Minima earum velit tenetur!",
    },
    {
      icon: service2,
      title: "Service 2",
      subTitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere natus, ",
    },
    {
      icon: service3,
      title: "Service 3",
      subTitle:
        " enim ipsam magnam odit deserunt itaque? Minima earum velit tenetur!.",
    },
    {
      icon: service4,
      title: "Service 4",
      subTitle:
        "enim ipsam magnam odit deserunt itaque? Minima earum velit tenetur!",
    },
  ];
  const Section = styled.section`
  padding: 5rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  .service {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background-color: aliceblue;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: 0.3s ease-in-out;
    // &:hover {
    //   transform: translateX(0.4rem) translateY(-1rem);
    //   box-shadow: rgb(156 156 181 / 20%) 0px 7px 29px 0px;
    // }
    .icon {
      img {
        height: 2.0rem;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
  return (
    <div className='container-fluid p-0 overflow-x-hidden '>
      <div className="home px-5 d-flex align-items-center justify-content-center flex-wrap">
      <div className="herobgImage mt-4  d-flex align-items-center justify-content-center ">
        <img src={bgimage} alt="" />
      </div>
      <div className="content d-flex align-items-center justify-content-center">
        <div className="title text-center px-4">
          <h1>Discover the world through the eyes of flight crew members.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            natus, enim ipsam magnam odit deserunt itaque? Minima earum velit
            tenetur!
          </p>
        </div>
        </div>
      
      </div>

      {/* Services Section */}
      <div className="container-fluid">
    <Section id="services" className="px-4">
      {data.map((service, index) => {
        return (
          <div className="service" key={index}>
            <div className="icon">
              <img src={service.icon} alt="" />
            </div>
            <h3>{service.title}</h3>
            <p>{service.subTitle}</p>
          </div>
        );
      })}
    </Section>
    </div>
      <PopularCity/>
      <Stories/>
      <Footer/>
    </div>
  )

}

export default Homepage