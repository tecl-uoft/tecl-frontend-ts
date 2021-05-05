import { notify } from "../Notification";

interface CanvasElement extends HTMLCanvasElement {
  captureStream(frameRate?: number): MediaStream;
}

export interface IRecorder {
  mediaRecorder: MediaRecorder;
  recordedChunks: Blob[];
}

function streamRecorder(
  canvas: HTMLCanvasElement | HTMLVideoElement,
  recordingTime: number
) {
  // Optional frames per second argument.
  const stream = (canvas as CanvasElement).captureStream(40);
  let recordedChunks: Blob[] = [];

  const options = { mimeType: "video/webm" };
  const mediaRecorder = new MediaRecorder(stream, options);

  function handleDataAvailable(event: BlobEvent) {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
      // download();
    } else {
      alert("Error, no data captured");
    }
  }

  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = () => upload(recordedChunks);
  mediaRecorder.start(10);

  // demo: to download after recordingTime sec
  if (recordingTime > 0) {
    setTimeout(() => {
      mediaRecorder.stop();
      upload(recordedChunks);
    }, recordingTime);
  }

  return Promise.resolve({ mediaRecorder, recordedChunks });
}

export function upload(recordedChunks: Blob[]) {
  const blobFile = new Blob(recordedChunks, { type: "video/webm" });
  /*  getBlobDuration(blobFile).then(function (duration) {
    console.log(duration + " seconds");
  }); */
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
  const uploadPromise = fetch("/api/v1/frogger-study/upload-game-video", {
    method: "POST",
    body: fd,
  });

  notify
    .promise(uploadPromise, {
      loading: "Please wait before exiting...",
      success: "You may exit now.",
      error: "Failed to configure data. Please email coordinator.",
    })
    
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
