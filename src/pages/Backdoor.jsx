import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRealtimeAppointments, resetStatus, resetApptTime } from "../utils/firebase";
import { isDateInPast } from "../utils/dates"


const getCurrentTimePlusNMinutes = (n) => {
    var currentDate = new Date();
    var currentTimePlus15Minutes = new Date(currentDate.getTime() + (n * 60 * 1000));
    return currentTimePlus15Minutes;
}

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
    const [apptOffset, setApptOffset] = useState(15);

    // Define a function to receive the value from the NumericInput component
    const handleChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setApptOffset(newValue);
    };
    if (appointment.status === "checkedIn" || isDateInPast(appointment.date.toDate()))
        return (
            <div className="flex rounded-lg border-2 border-blue-700 bg-blue-100 p-4 shadow-lg">
                <div>
                    <h2>
                        {appointment.patient.firstName} {appointment.patient.lastName}
                    </h2>
                    <p>{appointment.date.toDate().toLocaleString()}</p>
                    <p>Checked in</p>
                </div>
                <div className="d-flex align-items-center pt-4 pr-5 pl-5">
                    <button className="rounded-md border border-black/50 bg-white/50 p-2 shadow hover:bg-black/25" onClick={() => resetApptTime(appointment.id, getCurrentTimePlusNMinutes(apptOffset))}>
                        Reset DateTime
                    </button>
                    </div>
                    <div classname="align-items-center">
                        <p className="mb-0">Appointment offset from now in mins:</p>
                        <input
                            type="number"
                            value={apptOffset}
                            onChange={handleChange}
                            className="form-control rounded-md border border-black/50"
                        />
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
                <div className="flex-1">
                    <button className="rounded-md border border-black/50 bg-white/50 p-2 shadow hover:bg-black/25" onClick={() => resetStatus(appointment.id)}>
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
