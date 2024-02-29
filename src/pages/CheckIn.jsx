import { differenceInYears } from "date-fns";
import { Modal } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import RoomCode from "../components/RoomCode";
import { getAppt, updateAppt } from "../utils/firebase";

const CheckIn = () => {
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    height: "",
    weight: "",
    respRate: "",
    pulse: "",
    bp: "",
  });
  const [isAllValid, setIsAllValid] = useState({
    height: false,
    weight: false,
    respRate: false,
    pulse: false,
    bp: false,
  });
  const { data: apptData } = useQuery({
    queryKey: ["appointment", id],
    queryFn: () => getAppt(id),
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
  const allValid = Object.values(isAllValid).every((val) => val);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allValid) {
      updateAppt({ ...inputs, uuid: id });
    }
  };

  if (!apptData) return "Loading...";
  apptData.patient.age = differenceInYears(
    new Date(),
    apptData.patient.dob.toDate(),
  );

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
            src={apptData.patient.image}
            alt={apptData.patient.firstName + " " + apptData.patient.lastName}
            className="aspect-square h-32 w-min rounded-full"
          />
        </div>
        <form
          className="flex w-full flex-col justify-center space-y-2"
          onSubmit={handleSubmit}
        >
          <FormInput
            label="Height"
            name="height"
            value={inputs.height}
            regex={/^[0-9]+'(?:1[0-1]|[0-9])"$/}
            errmsg={"Please use the right height format. eg. 5'10\""}
            isAllValid={isAllValid}
            setIsAllValid={setIsAllValid}
            changeHandler={(val) =>
              setInputs((prev) => ({ ...prev, height: val }))
            }
          />
          <FormInput
            label="Weight"
            name="weight"
            value={inputs.weight}
            regex={/^[1-9]\d*(\.\d+)?$/}
            errmsg={"Please make sure input the right weight. eg. a positive number"}
            isAllValid={isAllValid}
            setIsAllValid={setIsAllValid}
            changeHandler={(val) =>
              setInputs((prev) => ({ ...prev, weight: val }))
            }
          />
          <FormInput
            label="Respiration Rate"
            name="respRate"
            value={inputs.respRate}
            regex={/^[1-9][0-9]*$/}
            errmsg={"Please make sure input the right respiration rate. eg. a positive integer"}
            isAllValid={isAllValid}
            setIsAllValid={setIsAllValid}
            changeHandler={(val) =>
              setInputs((prev) => ({ ...prev, respRate: val }))
            }
          />
          <FormInput
            label="Pulse"
            name="pulse"
            value={inputs.pulse}
            regex={/^[1-9][0-9]*$/}
            errmsg={"Please make sure input the right pulse. eg. a positive integer"}
            isAllValid={isAllValid}
            setIsAllValid={setIsAllValid}
            changeHandler={(val) =>
              setInputs((prev) => ({ ...prev, pulse: val }))
            }
          />
          <FormInput
            label="Blood Pressure"
            name="bp"
            value={inputs.bp}
            regex={/^\d{2,3}\/\d{2,3}$/}
            errmsg={"Please use the right blood pressure format. eg. 120/60"}
            isAllValid={isAllValid}
            setIsAllValid={setIsAllValid}
            changeHandler={(val) => setInputs((prev) => ({ ...prev, bp: val }))}
          />
          <button
            className="mx-auto w-7/12 border border-red-500"
            style={{
              color: !allValid ? 'gray' : 'white',
              backgroundColor: !allValid ? 'lightgray' : '#C0726A',
              cursor: !allValid ? 'not-allowed' : 'pointer',
            }}
            disabled={!allValid}
          >
            Submit
          </button>
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
            {/* <h2>Additional Issues to Address</h2> */}
            <div className="flex h-full flex-col justify-between">
              {/* <ul className="list-disc pl-5">
                <li> Painful Periods </li>
                <li>Click to add more... </li>
              </ul> */}
              <button
                className="bg-contessa-500 border p-4 font-semibold text-white"
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
            <RoomCode appt={apptData} close={() => setOpenModal(false)} />
          </Modal.Body>
        </Modal>
      </div>
    </main>
  );
};

function FormInput({
  label,
  name,
  value,
  regex,
  errmsg,
  isAllValid,
  setIsAllValid,
  changeHandler,
}) {
  // const [isValid, setIsValid] = useState(true);
  const validate = (e) => {
    var val = e.target.value;
    if (val !== "") {
      if (regex.test(val)) {
        setIsAllValid({ ...isAllValid, [name]: true });
      } else {
        setIsAllValid({ ...isAllValid, [name]: false });
      }
    }
    changeHandler(val);
  };
  return (
    <div>
      <div className="flex justify-around">
        <label className="w-1/2 font-semibold" htmlFor="height">
          {label}
        </label>
        <input
          type="text"
          className="border border-black px-3 py-1"
          id={name}
          name={name}
          placeholder={errmsg}
          // readOnly
          value={value}
          onChange={validate}
        />
      </div>
      <div className="flex justify-center text-red-500 text-center">
        {!isAllValid[name] && errmsg}
      </div>
    </div>
  );
}

export default CheckIn;
