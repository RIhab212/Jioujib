import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './signup/signup';
import AdminInterface from './components/adminInterface'
import UserLoggedInDetails from './components/userLoggedInDetails'
import Validrecords from './components/views/validrecords'
import OrderA from './components/views/OrderA'
import FormC from "./components/FormC";
import Phonesignup from "./Phonesignup";
import RecordList from "./components/views/recordList"
import Productsadmin from './components/views/productsadmin'
import Terme  from './signup/Terme';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={< Signup/>} />
        <Route path="/adminespace" element={<AdminInterface/>}/>
        <Route path="/userLoggedInDetails" element={<UserLoggedInDetails/>}/>
         <Route path="/validrecords" element={<Validrecords/>}/>
         <Route path="/Products"exact element={<FormC/>}/>
         <Route path="/Phonesignup"exact element={<Phonesignup/>}/>
         <Route path="/validrecords" element={<Validrecords/>}/>
         <Route path="/recordList" element={<RecordList/>}/>
         <Route path="/OrderA" element={<OrderA/>}/>
         <Route path="/Productsadmin" element={<Productsadmin/>}/>
          <Route path="/Terme" exact element={<Terme/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
