import { Modal } from "flowbite-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import RoomCode from "../components/RoomCode";
import { getAppt } from "../utils/firebase";

const CheckIn = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: apptData } = useQuery({
    queryKey: ["appointment", "KMa3tIVTBbLKpv9etNau"],
    queryFn: () => getAppt("KMa3tIVTBbLKpv9etNau"),
  });

  if (!apptData) return "Loading...";

  return (
    // /bg-gradient-to-tr from-red-400 to-sky-600
    <main className=" min-h-svh ">
      <div className="mx-auto max-w-lg space-y-6 pt-8">
        <h1 className="font-cursive text-5xl">
          {apptData.patient.firstName} {apptData.patient.lastName} (
          {apptData.patient.pronouns})
        </h1>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p>
              <span className="font-semibold">Date of Birth: </span>
              {apptData.patient.dob.toDate().toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Age: </span>
              {apptData.patient.age}
            </p>
          </div>
          <img
            src="/nurse.webp"
            alt="Maria Alvarez, RN"
            className="aspect-square h-32 w-min rounded-full"
          />
        </div>
        <form className="w-full space-y-2">
          <FormInput label="Height" name="height" value={apptData.height} />
          <FormInput label="Weight" name="weight" value={apptData.weight} />
          <FormInput
            label="Respiration Rate"
            name="respRate"
            value={apptData.respRate}
          />
          <FormInput label="Pulse" name="pulse" value={apptData.pulse} />
          <FormInput label="Blood Pressure" name="bp" value={apptData.bp} />
        </form>
        <div className="flex justify-between gap-6">
          <div>
            <h2>Appointment Details</h2>
            <ul className="list-disc pl-5">
              <li>Doctor Name</li>
              <li>Time</li>
              <li>Annual Exam</li>
              <ul className="list-disc pl-5">
                <li>Breast Exam</li>
                <li>Pelvic Exam</li>
                <li>Pap Smear & STD Testing</li>
              </ul>
            </ul>
          </div>
          <div className="flex grow flex-col justify-start">
            <h2>Additional Issues to Address</h2>
            <div className="flex h-full flex-col justify-between">
              <ul className="list-disc pl-5">
                <li> Painful Periods </li>
                <li>Click to add more... </li>
              </ul>
              <button
                className="border bg-contessa-500 p-4 font-semibold text-white"
                onClick={() => setOpenModal(true)}
              >
                Assign Room
              </button>
            </div>
          </div>
        </div>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header className="bg-contessa-300">Check in</Modal.Header>
          <Modal.Body className="bg-contessa-200">
            <RoomCode appt={apptData} />
          </Modal.Body>
        </Modal>
      </div>
    </main>
  );
};

function FormInput({ label, name, value }) {
  return (
    <div className="flex justify-around">
      <label className="w-1/2 font-semibold" htmlFor="height">
        {label}
      </label>
      <input
        type="text"
        className="border border-black px-3 py-1"
        id={name}
        name={name}
        readOnly
        value={value}
      />
    </div>
  );
}

export default CheckIn;
