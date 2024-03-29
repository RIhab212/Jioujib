import {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";
import io from 'socket.io-client';
import {storage} from "../../firebase.config";
import {v4} from "uuid";
import iconecount from './iconecount.png';
const socket = io.connect('https://jiujib.onrender.com');

const RecordList = ({record}) => {
  const [records, setData] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const data = await fetch("https://jiujib.onrender.com/api/getproducts");
      const json = await data.json();

      if (data.ok) {
        setData(json);
      }
    };
    fetchdata();
  }, [record]);
  const handleSubmit = async () => {
    const response = await fetch(
        "https://jiujib.onrender.com/api/getproducts/confirm",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: record._id,
          }),
        }
    ).then(response => {
      const url = 'https://jiujib.onrender.com/notifications';
      const text = "your order '" + record.productName + "' is confirmed";
      const userId = record.userId;
      const productId = record._id;
      const data = {text, userId, productId};
      axios.post(url, data)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    }).catch(error => console.log(error));

  };


  const removeNotif = async () => {
    const response = await fetch(
        "https://jiujib.onrender.com/api/getproducts/update_notif",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: record._id,
          }),
        }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(errorMessage);
      return;
    }

  };


  return (
      <div>
       <h1 className="orders">Orders</h1>
      <div className="record-details-admin">
        {record.Notif ? <img src={iconecount}  className='img-notif'></img> : <></>}

        <h4 className="productName">{record.productName}</h4>


        <Accordion>
          <AccordionItem>
            <AccordionHeader className="seemore-admin">
              <p onClick={removeNotif}>See more</p>
              <br></br>
            </AccordionHeader>

            <AccordionBody>
              <h4 className="location">
                <strong>Localisation : </strong>
                  {record.location}
              </h4>
              <h4 className="description">
                <strong>description : </strong>
                {record.description}
              </h4>
              <img className="image" src={record.photo}></img>

              <input
                  type="submit"
                  className="submit-edit-admin"
                  value="Confirm"
                  onClick={handleSubmit}

              />

            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
      </div>
  );
};

export default RecordList;