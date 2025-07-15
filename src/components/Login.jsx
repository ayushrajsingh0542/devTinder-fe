import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Login() {

    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");
    const [errorMsg,setErrorMsg]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLoginClick=async()=>{
      try{
        const result=await axios.post(BASE_URL+"/login",{
          emailId,
          password
        },{withCredentials:true}/*to get cookies*/)
        console.log(result.data)
        dispatch(addUser(result.data))
        navigate("/feed");
      }
      catch(err)
      {
        console.log(err);
        setErrorMsg("ERROR : "+err?.response?.data||'Something went wrong')
      }
    }

  return (
    <div className="flex justify-center items-center my-5">
      <div className="card bg-base-300 w-96 shadow-md rounded-2xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-6">Login</h2>

          {/* Email */}
          <label className="input input-bordered flex items-center gap-2 mb-4 rounded-lg">
            <svg
              className="h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              className="grow"
              value={emailId}
              onChange={(e)=>setEmailId(e.target.value)}
            />
          </label>

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2  rounded-lg">
            <svg
              className="h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor">
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </g>
            </svg>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must include number, lowercase & uppercase letters"
              className="grow"
            />
          </label>
          <p className="text-red-500 -mt-0.5 mb-5 ml-1">{errorMsg}</p>
          

          {/* Login Button */}
          <div className="flex justify-center">
            <button className="btn btn-neutral w-full rounded-lg bg-blue-800 hover:bg-blue-900" onClick={handleLoginClick}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
