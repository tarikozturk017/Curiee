import React from "react";

const Card = ({ children }) => {
  return (
    <div
      className=" mx-auto xl:w-60 lg:w-52 md:w-52 w-56 p-2 m-2 rounded-md text-white  text-center shadow-2xl shadow-blue-400/20 "
      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    >
      {children}
    </div>
  );
};

export default Card;
