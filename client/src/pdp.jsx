import { useLocation } from 'react-router-dom';
import avatarMale from './avatar-male.png';
import avatarFemale from './avatar.png';
import './pdp.css'; 

import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

const Profile = ({ notifications }) => {

  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(notifications.length);
  const [notificationss, setNotifications] = useState([]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (showNotifications) {
      setNotificationCount(0);
    }
  };
  useEffect(() => {
    setNotificationCount(prevCount => prevCount + notifications.length);
    setNotifications(prevNotifications => [...notifications, ...prevNotifications]);
  }, [notifications]);
  

  const location = useLocation();

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
      <div className="notifications">
      <button className="notification-button" onClick={handleNotificationClick}>
  <FaBell />
  {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
</button>

      {showNotifications && (
        <div className="notification-box">
          <div className="notification-header">Notifications</div>
          <ul className="notification-list">
            {notificationss.map(notification => (
              <li key={notification.id} className="notification-item">
                {notification.message}
                <div className="notification-actions">
                <Link to="/userLoggedInDetails" className="notification-details">see more</Link>
                </div>
              </li>
            ))}
          </ul>
      

        </div>
      )}
    </div>
        <img src="logoB2.png" alt="" className='jiwjiblogo' />
        <img src={getDefaultAvatar()} alt="" />
    </div>
  );
  };  
export default Profile;
