import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import '../adminInterface.css';
import Productsadmin from '../views/productsadmin';
import Validrecords from '../views/validrecords';
import av from "./av.png";
import acceuil from "./accueil.png";

class Userbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: ''
        };
    }

    componentDidMount() {
        fetch('https://jiujib.onrender.com/userData', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                token: window.localStorage.getItem('token')
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, 'userData');
                this.setState({userData: data.data});
            });
    }

    render() {
        return (
            <div>
                <div className="user-box-container">
                    <div className="user-box">
                        <h1 className="fnamee-admin"> Welcome, {this.state.userData.fname} {this.state.userData.lname}</h1>
                        <img src={av} alt="" className="avatar"/>
                    </div>
                </div>
            </div>

        )
    }
}

export default Userbox;