/* eslint-disable jsx-a11y/alt-text */

import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Img2 from './logoB2.png';
import axios from "axios";

import { Helmet } from "react-helmet"
import { useForm } from 'react-hook-form'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress';
import { Grid } from "@mui/material";
import { useEffect } from "react";


const React = require('react');
const { useState } = React;

const Signup = () => {
	const [gender, setGender] = useState('');
	const [checked, setChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [showPhoneDiv, setShowPhoneDiv] = useState(window.innerWidth < 800);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
			setShowPhoneDiv(window.innerWidth < 800);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleGenderChange = (event) => {
		setGender(event.target.value);
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
			const url = "https://jiujib.onrender.com/register";
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

	const loadButtonState = () => {
		const storedButtonState = localStorage.getItem('buttonState');
		if (storedButtonState) {
			return JSON.parse(storedButtonState);
		}
		return false;
	};

	useEffect(() => {
		setChecked(loadButtonState());
	}, []);

	useEffect(() => {
		localStorage.setItem('buttonState', JSON.stringify(checked));
	}, [checked]);

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>

				{showPhoneDiv ? (
					<Grid item xs={12} md={6} className={styles.right}>
						<form className={styles.form_container} onSubmit={handleSubmit}>
							<div className={styles.topbox}></div>
							<div className={styles.topboxradius}></div>
							<h1 className={styles.h1title}>Sign Up</h1>
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
										className={styles.genderradio}
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
								I Agree to the Delivery <Link to="/Terme"><span>Terms of services</span></Link> And <Link to="/Terme"><span>Privacy polices</span></Link>
							</label>

							{error && <div className={styles.error_msg}>{error}</div>}
							<button type="submit" className={styles.green_btn}>
								Sign Up
							</button>

							<div className={styles.alrtitle}><h3>Already Registred ? <Link to="/Login">Sign In</Link></h3></div>
						</form>
					</Grid>

				) : (
					<Grid container spacing={2}>
						<Grid item xs={12} md={6} className={styles.left}>
							<img src='https://i.imgur.com/b2fceUJ.png' alt='' className={styles.img2}/>
							<h1 className='welcome'>Welcome Back</h1>
							<Link to="/Login">
								<button type="button" className={styles.white_btn}>
									SIGN IN
								</button>
							</Link>
						</Grid>

						<Grid item xs={12} md={6} className={styles.right}>
							<form className={styles.form_container} onSubmit={handleSubmit}>
								<h1>SIGN UP</h1>
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
											className={styles.genderradio}
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
						</Grid>
					</Grid>
				)}


			</div>
		</div>
	);
};

export default Signup;