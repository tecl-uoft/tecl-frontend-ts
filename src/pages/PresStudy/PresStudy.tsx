import React, { useCallback, useEffect, useRef, useState } from "react";
import image_map from "./image_map.json";
import ysFixWebmDuration from "fix-webm-duration";
import { notify } from "../../components/Notification";

interface CanvasElement extends HTMLCanvasElement {
  captureStream(frameRate?: number): MediaStream;
}

function PresStudy(props: React.FC<{}>) {
  const [imageMap, setImageMap] = useState<string[]>([]);
  const [currImage, setCurrImage] = useState(image_map.story_links.length - 1);
  const [videoRecorder, setVideoRecorder] = useState<{
    mediaRecorder: MediaRecorder;
    recordedChunks: Blob[];
    startTime: number;
  }>();

  useEffect(() => {
    setImageMap(image_map.story_links);
  }, []);

  const onNextClick = useCallback(() => {
    setCurrImage((i) => {
      return i < image_map.story_links.length - 1 ? i + 1 : i;
    });
  }, []);

  const onBackClick = useCallback(() => {
    setCurrImage((i) => {
      return i > 0 ? i - 1 : i;
    });
  }, []);

  const onFinishClick = useCallback(() => {
    videoRecorder?.mediaRecorder.stop();
  }, [videoRecorder]);

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
    <div className="h-screen bg-blue-200 ">
      <div className="flex justify-center w-screen py-1">
        <img
          className="w-2/4 pr-4"
          alt={`map sequence ${currImage}`}
          src={imageMap[currImage]}
        />
        <div className="w-1/4 h-full">
          <video
            className="p-1 mx-auto bg-gray-100 rounded-lg "
            ref={videoRef}
            autoPlay={true}
            id="videoElement"
            muted={true}
          >
            A video should be displayed here. Please check your browser or
            permissions in order to turn on video.
          </video>
        </div>
      </div>
      {currImage !== image_map.story_links.length - 1 ? (
        <div className="flex justify-around px-2 my-6 space-x-2">
          {currImage === 0 ? (
            <div className="w-1/2 px-8 py-4" />
          ) : (
            <button
              onClick={onBackClick}
              className="w-1/2 px-8 py-4 font-bold tracking-wider uppercase bg-red-200 rounded-lg shadow-lg hover:bg-red-400"
            >
              Back
            </button>
          )}
          <button
            onClick={onNextClick}
            className="w-1/2 px-8 py-4 font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400"
          >
            Next
          </button>
        </div>
      ) : (
        <div className="flex justify-around px-2 my-6 space-x-2">
          <button
            onClick={onFinishClick}
            className="w-full px-8 py-4 font-bold tracking-wider uppercase bg-green-200 rounded-lg shadow-lg hover:bg-green-400"
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
}

function streamRecorder(
  canvas: HTMLCanvasElement | HTMLVideoElement,
  recordingTime: number
) {
  // Optional frames per second argument.
  const stream = (canvas as CanvasElement).captureStream(25);
  let recordedChunks: Blob[] = [];
  const startTime = Date.now();
  const options = { mimeType: "video/webm" };
  const mediaRecorder = new MediaRecorder(stream, options);

  function handleDataAvailable(event: BlobEvent) {
    if (event.data && event.data.size > 0) {
      recordedChunks.push(event.data);
    } else {
      alert("Error, no data captured");
    }
  }

  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = () => upload(recordedChunks, startTime);
  // Dont add a timescale in start won't record large files
  // https://github.com/webrtc/samples/issues/1153
  mediaRecorder.start();

  // demo: to download after recordingTime sec
  if (recordingTime > 0) {
    setTimeout(() => {
      mediaRecorder.stop();
      upload(recordedChunks, startTime);
    }, recordingTime);
  }

  return Promise.resolve({ mediaRecorder, recordedChunks, startTime });
}

export function upload(recordedChunks: Blob[], startTime: number) {
  const buggyBlob = new Blob(recordedChunks, { type: "video/webm" });
  const duration = Date.now() - startTime;
  ysFixWebmDuration(buggyBlob, duration, function (blobFile: Blob) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const participantId = urlParams.get("participant_id");
    const fileName = participantId + "_" + new Date().getTime() + ".webm";
    const fd = new FormData();
    fd.append("video-file", blobFile, fileName);
    getBlobDuration(blobFile).then((r) => console.log(r));
    //  upload the video to the server
    const uploadPromise = fetch("/api/v1/pres-study/upload-participant-video", {
      method: "POST",
      body: fd,
    });
    notify.promise(uploadPromise, {
      loading: "Please wait before continuing...",
      success: "You may proceed now.",
      error: "Failed to configure data. Please email coordinator.",
    });
  });
}

async function getBlobDuration(blob: Blob) {
  const tempVideoEl = document.createElement("video");

  tempVideoEl.addEventListener("loadedmetadata", () => {
    // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
    if (tempVideoEl.duration === Infinity) {
      tempVideoEl.currentTime = Number.MAX_SAFE_INTEGER;
      tempVideoEl.ontimeupdate = () => {
        tempVideoEl.ontimeupdate = null;
        tempVideoEl.currentTime = 0;
      };
    }
  });
}

export default PresStudy;
