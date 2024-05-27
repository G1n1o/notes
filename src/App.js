import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Components/LoginRegistration/Login'
import Register from './Components/LoginRegistration/Register'
import Keeper from './Components/Keeper/Keeper'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
	return (
		<div>
			<ToastContainer></ToastContainer>
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/notes' element={<Keeper />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
