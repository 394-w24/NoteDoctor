import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIn } from "../utils/firebase";

const RoomCode = ({ appt, close, submitMutation }) => {
  const [code, setCode] = useState("");
  const patData = appt.patient;
  const navigate = useNavigate();
  const handleCodeChange = (e) => {
    console.log(e.target.value);
    setCode(e.target.value);
  };
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));
  const handleCheckin = async () => {
    await checkIn(code, appt.ref);
    await submitMutation.mutate();

    // close();
  };
  const { isError, isSuccess, isLoading } = submitMutation;
  const beforeCheckin = !isError && !isSuccess && !isLoading;
  return (
    <div>
      <h1 className="font-cursive text-5xl">
        {patData.firstName} {patData.lastName} ({patData.pronouns})
      </h1>

      <div className="flex justify-between">
        {beforeCheckin && (
          <div className="flex flex-col">
            <p>Room Assignment Code</p>
            <input type="text" value={code} onChange={handleCodeChange} />
            <button onClick={handleCheckin}>Assign Room</button>
          </div>
        )}
        {submitMutation.isLoading && (
          <div>
            <p>Assigning room...</p>
          </div>
        )}
        {submitMutation.isError && (
          <div>Error: {submitMutation.error.message}</div>
        )}
        {submitMutation.isSuccess && (
          <div className="mt-4 flex flex-col  gap-3">
            <p className="text-lg font-medium text-black/75">Room Assigned</p>

            <div className="flex gap-2">
              <button
                className="rounded-lg border bg-contessa-500 p-2 font-semibold text-white"
                onClick={close}
              >
                Close
              </button>
              <button
                className="rounded-lg border bg-contessa-500 p-2 font-semibold text-white"
                onClick={() => navigate("/checkin")}
              >
                Return to Appointments
              </button>
            </div>
          </div>
        )}

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
