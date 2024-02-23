import { useState } from "react";
// import { useMutation } from "react-query";
import { checkIn } from "../utils/firebase";

const RoomCode = ({ appt, close }) => {
  const [code, setCode] = useState("");
  const patData = appt.patient;
  const handleCodeChange = (e) => {
    console.log(e.target.value);
    setCode(e.target.value);
  };
  const handleCheckin = () => {
    checkIn(code, appt.ref);
    close();
  };
  return (
    <div>
      <h1 className="font-cursive text-5xl">
        {patData.firstName} {patData.lastName} ({patData.pronouns})
      </h1>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <p>Room Assignment Code</p>
          <input type="text" value={code} onChange={handleCodeChange} />
          <button onClick={handleCheckin}>Assign Room</button>
        </div>

        <img
          src={appt.patient.image}
          alt={appt.patient.firstName + " " + appt.patient.lastName}
          className="aspect-square h-32 w-min rounded-full"
        />
      </div>
    </div>
  );
};

export default RoomCode;
// Function to capture an image from the webcam
// const capture = React.useCallback(() => {
//   const imageSrc = webcamRef.current.getScreenshot();
//   console.log(imageSrc); // Display or process the captured image
// }, [webcamRef]);
//   const webcamRef = React.useRef(null);
// const [isCameraOn, setCameraOn] = useState(false);
// import Webcam from "react-webcam";
// import { FaCamera } from "react-icons/fa"; // Importing camera icon
// import React, { useRef, useState } from "react";
// const [key, setKey] = useState(Date.now()); // Key to re-render Webcam
