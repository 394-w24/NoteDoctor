import { Route, Routes } from "react-router-dom";
import RoomCode from "./components/RoomCode";
import Layout from "./layout/Layout";
import CheckIn from "./pages/CheckIn";
import PatientWelcome from "./pages/PatientWelcome";
import { StaffBio } from "./pages/StaffBio";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PatientWelcome />} />
        <Route path="staffbio" element={<StaffBio />} />
        <Route path="checkin" element={<CheckIn />} />
        <Route path="roomcode" element={<RoomCode />} />
      </Route>
    </Routes>
  );
}

export default App;
