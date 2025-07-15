import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequest,removeRequest } from "../utils/requestSlice";

const Requests = () => {
    const dispatch=useDispatch();
    const requests=useSelector((store)=>store.requests);

    const reviewRequest=async(status,_id)=>{

        try{

            const res=await axios.post(BASE_URL+`/request/review/${status}/${_id}`,{},{withCredentials:true})

            dispatch(removeRequest(_id))

            

        }catch(err)
        {
            console.log(err);
        }

    }

   const fetchRequest=async()=>{
    try{

        const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true})
        dispatch(addRequest(res?.data?.data))

    }catch(err)
    {
        console.log(err);
    }
   }

   useEffect(()=>{
    fetchRequest();
   },[])


  if(!requests)
        return;
    if(requests.length===0)
        return <div className="flex justify-center my-10">
        <h1 className="text-bold text-3xl">WOW ! WHY SO LONELY :( 🥲</h1>
    </div>

  return (
    <div className="">
        <h1 className="text-bold text-center text-4xl my-10 ">Yay ! Requests 🤩</h1>

        {requests.map((req) => {

         const {firstName,lastName,photoUrl,age,gender,about,_id}=req.fromUserId//bcs populated in backend in fromUserId

  return (
    <div key={_id} className="m-4 p-4 border border-rounded-lg bg-base-300  rounded-lg ">
        <div><img alt="photo" className="w-20 h-20 rounded-full ml-4" src={photoUrl} /></div>
        <div className="text-left mx-4 "><h2 className="font-bold text-xl">{firstName+" "+lastName}</h2>
        <p>{age+" , "+gender}</p>
        <p className="break-words ">{about}</p>
        </div>
        <div className="card-actions mt-4 justify-end">
          <button className="btn bg-red-600 text-white hover:bg-red-800 rounded-lg" onClick={()=>reviewRequest("rejected",req._id)}>
            Reject
          </button>
          <button className="btn bg-pink-600 text-white hover:bg-pink-700 rounded-lg" onClick={()=>reviewRequest("accepted",req._id)}>
            Accept
          </button>
        </div>
        
        
    </div>
  );
})}

        
    </div>
  )
}


export default Requests