import React, { Component, useEffect } from 'react'
import './adminInterface.css'
import Productsadmin from './views/productsadmin'
import Validrecords from './views/validrecords'
import OrderA from './views/OrderA'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './views/Navbar'
import Home from "./views/Home";


export default class AdminInterface extends Component {
  

  

  constructor(props) {
    super(props)
    this.state = {
        userData: ""
    }
  }


componentDidMount(){
  fetch('https://jiujib.onrender.com/userData',{
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

      <div className='main-adminint'>
          <Productsadmin/>
        <div className='sidebar-admin'>
        <Navbar/>
        </div>
        <div>
          <Routes>
              <Route path="/Home" element={<Home/>}/>
          <Route path="/Productsadmin" element={<Productsadmin/>}/>
          <Route path="/validrecords" element={<Validrecords/>}/>
          <Route path="/OrderA" element={<OrderA/>}/>
          </Routes>
                   
        </div>
      </div>

      
    )
  }
}
