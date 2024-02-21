import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAppt, getCareGiver, getPatient } from "../utils/firebase";
import RoomCode from "../components/RoomCode";
import { Modal } from 'flowbite-react';

const CheckIn = () => {
  const { isLoading, data: apptData } = useQuery({

    queryKey: ["apptData"],
    // getPatient("2ScZbzYKjN7leSH2V6ro")
    queryFn: () => getAppt("KMa3tIVTBbLKpv9etNau"),
  });

  if (isLoading) return "Loading...";

  return (
    <main className=" min-h-svh bg-gradient-to-tr from-red-400 to-sky-600">
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

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Scan QR code</Modal.Header>
          <Modal.Body>
            <RoomCode />
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
