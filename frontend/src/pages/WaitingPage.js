import React from "react";
import WUC from "../assets/WUC.png";
import Header from "../components/Header";

const WaitingPage = () => {
  return (
    <>
    <Header/>
    <section className="min-h-screen flex flex-col items-center justify-center px-4">
      
      {/* Image */}
      <img
        src={WUC}
        alt="Under Construction"
        className="object-contain mb-10 rounded-2xl"
        style={{ height: "50vh", width: "80vw" }}
      />

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
        Page Under Construction
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl text-gray-600 text-center max-w-2xl">
        Thank you for choosing us. We’re working hard to build this page and
        it’ll be ready for you very soon.
      </p>

    </section>
    </>
  );
};

export default WaitingPage;
