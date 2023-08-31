import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './signup/signup';
import AdminInterface from './components/adminInterface'
import UserLoggedInDetails from './components/userLoggedInDetails'
import Validrecords from './components/views/validrecords'
import OrderA from './components/views/OrderA'
import  FormC from "./FormC";
import Phonesignup from "./Phonesignup";
import RecordList from "./components/views/recordList"
import Productsadmin from './components/views/productsadmin'
import Terme  from './signup/Terme'
import Home from './components/views/Home'
import Usertable from './components/views/Usertable'
import OrdersTab from './components/views/OrdersTab'
import TrackingPage from "./components/views/TrackingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/Jioujib" exact element={<Login/>} />
          <Route path="/Login" exact element={<Login/>} />
          <Route path="/Signup" element={< Signup/>} />
          <Route path="/adminInterface" element={<AdminInterface/>}/>
          <Route path="/UserLoggedInDetails" element={<UserLoggedInDetails/>}/>
          <Route path="/Validrecords" element={<Validrecords/>}/>
          <Route path="/FormC" element={<FormC/>}/>
          <Route path="/Phonesignup" element={<Phonesignup/>}/>
          <Route path="/Productsadmin" element={<Productsadmin/>}/>
          <Route path="/OrderA" element={<OrderA/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Usertable" element={<Usertable/>}/>
          <Route path="/OrdersTab" element={<OrdersTab/>}/>
          <Route path="/myOrders" element={<TrackingPage/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
