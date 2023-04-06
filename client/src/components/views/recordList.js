import { useEffect , useState } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");
const RecordList = ({ record }) => {
  const [records, setData] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const data = await fetch("http:/localhost:8080/api/getproducts/");
      const json = await data.json();

      if (data.ok) {
        setData(json);
      }
    };
    fetchdata();
  });
  const handleSubmit = async () => {
    const response = await fetch(
      "http://localhost:8080/api/getproducts/confirm",
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
    socket.emit("send_message", { message: "Your order is confirmed" });
  };

  
    const removeNotif = async () => {
      const response = await fetch(
        "http://localhost:8080/api/getproducts/update_notif",
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
      socket.emit('confirmation');
      record = { ...record, Notif: undefined };
    };
    

    return (
    
   <div className="record-details-admin">
        {record.Notif ? <img src='https://i.imgur.com/NNFZFXR.png' className='img-notif'></img> : <></>}

        <h4 className="productName">{record.productName}</h4>
        
  
        <Accordion>
          <AccordionItem>
            <AccordionHeader className="seemore-admin">
              <p onClick={removeNotif}>See more</p>
              <br></br>
            </AccordionHeader>
  
            <AccordionBody>
              <h4 className="location">
                <strong>Localisation : </strong> {record.location}
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
      
    );
  };
  
  export default RecordList;
  