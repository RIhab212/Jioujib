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
          <Route path="/Jioujib" exact element={<Login/>} />
          <Route path="/Jioujib/signup" element={< Signup/>} />
          <Route path="/Jioujib/adminInterface" element={<AdminInterface/>}/>
          <Route path="/Jioujib/userLoggedInDetails" element={<UserLoggedInDetails/>}/>
          <Route path="/Jioujib/validrecords" element={<Validrecords/>}/>
          <Route path="/Jioujib/FormC" element={<FormC/>}/>
          <Route path="/Jioujib/Phonesignup" element={<Phonesignup/>}/>
          <Route path="/Jioujib/recordList" element={<RecordList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
