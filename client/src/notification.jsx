
import React, {useEffect, useState} from 'react';
import {FaBell} from 'react-icons/fa';
import './notification.css'
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";


const Notification = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const unseenNotifications = notifications.filter(notification => !notification.seen);
    useEffect(() => {
        axios.get('https://jiujib.onrender.com/notifications/' + userId)
            .then((response) => {
                const temp = response.data.notifications;
                setNotifications(temp.reverse());
            });
    }, [notifications]);

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    }

    const markAsSeen = async (notification) => {


        const response = await fetch(
            "https://jiujib.onrender.com/notifications/update/" + notification._id,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(response => {
            const updatedNotifications = notifications.map((notif) => {
                if (notif._id === notification._id) {
                    notif.seen = true;
                }
                return notif;
            });
            setNotifications(updatedNotifications);
        })
    }

    const deleteNotification = async (notification) => {

        const response = await fetch(
            "https://jiujib.onrender.com/notifications/" + notification._id,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(response => {
            const updatedNotifications = notifications.filter((notif) => notif._id !== notification._id);
            setNotifications(updatedNotifications);
        });
    }

    return (
        <div className="notifications">
            <button className="notification-button" onClick={handleNotificationClick}>
                <FaBell/>
                {unseenNotifications.length > 0 && (
                    <span className="notification-count">{unseenNotifications.length}</span>
                )}
            </button>
            {showNotifications && (
                <div className="notification-box">
                    <div className="notification-header">Notifications</div>
                    <ul className="notification-list">
                        {notifications.map(notification => (
                            <li key={notification.id} onMouseEnter={() => markAsSeen(notification)}
                                className={`notification-item ${notification.seen ? "" : "unseen"}`}>
                                {notification.text}
                                <Link to="/userLoggedInDetails" className="notification-details">              see more</Link>
                                <div className='delete-notification' onClick={() => deleteNotification(notification)}>
                                    <CloseIcon/>
                                </div>
                            </li>


                            ))}

                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notification;