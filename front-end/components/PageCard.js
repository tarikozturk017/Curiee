import React from "react";

// PAGECARD SHOULD FIT THE SCREEN

const PageCard = ({ children }) => {
  return (
    <div className=" rounded mt-5 min-w-fit w-2/4 h-2/4 mx-auto px-16   text-center">
      {children}
    </div>
  );
};

export default PageCard;
