import React from "react";
import { useQuery } from "react-query";
import { getAppt, getCareGiver, getPatient } from "../utils/firebase";

const CheckIn = () => {
  const { isLoading, data: apptData } = useQuery({
    queryKey: ["apptData"],
    // getPatient("2ScZbzYKjN7leSH2V6ro")
    queryFn: () => getAppt("KMa3tIVTBbLKpv9etNau"),
  });

  if (isLoading) return "Loading...";

  return (
    <main className="mx-auto my-4 max-w-md">
      <h1 className="font-cursive text-5xl">
        {apptData.patient.firstName} {apptData.patient.lastName} (
        {apptData.patient.pronouns})
      </h1>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <p>{apptData.patient.dob.toDate().toLocaleDateString()}</p>
          <p>{apptData.patient.age}</p>
        </div>

        <img
          src="/nurse.webp"
          alt="Maria Alvarez, RN"
          className="aspect-square h-32 w-min rounded-full"
        />
      </div>

      <form className="w-full space-y-2">
        <FormInput label="Height" name="height" value={apptData.height}/>
        <FormInput label="Weight" name="weight" value={apptData.weight}/>
        <FormInput label="Respiration Rate" name="respRate" value={apptData.respRate}/>
        <FormInput label="Pulse" name="pulse" value={apptData.pulse}/>
        <FormInput label="Blood Pressure" name="bp" value={apptData.bp}/>
      </form>

      <div className="flex">
        <div>
          <h2>Appointment Details</h2>
          <ul className="list-disc px-4">
            <li>Doctor Name</li>
            <li>Time</li>
            <li>Annual Exam</li>
            <ul className="list-disc px-4">
              <li>Breast Exam</li>
              <li>Pelvic Exam</li>
              <li>Pap Smear & STD Testing</li>
            </ul>
          </ul>
        </div>
        <div>
          <h2>Additional Issues to Address</h2>
          <ul className="list-disc px-4">
            <li> Painful Periods </li>
            <li>Click to add more... </li>
          </ul>

          <button className="border bg-red-400 p-4"> Assign Room </button>
        </div>
      </div>
    </main>
  );
};

function FormInput({ label, name, value }) {
  return (
    <div className="flex">
      <label className="w-1/2" htmlFor="height">
        {label}
      </label>
      <input type="text" className="border border-black bg-blue-300/50 text-red-700" id={name} name={name} readOnly value={value} />
    </div>
  );
}

export default CheckIn;
