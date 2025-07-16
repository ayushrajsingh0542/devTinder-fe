import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect,useState } from "react";
import UserCard from "./UserCard";

function Feed() {
    const dispatch=useDispatch();
    const feed=useSelector((store)=>store.feed)
    const user=useSelector((store)=>store.user)
    const getFeed=async()=>{
        try{
        // if(feed)
        //     return;//no useless api calls
        const res=await axios.get(BASE_URL+"/feed",{withCredentials:true})
        console.log(res.data)
        dispatch(addFeed(res.data));
        

}catch(err)
{
    console.log(err)
}
    }

    useEffect(()=>{
       
        getFeed();
    },[])

    if(!feed)
        return;
    if(feed.length===0)
    return <div className="flex justify-center my-10">
        <h1 className="text-bold text-3xl">WOW ! WHY SO LONELY :( 🥲</h1>
    </div>


    return ( 
        <>
        <div className="flex justify-center my-10 rounded-lg">
          {feed && <UserCard user={feed[0]}/>}
        </div>
        
        </>
     );
}

export default Feed;