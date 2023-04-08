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
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route path="/jiUjibb" exact element={<Login/>} />
          <Route path="/jiUjibb/signup" element={< Signup/>} />
          <Route path="/jiUjibb/adminInterface" element={<AdminInterface/>}/>
          <Route path="/jiUjibb/userLoggedInDetails" element={<UserLoggedInDetails/>}/>
          <Route path="/jiUjibb/validrecords" element={<Validrecords/>}/>
          <Route path="/jiujib/FormC" element={<FormC/>}/>
          <Route path="/jiUjibb/Phonesignup" element={<Phonesignup/>}/>

          <Route path="/OrderA" element={<OrderA/>}/>
          <Route path="/jiUjibb/recordList" element={<RecordList/>}/>
      </Routes>
    </BrowserRouter>
  );
}   <Route path="/OrderA" element={<OrderA/>}/>

export default App;
