import React from "react";

const Card = ({ children }) => {
  return (
    <div className="m-16 m-min text-center text-indigo-200"
    >
        {children}
    </div>
  );
};

export default Card;
