import { differenceInYears, format } from "date-fns";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { DateHeader } from "../components/DateHeader";

const PatientWelcome = () => {
  const [open, setOpen] = useState(false);
  const [additionalIssue, setAdditionalIssue] = useState("");
  const [additionalIssues, setAdditionalIssues] = useState([]); // TODO: add these additional issues to dB

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdditionalIssues([...additionalIssues, additionalIssue]);
  }

  const handleChange = (e) => {
    setAdditionalIssue(e.target.value);
  }

  console.log(additionalIssues);

  const dob = new Date("1990-01-01");
  const dobString = format(dob, "MMMM dd, yyyy");
  const age = differenceInYears(new Date(), dob);
  return (
    <div className="container mt-4">
      <h1 className="font-cursive text-7xl">Hello, Carly Lowell</h1>
      <DateHeader />
      <div className="flex justify-between">
        <div className="flex flex-col">
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
          <div>
            <p>
              <span className="font-semibold">Gender Identity: </span>
              Female, she/her
            </p>
          </div>
          <div>
            <div className="font-semibold">Appointment Details</div>
            <ul className="ml-6 list-disc">
              <li> Dr. Valina</li>
              <li>20 Minutes</li>
              <li>
                Annual Exam
                <ul className="ml-4 list-disc">
                  <li>Breast Exam</li>
                  <li>Pelvic Exam</li>
                  <li>Pap Smear & STD Testing</li>
                  {additionalIssues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>

       <button onClick={() => setOpen(!open)} >
          Add additional issues
       </button>

       <dialog open={open} className="dialog">
          <form onSubmit={handleSubmit}>
            <button onClick={() => setOpen(!open)} >
              Close
            </button>
            <input  type="text" 
                    placeholder="Enter additional issues" 
                    value={additionalIssue}
                    onChange={handleChange} />
            <button type="submit">Submit</button>
          </form> 
        </dialog>

    
        <div>
          <p className="font-bold">Your care team today</p>
          <div className="flex gap-2">
            <Link to="/staffBio" className="flex flex-col items-center gap-2">
              <img
                src="/doctor.webp"
                alt="doctor"
                className="aspect-square h-24 w-min rounded-full"
              />
              <p>Dr. Valina, MD</p>
            </Link>
            <Link to="/staffBio" className="flex flex-col items-center gap-2">
              <img
                src="/doctor.webp"
                alt="doctor"
                className="aspect-square h-24 w-min rounded-full"
              />
              <p>Maria Alvarez, RN</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientWelcome;
