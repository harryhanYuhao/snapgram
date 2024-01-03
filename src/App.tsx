import { Routes, Route } from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { Home } from './_root/pages';

import './globals.css';

const App = () => {
	return (
		<Routes>
			{/* public routes */}
			<Route path="/sign-in" element={<SigninForm />} />
			<Route path="/sign-up" element={<SignupForm/>} />

			{/* private routes */}
			<Route index element={<Home />} />
		</Routes>
		)
}

export default App;
