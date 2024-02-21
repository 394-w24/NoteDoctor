import React, { useState, useRef } from 'react';
import { useQuery } from "react-query";
import { getPatient } from "../utils/firebase";
import { FaCamera } from 'react-icons/fa'; // Importing camera icon

const RoomCode = () => {
    const { isLoading, data: patData } = useQuery({
        queryKey: ["apptData"],
        queryFn: () => getPatient("2ScZbzYKjN7leSH2V6ro"),
    });

    const [isCameraOn, setCameraOn] = useState(false);
    const videoRef = useRef(null);

    const handleCamera = () => {
        if (!isCameraOn) {
            // Turn on the camera
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    // Here you can attach the stream to a video element or handle it as needed
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    setCameraOn(true);
                    // console.log(stream);
                })
                .catch((error) => {
                    console.error("Error accessing the camera", error);
                });
        } else {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.src_object;
                const tracks = stream.getTracks();
                tracks.forEach(track => {
                    track.stop();
                });
                setCameraOn(false); // Switch the button to "Turn on Camera" mode
            }
        }
        setCameraOn(!isCameraOn);
    };

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

            
            <div className="fixed bottom-0 right-0 m-4">
                <button className="bg-gray-500 text-white p-2 rounded">
                    Assign Room
                </button>
            </div>
            
        </main>
    );
};

export default RoomCode;