import { differenceInYears, format } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { checkOut } from "../utils/firebase";
import { DateHeader } from "./DateHeader";

const PatientWelcome = ({ room }) => {
  const [open, setOpen] = useState(false);
  const [additionalIssue, setAdditionalIssue] = useState("");
  const [additionalIssues, setAdditionalIssues] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (additionalIssue.trim() !== "") {
      setAdditionalIssues([...additionalIssues, additionalIssue]);
      setAdditionalIssue("");
      setOpen(false);
    }
  };

  const handleChange = (e) => {
    setAdditionalIssue(e.target.value);
  };
  const appointment = room.appointment;
  const patient = appointment.patient;
  const dob = patient.dob.toDate();
  const doctor = appointment.caregivers.find(
    (caregiver) => caregiver.role === "doctor",
  );
  const dobString = format(dob, "MMMM dd, yyyy");
  const age = differenceInYears(new Date(), dob);

  return (
    <div
      className="container m-10 mt-10"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h1 className="font-cursive text-7xl">Hello, Carly Lowell</h1>
      <DateHeader />
      <div className="flex justify-between whitespace-nowrap">
        <div className="mt-10 flex flex-col">
          <div>
            <p>
              <span className="font-semibold">Date of Birth: </span>
              {dobString}
            </p>
            <p>
              <span className="font-semibold">Age: </span>
              {age}
            </p>
          </div>
          <div className="mt-20">
            <p>
              <span className="font-semibold">Gender Identity: </span>Female,
              {patient.pronouns}
            </p>
          </div>
          <div className="mt-20">
            <div className="font-semibold">Appointment Details</div>
            <ul className="ml-6 list-disc">
              <li>{`Dr. ${doctor.lastName}`}</li>
              <li>{appointment.duration} Minutes</li>
              <li>
                {appointment.type}
                <ul className="ml-4 list-disc">
                  {appointment.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4" style={{ marginLeft: "800px" }}>
          <p className="font-bold" style={{ fontSize: "18px" }}>
            Your care team today:
          </p>
          <div className="flex gap-2 whitespace-normal">
            <Link to="/staffBio" className="flex flex-col items-center gap-2">
              <img
                src="/doctor.webp"
                alt="Dr. Valina, MD"
                className="aspect-square h-32 w-32 rounded-full"
              />
              <p>Dr. Valina, MD</p>
            </Link>
            <Link to="/staffBio" className="flex flex-col items-center gap-2">
              <img
                src="/nurse.webp"
                alt="Maria Alvarez, RN"
                className="aspect-square h-32 w-min rounded-full"
              />
              <p>Maria Alvarez, RN</p>
            </Link>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          top: "-165px",
          marginLeft: "auto",
          marginRight: "500px",
        }}
      >
        <div className="font-semibold">Additional Issues to Address</div>
        <ul className="ml-6 list-disc">
          {additionalIssues.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
        <button onClick={() => setOpen(!open)} className="mt-2">
          Click to add more
        </button>
      </div>
      <button
        className="border border-black/50 bg-contessa-500 px-4 py-2 shadow-lg"
        onClick={() => checkOut(room.name)}
      >
        End Appointment
      </button>

      {open && (
        <dialog
          open={open}
          className="dialog"
          style={{
            width: "300px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <label
              htmlFor="additionalIssue"
              style={{ alignSelf: "flex-start", margin: "10px 0" }}
            >
              Please enter additional issues below:
            </label>
            <input
              id="additionalIssue"
              type="text"
              value={additionalIssue}
              onChange={handleChange}
              style={{
                flexGrow: 1,
                margin: "10px 0",
                backgroundColor: "#ADD8E6",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                style={{ alignSelf: "flex-start" }}
              >
                Close
              </button>
              <button type="submit" style={{ alignSelf: "flex-end" }}>
                Submit
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default PatientWelcome;