import React from "react";
import { Link } from "react-router-dom";
import { useRealtimeAppointments, resetStatus } from "../utils/firebase";

const Backdoor = () => {
    const data = useRealtimeAppointments();
    console.log(data);
    return (
        <div className="mx-8 my-4">
            <h1>Reset Appointments</h1>
            {data.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
        </div>
    );
};
function AppointmentCard({ appointment }) {


    if (appointment.status === "checkedIn")
        return (
            <></>
        );
    if (appointment.status === "checkedOut")
        return (
            <div className="rounded-lg border-2 border-purple-700 bg-purple-100 p-4 shadow-lg">
                <h2>
                    {appointment.patient.firstName} {appointment.patient.lastName}
                </h2>
                <p>{appointment.date.toDate().toLocaleString()}</p>
                <p>Checked out</p>
                <div className="">
                    <button className="rounded-md border border-black/50 bg-white/50 p-2 shadow hover:bg-black/25" onClick={() => resetStatus(appointment.id) }>
                        Reset Status
                    </button>
                </div>
            </div>
        );
    if (appointment.status === "cancelled")
        return (
            <></>
        );
    if (appointment.status === "scheduled")
        return (
            <></>
        );
    // Arrived and waiting case
    return (
        <></>
    );
}

export default Backdoor;
