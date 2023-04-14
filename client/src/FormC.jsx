import axios from "axios";
import './FormC.css';
import Img5 from './av.png';
import  Profile from './pdp.jsx'
import Notification from './notification'
import { Link,useNavigate } from "react-router-dom";
import FormWithMap from "./Maps.jsx"
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { storage } from "./firebase.config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid"

const React = require('react');

const FormC = () => {
  const [notifications, setNotifications] = useState([]);

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


      const url = "https://jiujib.onrender.com/api/form";
      const { data: res } = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${token}`

        }
      });


      console.log(res.message);

      setSubmitted(true);

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


  return (

    <div className='main'>
    <div className="mm">
    <Profile notifications={notifications} />


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
    <div >


      <input type="text" id="location" placeholder="Localisation" value={data.location} onChange={handleChange} required className='l' />
    </div>
    <div>
      <input type="text" id="productName" placeholder="Product Name" value={data.productName} onChange={handleChange} required className='n'/>

    </div>
    <input type="hidden" value="" />
    <div>
      <textarea id="description" placeholder="Description" onChange={handleChange} value={data.description} required className='m' />
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

    <button type="submit" id="btn" className='btn'>SEARCH FOR DELIVERY</button>

    <button type="button" id="btn" className='btnn' onClick={handleCancel}>CANCEL ORDER</button>


  </form>
  </div>
  </div>
   </div>
   </div>

);



};


export default FormC;
