import { Navigate, Route, Routes } from "react-router-dom";
import PatientWelcome from "./components/PatientWelcome";
import RoomCode from "./components/RoomCode";
import ApptSelect from "./pages/ApptSelect";
import CheckIn from "./pages/CheckIn";
import RoomScreen from "./pages/RoomScreen";
import RoomSelect from "./pages/RoomSelect";
import { StaffBio } from "./pages/StaffBio";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="rooms" />} />
      <Route path="rooms" element={<RoomSelect />} />
      <Route path="rooms/:roomId" element={<RoomScreen />} />
      <Route path="staffbio/:id" element={<StaffBio />} />
      <Route path="checkin" element={<ApptSelect />} />
      <Route path="checkin/:id" element={<CheckIn />} />
      <Route path="roomcode" element={<RoomCode />} />
    </Routes>
  );
}

export default App;
