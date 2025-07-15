import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({user}) => {
  const [lastName, setLastName] = useState(user?.lastName||"");
  const [firstName, setFirstName] = useState(user.firstName);
  const [age, setAge] = useState(user?.age||18);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user?.about||"");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl||"");
  const [showToast,setShowToast]=useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch=useDispatch();

   const saveProfile = async () => {
  try {
    
    const res = await axios.patch(
      BASE_URL+"/profile/edit",
      {
        firstName,
        lastName,
        age,
        about,
        photoUrl,
        gender,
      },
      { withCredentials: true }
    );

    setErrorMsg("");//removing error before saving
    console.log(res?.data);
    dispatch(addUser(res?.data?.user)); 
    setShowToast(true)
   setTimeout(()=>{
    setShowToast(false)
   },3000)

  } catch (err) {
    console.log(err)
    setErrorMsg("ERROR : " + (err?.response?.data || "Something went wrong"));
  }
};


  return (
    <>
    <div className="flex justify-center my-10">
      <div className="flex justify-center items-center mx-10">
        <div className="card bg-base-300 w-96 shadow-md rounded-2xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl mb-6">
              Edit Profile
            </h2>

            {/* FirstName */}
            <label className="input input-bordered flex items-center gap-2 mb-4 rounded-lg">
              <input
                type="text"
                placeholder="First Name"
                required
                className="grow"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            {/* LastName */}
            <label className="input input-bordered flex items-center gap-2 mb-4 rounded-lg">
              <input
                type="text"
                placeholder="Last Name"
                required
                className="grow"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            {/* PhotoUrl */}
            <label className="input input-bordered flex items-center gap-2 mb-4 rounded-lg">
              <input
                type="text"
                placeholder="Photo URL"
                required
                className="grow"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            {/* Age */}
            <label className="input input-bordered flex items-center gap-2 mb-4 rounded-lg">
              <input
                type="number"
                placeholder="Age"
                required
                className="grow"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            {/* Gender */}
            <label className="input input-bordered flex items-center gap-2 mb-4 rounded-lg bg-black">
              <select
                required
                className="grow bg-black text-white focus:outline-none"
                value={gender}
                onChange={(e) => setGender(e.target.value)}>
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>

            {/* About */}
             <textarea className="textarea rounded-lg grow" placeholder="Bio" value={about}
                onChange={(e) => setAbout(e.target.value)}></textarea>

           

            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

            {/* Login Button */}
            <div className="flex justify-center">
              <button className="btn btn-neutral w-full rounded-lg bg-blue-800 hover:bg-blue-900" onClick={saveProfile}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      

      
      <UserCard user={{firstName,lastName,photoUrl,age,gender,about}} />
    

    </div>
    {showToast && <div className="toast toast-top toast-center my-4">

  <div className="alert bg-blue-600 rounded-lg">
    <span>Success ! Profile Updated</span>
  </div>
</div>}
    </>
  );
};

export default EditProfile;
