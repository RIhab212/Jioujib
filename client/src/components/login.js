import React, { Component } from 'react'
import './login.css'
import './images/background_image.png'

export default class Login extends Component {
  constructor (props){
    super(props)
    this.state={
      email:"",
      password:"",
      }
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.emailInput.classList.add("invalid-input");
      this.passwordInput.classList.add("invalid-input");
      return;
    }
    this.emailInput.classList.remove("invalid-input");
    this.passwordInput.classList.remove("invalid-input");
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userLogin");
  
        if (data.status == "admin logged in") {
          alert("admin logged in");
          window.localStorage.setItem("token", data.data);
          window.location.href = "./admin";
        }
  
        if (data.status == "user logged in") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.location.href = "./userLoggedInDetails";
        }
      });
  }


  render() {
    return (
      
      <div className='page-login'>
      <form onSubmit={this.handleSubmit} className='Form-Signin'>
        <div className='Signin-Title'><h3>Sign In</h3></div>
        
        <div className='textboxs'>
          <div className="mb-3">
          <input
            type="email"
            className="input-user"
            ref={(input) => this.emailInput = input}
            placeholder="Name / E-mail"
            onChange={(e)=>this.setState({email:e.target.value})}
            value={this.state.email}
          />
          </div>

          <div className="mb-3">

            <input
              type="password"
              className="input-password"
              ref={(input) => this.passwordInput = input}
              placeholder="Password"
              onChange={(e)=>this.setState({password:e.target.value})}
              value={this.state.password}
            />
          </div>
        </div>
        

        <div className="Se-Connecter2">
          <button type="submit" className="btn-seconnecter"
          >
            SE Connecter
          </button>
        </div>

        <div className='facebook-login'>
          <img src='https://img.icons8.com/color/256/facebook-new.png' className='facebook-icon'></img>
          <label className='Signinfb-title'>SIGN IN WITH facebook</label>
        </div>

        <div className='google-login'>
          <img src='https://img.icons8.com/color/256/gmail-new.png' className='email-icon'></img>
          <label className='Signingoogle-title'>SIGN IN WITH GOOGLE</label>
        </div>

        <div className='img-background'>
          <img className='jijib-img' src='https://i.imgur.com/wRPX1ct.png'></img>
        </div>

      </form>
      </div>
      
    )
  }
}
