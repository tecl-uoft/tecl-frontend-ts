import { notify } from "../Notification";
import ysFixWebmDuration from "fix-webm-duration";

interface CanvasElement extends HTMLCanvasElement {
  captureStream(frameRate?: number): MediaStream;
}

export interface IRecorder {
  mediaRecorder: MediaRecorder;
  recordedChunks: Blob[];
  startTime: number;
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
    const studyType = urlParams.get("study_type");
    const participantId = urlParams.get("participant_id");
    const trialType = studyType === "2" ? "male" : "female";
    const fileName =
      participantId + "_" + trialType + "_" + new Date().getTime() + ".webm";
    const fd = new FormData();
    fd.append("video-file", blobFile, fileName);
    getBlobDuration(blobFile).then((r) => console.log(r));

    // upload the video to the server
    const uploadPromise = fetch("/api/v1/frogger-study/upload-game-video", {
      method: "POST",
      body: fd,
    });

    // download the video on user's computer
    //     const linkTag = document.createElement("a");
    //     const linkBlobUrl = URL.createObjectURL(blobFile);
    //     linkTag.href = linkBlobUrl;
    //     linkTag.download = fileName;
    //     const LinkTagid = Date.now();
    //     linkTag.id = String(LinkTagid);
    //     alert(linkTag.id);
    //     document.body.appendChild(linkTag); // Or append it whereever you want
    //     document.getElementById(linkTag.id)?.click(); //can add an id to be specific if multiple
    //
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

export default streamRecorder;
