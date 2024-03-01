import React from "react";
import { useParams } from "react-router-dom";
import PatientPrivate from "../components/PatientPrivate";
import PatientWelcome from "../components/PatientWelcome";
import { useRealtimeRoom } from "../utils/firebase";

const RoomScreen = () => {
  const { roomId } = useParams();
  const room = useRealtimeRoom(roomId);
  console.log(room);

  if (!room) return <h1>Loading...</h1>;
  if (!room.confirmed && room.appointment) return <PatientPrivate room={room} />;
  if (room.appointment) return <PatientWelcome room={room} />;
  return (
    <div className="my-4 flex flex-col items-center gap-10">
      <h1 className="text-7xl font-bold">Room {room.name}</h1>
      {/* Insert QR Code Here */}
      <p>Code: {room.id}</p>
      <p>Use code to sync this room with an appointment</p>
    </div>
  );
};

export default RoomScreen;
