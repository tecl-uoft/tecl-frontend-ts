import React, { useEffect, useRef } from "react";
import streamRecorder, { IRecorder } from "./streamRecorder";

function FroggerCameraTest({
  nextState,
  setVideoRecorder,
}: {
  nextState: () => void;
  setVideoRecorder: (videoRecorder: IRecorder) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(function (stream) {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .then(() => {
          if (videoRef.current) {
            streamRecorder(videoRef.current, 0).then((res) =>
              setVideoRecorder(res)
            );
          }
        });
    }
  }, [videoRef, setVideoRecorder]);

  return (
    <div className="container pb-6 mx-auto text-center">
      <h2 className="py-2 mb-5 text-2xl font-bold text-center bg-red-200">
        Note: You will NOT receive the payment if your video and audio are NOT
        working{" "}
      </h2>
      <h3 className="mb-8 text-3xl font-semibold text-center text-gray-800 underline">
        Let get your camera set up!
      </h3>
      <div className="flex">
        <div className="mx-auto mb-16 text-xl text-gray-800">
          <div className="flex flex-col mx-6 space-y-6 text-left">
            <p>
              1. If you are participating through a recorded zoom call or choose
              not share your video, you may skip the next step.
            </p>
            <p>
              2. Make sure a video of your and/or your child is showing on the
              right side of this screen. <br /> This might require you to enable
              permissions in your browser's search bar.
            </p>
            <p>
              3. When you are ready, please scroll to the bottom of the page and
              click next to continue.
            </p>
          </div>
        </div>
        <video
          className="w-1/2 p-2 mx-auto bg-gray-100 rounded-lg"
          ref={videoRef}
          autoPlay={true}
          id="videoElement"
        >
          A video should be displayed here. Please check your browser or
          permissions in order to turn on video.
        </video>
      </div>
      <div className="mt-6 text-md">
        Note: This study session records all video and stores them in our
        server.
      </div>

      <div className="flex justify-around my-6">
        <button
          onClick={nextState}
          className="w-3/4 px-8 py-4 font-bold tracking-wider uppercase bg-orange-300 rounded-lg shadow-lg hover:bg-orange-400 focus:outline-none"
        >
          Start Study
        </button>
      </div>
    </div>
  );
}

export default FroggerCameraTest;
