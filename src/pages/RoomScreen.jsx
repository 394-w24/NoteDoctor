import React from "react";
import { useParams } from "react-router-dom";
import PatientWelcome from "../components/PatientWelcome";
import { useRealTimeDoc } from "../utils/firebase";

const RoomScreen = () => {
  const { roomId } = useParams();
  const room = useRealTimeDoc(["rooms", roomId]);

  if (room.appointment)
    return <PatientWelcome appointment={room.appointment} />;

  return (
    <div className="my-4 flex flex-col items-center gap-10">
      <h1 className="text-7xl font-bold">Room {room.name}</h1>
      {/* Insert QR Code Here */}
      <p>Code: {room.id}</p>
      <p>Use code or QR Code to sync this room with an appointments</p>
    </div>
  );
};

export default RoomScreen;
