import {useEffect, useState} from "react";

function TrackingPage() {

    const userId = localStorage.getItem('userId');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://jiujib.onrender.com/'+userId,{
            method:"GET",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                token:window.localStorage.getItem("token") ,
            }),
        }).then((res) => res.json())
            .then((data) => {
                setProducts(data)
                console.log(products, "products")
            })
    }, []);

    return(
        <h1>test</h1>
    );
}

export default TrackingPage;