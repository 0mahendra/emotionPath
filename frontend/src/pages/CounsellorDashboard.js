import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CounsellorDashboard = () => {
    const {user} = useAuth();
    const [waitingGuest, setWaitingGuest] = useState(null);
    const navigate = useNavigate();

    const handleStartChat = async () => {
        try {

            // console.log(waitingGuest._id);
            const res = await axios.post(
                `http://localhost:5000/api/conversation/accept/${waitingGuest._id}`
            );
            localStorage.setItem("conversationId", waitingGuest._id);
            navigate("/counselor/chat");

            
        }catch(error) {
            console.error("Error accepting chat:", error);
        }
    };


    useEffect(()=> {
           fetchWaitingGuest();
    }, []);


    const fetchWaitingGuest = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/conversation/waiting");
            setWaitingGuest(res.data.guests);
            // console.log(res.data.guests);
           }catch(error) {
            console.error("Error fetching waiting guest:", error);
                setWaitingGuest(null);
           }
        }
    

    return (
        <>
            <div className = "min-h-screen bg-black text-green-500 p-6">
                
                <div className= "border border-green-500 p-4 rounded-2xl p-6 mb-6">
                    <h1 className="text-3xl font-semibold">
                        Hii , {user?.name} 👋 Here is your dashboard
                    </h1>
                </div>

                <div className="grid grid-cols-3 gap-6">

                   <div className="border border-green-600 rounded-2xl p-6 col-span-1">

                        {waitingGuest ? (
                            <>
                                <h2 className="text-xl mb-4">🔔 New Chat Request</h2>
                                  <p className="mb-4">
                                    Guest Name: <span className="font-bold">{waitingGuest.guestName}</span>
                                  </p>

                                <button onClick= {handleStartChat} className="w-full py-2 border border-green-600 rounded-lg hover:bg-green-600 hover:text-black transition">
                                    Accept & Start Chat
                                </button>
                            </>
                           ) : (
                                 <h2 className="text-xl">No Waiting Guests</h2>
                               )}

                    </div>

                    <div className="border border-green-600 rounded-2xl p-6 col-span-1">
                        <h2 className= "text-xl mb-4"> Statistics</h2>
                        <p>Total Visitors :120 </p>
                        <p> Signed User : 80</p>
                        <p> Left without Chat :40</p>

                        <div className= "mt-4">
                            <p>👍 Liked Chats: 65</p>
                            <p>👎 Disliked Chats: 15</p>
                        </div>
                    </div>

                    <div className="border border-green-600 rounded-2xl p-6 col-span-1">
                        <h2 className="text-xl mb-4"> Previous Chat Feedback</h2>

                        <div className="space-y-4">
                            <div className="border border-green-600 p-3 rounded-lg">
                                very helpful and understanding session.
                            </div>
                            <div className="border border-green-600 p-3 rounded-lg">
                                Good communication.
                            </div>
                            <div className="border border-green-600 p-3 rounded-lg">
                                Need more clarity.
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="border border-green-600 rounded-2xl p-6 mt-6">
                      <h2 className="text-xl mb-4">Availability</h2>

                     <div className="flex gap-4">
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
        </>
    )
}

export default CounsellorDashboard;