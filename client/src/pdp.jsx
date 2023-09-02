import { useLocation } from 'react-router-dom';
import avatarMale from './avatar-male.png';
import avatarFemale from './avatar.png';
import img8 from "./logoB2.png";
import './pdp.css';
import Notification from './notification';
import React from "react";


const Profile = () => {


  const user = JSON.parse(window.localStorage.getItem("user"));

  const getDefaultAvatar = () => {
    if (user && user.gender === "male") {
      return avatarMale;
    } else {
      return avatarFemale;
    }
  };
  
  return (
    <div className='row'>
      <Notification/>
      <img src= {img8 }alt="" className='jiwjiblogo' />
        <img src={getDefaultAvatar()} alt=""  />
    </div>
  );
  };  
export default Profile;
