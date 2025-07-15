import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {BASE_URL} from "../utils/constants"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {addUser} from "../utils/userSlice"
import { useEffect } from "react";

function Body() {
     const dispatch=useDispatch();
     const navigate=useNavigate();
     const user=useSelector((store)=>store.user);
     const fetchUser=async()=>{//so that when we refresh it does not logout automatically 
          try{
          const user=await axios.get(BASE_URL+"/profile/view",{withCredentials:true})
          dispatch(addUser(user.data))
          }catch(err)
          {
               console.log(err)
               if (err.response && err.response.status === 401)
               navigate("/login")//when user does not exist and tries to access another page without login
          }
     }
     useEffect(()=>{
          if(!user)//only make the api call when user is not present
          fetchUser();
     },[])
    return ( 
        <div>
             <Navbar />
             <Outlet />
             <Footer />
        </div>
     );
}

export default Body;