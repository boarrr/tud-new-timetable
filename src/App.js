import { Routes, Route } from "react-router-dom";
import TimetablePage from "./components/TimetablePage";
import { useTheme } from "./customHooks/useTheme";

function App() {
	useTheme();

	return (
		<Routes>
			<Route path="/" element={<TimetablePage />} />
		</Routes>
	);
}

export default App;
