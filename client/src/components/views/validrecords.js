import React, { Component, useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import './validrecords.css';

import IconButton from "@mui/material/IconButton";
import { AddCircleOutline } from "@mui/icons-material";
import Navbar from './Navbar';

const Validrecords = () => {

    const [record, setData] = useState([])

    
    const handleToPickUp = async (row) => {
        const response = await fetch(
          "http://localhost:8080/api/getproducts/pickUp",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: row._id,
            }),
          }
        );
      
        if (!response.ok) {
          const errorMessage = await response.text();
          console.error(errorMessage);
          return;
        }
      };
      
      
    useEffect(() => {
        const fetchdata = async () => {
            const data = await fetch(  "http://localhost:8080/api/getproducts/getPlacedOrders",)
            const json = await data.json()

            if (data.ok) {
                setData(json)
                console.log(json);
            }
        }
        fetchdata()
        
    },[])

    const handleOrderPlaced = (id) => {
        // action à effectuer lorsqu'on clique sur le bouton "Order Placed" pour une ligne donnée
        console.log(`Order placed for row with id ${id}`);
    };

    const columns = [
        { field: "location", headerName: "Localisation", width: 150 },
        { field: "productName", headerName: "Nom du Produit", width: 150 },
        { field: "description", headerName: "Description", width: 150 },
        {
            field: "action",
            headerName: "Pickup Order",
            width: 200,
            renderCell: (params) => (
                <IconButton
                  onClick={() => handleToPickUp(params.row)}
                  color="primary"
                  aria-label="Pickup Order"
                  component="span"
                >
                  Pickup Order
                </IconButton>
              )
              
        }
    ];

    
        const rows = useMemo(
            () =>
              record.map((row) => ({
                ...row,
                id: row._id,
              })),
            [record]
          );
          
 
    return (
        <div>
            <div className='sidebar-admin'>
                <Navbar/>
            </div>
            <div className='main-page table-container'>
                <DataGrid
                    component={Paper}
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    className="datagrid"
                />
            </div>
        </div>
    );

}

export default Validrecords;
