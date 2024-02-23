import React from "react";
import { useParams } from "react-router-dom";
import PatientWelcome from "../components/PatientWelcome";
import { useRealtimeRoom } from "../utils/firebase";

const RoomScreen = () => {
  const { roomId } = useParams();
  const room = useRealtimeRoom(roomId);

  // TODO Add QR Code
  // TODO Additional Issues to the db and not local state

  if (!room) return <h1>Loading...</h1>;
  if (room.appointment) return <PatientWelcome room={room} />;
  return (
    <div className="my-4 flex flex-col items-center gap-10">
      <h1 className="text-7xl font-bold">Room {room.name}</h1>
      {/* Insert QR Code Here */}
      <p>Code: {room.id}</p>
      <p>Use code to sync this room with an appointments</p>
    </div>
  );
};

export default RoomScreen;