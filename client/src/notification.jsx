import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import './notification.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Notification = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        axios.get('https://jiujib.onrender.com/notifications/' + userId).then((response) => {
            setNotifications(response.data.notifications);
        });
    }, [userId]);

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);

        if (!showNotifications) {
            localStorage.setItem('totalReadCount', JSON.stringify(notifications.length));
        }
    };

    const totalReadCount = JSON.parse(localStorage.getItem('totalReadCount')) || 0;

    const unreadCount = notifications.length - totalReadCount;

    return (
        <div className="notifications">
            <button className="notification-button" onClick={handleNotificationClick}>
                <FaBell />
                {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
            </button>
            {showNotifications && (
                <div className="notification-box">
                    <div className="notification-header">Notifications</div>
                    <ul className="notification-list">
                        {notifications.map((notification) => (
                            <li key={notification.id} className="notification-item">
                                {notification.text}
                                <Link to="/userLoggedInDetails" className="notification-details">
                                    See More
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notification;
