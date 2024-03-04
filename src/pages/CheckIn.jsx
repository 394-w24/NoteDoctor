import { differenceInYears } from "date-fns";
import { Modal } from "flowbite-react";
import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
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
  const submitMutation = useMutation(handleSubmit);
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
  const inputValidaty = useMemo(() => {
    const heightRE = /^[0-9]+'(?:1[0-1]|[0-9])"$/;
    const weightRE = /^[1-9]\d*(\.\d+)?$/;
    const respRateRE = /^[1-9][0-9]*$/;
    const pulseRE = /^[1-9][0-9]*$/;
    const bpRE = /^\d{2,3}\/\d{2,3}$/;

    return {
      height: inputs.height ? heightRE.test(inputs.height) : undefined,
      weight: inputs.weight ? weightRE.test(inputs.weight) : undefined,
      respRate: inputs.respRate ? respRateRE.test(inputs.respRate) : undefined,
      pulse: inputs.pulse ? pulseRE.test(inputs.pulse) : undefined,
      bp: inputs.bp ? bpRE.test(inputs.bp) : undefined,
    };
  }, [inputs]);

  const allValid = Object.values(inputValidaty).every((val) => val === true);

  async function handleSubmit() {
    if (allValid) {
      const numPulse = parseInt(inputs.pulse);
      const numRespRate = parseInt(inputs.respRate);
      const numWeight = parseFloat(inputs.weight);
      const normalizedInputs = {
        ...inputs,
        pulse: numPulse,
        respRate: numRespRate,
        weight: numWeight,
        uuid: id,
      };
      await updateAppt(normalizedInputs);
    }
  }

  if (!apptData) return "Loading...";
  apptData.patient.age = differenceInYears(
    new Date(),
    apptData.patient.dob.toDate(),
  );

  return (
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
        <form className="flex w-full flex-col justify-center space-y-2">
          <FormInput
            label="Height"
            name="height"
            valid={inputValidaty.height}
            errmsg={"Please use the right height format. eg. 5'10\""}
            changeHandler={(val) =>
              setInputs((prev) => ({ ...prev, height: val }))
            }
          />
          <FormInput
            label="Weight"
            name="weight"
            valid={inputValidaty.weight}
            errmsg={
              "Please make sure input the right weight. eg. a positive number"
            }
            changeHandler={(val) =>
              setInputs((prev) => ({ ...prev, weight: val }))
            }
          />
          <FormInput
            label="Respiration Rate"
            name="respRate"
            valid={inputValidaty.respRate}
            errmsg={
              "Please make sure input the right respiration rate. eg. a positive integer"
            }
            changeHandler={(val) =>
              setInputs((prev) => ({ ...prev, respRate: val }))
            }
          />
          <FormInput
            label="Pulse"
            name="pulse"
            valid={inputValidaty.pulse}
            errmsg={
              "Please make sure input the right pulse. eg. a positive integer"
            }
            changeHandler={(val) =>
              setInputs((prev) => ({ ...prev, pulse: val }))
            }
          />
          <FormInput
            label="Blood Pressure"
            name="bp"
            valid={inputValidaty.bp}
            errmsg={"Please use the right blood pressure format. eg. 120/60"}
            changeHandler={(val) => setInputs((prev) => ({ ...prev, bp: val }))}
          />
        </form>
        <div className="flex justify-between gap-6">
          <div className="flex grow flex-col justify-start">
            <div className="flex h-full flex-col justify-between">
              <button
                className="border bg-contessa-500 p-4 font-semibold text-white"
                style={{
                  color: !allValid ? "gray" : "white",
                  backgroundColor: !allValid ? "lightgray" : "#C0726A",
                  cursor: !allValid ? "not-allowed" : "pointer",
                }}
                disabled={!allValid}
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
            <RoomCode
              submitMutation={submitMutation}
              appt={apptData}
              close={() => setOpenModal(false)}
            />
          </Modal.Body>
        </Modal>
      </div>
    </main>
  );
};

function FormInput({ label, name, value, errmsg, changeHandler, valid }) {
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
          placeholder={label}
          value={value}
          onChange={(e) => changeHandler(e.target.value)}
        />
      </div>
      <div className="flex justify-center text-center text-red-500">
        {valid === false && errmsg}
      </div>
    </div>
  );
}

export default CheckIn;
