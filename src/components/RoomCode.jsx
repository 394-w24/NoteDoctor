import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa"; // Importing camera icon
import { useQuery } from "react-query";
import Webcam from "react-webcam";
import { getPatient } from "../utils/firebase";

const RoomCode = () => {
  const { isLoading, data: patData } = useQuery({
    queryKey: ["apptData"],
    queryFn: () => getPatient("2ScZbzYKjN7leSH2V6ro"),
  });

  const webcamRef = React.useRef(null);
  const [isCameraOn, setCameraOn] = useState(false);
  const [key, setKey] = useState(Date.now()); // Key to re-render Webcam

  const handleCamera = () => {
    // If the camera is on, stop the webcam stream
    if (isCameraOn) {
      const videoTracks = webcamRef.current?.stream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.stop();
      });
    } else {
      setKey(Date.now()); // Force re-render to start the camera again
    }
    setCameraOn(!isCameraOn); // Toggle the camera state
  };

  // Function to capture an image from the webcam
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc); // Display or process the captured image
  }, [webcamRef]);

  if (isLoading) return "Loading...";

  return (
    <div>
      <h1 className="font-cursive text-5xl">
        {patData.firstName} {patData.lastName} ({patData.pronouns})
      </h1>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <p>Room Assignment Code</p>
          <input type="text"></input>
        </div>

        <img
          src="/nurse.webp"
          alt="Maria Alvarez, RN"
          className="aspect-square h-32 w-min rounded-full"
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={handleCamera}
          className="rounded-full bg-red-400 p-4 text-4xl text-white"
        >
          <FaCamera /> {/* This is the camera icon */}
        </button>
      </div>

      <Webcam
        audio={false}
        key={key}
        ref={webcamRef}
        mirrored={true}
        screenshotFormat="image/jpeg"
      />

      {/* Button to capture an image */}
      <button onClick={capture}>Capture</button>

      <div className="fixed bottom-0 right-0 m-4">
        <button className="rounded bg-gray-500 p-2 text-white">
          Assign Room
        </button>
      </div>
    </div>
  );
};

export default RoomCode;
