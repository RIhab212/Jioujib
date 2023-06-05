import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../adminInterface.css';
import Productsadmin from '../views/productsadmin';
import Validrecords from '../views/validrecords';

class Navbar extends Component {
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
                this.setState({ userData: data.data });
            });
    }

    render() {
        return (
            <div>
                <h1 className="fname-admin">{this.state.userData.fname}</h1>
                <h1 className="lname-admin">{this.state.userData.lname}</h1>
                <h1 className="admintitle">ADMINISTRATEUR</h1>
                <div className="buttons-admin">
                    <NavLink className="button-home" to="/Home">
                        Home
                    </NavLink>
                    <NavLink className="button-notif" to="/Productsadmin">
                        Orders
                    </NavLink>
                    <NavLink className="button-prod" to="/Validrecords">
                        Accepted Orders
                    </NavLink>
                    <NavLink className="buttonOrder" to="/OrderA">
                        Delivered Orders
                    </NavLink>

                </div>
                <div className="logout-btn">
                    <div className="button-logout">LOG-OUT</div>
                </div>
            </div>
        );
    }
}

export default Navbar;
