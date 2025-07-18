import React from 'react'
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api.js'
import { useState } from 'react';


function LoginAdmin() {
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);


    const handleAdminLogin = async () => {
    try {
      const response = await API.loginAdmin({
        email: adminId, // assuming admin uses email as ID
        password: adminPassword,
      });

      if (response.isSuccess) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("role", "admin"); // 👈 store role
        alert("Admin login successful!");
        navigate("/admin/home"); // change this route to your actual dashboard
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Invalid credentials or server error");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/bglogin.jpg')] bg-cover bg-center bg-no-repeat sm:px-4">
      
      {/* Wrapper for both boxes with fixed width */}
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row w-[100%] max-w-7xl min-h-[500px] gap-2 items-stretch">
        
        {/* Left Panel (60%) */}
        <div className="w-full sm:w-full md:w-full lg:w-[70%] bg-[#3D3D3D]/50 rounded-[15px] p-2 flex flex-col justify-start">
          <div className="mb-10">
            <img src="/logo.svg" alt="logo" className="lg:h-25 lg:w-25 h-16 w-16 sm:h-20 sm:w-20" />
          </div>
          <div className="flex justify-center">
            <div>
              <p className="text-white text-[18px] sm:text-[20px] md:text-[22px] lg:text-[22px] font-inter">
                Access your
              </p>
              <p className="ml-6 sm:ml-8 md:ml-10 text-[#FF8F9A] text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-inter font-semibold">
                Medical Records
              </p>
              <p className="ml-6 sm:ml-8 md:ml-10 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-white font-semibold italic font-inter lg:max-w-[500px] md:max-w-[500px]">
                securely and instantly—anytime, anywhere, when it matters most.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel (40%) */}
<div className="relative w-full sm:w-full md:w-full lg:w-[60%] h-[500px] sm:h-[520px] md:h-[520px] perspective" style={{ perspective: "1000px" }}>
    {showForgotModal && (
        <div className="z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl border border-[#0095DA] p-6 w-[90%] sm:w-[60%] md:w-[50%]">
          <h2 className="text-xl font-bold text-[#0095DA] mb-4 text-center">Reset Password</h2>
          <div className="flex flex-col gap-6">
            {step === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="border p-2 rounded-md"
                />
                <button
                  onClick={async () => {
                    const res = await API.sendAdminOTP({ email: forgotEmail });
                    if (res.isSuccess) {
                      alert("OTP sent to email!");
                      setStep(2);
                    } else {
                      alert("Failed to send OTP");
                    }
                  }}
                  className="bg-[#0095DA] text-white px-6 py-2 rounded-lg"
                >
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border p-2 rounded-md"
                />
                <button
                  onClick={async () => {
                    const res = await API.verifyAdminOTP({ email: forgotEmail, otp });
                    if (res.isSuccess) {
                      alert("OTP verified");
                      setStep(3);
                    } else {
                      alert("Incorrect OTP");
                    }
                  }}
                  className="bg-[#0095DA] text-white px-6 py-2 rounded-lg"
                >
                  Verify OTP
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border p-2 rounded-md"
                />
                <button
                  onClick={async () => {
                    const res = await API.verifyAdminOTP({
                      email: forgotEmail,
                      otp,
                      newPassword,
                    });
                    if (res.isSuccess) {
                      alert("Password updated successfully");
                      setShowForgotModal(false);
                      setStep(1);
                      setForgotEmail('');
                      setOtp('');
                      setNewPassword('');
                    } else {
                      alert("Failed to reset password");
                    }
                  }}
                  className="bg-[#0095DA] text-white px-6 py-2 rounded-lg"
                >
                  Change Password
                </button>
              </>
            )}

            <div className="flex justify-end mt-4">
              <p
                onClick={() => {
                  setShowForgotModal(false);
                  setStep(1);
                  setForgotEmail('');
                  setOtp('');
                  setNewPassword('');
                }}
                className="text-sm text-[#0095DA] cursor-pointer text-center"
              >
                Cancel
              </p>
            </div>
          </div>
        </div>
      )}
  <div  className={`w-full h-full transition-transform duration-700 ease-in-out relative`}  >
    {/* Front Side - Patient */}
    <div
      className="absolute w-full h-full backface-hidden bg-white/10 backdrop-blur-md rounded-[15px] p-8 flex flex-col justify-center items-center"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="flex justify-center mb-6">
        <img src="/logoadmin.svg" alt="Patient Logo" className="h-28 w-28 sm:h-32 sm:w-32 lg:h-35 lg:w-35" />
      </div>
      <div className="font-inter lg:w-sm justify-center text-white flex flex-col gap-6 w-full sm:w-[90%]">
        <input
          type="text"
          placeholder="Admin Email Address"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          className="w-full bg-transparent border-b-2 pl-4 border-white placeholder-white/70 text-white py-2 outline-none focus:border-[#FF8F9A] transition duration-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={adminPassword}
         onChange={(e) => setAdminPassword(e.target.value)}
          className="w-full bg-transparent border-b-2 pl-4 border-white placeholder-white/70 text-white py-2 outline-none focus:border-[#FF8F9A] transition duration-300"
        />
        <div className="flex justify-end text-[12px]">
          <p className='cursor-pointer' onClick={() => setShowForgotModal(true)}>Forgotten Password?</p>
        </div>
      </div>
      <div className="flex-row mt-8 justify-center items-end">
        <button 
        onClick={handleAdminLogin}
        className="bg-[#539ADC]/90 hover:bg-[#539ADC] text-white border border-white py-2 px-18 rounded-[15px] ">
          Login
        </button>
      </div>
    </div>

    
  </div>
</div>

      </div>
    </div>
  )
}

export default LoginAdmin