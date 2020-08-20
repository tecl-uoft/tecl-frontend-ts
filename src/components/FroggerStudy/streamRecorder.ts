interface CanvasElement extends HTMLCanvasElement {
  captureStream(frameRate?: number): MediaStream;
}

function streamRecorder(canvas: HTMLCanvasElement, recordingTime: number) {
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
      type: "video/webm",
    });
    console.log("blobfile", blobFile);
    fetch("/api/v1/frogger-study/upload-game-video", {
      method: "POST",
      body: new File([blobFile], "test1.webm"),
    })
      .then((res) => {
        console.log(res.body);
      })
      .catch((err) => console.log(err));
  }

  // demo: to download after 9sec
  setTimeout((event) => {
    mediaRecorder.stop();
  }, recordingTime);
}

export default streamRecorder;
