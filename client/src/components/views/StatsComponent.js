// StatsComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const StatsComponent = () => {
    const [usersCount, setUsersCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);

    useEffect(() => {
        // ...
        axios.get('https://jiujib.onrender.com/register')
            .then(response => {
                console.log(response.data.users); // Verify the data received
                setUsersCount(response.data.users);
            })
            .catch(error => {
                console.error('Error retrieving user count:', error);
            });

        axios.get('https://jiujib.onrender.com/api/form')
            .then(response => {
                console.log(response.data.orders); // Verify the data received
                setOrdersCount(response.data.orders);
            })
            .catch(error => {
                console.error('Error retrieving order count:', error);
            });
    }, []);


    const data = {
        labels: ['Utilisateurs', 'Commandes'],
        datasets: [
            {
                label: 'Statistiques',
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                data: [usersCount, ordersCount]
            }
        ]
    };
    return (
        <div>
            <h2>Statistiques</h2>
            {usersCount !== 0 && ordersCount !== 0 ? (
                <Bar data={data} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

};

export default StatsComponent;
