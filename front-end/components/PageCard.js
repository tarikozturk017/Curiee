import React from "react";

// PAGECARD SHOULD FIT THE SCREEN 

const PageCard = ({ children }) => {
  return (
    <div className=" bg-slate-900 min-w-fit w-4/6 h-screen mx-auto px-16   text-center">
        {children}
    </div>
  );
};

export default PageCard;