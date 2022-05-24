import React, { useCallback, useEffect, useRef, useState } from "react";
import image_map from "./image_map.json";
import image_map_sb1 from "./image_map_sb1.json"
import image_map_sb2 from "./image_map_sb2.json"
import ysFixWebmDuration from "fix-webm-duration";
import { notify } from "../../components/Notification";
import { useParams } from "react-router";

interface CanvasElement extends HTMLCanvasElement {
  captureStream(frameRate?: number): MediaStream;
}

function PresStudy(props: React.FC<{}>) {
  const [imageMap, setImageMap] = useState<string[]>([]);
  const [currImage, setCurrImage] = useState(0);
  const [videoRecorder, setVideoRecorder] = useState<{
    mediaRecorder: MediaRecorder;
    recordedChunks: Blob[];
    startTime: number;
  }>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const story = params.get("story");
    switch (story) {
      case "ex":
        setImageMap(image_map.story_links);
        break;
      case "sb1":
        setImageMap(image_map_sb1.story_links);
        break;
      case "sb2":
        setImageMap(image_map_sb2.story_links);
        break;
      default:
        setImageMap(image_map.story_links);
    }
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



  function showButtons(page: number) {
    const choiceComponent = (choices: { name: string, onClick: () => void }[]) => {
      return (
        <div className="flex justify-around px-2 my-6 space-x-2">
          {
            choices.map((choice) => {
              return <button
                onClick={choice.onClick}
                className="w-full px-8 py-4 font-bold tracking-wider uppercase bg-green-200 rounded-lg shadow-lg hover:bg-green-400"
              >
                {choice.name}
              </button>
            })
          }
        </div>
      )
    }

    switch (page) {
      case 8:
        return choiceComponent([
          { name: "Blake", onClick: () => setCurrImage(i => i + 2) },
          { name: "Avery", onClick: () => setCurrImage(i => i + 1) }])

      case 11:
        return choiceComponent([
          { name: "Band-Aid", onClick: () => setCurrImage(i => i + 1) },
          { name: "Toys", onClick: () => setCurrImage(i => i + 2) },
          { name: "Other", onClick: () => setCurrImage(i => i + 2) }])

      case 18:
        return choiceComponent([
          { name: "Blake", onClick: () => setCurrImage(i => i + 1) },
          { name: "Avery", onClick: () => setCurrImage(i => i + 2) }])

      case 21:
        return choiceComponent([
          { name: "Soccer Ball", onClick: () => setCurrImage(i => i + 1) },
          { name: "Puzzle Box", onClick: () => setCurrImage(i => i + 2) },
          { name: "Other", onClick: () => setCurrImage(i => i + 2) }])

      case 28:
        return choiceComponent([
          { name: "Blake", onClick: () => setCurrImage(i => i + 2) },
          { name: "Avery", onClick: () => setCurrImage(i => i + 1) }])

      case 31:
        return choiceComponent([
          { name: "Milk", onClick: () => setCurrImage(i => i + 1) },
          { name: "Sandwhich", onClick: () => setCurrImage(i => i + 2) },
          { name: "Other", onClick: () => setCurrImage(i => i + 2) }])

      case 36:
        return choiceComponent([
          { name: "Avery", onClick: () => setCurrImage(i => i + 2) },
          { name: "Blake", onClick: () => setCurrImage(i => i + 1) },])
      
      case 39:
        return choiceComponent([
          { name: "Sweater", onClick: () => setCurrImage(i => i + 1) },
          { name: "Stickers", onClick: () => setCurrImage(i => i + 2) },
          { name: "Other", onClick: () => setCurrImage(i => i + 2) }])
      case 45:
        return choiceComponent([
          { name: "Blake", onClick: () => setCurrImage(i => i + 1) },
          { name: "Connor", onClick: () => setCurrImage(i => i + 2) },])

      case 48:
        return choiceComponent([
          { name: "Hat", onClick: () => setCurrImage(i => i + 2) },
          { name: "Toy", onClick: () => setCurrImage(i => i + 1) },
          { name: "Other", onClick: () => setCurrImage(i => i + 2) }])

      case image_map.story_links.length:
        return choiceComponent([
          { name: "Finish", onClick: onFinishClick }])

      default:
        return <div className="flex justify-around px-2 my-6 space-x-2">
          <button
            onClick={onNextClick}
            className="w-1/2 px-8 py-4 font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400"
          >
            Next
          </button>
        </div>
    }

  }

  return (
    <div className="h-screen bg-blue-200 ">
      <div className="flex justify-center w-screen py-1">
        <img
          className="pr-4 "
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
      {showButtons(currImage + 1)}
    </div>
  );
}


const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const videoMimeType = isSafari ? "video/mp4" : "video/webm"

function streamRecorder(
  canvas: HTMLCanvasElement | HTMLVideoElement,
  recordingTime: number
) {
  // Optional frames per second argument.
  const stream = (canvas as CanvasElement).captureStream(25);
  let recordedChunks: Blob[] = [];
  const startTime = Date.now();
  const options = { mimeType: videoMimeType };
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

  const buggyBlob = new Blob(recordedChunks, { type: videoMimeType });
  const duration = Date.now() - startTime;
  ysFixWebmDuration(buggyBlob, duration, function (blobFile: Blob) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const participantId = urlParams.get("participant_id");
    const fileName = participantId + "_" + new Date().getTime() + `${videoMimeType === "video/webm" ? ".webm" : ".mp4"}`;
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
