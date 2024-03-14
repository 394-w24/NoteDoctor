import React, { useState } from "react";
import { confirmRoom } from "../utils/firebase";

const PatientPrivate = ({ room }) => {
  const [inputControl, setinputControl] = useState();

  if (!room) return <h1>Loading...</h1>;
  if (!room.appointment) return <h1>Loading...</h1>;

  const appointment = room.appointment;
  const patient = appointment.patient;
  const dob = patient.dob.toDate();

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setinputControl(e.target.value);
  };

  const validateDOB = async () => {
    const inputDOB = new Date(inputControl);
    const valid =
      dob.getUTCFullYear() === inputDOB.getUTCFullYear() &&
      dob.getUTCMonth() === inputDOB.getUTCMonth() &&
      dob.getUTCDate() === inputDOB.getUTCDate();
    if (valid) {
      console.log("Valid DOB");
      await confirmRoom(room.id);
    }
  };

  return (
    <div data-testid="patient-private" className="mt-10 flex flex-col">
      <div className="flex items-center justify-center gap-8">
        <h1 className="font-cursive text-7xl">
          Hello, {patient.firstName} {patient.lastName}
        </h1>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center">
        <p>Please confirm your Date of Birth: </p>
        <input
          value={inputControl}
          onChange={handleInputChange}
          type="date"
          className="w-ful m-2 rounded-lg border p-4"
        />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center">
        <button
          className="rounded border border-black/50 bg-contessa-500 px-4 py-2 font-semibold text-white shadow-lg"
          onClick={() => validateDOB()}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PatientPrivate;
