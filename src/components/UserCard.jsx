import { useLocation } from "react-router-dom";

function UserCard({ user }) {
  const { firstName, lastName, age, about, photoUrl, gender } = user;

  const location=useLocation();
  const isProfile=location.pathname==='/profile'


  return (
    <div className="card bg-gray-900 w-96 max-h-[600px] border border-pink-500/40 overflow-hidden shadow-[0_0_15px_#ec4899] rounded-xl">
      <figure>
        <img
          src={photoUrl}
          alt="User"
          className="w-full h-64 object-contain"
        />
      </figure>

      <div className="card-body flex flex-col">
        <h2 className="card-title text-pink-400 justify-center text-3xl">
          {firstName + " " + lastName}
        </h2>
        <p className="text-gray-300 text-center ">{age + " , " + gender}</p>

        {/* About section with scroll if too long */}
        <div className="text-gray-400 overflow-y-auto max-h-32 pr-1 break-words">

          {about}
        </div>

       {!isProfile && <div className="card-actions flex justify-between mt-4">
          <button className="btn bg-red-600 text-white hover:bg-red-800 rounded-lg">
            NOPE
          </button>
          <button className="btn bg-pink-600 text-white hover:bg-pink-700 rounded-lg">
            CONNECT
          </button>
        </div>}
      </div>
    </div>
  );
}
export default UserCard;