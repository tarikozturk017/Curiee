import React from "react";

const Card = ({ children }) => {
  return (
    <div className=" m-2 mt-20 md:m-8 lg:m-12 xl:m-16 m-min text-center text-indigo-200 text-sm md:text-base">
      {children}
    </div>
  );
};

export default Card;
