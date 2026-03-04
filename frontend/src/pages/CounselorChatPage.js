import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/AxiosInstance";
import socket from "../socket";

const CounselorChatPage= () => {

    const navigate = useNavigate();
    const {user} = useAuth();

    const [message , setMessage] = useState([]);
    const [input ,setInput] = useState("");
    const bottomRef = useRef(null);

useEffect(() => {
  const conversationId = localStorage.getItem("conversationId");

  if (conversationId) {
    socket.emit("joinConversation", conversationId);
  }

  socket.on("receiveMessage", (data) => {
    setMessage((prev) => [...prev, data]);
  });

  return () => {
    socket.off("receiveMessage");
  };

}, []);

  const handleEndChat = async () => {
    try {
      const conversationId = localStorage.getItem("conversationId");

      const res = await axiosInstance.patch(
        "/api/chat/end",
        {
          conversationId,
          endedBy: "guest"

        }
      );

      // console.log(res.data);
      localStorage.removeItem("conversationId");
       socket.emit("endChat", conversationId);
      navigate("/counsellor/dashboard");
      

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  socket.on("chatEnded", () => {
    navigate("/");
  });

  return () => socket.off("chatEnded");
}, []);
  
  

  const handleSend = async() => {
      // console.log(input);

    if(!input.trim())return;

    const conversationId = localStorage.getItem("conversationId");
    
    await axiosInstance.post("/api/message/send", {
      conversationId,
      senderId:conversationId,
      senderRole: "counselor",
      text: input
   });

   const messageData = {
    conversationId,
    senderRole: "counselor",
    text: input,
  };

  socket.emit("sendMessage", messageData);

//   setMessage((prev) => [...prev, messageData]);
   setInput("");
   
  }
//   socket.on("receiveMessage", (data) => {
//     console.log("Received message:", data);
//   setMessage((prev) => {
//     if (prev.some(msg => msg._id === data._id)) return prev;
//     return [...prev, data];
//   });
//   console.log("Updated messages:", message);
// });

  useEffect(()=> {

    const fetchMsg = async () => {
      const conversationId = localStorage.getItem("conversationId");

      const res = await axiosInstance.get(
                  `/api/message/${conversationId}`
                );
        setMessage(res.data);
    };
    fetchMsg();
   
  }, []);

  useEffect(() => {
   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [message]);

  return (
    <>
        <div className="h-screen flex flex-col">
  
  {/* Header */}
  <div className="p-4 bg-blue-600 text-white flex justify-between">
    <h1>{user.name} Chat 💬</h1>
       <button
        onClick={handleEndChat}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        End Chat
      </button>
  </div>

  {/* Messages Area */}
  <div className="flex-1 overflow-y-auto p-4 space-y-2">
    {message.map((msg, index) => (
  <div
    key={index}
    className={`p-2 rounded max-w-xs ${
      msg.senderRole === "counselor"
        ? "bg-blue-500 text-white self-end ml-auto"
        : "bg-gray-200"
    }`}
  >
    {msg.text}
  </div>
  
))}
    <div ref={bottomRef}></div>
  </div>
  

  {/* Input Area */}
  
  <form   onSubmit={(e) => {
    e.preventDefault();
    handleSend();
  }}
  >
  <div className="p-4 border-t flex gap-2">
    <input
      type="text"
      onChange={(e)=>setInput(e.target.value)}
      value={input}
      placeholder="Type a message..."
      className="flex-1 border rounded px-3 py-2"
    />
    <button type="submit" className="bg-blue-600 text-white px-4 rounded">
      Send
    </button>
    </div>
    </form>

  </div>
    </>
  );
};

export default CounselorChatPage;