interface CanvasElement extends HTMLCanvasElement {
  captureStream(frameRate?: number): MediaStream;
}

function streamRecorder(
  canvas: HTMLCanvasElement | HTMLVideoElement,
  recordingTime: number
) {
  // Optional frames per second argument.
  const stream = (canvas as CanvasElement).captureStream(25);
  let recordedChunks: any = [];

  const options = { mimeType: "video/webm; codecs=vp9" };
  const mediaRecorder = new MediaRecorder(stream, options);

  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();

  function handleDataAvailable(event: any) {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
      // console.log(recordedChunks);
      download();
    } else {
      alert("Error, no data captured");
    }
  }

  function download() {
    const blobFile = new Blob(recordedChunks, {
      type: "video/mp4",
    });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const studyType = urlParams.get("study_type");
    const participantId = urlParams.get("participant_id");
    const trialType = studyType === "2" ? "male" : "female";
    const fileName =
      participantId + "_" + trialType + "_" + new Date().getTime() + ".mp4";
    const fd = new FormData();
    fd.append("video-file", blobFile, fileName);

    fetch("/api/v1/frogger-study/upload-game-video", {
      method: "POST",
      body: fd,
    })
      .then((res) => {
        /* console.log(res.body); */
      })
      .catch((err) => console.log(err));
  }

  // demo: to download after recordingTime sec
  if (recordingTime > 0) {
    setTimeout(() => {
      mediaRecorder.stop();
    }, recordingTime);
  }

  return mediaRecorder;
}

export default streamRecorder;
