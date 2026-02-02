import React from "react";
import Header from "../components/Header";
import logoHeart from "../assets/logoHeart.jpg";
import logo3 from "../assets/logo3.jpg";
const LandingPage = () => {
    return (
        <>
         <div className="w-full bg-slate-900 flex items-center justify-center ">
  {/* BLUE BIG BOX */}
  <div className="w-full  bg-[#b3ecff] rounded shadow-2xl p-3 md:p-5 h-[100%]">
    
    {/* WHITE INNER BOX */}
    <div className="bg-white rounded-xl p-2 md:p-4 h-[100%] shadow-xl">
      
      <Header />

      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">

          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 main-tit">
              Not understood?
              <br /> You belong here.
            </h1>

            <p className="mb-8 leading-relaxed">
              Say what’s on your mind without fear.
              <br />
              You’re safe, heard, and welcome here.
            </p>

            <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-600 border-0 py-2 px-6 hover:bg-indigo-700 rounded-xl text-lg">
                Start Chat (without sign up)
              </button>

              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 hover:bg-gray-200 rounded-xl text-lg">
                Login
              </button>
            </div>

          </div>

          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded-2xl"
              alt="hero"
              src={logoHeart}
            />
          </div>

        </div>
      </section>


    <div className="relative py-24 ">

  {/* Background Image */}
  <img
    src={logo3}
    alt="bg"
    className="absolute inset-0 w-full h-full object-cover blur-md "
  />

  {/* White Card */}
  <div className="relative max-w-4xl mx-auto  rounded-3xl shadow-2xl px-10 py-14">

    {/* Question */}
    <h2 className="text-[48px] font-bold text-lime-200 text-center mb-8">
      Who we are — and how we’re different?
    </h2>

    {/* Bullet Points */}
    <ul className="text-[26px] text-lime-700 space-y-4 list-disc list-inside max-w-2xl mx-auto">
      <li>We focus on understanding, not judging.</li>
      <li>You can speak freely, without filters or fear.</li>
      <li>This space is built for emotions, not perfection.</li>
    </ul>

  </div>
</div>

    </div>
  </div>
</div>

        </>
    )
}
export default LandingPage;