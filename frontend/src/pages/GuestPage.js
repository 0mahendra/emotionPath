import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GuestPage = () => {

    const navigate = useNavigate();
    const [timer , setTimer] = useState(5);
    const [status , setStatus] = useState("");
    const [token ,setToken] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(()=> {
        const startConversation = async () => {
            try {
                console.log("Called");
                const res = await axios.post("http://localhost:5000/api/guest/start",
                            {
                              name: "Guest",
                              sessionId: Date.now().toString(),
                            }
                          );

                     localStorage.setItem(
                        "conversationId" , res.data.conversationId

                     );
                     setStatus(res.data.status);

                     if(res.data.status === "waiting" ){
                        setToken(res.data.tokenNumber || 1);
                     }
            }catch (err) {
                console.log(err);
            }finally {
                setLoading(false);
            }
        }
        startConversation();
    } , []);

    useEffect(()=> {
        if(status === "active") {
        const interval = setInterval(()=> {
            setTimer((prev)=>{
                if(prev === 1) {
                    clearInterval(interval);
                    navigate("/GuestChat");
                }
                return prev -1;
            });
        }, 1000);

        return () => clearInterval(interval); 
    }
    } , [status]);

     useEffect(() => {
        console.log("called3");
    if (status === "waiting") {
      const interval = setInterval(async () => {
        const conversationId =
          localStorage.getItem("conversationId");

        try {
          const res = await axios.get(
            `http://localhost:5000/api/conversation/${conversationId}`
          );

          if (res.data.status === "active") {
            clearInterval(interval);
            setStatus("active");
          }

        } catch (err) {
          console.log(err);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [status]);

   if (loading)
    return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <>
         <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      
      {status === "active" && (
        <>
          <h2 className="text-2xl font-semibold mb-4">
            Connecting you to counsellor...
          </h2>
          <div className="text-5xl font-bold text-blue-500">
            {timer}
          </div>
        </>
      )}

      {status === "waiting" && (
        <>
          <h2 className="text-2xl font-semibold mb-4">
            All counsellors are busy
          </h2>
          <p className="text-lg mb-2">
            Your Token Number: <strong>{token}</strong>
          </p>
          <p className="text-gray-600">
            Please wait, we will connect you soon...
          </p>
        </>
      )}

    </div>

           
        </>
    )
}

export default GuestPage;