import React from "react";
import Image from "next/image";
const IFrameNull = () => {
  return (
    <img
      className=" mx-auto my-12 rounded-2xl shadow-2xl shadow-blue-gray-300"
      src={"https://i.ytimg.com/vi/05DqIGS_koU/hqdefault.jpg"}
      width={500}
      alt="No uploaded video"
    />
  );
};
export default IFrameNull;
