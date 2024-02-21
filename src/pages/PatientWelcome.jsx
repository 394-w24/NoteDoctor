import { differenceInYears, format } from "date-fns";
import { Modal } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PatientWelcome = () => {
  const [open, setOpen] = useState(false);
  const [additionalIssue, setAdditionalIssue] = useState("");
  const [additionalIssues, setAdditionalIssues] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultArray = additionalIssue.trim().split(/,|\n/);
    if (resultArray.length > 0) {
      setAdditionalIssues([...additionalIssues, ...resultArray]);
      setAdditionalIssue("");
      setOpen(false);
    }
  };

  const handleChange = (e) => {
    setAdditionalIssue(e.target.value);
  };

  const dob = new Date("1990-01-01");
  const dobString = format(dob, "MMMM dd, yyyy");
  const age = differenceInYears(new Date(), dob);

  return (
    <div className="bg-huge animate-gradient h-svh bg-gradient-to-tl from-[#14c5c6] via-[#984388] to-[#cf1717] py-10">
      <div className="container mx-auto flex justify-between">
        <div className="mt-10 flex flex-col rounded-lg bg-white/50 p-6 text-lg">
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

          <p>
            <span className="font-semibold">Gender Identity: </span>Female,
            she/her
          </p>

          <div className="mt-20">
            <div className="font-semibold">Appointment Details</div>
            <ul className="ml-6 list-disc">
              <li>Dr. Valina</li>
              <li>20 Minutes</li>
              <li>
                Annual Exam
                <ul className="ml-4 list-disc">
                  <li>Breast Exam</li>
                  <li>Pelvic Exam</li>
                  <li>Pap Smear & STD Testing</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-shadow-lg text-center font-cursive text-8xl text-white shadow-black/80">
            Hello, Carly Lowell the third
          </h1>
          <img
            src="/patient.webp"
            alt="patient"
            className="mx-auto mt-5 h-96 shrink-0 rounded-full"
          />
          <p className="mt-5 text-center font-cursive text-3xl text-white">
            Est Wait: 4 mins
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-10 rounded-lg bg-white/50 p-6 text-lg">
          <div className="flex justify-between whitespace-nowrap">
            <div>
              <p className="text-center text-lg font-bold">
                Your care team today:
              </p>
              <div className="flex gap-2 whitespace-normal">
                <Link
                  to="/staffBio"
                  className="flex flex-col items-center gap-2 rounded-lg bg-white/70 p-2 shadow-lg"
                >
                  <img
                    src="/doctor.webp"
                    alt="Dr. Valina, MD"
                    className="box-content aspect-square h-32 w-32 rounded-full border-4 border-white/40"
                  />
                  <p className="font-semibold underline">Dr. Valina, MD</p>
                </Link>
                <Link
                  to="/staffBio"
                  className="flex flex-col items-center gap-2 rounded-lg bg-white/70 p-2 shadow-lg"
                >
                  <img
                    src="/nurse.webp"
                    alt="Maria Alvarez, RN"
                    className="box-content aspect-square h-32 w-min rounded-full border-4 border-white/40"
                  />
                  <p className="font-semibold underline">Maria Alvarez, RN</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="grow rounded-md border bg-white/60 px-3 py-3 shadow">
            <div className="font-semibold">
              Additional Issues for your Doctor
            </div>
            <ul className="ml-6 list-disc">
              {additionalIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
            <button
              className="mt-2 underline"
              onClick={() => {
                console.log("Clicked");
                console.log(open);
                setOpen(true);
              }}
            >
              Click to add more
            </button>
          </div>
        </div>

        <Modal show={open} onClose={() => setOpen(!open)}>
          <Modal.Header>
            <h2>Additional Issues</h2>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label htmlFor="additionalIssue">
                <div>
                  Please enter additional issues below: (e.g. painful periods,
                  etc.)
                </div>
                <div className="text-sm font-medium text-black/80">
                  Separate multiple issues with a comma or a line break.
                </div>
              </label>
              <textarea
                id="additionalIssue"
                type="text"
                value={additionalIssue}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-contessa-500 rounded-lg border py-3 font-semibold text-white shadow"
              >
                Add Issues
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default PatientWelcome;
