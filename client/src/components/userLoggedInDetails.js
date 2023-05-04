import React, { Component } from 'react';
import './UserP.css';
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";
import Img1 from './circle.png';
import Img2 from './line.png';
import Img3 from './sym.png';
import {Link} from "react-router-dom";
import moment from 'moment';



class userLoggedInDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: "",
            userProducts: []
        }

    }


    componentDidMount(){

        const userDataRequest = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token")
            })
        };

        const userProductsRequest = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token")
            })
        };

        Promise.all([
            fetch('https://jiujib.onrender.com/userData', userDataRequest),
            fetch('https://jiujib.onrender.com/userProducts', userProductsRequest)
        ])
            .then((responses) => {
                const userDataResponse = responses[0].json();
                const userProductsResponse = responses[1].json();

                return Promise.all([userDataResponse, userProductsResponse]);
            })
            .then((data) => {
                const userData = data[0].data;
                const userProducts = data[1].data;

                console.log(userData, "userData");
                console.log(userProducts, "userProducts");

                this.setState({
                    userData: userData,
                    userProducts: userProducts
                });
            })
            .catch((error) => console.error(error));


    }
    render() {




        return (


            <div className='main-pagee'>
                <div className='page-loggedin'>
                    {/* <h1 className='loggedin-title'>Welcome</h1>
                <h1 className='fname-logged'> Name : {this.state.userData.fname} </h1>
                <h1 className='femail-logged'> E-MAIL : {this.state.userData.email} </h1> */}

                    <Link to="/FormC">
                        <img className='goback-icon' src={Img3} alt="Retour" />
                    </Link>
                    <h1 className='tracking-de'>Tracking delivery</h1>

                    {this.state.userProducts.map((product) => (
                        <div className='record-details-products' key={product._id}>

                            <AccordionItem >
                                <h1 className='product-name'>{product.productName} </h1>
                                <h1 className='product-date'>{moment(product.createdAt).format('DD-MMM-YYYY, HH:mm A').replace('PM', 'pm')}</h1>
                                <h1 className='delivery-state'>
                                    {product.DelivredDate ? 'Order Delivered' :
                                        product.pickupDate ? 'Delivery In Progress...' :
                                            product.confirmedAt ? 'Searching for Product...' :
                                                'Ordering...'}
                                </h1>
                                <AccordionHeader className='seemore'>
                                    <h1 className='product-viewitem'>view item</h1>
                                    <br></br>
                                </AccordionHeader>
                                <AccordionBody>
                                    <br></br>
                                    <div className={`order-delvired`}>
                                        <img className='circle status-circle' src={Img1} style={{opacity: product.status === 'ORDER_DELIVERED' ? 1 : 0.5}}></img>
                                        <br></br>
                                        <img className='vertical-line' src={Img2}></img>
                                        <h1 className='order-5' >Order Delivered</h1>
                                        <h1 className='datee'>{product.DelivredDate ? moment(product.DelivredDate).format('DD-MMM-YYYY, HH:mm A').replace('PM', 'pm') : "\n" +
                                            "in progress..."}</h1>
                                    </div>
                                    <div className={`pickup-order `}>
                                        <img className='circle-5 status-circle' src={Img1} style={{opacity: product.status === 'ORDER_PICKUP' ? 1 : 0.5}}></img>
                                        <br></br>
                                        <img className='vertical-line' src={Img2}></img>
                                        <h1 className='order-4' >PickUp Order </h1>
                                        <h1 className='datee'>{product.pickupDate ? moment(product.pickupDate).format('DD-MMM-YYYY, HH:mm A').replace('PM', 'pm') : "in progress..."}</h1>

                                    </div>
                                    <div className={`order-3`}>
                                        <img className='circle-6 status-circle' src={Img1} style={{opacity: product.status === 'ORDER_ACCEPTED' ? 1 : 0.5}}></img>
                                        <br></br>
                                        <img className='vertical-line'  src={Img2}></img>
                                        <h1 className='order-2' >Order Accepted</h1>
                                        <h1 className='datee'>{product.confirmedAt ? moment(product.confirmedAt).format('DD-MMM-YYYY, HH:mm A').replace('PM', 'pm') : "in progress..."}</h1>

                                    </div>
                                    <div className={`order-placed `}>
                                        <img className='circle status-circle' src={Img1} style={{opacity: product.status === 'ORDER_PLACED' ? 1 : 0.5}}></img>
                                        <br></br>
                                        <h1 className='order-1' >ORDER PLACED</h1>
                                        <h1 className='datee'>{product.createdAt ? moment(product.createdAt).format('DD-MMM-YYYY, HH:mm A').replace('PM', 'pm') : " in progress..."}</h1>

                                    </div>


                                </AccordionBody>
                            </AccordionItem>


                        </div>
                    ))}
                </div>
            </div>

        );

    }

}

export default userLoggedInDetails;