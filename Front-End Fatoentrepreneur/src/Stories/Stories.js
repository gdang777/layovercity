import React ,{ useEffect, useState } from 'react'
import Footer from '../assets/Components/Footer/Footer';
import Posts from './posts/Posts';
import Sidebar from './sidebar/Sidebar';
import "./Stories.css"


function Stories() {

  return (
    <div>
    <div className='container-fluid'>
      <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Flight - Crew's </span>
        <span className="headerTitleLg">VISION</span>
      </div>
      <img
        className="headerImg"
        src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
    </div>
      <div className="d-flex row">
        <div className="col-lg-8 col-md-8 col-sm-12">
        <Posts />
        </div>
        <div className="sidebar d-flex col-lg-4 col-md-4 col-sm-12">
        <Sidebar image= 'https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg'/>
        <Sidebar image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIhJRbOCmqDsffPwzxreF--6RR0_eodMWA2Q&usqp=CAU'/>
          </div>
      </div>
    </div>
        <Footer/>
    </div>
  )
}

export default Stories