import axios from "axios";
import './FormC.css';
import Img5 from './av.png';
import Img6 from './Rectangle 32.png';
import CircularProgress from '@mui/material/CircularProgress'
import  Profile from './pdp.jsx'
import Notification from './notification'
import { Link,useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { useEffect, useState, useRef } from "react";
import { storage } from "./firebase.config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import MapButton from "./LocationInput";
const React = require('react');


const FormC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [success, setSuccess] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showPhoneDiv, setShowPhoneDiv] = useState(window.innerWidth < 800);
    const [isIconClicked, setIsIconClicked] = useState(false);



    const [data, setData] = React.useState({
        location: "",
        productName: "",
        description: "",
        photo: null,
        isConfirmed: false,
        Notif: true,
        Delivred: false,

    });
    const [submitted, setSubmitted] = React.useState(false);
    const [error, setError] = React.useState("");

    const [imageList, setImageList] = useState([])
    const imageListRef = ref(storage, "images/")

    const [imageUpload, setImage] = useState(null)
    const uploadImage = () => {
        if (imageUpload == null) return
        const imageRef = ref(storage,`images/${imageUpload.name + v4()}`)
        uploadBytes(imageRef, imageUpload).then(() => {

        })
    }



    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.id]: input.value });
    };

    const handleFileChange = (event) => {
        setData({ ...data, photo: event.target.files[0] });
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setData({
            location: "",
            productName: "",
            description: "",
            photo: null,
            isConfirmed: false,
            Notif: true,
            Delivred: false,
        });
    };
    const [userID, setUserId] = useState('default-user-id');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called");

        try {
            const formData = new FormData();
            formData.append('location', data.location);
            formData.append('productName', data.productName);
            formData.append('description', data.description);
            formData.append('status', "ORDER_PLACED");

            if (imageUpload) {
                const imageRef = ref(storage,`images/${imageUpload.name + v4()}`);
                await uploadBytes(imageRef, imageUpload);
                const downloadUrl = await getDownloadURL(imageRef);
                formData.append('photo', downloadUrl);
            }

            const url = 'https://jiujib.onrender.com/api/form';
            const { data: res } = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log(res.message);
            setSubmitted(true);
            setSuccess(true); // mettre le state de succès à true
            setTimeout(() => {
                navigate('/userLoggedInDetails');
            }, 2000); // rediriger l'utilisateur après 2 secondes
            setData({
                location: "",
                productName: "",
                description: "",
                photo: null,
                isConfirmed: false,
                Notif: true,
                Delivred: false,
            }); // Clear the input fields after submission
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                navigate("/userLoggedInDetails");
                setError(error.response.data.message);
            }
        }
    };



    useEffect(() => {
        const socket = io.connect('https://jiujib.onrender.com');

        socket.on('receive_message', data => {

            setNotifications([...notifications, { id: notifications.length, message: data.message }]);
        });
    }, []);

    const updateLocation = (address) => {
        // Mettre à jour l'adresse dans le state
        const updatedData = { ...data, location: address };
        setData(updatedData);
    };


    return (

        <div className='main'>

            {showPhoneDiv ? (
                <form action="/products" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <div className="topbarformc">
                                <img src="https://i.imgur.com/RyN8kuI.png" className="jijibimgtopbar" alt="logo" />
                            </div>
                            <div className="trackbarformc">
                                <div className="trackdeltxt">Tracking Delivery</div>
                                <div className="break" />
                                <div className="inprogtxt">In Progress...</div>
                                {/* <img src={Img5} alt="progress" className="imgtrackbarformc" /> */}
                            </div>
                            <div className="whatulook">
                                <div className="watulook">What Are You</div>
                                <div className="break"></div>
                                <div className="lookingfor">Looking For ?</div>
                            </div>
                            <div className="inputsformc">

                                <div className="break"></div>
                                <div className="product-container">
                                    <input type="text" id="location" value={data.location} onChange={handleChange}   />
                                    <input type="text" id="productName" placeholder="Product Name" value={data.productName} onChange={handleChange} required className="product-input" /><textarea id="description" placeholder="Description of the product" onChange={handleChange} value={data.description} required className="product-input" />
                                </div>
                                <div className="file-input-container">
                                    <label htmlFor="photo">Attach an Image</label>
                                    <input type="file" id="photo" onChange={(event) => {
                                        setImage(event.target.files[0]);
                                    }} accept="image/*" />
                                </div>
                                {error && <div className="error-message">{error}</div>}
                                {submitted && (
                                    <div className="success-message">Product created successfully!</div>
                                )}

                                <button type="submit" id="btn" className='btn' disabled={isLoading}>
                                    {isLoading ? <CircularProgress size="0.8rem" style={{'color': 'white', 'transition': '0.3s'}}/> : 'SEARCH FOR PRODUCT'}
                                </button>

                                <button type="button" id="btn" className='btnn' onClick={handleCancel}>CANCEL ORDER</button>



                            </div>
                        </Grid>
                    </Grid>
                </form>

            ) : (
                <Grid item xs={12} md={6}>

                    <div className="mm">
                        <div className="topbarprofile">
                            <img src="https://i.imgur.com/RyN8kuI.png" className="jijibimgtopbar" alt="logo" />
                        </div>
                        <div className="bodyformc">
                            <div className="trackdeltxt">Tracking Delivery</div>
                            <div className="break" />
                            <div className="inprogtxt">In Progress...</div>
                        </div>
                        <div className="bodyformcwatu">
                            <div className="watulook">What Are You</div>
                            <div className="break"></div>
                            <div className="lookingfor">Looking For ?</div>
                        </div>
                        <div className="bodyformcinputs">

                            <div className="break"></div>
                            <div className="input-with-icon">
                                <input
                                    type="text"
                                    id="location"
                                    value={data.location}
                                    onChange={handleChange}
                                    placeholder="                        Location"
                                    className="locationn"
                                />
                                <MapButton updateLocation={updateLocation} />
                            </div>


                            <div className="product-container">

                                <input  type="text" id="productName" placeholder="Product Name" value={data.productName} onChange={handleChange} required className="product-input" /><textarea id="description" placeholder="Description of the product" onChange={handleChange} value={data.description} required className="product-input" />
                            </div>
                            <div className="file-input-container">
                                <label htmlFor="photo">Attach an Image</label>
                                <input type="file" id="photo" onChange={(event) => {
                                    setImage(event.target.files[0]);
                                }} accept="image/*" />
                            </div>
                            {error && <div className="error-message">{error}</div>}
                            {submitted && (
                                <div className="success-message">Product created successfully!</div>
                            )}

                            <button type="submit" id="btn" className='btn' disabled={isLoading} onClick={handleSubmit} >
                                {isLoading ? <CircularProgress size="0.8rem" style={{'color': 'white', 'transition': '0.3s'}}/> : 'SEARCH FOR PRODUCT'}
                            </button>

                            <button type="button" id="btn" className='btnn' onClick={handleCancel}>CANCEL ORDER</button>


                        </div>
                    </div>

                    {/*

          <div className="hover"  >

      <div className="hover-body"  >
      </div>

          <div className="card"  >

      <div className="card-body"  >
      <img src={Img5} alt=''/>
        <h5 class="card-title">Tracking Delivery </h5>
        <p class="card-text">In Progress....</p>
      </div>
      </div>
      <div className="center">


          <form className="box-container" action="/products" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
          <h6>What Are You looking For ?</h6>
            <MapButton/>
            <div className="product-container">
              <input type="text" id="productName" placeholder="Product Name" value={data.productName} onChange={handleChange} required className="product-input" /><textarea id="description" placeholder="Description of the product" onChange={handleChange} value={data.description} required className="product-input" />
            </div>


            <div className="file-input-container">
            <label htmlFor="photo">Attach an Image</label>
            <input type="file" id="photo" onChange={(event) => {
              setImage(event.target.files[0]);
            }} accept="image/*" />
          </div>
          {error && <div className="error-message">{error}</div>}

          {submitted && (
        <div className="success-message">Product created successfully!</div>
      )}

            <button type="submit" id="btn" className='btn' disabled={isLoading}>
              {isLoading ? <CircularProgress size="0.8rem" style={{'color': 'white', 'transition': '0.3s'}}/> : 'SEARCH FOR PRODUCT'}
            </button>

          <button type="button" id="btn" className='btnn' onClick={handleCancel}>CANCEL ORDER</button>


        </form>
        </div>
        </div> */}
                </Grid>
            )}

        </div>

    );



};


export default FormC;

