import React, { useState } from 'react'
import ysFixWebmDuration from "fix-webm-duration";
import { notify } from '../../components/Notification';

function PresStudy() {
	const [selectedFile, setSelectedFile] = useState<any>();

	const changeHandler = (event: any) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmission = async () => {
		const formData = new FormData();
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const participantId = urlParams.get("participant_id");
		const fileName = participantId + "_" + new Date().getTime() + `${".mp4"}`;

		formData.append('video-file', selectedFile, selectedFile);

		const uploadPromise = fetch("/api/v1/pres-study/upload-participant-video", {
			method: "POST",
			body: formData,
		});

		notify.promise(uploadPromise, {
			loading: "Please wait before continuing...",
			success: "You may proceed now.",
			error: "Failed to configure data. Please email coordinator.",
		});

	};


	return (
		<div className="flex flex-col h-screen bg-blue-200">
			<h1 className="w-full mt-24 text-2xl text-center"> Thank you for participanting in our study!</h1>
			<h2 className="w-full mt-4 text-xl text-center"> Please submit your video down below.</h2>
			<div className="mx-auto mt-12" >
				<label htmlFor="myfile">Select a file: <br /> <br /></label>
				<input onChange={changeHandler} className="py-2 mx-4 cursor-pointer" type="file" />
				<button onClick={handleSubmission} className="px-4 py-1 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-100"  >Submit</button>
			</div>
		</div>

	)
}

// export function upload(recordedChunks: Blob[], startTime: number) {

//   const buggyBlob = new Blob(recordedChunks, { type: videoMimeType });
//   const duration = Date.now() - startTime;
//   ysFixWebmDuration(buggyBlob, duration, function (blobFile: Blob) {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const participantId = urlParams.get("participant_id");
//     const fileName = participantId + "_" + new Date().getTime() + `${videoMimeType === "video/webm" ? ".webm" : ".mp4"}`;
//     const fd = new FormData();
//     fd.append("video-file", blobFile, fileName);
//     getBlobDuration(blobFile).then((r) => console.log(r));
//     //  upload the video to the server
//     const uploadPromise = fetch("/api/v1/pres-study/upload-participant-video", {
//       method: "POST",
//       body: fd,
//     });
//     notify.promise(uploadPromise, {
//       loading: "Please wait before continuing...",
//       success: "You may proceed now.",
//       error: "Failed to configure data. Please email coordinator.",
//     });
//   });
// }

export default PresStudy