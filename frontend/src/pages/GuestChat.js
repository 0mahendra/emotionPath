import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const GuestChat = () => {

    const navigate = useNavigate();

    const [message , setMessage] = useState([]);
    const [input ,setInput] = useState("");
    const bottomRef = useRef(null);

  const handleEndChat = async () => {
    try {
      const conversationId = localStorage.getItem("conversationId");

      const res = await axios.patch(
        "http://localhost:5000/api/chat/end",
        {
          conversationId,
          endedBy: "guest"
        }
      );

      console.log(res.data);
      navigate("/");
      

    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async() => {
      
    if(!input.trim())return;

    const conversationId = localStorage.getItem("conversationId");
    
//     await axios.post("http://localhost:5000/api/message/send", {
//       conversationId,
//       sender: "guest",
//       text: input
//    });
   setInput("");
   
  }

  useEffect(()=> {

    const fetchMsg = async () => {
      const conversationId = localStorage.getItem("conversationId");

    //   const res = await axios.get(
    //               `http://localhost:5000/api/message/${conversationId}`
    //             );
        // setMessage(res.data);
    };
    fetchMsg();

    const interval = setInterval(fetchMsg , 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [message]);

  return (
    <>
        <div className="h-screen flex flex-col">
  
  {/* Header */}
  <div className="p-4 bg-blue-600 text-white flex justify-between">
    <h1>Guest Chat 💬</h1>
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
      msg.sender === "guest"
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
  <div className="p-4 border-t flex gap-2">
    <input
      type="text"
      placeholder="Type a message..."
      className="flex-1 border rounded px-3 py-2"
    />
    <button className="bg-blue-600 text-white px-4 rounded">
      Send
    </button>
  </div>

</div>
    </>
  );
};

export default GuestChat;