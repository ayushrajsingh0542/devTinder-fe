import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

function Feed() {
    const dispatch=useDispatch();
    const feed=useSelector((store)=>store.feed)
    const getFeed=async()=>{
        try{
        if(feed)
            return;//np useless api calls
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


    return ( 
        <div className="flex justify-center my-10 rounded-lg">
          {feed && <UserCard user={feed[0]}/>}
        </div>
     );
}

export default Feed;