import React, { useState, useRef } from 'react';
import { useQuery } from "react-query";
import { getPatient } from "../utils/firebase";
import { FaCamera } from 'react-icons/fa'; // Importing camera icon
import Webcam from 'react-webcam';

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
        }
        else {
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
        <main class='bg-orange-100 min-h-screen'>
            <h1 className="font-cursive text-5xl">
                {patData.firstName} {patData.lastName} ({patData.pronouns})
            </h1>

            <div className="flex justify-between">
                <div className="flex flex-col">
                <p>Room Assignment Code</p> 
                <input type='text'></input>
                </div>

                <img
                    src="/nurse.webp"
                    alt="Maria Alvarez, RN"
                    className="aspect-square h-32 w-min rounded-full"
                />
            </div>

            <div className="flex justify-center items-center">
                <button onClick={handleCamera} className="text-4xl p-4 bg-red-400 text-white rounded-full">
                    <FaCamera /> {/* This is the camera icon */}
                </button>
            </div>

            <Webcam 
                audio={false}
                key={key}
                ref={webcamRef}
                mirrored={true} 
                screenshotFormat="image/jpeg" />

            {/* Button to capture an image */}
            <button onClick={capture}>Capture</button>
            

            
            <div className="fixed bottom-0 right-0 m-4">
                <button className="bg-gray-500 text-white p-2 rounded">
                    Assign Room
                </button>
            </div>
            
        </main>
    );
};

export default RoomCode;