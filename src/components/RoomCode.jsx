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
          <button>Assign Room</button>
        </div>

        <img
          src="/nurse.webp"
          alt="Maria Alvarez, RN"
          className="aspect-square h-32 w-min rounded-full"
        />
      </div>
    </div>
  );
};


export default RoomCode;
