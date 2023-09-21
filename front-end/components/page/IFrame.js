import React from "react";

// Function to convert a regular YouTube watch link to an embed link
function convertToEmbedLink(linkToArranged) {
  const videoIdMatch = linkToArranged.match(/(?:\?|&)v=([^&]+)/);
  if (videoIdMatch) {
    const videoId = videoIdMatch[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null; // Invalid link
}

const IFrame = ({ link }) => {
  // Convert the regular watch link to an embed link
  const embedLink = convertToEmbedLink(link);

  if (!embedLink) {
    return <div>Invalid YouTube link</div>;
  }

  return (
    <div>
      <iframe
        className=" hidden xl:block mx-auto my-12 rounded-2xl shadow-2xl shadow-blue-gray-300"
        width="560"
        height="315"
        src={embedLink}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      {/* small screen */}

      <iframe
        className="xl:hidden block mx-auto max-w-min my-12 rounded-2xl shadow-2xl shadow-blue-gray-300"
        width="560"
        height="315"
        src={embedLink}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default IFrame;
