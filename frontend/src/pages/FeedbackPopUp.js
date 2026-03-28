import { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";

const FeedbackPopUp = ({isOpen , onClose}) => {

    const [stars , setStars] = useState(0);
    const [reaction , setReaction] = useState("");
    const [text , setText] = useState("");
    const [loading , setLoading] = useState(false);

    const handleSubmit = async () => {

        if(!stars && !reaction) {
            alert("Please provide star rating and reaction");
            return;
        }
        
        try {
            setLoading(true);

            await axiosInstance.post("/api/feedback/add" , {
                stars , reaction , text
            });
                alert("Feedback submitted successfully");

                onClose();

        }catch(err) {
            console.log(err);
            alert("Error submitting feedback");
        }finally {
            setLoading(false);
        }

    }

    if(!isOpen) return null;

    return (
        <>
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-black text-green-500 border border-green-500 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl">

        <h2 className="text-xl text-center mb-2">
          💬 How was your session?
        </h2>

        <p className="text-center text-sm text-gray-400 mb-4">
          Your feedback helps us improve ❤️
        </p>

        {/* ⭐ Stars */}
        <div className="flex justify-center mb-4">
          {[1,2,3,4,5].map((star) => (
            <span
              key={star}
              onClick={() => setStars(star)}
              className={`cursor-pointer text-3xl transition ${
                star <= stars ? "text-yellow-400 scale-110" : "text-gray-500"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* 👍 👎 */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setReaction("like")}
            className={`px-4 py-2 border rounded-lg transition ${
              reaction === "like"
                ? "bg-green-500 text-black"
                : "border-green-500"
            }`}
          >
            👍 Like
          </button>

          <button
            onClick={() => setReaction("dislike")}
            className={`px-4 py-2 border rounded-lg transition ${
              reaction === "dislike"
                ? "bg-red-500 text-black"
                : "border-red-500 text-red-500"
            }`}
          >
            👎 Dislike
          </button>
        </div>

        {/* Text */}
        <textarea
          placeholder="Write feedback (optional)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded-lg bg-black border border-green-500 mb-4 outline-none"
        />

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg"
          >
            Skip
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 border border-green-500 hover:bg-green-500 hover:text-black rounded-lg"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

      </div>
    </div>
        </>
    )
}

export default FeedbackPopUp;
