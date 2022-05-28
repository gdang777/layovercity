import React from 'react'
import {ClientCards} from "../assets/Components/Cards/Cards"
import { Carousel } from '@trendyol-js/react-carousel';

import "./About.css"
import Footer from '../assets/Components/Footer/Footer'
import aboutusImg from "../assets/images/aboutusImg.jpg"

function About() {
  return (
    <div>
      <div className="container-fluid ">
            <div className="row d-flex flex-wrap ">
                <div className="col-md-4 col-sm-12 d-flex flex-wrap  justify-content-center align-items-center">
                    <img src={aboutusImg} alt="" style={{height:"50vh"}}/>
                </div>
                <div className="col-md-8 col-sm-12 d-flex flex-wrap p-4 justify-content-center align-items-center">
                    <div className="herosecContent text-center p-4 m-4">
                        <h1 className='mb-4'> Our<span className='chgedcolor'> Team</span> </h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, molestiae! Ullam consequuntur praesentium repudiandae non numquam at maiores fuga et. Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <button className='aboutusBtn' >Know More..</button>
                    </div>
                </div>
            </div>
        </div>
      <h2 className="text-center my-5">
        What people say <span className="chgedcolor">About Us</span>
      </h2>
      <div className="d-flex justify-content-center align-items-center my-2">
        <div className="clientsCarousel my-2 px-4">
          <Carousel
            show={3}
            slide={1}
            swiping={true}
            className="d-flex justify-content-center align-items-center"
          >
            <ClientCards />
            <ClientCards />
            <ClientCards />
            <ClientCards />
          </Carousel>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default About