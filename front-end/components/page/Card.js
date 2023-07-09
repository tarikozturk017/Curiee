import React from "react";

const Card = ({ children }) => {
  return (
    <div className="m-16 text-center text-indigo-200"
    >
        {children}
    </div>
  );
};

export default Card;
