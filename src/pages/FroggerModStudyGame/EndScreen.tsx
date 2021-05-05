import React from "react";

function EndScreen() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center mt-64 text-4xl font-bold bg-gray-200">
        <div className="py-10">Thank you for playing!</div>
      </div>

      <div className="text-center">Please wait for the notification to confirm before exiting.</div>
      <img
        className="mx-auto bg-gray-200"
        src="/assets/frogger/inp4.png"
        alt="trophy"
      />
    </div>
  );
}

export default EndScreen;
