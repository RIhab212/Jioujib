import { useEffect , useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {BarController, BarElement, CategoryScale, Chart, LinearScale} from 'chart.js';

Chart.register(BarController, CategoryScale,LinearScale,BarElement);

const Home = () => {
    const [commandeCount, setCommandeCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        fetch('https://jiujib.onrender.com/api/form') // Remplacez "/api/commandes" par l'URL de votre première API qui fournit le nombre de commandes
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
                console.error('Erreur lors de la récupération du nombre d\'utilisateurs:', error);
            });


    }, []);

    // Données pour le graphe
    const chartData = {
        labels: ['Commandes', 'Utilisateurs'],
        datasets: [
            {
                label: 'Statistiques',
                data: [commandeCount, userCount],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Statistiques</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default Home;
