import React from "react";

const PageCard = ({ children }) => {
  return (
    <div className=" border-2 border-opacity-30 border-slate-800 border-solid rounded-xl w-3/5 h-3/4 mx-auto px-16 mt-16  text-center">
        {children}
    </div>
  );
};

export default PageCard;