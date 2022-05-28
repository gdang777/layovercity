import React from 'react'

import {DashBoardCards} from "../assets/Components/Cards/Cards"

const DashBoard = () => {
  return (
    <div className="p-5">
    <div className="userInfo px-5 my-4" >
        <div className="userWelcom my-4" >
            <h3>Welcome back! owner</h3>
        </div>
        <div className="bannerAlert my-4">
            <h2>Choose a plan to submit your place!</h2>
            <div className="bannerButton mt-3">
                <button className='bannerbtn'> Upgrade Now</button>
            </div>
        </div>
        <div className="userCard my-4 d-flex flex-wrap align-items-center justify-content-between">
            <DashBoardCards title="Activated Places" entry="0"/>
            <DashBoardCards title="Total Comments" entry="0"/>
            <DashBoardCards title="Total Reviews" entry="0"/>
            <DashBoardCards title="Total Views" entry="0"/>
        </div>
    </div>
    </div>
  )
}

const Profile=()=>{
  return(
    <div>Profile</div>
  )
}

export {DashBoard,Profile}
