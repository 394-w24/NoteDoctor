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
    <main>
      <h1 className="font-cursive text-5xl">
        {apptData.patient.firstName} {apptData.patient.lastName} ({apptData.patient.pronouns})
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

      <form>
        <div className="flex">
          <label htmlFor="height">Height</label>
          <input type="text" id="height" name="name" readOnly value={apptData.height}/>
        </div>

        <div className="flex">
          <label htmlFor="weight">Weight</label>
          <input type="text" id="weight" name="name" readOnly value={apptData.weight}/>
        </div>

        <div className="flex">
          <label htmlFor="respRate">Respiration Rate</label>
          <input type="text" id="respRate" name="name" readOnly value={apptData.respRate}/>
        </div>

        <div className="flex">
          <label htmlFor="pulse">Pulse</label>
          <input type="text" id="pulse" name="name" readOnly value={apptData.pulse}/>
        </div>

        <div className="flex">
          <label htmlFor="bp">Blood Pressure</label>
          <input type="text" id="bp" name="name" readOnly value={apptData.bp}/>
        </div>


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
        <h2 >
          Additional Issues to Address
        </h2>
        <ul className="list-disc px-4">
          <li> Painful Periods </li>
          <li>Click to add more... </li>
        </ul>

        <button className="p-4 border bg-red-400"> Assign Room </button>
      
        </div>

      </div>


    </main>
  );
};

export default CheckIn;
