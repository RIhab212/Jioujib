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
          <Route path="/Jioujib/" exact element={<Login/>} />
          <Route path="/Jioujib/" element={< Signup/>} />
          <Route path="/Jioujib/" element={<AdminInterface/>}/>
          <Route path="/Jioujib/" element={<UserLoggedInDetails/>}/>
          <Route path="/Jioujib/" element={<Validrecords/>}/>
          <Route path="/Jioujib/" element={<FormC/>}/>
          <Route path="/Jioujib/" element={<Phonesignup/>}/>

          <Route path="/Jioujib/" element={<OrderA/>}/>
          <Route path="/Jioujib/" element={<RecordList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
