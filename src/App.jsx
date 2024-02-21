import { Route, Routes } from "react-router-dom";
import CheckIn from "./pages/CheckIn";
import PatientWelcome from "./pages/PatientWelcome";
import { StaffBio } from "./pages/StaffBio";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PatientWelcome />} />
      <Route path="staffbio" element={<StaffBio />} />
      <Route path="checkin" element={<CheckIn />} />
    </Routes>
  );
}

export default App;
