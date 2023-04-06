import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Img2 from './logoB2.png';
import Google from "./g.png";
import Facebook from "./if.png"
import tel from "./tel.png"
import Phonesignup from './Phonesignup.js'

const React = require('react');
const { useState } = React;

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	function handleButtonClick() {
		// Redirigez l'utilisateur vers la page de profil
		window.location.href = "./Phonesignup";
	  }

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		  const url = "http://localhost:8080/login-user";
		  const { data: { data: token, gender, status } } = await axios.post(url, { email: data.email, password: data.password });
		  const user = { email: data.email, gender };
		  window.localStorage.setItem("user", JSON.stringify(user)); // <- add this line
		  if (status === "admin logged in") {
			alert("admin logged in");
			window.localStorage.setItem("token", token);
			window.location.href = "./adminespace";
		  } else if (status === "user logged in") {
			alert("login successful");
			window.localStorage.setItem("token", data.data);
			window.location.href = "./Products";
		  } else {
			setError("Invalid login status");
		  }
		} catch (error) {
		  if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status <= 500
		  ) {
			setError(error.response.data.message);
		  }
		}
	  };
	  
	const google = () => {
		window.open("http://localhost:5000/auth/google", "_self");
	  };
	
	  const facebook =() => {
		window.open("http://localhost:3000/auth/facebook", "_self");
		
	};


	  

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Sign In</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					
						<div className={styles.button_container}>
						<h2>---OR---</h2>
			<button className={styles.facebook} onClick={facebook} >
            <img src={Facebook} alt="" className="icon" />
             </button>
			 <button className={styles.Google} onClick={google}>
            <img src={Google} alt="" className="icon" />
             </button>
			
      <Link to="/Phonesignup">
        <button  className={styles.tel}>
          <img src={tel} alt="" className="icon" />
        </button>
      </Link>
	  <div>
    </div>

			 </div>
			 
                   
					</form>

					
          
        
				</div>
				<div className={styles.right}>
				<img src={Img2} alt=''/>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
					
			</div>
		</div>
		</div>
	);
};

export default Login;