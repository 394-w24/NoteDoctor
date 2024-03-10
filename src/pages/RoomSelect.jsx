import { Link } from "react-router-dom";
import { useRealTimeCollection } from "../utils/firebase";

const RoomSelect = () => {
  const data = useRealTimeCollection(["rooms"]);
  console.log(data);

  if (!data) {
    return <p>Loading...</p>;
  }

  if (data instanceof Error) {
    return <p>{data.message}</p>;
  }

  if (!data.length) {
    return <p>No rooms available</p>;
  }

  if (data.every((room) => room.appointment)) {
    return <p>No free rooms available</p>;
  }

  if (data.every((room) => !room.appointment)) {
    return <p>No occupied rooms available</p>;
  }

  return (
    <div className="mx-8 my-4">
      <h1 className="mb-8 text-3xl font-bold">What room is this?</h1>
      <div className="flex flex-col gap-4">
        {data.map((room) => (
          <RoomCard key={room.name} room={room} />
        ))}
      </div>
    </div>
  );
};

function RoomCard({ room }) {
  const free = !room.appointment;
  if (free) {
    return (
      <Link to={`/rooms/${room.name}`}>
        <div className="rounded-lg border-2 border-green-700 bg-green-100 p-4 shadow-lg">
          <h2 className="text-xl font-bold">{room.name}</h2>
          <p>Free</p>
        </div>
      </Link>
    );
  }
  return (
    <Link to={`/rooms/${room.name}`}>
      <div className="rounded-lg border-2 border-red-700 bg-red-100 p-4 shadow-lg">
        <h2 className="text-xl font-bold">{room.name}</h2>
        <p>Occupied</p>
      </div>
    </Link>
  );
}



export default RoomSelect;
