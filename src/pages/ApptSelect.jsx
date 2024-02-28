import React from "react";
import { Link } from "react-router-dom";
import { useRealtimeAppointments } from "../utils/firebase";

const ApptSelect = () => {
  const data = useRealtimeAppointments();
  console.log(data);
  return (
    <div className="mx-8 my-4">
      <h1>Appointments</h1>
      {data.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};
function AppointmentCard({ appointment }) {
  if (appointment.status === "checkedIn")
    return (
      <div className="flex rounded-lg border-2 border-blue-700 bg-blue-100 p-4 shadow-lg">
        <div>
          <h2>
            {appointment.patient.firstName} {appointment.patient.lastName}
          </h2>
          <p>{appointment.date.toDate().toLocaleString()}</p>
          <p>Checked in</p>
        </div>
        <div className="flex-1">
          <Link to={`/checkin/${appointment.id}`}>
            <button>View Check In</button>
          </Link>
        </div>
      </div>
    );
  if (appointment.status === "checkedOut")
    return (
      <div className="rounded-lg border-2 border-purple-700 bg-purple-100 p-4 shadow-lg">
        <h2>
          {appointment.patient.firstName} {appointment.patient.lastName}
        </h2>
        <p>{appointment.date.toDate().toLocaleString()}</p>
        <p>Checked out</p>
      </div>
    );
  if (appointment.status === "cancelled")
    return (
      <div className="rounded-lg border-2 border-red-700 bg-red-100 p-4 shadow-lg">
        <h2>
          {appointment.patient.firstName} {appointment.patient.lastName}
        </h2>
        <p>{appointment.date.toDate().toLocaleString()}</p>
        <p>Cancelled</p>
      </div>
    );
  if (appointment.status === "scheduled")
    return (
      <div className="rounded-lg border-2 border-green-700 bg-green-100 p-4 shadow-lg">
        <h2>
          {appointment.patient.firstName} {appointment.patient.lastName}
        </h2>
        <p>{appointment.date.toDate().toLocaleString()}</p>
      </div>
    );
  // Arrived and waiting case
  return (
    <div className="mx-4 flex items-center justify-between rounded-lg border-2 border-yellow-700 bg-yellow-100 p-4 px-8 shadow-lg">
      <div>
        <h2>
          {appointment.patient.firstName} {appointment.patient.lastName}
        </h2>
        <p>{appointment.date.toDate().toLocaleString()}</p>
        <p>Arrived and waiting</p> 
      </div>
      <div className="">
        <Link to={`/checkin/${appointment.id}`}>
          <button className="rounded-md border border-black/50 bg-white/50 p-2 shadow hover:bg-black/25">
            Check In
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ApptSelect;
