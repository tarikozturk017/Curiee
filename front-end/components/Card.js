import React from "react";

const Card = ({ children }) => {
  return (
    <div className=" mx-auto  px-4 py-2 my-5 rounded-md text-white  max-w-max text-center" 
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
    >
        {children}
    </div>
  );
};

export default Card;