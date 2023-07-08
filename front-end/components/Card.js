import React from "react";

const Card = ({ children }) => {
  return (
    <div className=" mx-auto  px-4 py-2 my-5 rounded-md text-white  max-w-max text-center shadow-2xl shadow-blue-400/20 " 
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
        {children}
    </div>
  );
};

export default Card;