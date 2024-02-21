import { format } from "date-fns";
import { Modal } from "flowbite-react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import RoomCode from "../components/RoomCode";
import { getAppt } from "../utils/firebase";

const CheckIn = () => {
  const [openModal, setOpenModal] = useState(false);
  const [inputs, setInputs] = useState({
    height: "",
    weight: "",
    respRate: "",
    pulse: "",
    bp: "",
  });
  const { isLoading, data: apptData } = useQuery({
    queryKey: ["appointment", "KMa3tIVTBbLKpv9etNau"],
    queryFn: async () => getAppt("KMa3tIVTBbLKpv9etNau"),
    onSuccess: (data) => {
      setInputs({
        height: data.height,
        weight: data.weight,
        respRate: data.respRate,
        pulse: data.pulse,
        bp: data.bp,
      });
    },
  });

  if (isLoading) return "Loading...";
  const apptTime = format(apptData.date.toDate(), "MM/dd/yy h:mma");
  const doctor = apptData.caregivers.find((staff) => staff.role === "doctor");
  const doctorName = doctor
    ? `Dr. ${doctor.firstName} ${doctor.lastName} ${doctor.suffix}`
    : "Error: No Doctor Assigned";

  return (
    <main className="h-svh bg-gradient-to-tr from-red-600/70 to-sky-600/70">
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
        <form className="grid w-full grid-cols-[max-content_minmax(0px,_1fr)] gap-x-4 gap-y-2">
          <FormInput
            label="Height"
            name="height"
            value={inputs.height}
            changeHandler={(val) =>
              setInputs((prev) => ({ ...prev, height: val }))
            }
          />
          <FormInput
            label="Weight"
            name="weight"
            value={inputs.weight}
            changeHandler={(val) =>
              setInputs((prev) => ({ ...prev, weight: val }))
            }
          />
          <FormInput
            label="Respiration Rate"
            name="respRate"
            value={inputs.respRate}
            changeHandler={(val) =>
              setInputs((prev) => ({ ...prev, respRate: val }))
            }
          />
          <FormInput
            label="Pulse"
            name="pulse"
            value={inputs.pulse}
            changeHandler={(val) =>
              setInputs((prev) => ({ ...prev, pulse: val }))
            }
          />
          <FormInput
            label="Blood Pressure"
            name="bp"
            value={inputs.bp}
            changeHandler={(val) => setInputs((prev) => ({ ...prev, bp: val }))}
          />
        </form>
        <div className="flex justify-between gap-6">
          <div>
            <h2 className="font-medium">Appointment Details</h2>
            <ul className="list-disc pl-5">
              <li>{doctorName}</li>
              <li>{apptTime}</li>
              <li>{apptData.duration} minutes</li>
              <li>{apptData.type}</li>
              <ul className="list-disc pl-5">
                {apptData.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </ul>
          </div>
          <div className="flex grow flex-col justify-start">
            <h2 className="font-medium">Additional Issues to Address</h2>
            <div className="flex h-full flex-col justify-between">
              <ul className="list-disc pl-5">
                <li> Painful Periods </li>
                <li>Click to add more... </li>
              </ul>
              <button
                className="bg-contessa-500 rounded-lg border p-4 font-semibold text-white shadow-lg shadow-md"
                onClick={() => setOpenModal(true)}
              >
                Assign Room
              </button>
            </div>
          </div>
        </div>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Scan QR code</Modal.Header>
          <Modal.Body>
            <RoomCode patData={apptData.patient} />
          </Modal.Body>
        </Modal>
      </div>
    </main>
  );
};

function FormInput({ label, name, value, changeHandler }) {
  return (
    <>
      <label className="col-span-1 pt-2 font-semibold" htmlFor="height">
        {label}
      </label>
      <input
        className="col-span-1 rounded-md border-2 border-black/20 px-3 py-1"
        id={name}
        name={name}
        value={value}
        onChange={(e) => changeHandler(e.target.value)}
      />
    </>
  );
}

export default CheckIn;
