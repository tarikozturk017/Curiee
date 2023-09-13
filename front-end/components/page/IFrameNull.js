import React from "react";
const IFrameNull = () => {
  return (
    <iframe
      className=" mx-auto my-12 rounded-2xl shadow-2xl shadow-blue-gray-300"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/A-MZOdHH3Nc?si=EegESS_NMrUcBNGM"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  );
};
export default IFrameNull;
