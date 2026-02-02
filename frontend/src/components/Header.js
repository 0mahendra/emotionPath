import React from "react";
import logo from "../assets/logo.jpeg";

const Header = () => {
    const cnt = 0;
    return (
        <>
            <header class="text-gray-600">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font  items-center text-gray-900 mb-4 md:mb-0">
      <img src={logo} alt="logo" className="h-10 w-10 rounded-full" /> 
      
      <span className="ml-3 text-2xl font-semibold flex items-center gap-2">
  EmotionPath
  <i className="fa-solid fa-heart text-red-500"></i>
</span>

    </a>
    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
   
    <a class="mr-5 hover:text-gray-900 cursor-pointer">Pricing</a>
      <a class="mr-5 hover:text-gray-900 cursor-pointer">About Us</a>
      <a class="mr-5 hover:text-gray-900 cursor-pointer">Contact Us</a>
      
      <button class="p-2 rounded-xl text-white w-auto bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 gap-2">
  Rate Us 
    <i class="fa-solid fa-star gap-2 pl-2 pr-2"></i> {cnt} 
</button>
      <a class="mr-5 hover:text-gray-900 gap-2"></a>
    </nav>
  </div>
</header>
        </>
    )
}

export default Header;