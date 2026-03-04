import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/AxiosInstance";

const AuthPage = () => {
    const [name, setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const {login }  = useAuth();
    
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            
           if(!email.trim() || !password.trim()) {
            alert("Please enter email and password");
            return;
           }
            const res = await axiosInstance.post("api/auth/login", {email ,password});

            login(res.data);


      if (res.data.user.role === "admin") {
               navigate("/admin/dashboard");
          } else if (res.data.user.role === "counselor") {
               navigate("/counsellor/dashboard");
          } else {
               navigate("/");
         }

    } catch (err) {
      alert("Invalid credentials");
    }
    }

  const handleRegister = async (e) => {
       e.preventDefault();


    try {
      if(!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        alert("Please fill all fields");
        return;
      }
      if(password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
     const res =  await axiosInstance.post(
        "/api/auth/register",
        { name, email, password }
      );

      alert("Registered successfully");
      
        if (res.data.user.role === "admin") {
               navigate("/admin/dashboard");
          } else if (res.data.user.role === "counselor") {
               navigate("/counsellor/dashboard");
          } else {
               navigate("/");
         }


    } catch (err) {
      alert("Error registering user");
    }
  };

     return (
        <>
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
      <div className="w-[390px] bg-white p-4 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Title */}
        <div className="flex w-[200%] transition-all duration-500"
             style={{ marginLeft: isSignup ? "-100%" : "0%" }}>
          <h2 className="w-1/2 text-3xl font-semibold text-center">
            Login Form
          </h2>
          <h2 className="w-1/2 text-3xl font-semibold text-center">
            Signup Form
          </h2>
        </div>

        {/* Toggle Buttons */}
        <div className="relative flex mt-8 border rounded-xl overflow-hidden">
          <div
            className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 transition-all duration-500 ${
              isSignup ? "left-1/2" : "left-0"
            }`}
          />

          <button
            onClick={() => setIsSignup(false)}
            className={`w-1/2 py-2 text-lg font-medium z-10 transition-all ${
              !isSignup ? "text-white" : "text-black"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsSignup(true)}
            className={`w-1/2 py-2 text-lg font-medium z-10 transition-all ${
              isSignup ? "text-white" : "text-black"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Forms */}
        <div
          className="flex w-[200%] transition-all duration-500"
          style={{ marginLeft: isSignup ? "-100%" : "0%" }}
        >
          {/* Login */}
          <form className="w-1/2 mt-6 space-y-4 pr-4" onSubmit={(e) => {e.preventDefault(); handleLogin(); }}>
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="text-right">
              <a href="/" className="text-blue-600 text-sm hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl text-white text-lg font-medium bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 hover:opacity-90 transition"
            >
              Login
            </button>

            <p className="text-center text-sm">
              Not a member?{" "}
              <span
                onClick={() => setIsSignup(true)}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Signup now
              </span>
            </p>
          </form>

          {/* Signup */}
          <form className="w-1/2 mt-6 space-y-4 pl-4" onSubmit={(e) => { e.preventDefault(); handleRegister();}}>
          <input
              type="name"
              placeholder="Full Name"
              onChange={(e)=>setName(e.target.value)}
              className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e)=>setConfirmPassword(e.target.value)}
              className="w-full h-12 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full h-12 rounded-xl text-white text-lg font-medium bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 hover:opacity-90 transition"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>

        </>
    )
}

export default AuthPage;
