/* eslint-disable jsx-a11y/alt-text */

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Img2 from './logoB2.png';


const React = require('react');
const { useState } = React;

const Signup = () => {
	const [gender, setGender] = useState('');
	const [checked, setChecked] = useState(false);

	const handleGenderChange = (event) => {
		setGender(event.target.value);
		setData({ ...data, gender: event.target.value });
	  };

  const [data, setData] = useState({
	fname: '',
	lname: '',
	email: '',
	password: '',
	gender: '',
  });
  
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const handleCheckboxChange = (event) => {
		setChecked(event.target.checked);
	};


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!checked) {
			setError("You must agree to the terms and policies to create an account.");
			return;
		}
		try {
			const url = "http://localhost:8080/register";
			const { data: res } = await axios.post(url, data);
			navigate("/Login");
			console.log(res.message);
		
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
	

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
				<img src={Img2} alt=''/>
					<h1>Welcome Back</h1>
					<Link to="/Login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
                
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Sign Up</h1>
						<input
							type="text"
							placeholder="First Name"
							name="fname"
							onChange={handleChange}
							value={data.fname}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lname"
							onChange={handleChange}
							value={data.lname}
							required
							className={styles.input}
						/>
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
						<div>
						<label>
        Male
		<input
  type="radio"
  name="genderInput"
  value="male"
  checked={gender === 'male'}
  onChange={handleGenderChange}
/>
      </label>
      <label>
        Female
		<input
  type="radio"
  name="genderInput"
  value="female"
  checked={gender === 'female'}
  onChange={handleGenderChange}
/>
      </label>
       
	  </div>
						<label>
							<input
								type="checkbox"
								checked={checked}
								onChange={handleCheckboxChange}
								className={styles.checkbox}
							/>
							I Agree to the Delivery <Link to="/Terme">Terms of services</Link> And <Link to="/Terme">Privacy polices</Link>
						</label>

						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;