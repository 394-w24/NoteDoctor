import { Route, Routes } from 'react-router-dom';
import PatientWelcome from './pages/PatientWelcome';
import { StaffBio } from './pages/StaffBio';

function App() {
	return (
		<Routes>
			<Route path='/' element={<PatientWelcome />} />
			<Route path='staffbio' element={<StaffBio />} />
		</Routes>
	);
}

export default App;
