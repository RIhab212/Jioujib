import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Img2 from './logoB2.png';
import Google from "./g.png";
import Facebook from "./if.png"
import tel from "./tel.png"
import Phonesignup from './Phonesignup.js'
import { Helmet } from "react-helmet"
import { useForm } from 'react-hook-form'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress';
import { Grid } from "@mui/material";
import { useEffect } from "react";

const React = require('react');
const { useState } = React;


const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
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


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	function handleButtonClick() {
		// Redirigez l'utilisateur vers la page de profil
		window.location.href = "./Phonesignup";
	}
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const url = "https://jiujib.onrender.com/Login-user";
			const { data: { data: token, gender, status } } = await axios.post(url, { email: data.email, password: data.password });
			const user = { email: data.email, gender };
			window.localStorage.setItem("user", JSON.stringify(user));
			if (status === "admin logged in") {

				navigate("/adminInterface");
			} else if (status === "user logged in") {

				navigate("/FormC");
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
		setIsLoading(false);
	};

	const google = () => {
		window.open("http://localhost:5000/auth/google", "_self");
	};

	const facebook =() => {
		window.open("http://localhost:3000/auth/facebook", "_self");

	};




	return (

		<div className={styles.login_background}>

			<div className={styles.login_container}>


				<div className={styles.login_form_container}>


					{showPhoneDiv ? (
						<Grid container spacing={2}>
							<Grid item xs={12} md={6} className={styles.left}>
								<form className={styles.form_container} onSubmit={handleSubmit}>
									<h1 className={styles.formlogin_title}><img src="https://i.imgur.com/cMgefXi.png" className={styles.imgphone}></img></h1>

									<Link to="/Signup">
										<button type="button" className={styles.phonesignupbtn}>
											SIGN UP
										</button>
									</Link>


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
										{isLoading ? (
											<CircularProgress
												size="0.8rem"
												style={{ color: "white", transition: "0.3s" }}
											/>
										) : (
											"SIGN IN"
										)}
									</button>

									<div className={styles.button_container}>
										<button className={styles.facebook} onClick={facebook}>
											<img src={Facebook} alt="" className="icon" />
										</button>
										<button className={styles.Google} onClick={google}>
											<img src={Google} alt="" className="icon" />
										</button>

										<Link to="/Phonesignup">
											<button className={styles.tel}>
												<img src={tel} alt="" className="icon" />
											</button>
										</Link>
										<div></div>
									</div>
								</form>
							</Grid>
						</Grid>
					) : (
						<>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6} className={styles.left}>
									<form className={styles.form_container} onSubmit={handleSubmit}>
										<h1 className={styles.formlogin_title}>SIGN IN</h1>
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
											{isLoading ? (
												<CircularProgress
													size="0.8rem"
													style={{ color: "white", transition: "0.3s" }}
												/>
											) : (
												"SIGN IN"
											)}
										</button>

										<div className={styles.button_container}>
											<button className={styles.facebook} onClick={facebook}>
												<img src={Facebook} alt="" className="icon" />
											</button>
											<button className={styles.Google} onClick={google}>
												<img src={Google} alt="" className="icon" />
											</button>

											<Link to="/Phonesignup">
												<button className={styles.tel}>
													<img src={tel} alt="" className="icon" />
												</button>
											</Link>
											<div></div>
										</div>
									</form>
								</Grid>
								{windowWidth > 900 && (
									<Grid item xs={12} md={6} className={styles.right}>
										{/* <LinearProgress sx={{
                  backgroundColor: '#B73E3E',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'white'
                  }
                }} style={{'width': '100%', 'top' : '-380px'}}/> */}
										<img src='https://i.imgur.com/b2fceUJ.png' alt='' className={styles.img2}/>
										<h1 className={styles.newhere}>NEW HERE?</h1>
										<Link to="/signup">
											<button type="button" className={styles.white_btn}>
												SIGN UP
											</button>
										</Link>

									</Grid>)}
								{showPhoneDiv && (
									<div>
										<h1>Phone</h1>
									</div>
								)}
							</Grid>
						</>
					)}


				</div>
			</div>


		</div>

	);
};

export default Login;