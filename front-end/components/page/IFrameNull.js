import React from "react";
import Image from "next/image";
const IFrameNull = () => {
  return (
    <img
      className=" mx-auto my-12 rounded-2xl shadow-2xl shadow-blue-gray-300"
      src={
        "https://media.istockphoto.com/id/1392889115/vector/no-video-sign-vector-illustration.jpg?s=612x612&w=0&k=20&c=2iZx5bg92f_jd8h4AZ2f2LDYXq7urN2K1nl5BGkGuQA="
      }
      width={500}
      alt="No uploaded video"
    />
  );
};
export default IFrameNull;
