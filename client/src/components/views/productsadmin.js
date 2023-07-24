import { useEffect , useState } from 'react'
import '../adminInterface.css'
import RecordList from './recordList'
import './recordList.css'


import Navbar from './Navbar';

const Productsadmin = () => {

    const [records, setData] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const data = await fetch('https://jiujib.onrender.com/api/getproducts')
            const json = await data.json()

            if (data.ok) {
                setData(json)
                console.log(json)

            }
        }
        fetchdata()
        
        },[records])




    return (
       
        <><div className='sidebar-admin'>
            <Navbar />
        </div><div className='main-page'>
                <div className='productsdata'>
                    {records && records.map((record) => (
                        <RecordList key={record._id} record={record} />
                    ))}
                </div>
            </div></>
        
    )
}

export default Productsadmin