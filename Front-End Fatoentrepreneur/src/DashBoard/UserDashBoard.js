import React, { useState } from 'react'
import Footer from '../assets/Components/Footer/Footer'
import "./UserDashboard.css"
import {DashBoard , Profile} from './DashAndProfile'


function UserDashBoard() {
    const [dashActive,setDashActive]=useState(true);
    const[dashState,setDashState]=useState('dashBoard')

    const onNavigate = () => {
        if (dashState=='dashBoard') {
          setDashState('profile');
          setDashActive(false);
        } else {
            setDashActive(true);
            setDashState('dashBoard')
        }
      };
    return (
    <div className='container-fluid userDashBoard p-0'> 
    <nav className='usernav d-flex flex-wrap align-items-center '>
        <ul className='d-flex flex-wrap align-items-center px-5'>
            <li className={dashState=='dashBoard'?'mx-4 active':'mx-4 '} onClick={onNavigate}>Dash Board</li>
            <li className={dashState=='profile'?'mx-4 active':'mx-4 '} onClick={onNavigate}>Profile</li>
        </ul>
    </nav>
{dashActive?<DashBoard/>:<Profile/>}
    <Footer/>
    </div>
  )
}

export default UserDashBoard