import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import socket from "../socket";


const CounsellorDashboard = () => {
    const {user} = useAuth();
    const [waitingGuest, setWaitingGuest] = useState(null);
    const navigate = useNavigate();
    const [conversationId, setConversationId] = useState(null);
    const [stats, setStats] = useState({
        visitors: 0,
        signedUsers: 0,
        leftWithoutChat: 0,
        likes: 0,
        dislikes: 0
    });
    const [feebackList, setFeedbackList] = useState([]);
  
    const handleStartChat = async () => {
        try {

            const res = await axiosInstance.post(
                `/api/conversation/accept/${waitingGuest[0]._id}`
            );
            localStorage.setItem("conversationId", waitingGuest[0]._id);
            setConversationId(waitingGuest[0]._id);
            navigate("/counselor/chat");

            
        }catch(error) {
            console.error("Error accepting chat:", error);
        }
    };

    const fetchStats = async () => {
       try {

        const res = await axiosInstance.get("/api/conversation/userStatus");

        //  console.log(res.data);
         setStats({
            visitors: res.data.totalVisitors,
            signedUsers: res.data.signedUser,
            leftWithoutChat: res.data.leftWithoutChat,
            likes: res.data.likedChats,
            dislikes: res.data.dislikedChats
         })

         const resFeedback = await axiosInstance.get("/api/feedback/all");
          setFeedbackList(resFeedback.data);
          // console.log(resFeedback.data);
        
       }catch (err){
         console.log(err);

       }
    }
    useEffect(()=> {
           fetchWaitingGuest();
           fetchStats();
           
    }, []);

 useEffect(() => {

  socket.on("newGuestWaiting", () => {
    fetchWaitingGuest();
  });

  return () => {
    socket.off("newGuestWaiting");
  };

}, []);

    useEffect( ()=> {
        if(conversationId) {
            socket.emit("joinConversation", conversationId);
        }
    },[conversationId]);



    const fetchWaitingGuest = async () => {
        try {
            const res = await axiosInstance.get("/api/conversation/waiting");
            setWaitingGuest(res.data.guests);
            console.log(res.data.guests);
           }catch(error) {
            console.error("Error fetching waiting guest:", error);
                setWaitingGuest(null);
           }
        }
    

    return (
        <>
            
           <div className="min-h-screen bg-[#b3ecff] text-green-500 p-4 md:p-6 max-w-7xl mx-auto">

  <div className="bg-black border-[#b3ecff] border p-4 rounded-2xl">

    {/* Header */}
    <div className="border border-green-500 rounded-2xl p-6 mb-6">
      <h1 className="text-xl md:text-3xl font-semibold">
        Hii , {user?.name} 👋 Here is your dashboard
      </h1>
    </div>


    {/* Dashboard Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* New Chat Request */}
      <div className="border border-green-600 rounded-2xl p-6">

        {waitingGuest && waitingGuest.length > 0 ? (
          <>
            <h2 className="text-xl mb-4">🔔 New Chat Request</h2>

            <p className="mb-4">
              Guest Name:
              <span className="font-bold ml-2">
                {waitingGuest.guestName}
              </span>
            </p>

            <button
              onClick={handleStartChat}
              className="w-full py-2 border border-green-600 rounded-lg hover:bg-green-600 hover:text-black transition"
            >
              Accept & Start Chat
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl">No Waiting Guests</h2>
            <p className="text-sm text-gray-400 mt-2">
              Waiting Queue: 0
            </p>
          </>
        )}

      </div>


      {/* Statistics */}
      <div className="border border-green-600 rounded-2xl p-6">

        <h2 className="text-xl mb-4">Statistics</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div className="border border-green-600 p-3 rounded-lg">
            👥 Visitors
            <p className="text-lg font-bold">{stats.visitors}</p>
          </div>

          <div className="border border-green-600 p-3 rounded-lg">
            🧑 Signed Users
            <p className="text-lg font-bold">{stats.signedUsers}</p>
          </div>

          <div className="border border-green-600 p-3 rounded-lg">
            🚪 Left Without Chat
            <p className="text-lg font-bold">{stats.leftWithoutChat}</p>
          </div>

          <div className="border border-green-600 p-3 rounded-lg">
            👍 Likes
            <p className="text-lg font-bold">{stats.likes}</p>
          </div>

          <div className="border border-green-600 p-3 rounded-lg col-span-2">
            👎 Dislikes
            <p className="text-lg font-bold">{stats.dislikes}</p>
          </div>

        </div>

        {/* Graph placeholder */}
        <div className="border border-green-600 rounded-lg mt-4 h-32 flex items-center justify-center text-sm">
          Graph will appear here (upcoming)
        </div>

      </div>


      {/* Feedback */}
      <div className="border border-green-600 rounded-2xl p-6">

        <h2 className="text-xl mb-4">Previous Chat Feedback</h2>

        <div className="space-y-4 max-h-52 overflow-y-auto pr-2">
  {feebackList.length > 0 ? (
    feebackList.map((item, index) => (
      <div
        key={index}
        className="border border-green-600 p-3 rounded-lg break-words"
      >
        {item.text  || "No feedback"}
      </div>
    ))
  ) : (
    <p className="text-gray-400 text-sm">No feedback available</p>
  )}
</div>

      </div>

    </div>


    {/* Availability */}
    <div className="border border-green-600 rounded-2xl p-6 mt-6">

      <h2 className="text-xl mb-4">Availability</h2>

      <div className="flex flex-col md:flex-row gap-4">

        <button className="px-6 py-2 border border-green-600 rounded-lg hover:bg-green-600 hover:text-black transition">
          Available for Chat
        </button>

        <button className="px-6 py-2 border border-red-600 text-red-500 rounded-lg hover:bg-red-600 hover:text-black transition">
          Unavailable
        </button>

        <button className="px-6 py-2 border border-green-600 rounded-lg hover:bg-green-600 hover:text-black transition">
          Create Post (Future)
        </button>

      </div>

    </div>

  </div>

</div>
        </>
    )
}

export default CounsellorDashboard;