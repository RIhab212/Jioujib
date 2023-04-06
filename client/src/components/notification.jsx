import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import './notification.css'
const Notification = ({ notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  }

  return (
    <div className="notifications">
      <button className="notification-button" onClick={handleNotificationClick}>
        <FaBell />
        {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
      </button>
      {showNotifications && (
        <div className="notification-box">
          <div className="notification-header">Notifications</div>
          <ul className="notification-list">
            {notifications.map(notification => (
              <li key={notification.id} className="notification-item">
                {notification.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;

