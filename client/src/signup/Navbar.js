import React, { Component, useEffect } from 'react'
import './adminInterface.css'
import Productsadmin from './productsadmin'
import Validrecords from './validrecords'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: ""
        }
      }
    
    
    componentDidMount(){
      fetch('http://localhost:8000/userData',{
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
                <div className='button-notif'>NOTIFICATION</div>
                
                <Link className='button-prod' to={'/validrecords'}>Products</Link>
                </div>
                <div className='logout-btn'>
                <div className='button-logout'>LOG-OUT</div>
            
        </div>
            </div>
        );
    }
}

export default Navbar;