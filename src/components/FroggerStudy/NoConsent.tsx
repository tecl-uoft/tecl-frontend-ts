import React from "react";
import { Link } from "react-router-dom";

function NoConsent() {

  const clickAway = () => {
    window.location.reload()
  }
  return (
    <div className="flex flex-col p-8 my-16 space-y-6 text-2xl tracking-wide text-left bg-orange-200 rounded-lg md:mx-auto md:w-3/4">
      <p>
        Thank you for showing interest in our study! Let us feel free to visit
        us at tecl.ca to look different studies that can be done online!
      </p>
      <div onClick={clickAway} className="text-blue-600 underline cursor-pointer hover:text-blue-800">You may click here to retry to experiment.</div>
      <p> Otherwise, you may exit this page when you are done!</p>
    </div>
  );
}

export default NoConsent;
