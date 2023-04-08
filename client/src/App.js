import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './signup/signup';
import AdminInterface from './components/adminInterface'
import UserLoggedInDetails from './components/userLoggedInDetails'
import Validrecords from './components/views/validrecords'
import OrderA from './components/views/OrderA'
import  FormC from "./components/FormC";
import Phonesignup from "./Phonesignup";
import RecordList from "./components/views/recordList"
import Productsadmin from './components/views/productsadmin'
import Terme  from './signup/Terme';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/Jioujib" exact element={<Login/>} />
          <Route path="/Signup" element={< Signup/>} />
          <Route path="/AdminInterface" element={<AdminInterface/>}/>
          <Route path="/UserLoggedInDetails" element={<UserLoggedInDetails/>}/>
          <Route path="/Validrecords" element={<Validrecords/>}/>
          <Route path="/" element={<FormC/>}/>
          <Route path="/Phonesignup" element={<Phonesignup/>}/>
          <Route path="/Productsadmin" element={<Productsadmin/>}/>
          <Route path="/OrderA" element={<OrderA/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
