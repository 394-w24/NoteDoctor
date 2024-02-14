import React from 'react';

function ListComponent({ items }) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}


export function PatientViewNurse() {
    const dummyData = {
        name: "Laura Croft",
        age: "21",
        gender: "Female",
        timeToDoctor: "10",
        visitReason: "Total Knee Arthroplasty",
        doctorName: "Dr. Jacob",
        visitPlan: "TEMP VALUE",
        medHist: "TEMP VALUE",
        questions : ["When can I go back to raiding tombs?", 
                    "Will I be able to narrowly escape death in the future?"]

    }

    const headerStyle = {
        backgroundColor: "#e9d3c8",
        padding: '20px',
    }
    const footerStyle = {
        backgroundColor: "#e9d3c8",
        padding: '30px',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }

    const columnStyle = {
        padding: '20px',
        border: "2px solid #e9d3c8",
        margin: "10px",
        borderRadius: "10px",
        overflow: "auto"
    }

    return (
        <div>
            <header style={headerStyle}>
                <h1 className="text-light"><strong>Welcome {dummyData.name}!</strong></h1>
                <div className="d-flex justify-content-between align-items-center text-white ">
                    <div>
                        <h3>{dummyData.age}-Year-old, {dummyData.gender}</h3>
                    </div>
                    <div>
                        <h3>Expected Wait To See Doctor: {dummyData.timeToDoctor} min</h3>
                    </div>
                </div>
            </header>
            <main className>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-3" style={columnStyle}>
                            <p>
                                <h4>Today's Visit:</h4>
                                <p>{dummyData.visitReason}</p>
                                <p>Today you can expect {dummyData.doctorName} to {dummyData.visitPlan}</p>
                            </p>
                        </div>
                        <div className="col-3" style={columnStyle}>
                            <h4>
                                {dummyData.name}'s Medical History To Review:
                            </h4>
                            <p>
                                {dummyData.medHist}
                            </p>
                        </div>
                        <div className="col-3" style={columnStyle}>
                            <h4>Questions you would like to review with {dummyData.doctorName}:</h4>
                            <ListComponent items={dummyData.questions} />
                        </div>
                    </div>
                </div>
            </main>
            <footer style={footerStyle}>
            </footer>
        </div>
    );
}

