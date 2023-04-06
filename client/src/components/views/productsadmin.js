import { useEffect , useState } from 'react'
import '../adminInterface.css'
import RecordList from './recordList'
import './recordList.css'


import Navbar from './Navbar';

const Productsadmin = () => {

    const [records, setData] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const data = await fetch('http://localhost:8080/api/getproducts')
            const json = await data.json()

            if (data.ok) {
                setData(json)
                console.log(json)

            }
        }
        fetchdata()
        
        },[])




    return (
       
        <><div className='sidebar-admin'>
            <Navbar />
        </div><div className='main-page'>
                <img className='logo-admin' src='https://i.imgur.com/v10SbL4.png'></img>
                <div className='productsdata'>
                    {records && records.map((record) => (
                        <RecordList key={record._id} record={record} />
                    ))}
                </div>
            </div></>
        
    )
}

export default Productsadmin