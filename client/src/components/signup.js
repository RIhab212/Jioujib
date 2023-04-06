import React, { Component } from 'react'
import './signup.css'

export default class SignUp extends Component {
  constructor(props){
    super (props)
    this.state={
      fname:"",
      lname:"",
      email:"",
      password:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault()
    const{fname,lname,email,password} = this.state;
    console.log(fname,lname,email,password);
    fetch('http://localhost:5000/register',{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        fname:fname,
        email:email,
        lname:lname,
        password:password,
      }),
    }).then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister")
    })
  }
  render() {
    return (
      <form className='Signup-form' onSubmit={this.handleSubmit}>
        <h3 className='signup-title'>Sign Up</h3>

        <div className='txtboxs'>
        <div className="first-name-txtbox">
            <input
            type="text"
            className="fname"
            placeholder="First name"
            onChange={(e)=>this.setState({fname:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <input type="text" className="lname" placeholder="Last name"
          onChange={(e)=>this.setState({lname:e.target.value})} />
          
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="email"
            placeholder="Enter email"
            onChange={e=>this.setState({email:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="password"
            placeholder="Enter password"
            onChange={e=>this.setState({password:e.target.value})}
          />
        </div>
        </div>
        <div className="Se-Connecter">
          <button type="submit" className="btn-seconnecter">
            Sign Up
          </button>
        </div>

        <div className='terms-conditions'>
          <input type="checkbox" className='checkbox'/>
          <label className='terms-label'> I AGREE TO THE DELIVERY TERMS OF SERVICES AND PRIVACY POLICY</label>
        </div>

        <div className='img-background2'>
          <img className='img-jijib2' src='https://i.imgur.com/wRPX1ct.png'></img>
        </div>
      </form>
      
    )
  }
}
