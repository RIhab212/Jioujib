import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {BarController, BarElement, CategoryScale, Chart, LinearScale, registerables} from 'chart.js';
import "./home.css";
import Navbar from "./Navbar";
import usertable from "./Usertable"
import { Doughnut } from 'react-chartjs-2';
import {  ArcElement } from 'chart.js';
import { Link, useNavigate } from "react-router-dom";
import styles from "../../signup/styles.module.css";
import Userbox from "./Userbox";
import av from "./av.png";

Chart.register(BarController, CategoryScale, LinearScale, BarElement);
Chart.register(ArcElement);

Chart.register(...registerables);

const Home = () => {
    const [commandeCount, setCommandeCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [orderPlacedCount, setOrderPlacedCount] = useState(0);
    const [orderAcceptedCount, setOrderAcceptedCount] = useState(0);
    const [pickupOrderCount, setPickupOrderCount] = useState(0);
    const [orderDeliveredCount, setOrderDeliveredCount] = useState(0);
    const [orderPlacedRate, setOrderPlacedRate] = useState(0);
    const [orderAcceptedRate, setOrderAcceptedRate] = useState(0);
    const [pickupOrderRate, setPickupOrderRate] = useState(0);
    const [orderDeliveredRate, setOrderDeliveredRate] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [userData, setUserData] = useState({ fname: '', lname: '' });
    useEffect(() => {
        fetch('https://jiujib.onrender.com/api/form')
            .then(response => response.json())
            .then(data => {
                setCommandeCount(data.count);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du nombre de commandes:', error);
            });

        fetch('https://jiujib.onrender.com/api/users')
            .then(response => response.json())
            .then(data => {
                setUserCount(data.count);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            });

        fetch('https://jiujib.onrender.com/api/status')
            .then(response => response.json())
            .then(data => {
                setOrderPlacedCount(data.count.orderPlacedCount);
                setOrderAcceptedCount(data.count.orderAcceptedCount);
                setPickupOrderCount(data.count.pickupOrderCount);
                setOrderDeliveredCount(data.count.orderDeliveredCount);
                setTotalCount(data.count.totalCount);

                const placedRate = calculateRate(data.count.orderPlacedCount, data.count.totalCount);
                const acceptedRate = calculateRate(data.count.orderAcceptedCount, data.count.totalCount);
                const pickupRate = calculateRate(data.count.pickupOrderCount, data.count.totalCount);
                const deliveredRate = calculateRate(data.count.orderDeliveredCount, data.count.totalCount);

                setOrderPlacedRate(placedRate);
                setOrderAcceptedRate(acceptedRate);
                setPickupOrderRate(pickupRate);
                setOrderDeliveredRate(deliveredRate);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des statistiques:', error);
            });
        fetch('https://jiujib.onrender.com/userData')
            .then(response => response.json())
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
            });
    }, []);


    const calculateRate = (count, total) => {
        if (total === 0) {
            return 0;
        }
        return (count / total) * 100;
    };
    const chartData = {
        labels: ['Commandes', 'Utilisateurs'],
        datasets: [
            {
                label: 'Statistiques',
                data: [commandeCount, userCount],
                backgroundColor: ['rgba(255, 195, 77, 0.6)', 'rgba(255, 195, 77, 0.6)'],
                borderColor: ['rgba(255, 195, 77, 1)', 'rgba(255, 195, 77, 1)'],
                borderWidth: 1,
                width: 50,
            },
        ],
    };

    const chartOptions = {
        indexAxis: 'y',
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        width: 50, // Changer la valeur de la largeur ici selon vos besoins
    };


    const data = {
        labels: ['Order Placed', 'Order Accepted', 'Pickup Order', 'Order Delivered'],
        datasets: [
            {
                data: [orderPlacedRate, orderAcceptedRate, pickupOrderRate, orderDeliveredRate],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            <div className='sidebar-admin'>
                <Navbar />
            </div>

            <div>
                <div>
                </div>
                <div className="chart-container">
                    <div className="chart">
                        <Bar data={chartData} options={chartOptions } className="custom-chart" />
                        <div className={"mobile-wrapper"}>
                        <Link to="/Usertable" className="link-no-underline" >
                            <button className="big-button">
                                <span className="icone"><i className="fas fa-user"></i></span>
                                Users Details
                            </button>
                        </Link>
                        <Link to="/OrdersTab" className="link-no-underline" >
                            <button className="big-button big-button2 second-big-button">
                                <span className="icone">&#xf09d;</span>
                                Orders Details
                            </button>
                        </Link>
                        </div>
                    </div>
                </div>
                <div className='user'>
                    <Userbox/>
                </div>
            </div>
            <div className="status-box">
                {[
                    { label: 'Order Placed', count: orderPlacedCount, rate: orderPlacedRate },
                    { label: 'Order Accepted', count: orderAcceptedCount, rate: orderAcceptedRate },
                    { label: 'Pickup Order', count: pickupOrderCount, rate: pickupOrderRate },
                    { label: 'Order Delivered', count: orderDeliveredCount, rate: orderDeliveredRate }
                ].map((item, index) => (
                    <div className="status-item" key={index}>
                        <div className="status-label">{item.label}</div>
                        <div className="status-details">
                            <div className="status-chart">
                                    <Doughnut data={{
                                        labels: [''],
                                        datasets: [{
                                            data: [item.rate, 100 - item.rate],
                                            backgroundColor: ['#FF6384', '#e2e2e2']
                                        }]
                                    }} options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        cutout: '80%',
                                        plugins: {
                                            legend: {
                                                display: false
                                            },
                                            tooltip: {
                                                enabled: false
                                            }
                                        }
                                    }}/>
                                    <div className="status-count">{item.count}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
