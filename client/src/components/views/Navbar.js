import React, { Component, useEffect } from 'react'
import '../adminInterface.css'
import Productsadmin from '../views/productsadmin'
import Validrecords from '../views/validrecords'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: ""
        }
      }
    
    
    componentDidMount(){
      fetch('http://localhost:8080/userData',{
            method:"POST",
            crossDomain:true,
            headers:{
              "Content-Type":"application/json",
              Accept:"application/json",
              "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
              token:window.localStorage.getItem("token") ,
            }),
          }).then((res) => res.json())
          .then((data) => {
            console.log(data, "userData")
            this.setState({userData: data.data})
          })
    }

    render() {
        return (
            <div>
                
                <h1 className='fname-admin'>{this.state.userData.fname}</h1>
                <h1 className='lname-admin'>{this.state.userData.lname}</h1>
                <h1 className='admintitle'>ADMINISTRATEUR</h1>
                <div className='buttons-admin'>
                <Link className='button-notif' to={'/Productsadmin'}>Orders</Link>
                <Link className='button-prod' to={'/Validrecords'}> Accepted Orders</Link>
                <Link className='buttonOrder' to={'/OrderA'}>  Delivred Orders</Link>
                </div>
                <div className='logout-btn'>
                <div className='button-logout'>LOG-OUT</div>
            
        </div>
            </div>
        );
    }
}

export default Navbar;