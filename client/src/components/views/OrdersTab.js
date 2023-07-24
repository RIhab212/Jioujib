import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./usert.css"
import { Scrollbars } from 'react-custom-scrollbars';
import axios from "axios";

const OrdersTab = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://jiujib.onrender.com/api/Prod'); // Remplacez l'URL par votre API réelle

            const productsArray = Object.values(response.data);

            setProducts(productsArray);
        } catch (error) {
            console.error(error);
        }
    };


    return (

        <div className='sidebar-admin'>
            <Navbar/>
            <div className="table-wrapper">
                <h1 className="H">List of Orders</h1>
                <Scrollbars className="scrollbars-custom" style={{ width: '100%', height: 'calc(100vh - 150px)' }}>                    <table>
                    <thead>
                    <tr>
                        <th>Location</th>
                        <th>Product Name</th>
                        <th>description</th>
                        <th>Status</th>

                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id}>
                            <td>{product.location}</td>
                            <td>{product.productName}</td>
                            <td>{product.description}</td>
                            <td>{product.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </Scrollbars>
            </div>
        </div>
    );
};

export default OrdersTab;
