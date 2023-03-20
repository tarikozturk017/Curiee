import React from "react";

const Card = ({ children }) => {
  return (
    <div className=" mx-auto rounded-lg p-5 text-white bg-slate-900 max-w-max text-center">
        {children}
    </div>
  );
};

export default Card;