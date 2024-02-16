import { Route, Routes } from 'react-router-dom';
import PatientWelcome from './pages/PatientWelcome';

function App() {
	return (
		<Routes>
			<Route path='/' element={<PatientWelcome />} />
		</Routes>
	);
}

export default App;
