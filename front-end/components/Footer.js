import React from "react";

const Footer = () => {
  return (
    <div
      id="box"
      className=" hidden lg:block p-7 lg:p-4 bg-black  bottom-0 w-full clear-both absolute"
      style={{
        clear: "both",
        position: "relative",
      }}
    >
      <h1 className="mt-0" style={{ color: "white", textAlign: "center" }}>
        <small className="font-burtons">
          &copy; 2023 | Created by Tarik Ozturk
        </small>
      </h1>
    </div>
  );
};
export default Footer;
