import {
  differenceInMinutes,
  differenceInYears,
  format,
  formatDistanceToNow,
  subMinutes,
} from "date-fns";
import { Button, Modal } from "flowbite-react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addIssues,
  checkOut,
  getWaitTime,
  removeIssue,
  useRealtimeWaitTime,
} from "../utils/firebase";
import { DateHeader } from "./DateHeader";

const PatientWelcome = ({ room }) => {
  const [open, setOpen] = useState(false);
  const [waitTime, setWaitTime] = useState(0);
  const [issuesControl, setIssuesControl] = useState("");
  const [additionalIssues, setAdditionalIssues] = useState(
    room.appointment.issues,
  );
  const formatDistanceToNowInRoundedMinutes = (date) => {
    const minutesDifference = differenceInMinutes(date, new Date());
    const roundedMinutes = Math.round(minutesDifference / 5) * 5; // Round to the nearest fifth
    if (roundedMinutes <= 0) {
      return "The doctor will see you shortly";
    }
    return `About ${roundedMinutes} minutes`;
  };
  useEffect(() => {
    async function fetchData() {
      const waitTime = await getWaitTime(room.appointment.date);
      setWaitTime(waitTime);
    }
    fetchData();

    const getId = setInterval(() => {
      setWaitTime((prev) => {
        return subMinutes(prev, 1);
      });
    }, 1000);

    return () => {
      clearInterval(getId);
    };
  }, [room.appointment.date]);
  // const waitTime = useRealtimeWaitTime(room.appointment.date);
  const waitTimeString =
    waitTime > 0
      ? formatDistanceToNowInRoundedMinutes(waitTime)
      : "The doctor will see you shortly";
  const handleSubmit = (e) => {
    e.preventDefault();
    const resultArray = issuesControl
      .trim()
      .split(/,|\n/)
      .filter((item) => item !== "");
    if (resultArray.length > 0) {
      addIssues(room.appointment, resultArray);
      setAdditionalIssues([...additionalIssues, ...resultArray]);
      setIssuesControl("");
      setOpen(false);
    }
  };

  const addButtonIssue = (issue) => {
    if (issuesControl === "") {
      setIssuesControl(issue);
    } else {
      setIssuesControl(issue + "\n" + issuesControl);
    }
  };

  const handleRemoveIssue = (issue, index) => {
    removeIssue(room.appointment, issue);
    setAdditionalIssues([
      ...additionalIssues.slice(0, index),
      ...additionalIssues.slice(index + 1),
    ]);
  };
  const handleChange = (e) => {
    setIssuesControl(e.target.value);
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
    <div className="flex min-h-svh justify-between gap-48 py-12 pl-24 pr-48">
      <DateHeader />
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-center gap-8">
          <h1 className="font-cursive text-7xl">
            Hello, {patient.firstName} {patient.lastName}
          </h1>
          <img
            src={patient.image}
            alt={patient.firstName + " " + patient.lastName}
            className="aspect-square h-32 w-min rounded-full"
          />
        </div>
        <h2 className="text-2xl">
          <span className="font-semibold">Expected Wait Time: </span>{" "}
          {waitTimeString}
        </h2>
        <div className="mt-10 flex flex-col">
          <p>
            <span className="font-semibold">Date of Birth: </span>
            {dobString}
          </p>
          <p>
            <span className="font-semibold">Age: </span>
            {age}
          </p>
          <p>
            <span className="font-semibold">Gender Identity: </span>
            {`${patient.gender}, ${patient.pronouns}`}
          </p>

          <p className="font-semibold">Appointment Details</p>
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
        <button
          className="border border-black/50 bg-contessa-500 px-4 py-2 font-semibold text-white shadow-lg"
          onClick={() => checkOut(room.name)}
        >
          End Appointment
        </button>
      </div>
      <div className="flex grow flex-col items-end">
        <div className="">
          <p className="text-center text-lg font-bold">Your care team today:</p>
          <div className="flex gap-2">
            {appointment.caregivers.map((caregiver, index) => (
              <Link
                key={index}
                to={`/staffBio/${caregiver.id}`}
                className="flex flex-col items-center gap-2 rounded-md border p-2 shadow hover:bg-gray-100/80"
              >
                <img
                  src={caregiver.image}
                  alt={`${caregiver.firstName} ${caregiver.lastName}`}
                  className="aspect-square h-32 w-32 rounded-full"
                />
                <p className="font-semibold text-blue-600 underline">
                  {caregiver.firstName} {caregiver.lastName}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 w-1/2 grow">
          <div className="font-semibold">Additional Issues to Address</div>
          <ul className="ml-6 list-disc space-y-1">
            {additionalIssues.map((issue, index) => (
              <div key={index} className="flex items-center gap-2">
                <li>{issue}</li>
                <button onClick={() => handleRemoveIssue(issue, index)}>
                  <X size={16} strokeWidth={3} />
                </button>
              </div>
            ))}
          </ul>
          <button
            className="mt-2 rounded-md border bg-sky-600/80 p-2 font-semibold text-white shadow-lg"
            onClick={() => setOpen(!open)}
          >
            Click to add more
          </button>
        </div>
      </div>

      <Modal show={open} onClose={() => setOpen(false)}>
        <Modal.Header>Add Additional Issue</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <p className="text-sm font-semibold text-gray-800">
              Tap to add any additional issue(s) you would like to address with
              the doctor.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonInput name="IUD" addButtonIssue={addButtonIssue} />
              <ButtonInput
                name="Contraception"
                addButtonIssue={addButtonIssue}
              />
              <ButtonInput name="Breasts" addButtonIssue={addButtonIssue} />
              <ButtonInput
                name="Experiencing birth control side effects"
                addButtonIssue={addButtonIssue}
              />
              <ButtonInput name="Period" addButtonIssue={addButtonIssue} />
              <ButtonInput
                name={"Hormonal birth control option"}
                addButtonIssue={addButtonIssue}
              />
              <ButtonInput
                name="Non-hormonal birth control options"
                addButtonIssue={addButtonIssue}
              />
            </div>
            <p className="text-sm font-semibold text-gray-800">
              Separate multiple issues with either a comma or a new line
            </p>
            <textarea rows={10} value={issuesControl} onChange={handleChange} />
            <button
              type="submit"
              className="mx-auto mt-2 w-1/2 border bg-sky-600/80 p-2 font-semibold text-white"
            >
              Add
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

function ButtonInput({ name, addButtonIssue }) {
  return (
    <Button
      hoverColor="bg-contessa-200"
      className="border bg-contessa-500 px-2 font-semibold text-white"
      onClick={() => {
        addButtonIssue(name);
      }}
    >
      {name}
    </Button>
  );
}

export default PatientWelcome;
