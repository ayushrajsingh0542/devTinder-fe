import axios from "axios"
import { useEffect } from "react"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice"
import { Link } from "react-router-dom"

const Connectionss = () => {

    const dispatch=useDispatch();
    const connections=useSelector((store)=>store.connections);

    const fetchConnections=async()=>{
       try{

        const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
        
        dispatch(addConnections(res?.data?.data))
       }catch(err)
       {
        console.log(err)
       }
    }

    useEffect(()=>{
fetchConnections();
    },[])


    if(!connections)
        return;
    if(connections.length===0)
        return <div className="flex justify-center my-10">
        <h1 className="text-bold text-3xl">WOW ! WHY SO LONELY :( 🥲</h1>
    </div>

    

  return (
    <div className=" text-center my-10">
        <h1 className="text-bold text-4xl ">Connections 🤝</h1>

        {connections.map((connection) => {

         const {firstName,lastName,photoUrl,age,gender,about,_id}=connection

  return (
    <div key={_id} className="m-4 p-4 border border-rounded-lg bg-base-300 flex rounded-lg ">
        <div><img alt="photo" className="w-20 h-20 rounded-full object-cover" src={photoUrl} /></div>
        <div className="text-left mx-4"><h2 className="font-bold text-xl">{firstName+" "+lastName}</h2>
        <p>{age+" , "+gender}</p>
        <p className="break-words">{about}</p>
         <Link to={"/chat/" + _id}>
              <button className="bg-pink-500 btn rounded-lg shadow-sm shadow-pink-400 mt-3 ">Chat</button>
            </Link>
        </div>
       
        
        
    </div>
  );
})}

        
    </div>
  )
}

export default Connectionss