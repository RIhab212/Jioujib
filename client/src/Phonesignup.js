import React from 'react'
import './Phonesignup.css'
import OtpInput from "otp-input-react"
import { useState } from "react"
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import {auth} from './firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import {toast, Toaster} from "react-hot-toast"
import "./firebase.config"
import axios from 'axios'



const Phonesignup = () => {



  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

 

  function onSignup() {
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTP(true);
        toast.success("Check your phone for the OTP code");
        console.log(ph)
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPass] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("/api/phonesignup", { ph , fname, lname, password });
      console.log(response.data.message);
    } catch (err) {
      console.log(err?.response?.data?.error);
    }
  };


  // ADDINGPHONE NUMBER AUTH


    return (
      <section className='Form-phonesignup'>


         <div>
         <Toaster toastOptions={{ duration: 4000 }} />
         <div id="recaptcha-container"></div>
         
          {user ? (

          <div className="signup-title2">
          <h1 className='enter-info'>PLEASE ENTER YOUR INFORMATIONS</h1>
          <input
            className='input-name'
            placeholder='First Name'
            onChange={setFname}
          ></input>
          <input
            className='input-lastname'
            placeholder='Last Name'
            onChange={setLname}
          ></input>
          <input
            className='input-pass'
            placeholder='Password'
            onChange={setPass}
          ></input>
          <input
            className='input-phone'
            placeholder={ph}
          ></input>
          <div className='btn-conf' onClick={handleSignup}>CONFIRM</div>
          </div>

            ) : (
            <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              
            </h1>
            {showOTP ? (
              <>
                <label
                  htmlFor="otp"
                  className="signup-title2"
                >
                  Enter your OTP
                </label>

                <div className='verifytext'>Enter the code that we’ve sent to your number +212 6 ** ** ** **{ + ph.substring(10, 12)}</div>
                
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="otp-container"
                ></OtpInput>

                <button
                  onClick={onOTPVerify}
                  className="button-verify"
                >
                  
                  <span>Verify OTP</span>
                </button>

              </>
            ) : (
              <>
                <div className='signup-title2'>Enter YOur Phone number</div>

                <PhoneInput className='phone-input' country={"ma"} value={ph} onChange={setPh} />
                
                <button
                  onClick={onSignup}
                  className="button-verify"
                >
                  <span>Send code via SMS</span>
                </button>

              </>
            )}
          </div>
        )}
      </div>

      </section>
     
    )
    }
export default Phonesignup;
