import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa'
import { toast } from 'react-toastify'
import bcrypt from 'bcryptjs'

function Register() {
	const [id, setId] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const IsValidate = () => {
		let isproceed = true
		let errormessage = 'Please enter the value in '
		if (id === null || id === '') {
			isproceed = false
			errormessage += ' Username'
		}
		if (email === null || email === '') {
			isproceed = false
			errormessage += ' Email'
		}
		if (password === null || password === '') {
			isproceed = false
			errormessage += ' Password'
		}
		if (!isproceed) {
			toast.warning(errormessage)
		} else {
			if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
			} else {
				isproceed = false
				toast.warning('Please enter the valid email')
			}
		}
		return isproceed
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (IsValidate()) {
			setIsLoading(true)
			try {
				const response = await fetch('http://localhost:3333/user')
				const users = await response.json()
				const existingUser = users.find(user => user.id === id)
				if (existingUser) {
					toast.error('User with this username already exists. Please choose another username.')
				} else {
					// Hash the password
					const hashedPassword = await bcrypt.hash(password, 10)
					const newUser = { id, email, password: hashedPassword, notes: [] }
					await fetch('http://localhost:3333/user', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(newUser),
					})
					toast.success('Registered successfully.')
					navigate('/')
				}
			} catch (err) {
				toast.error('Failed: ' + err.message)
			} finally {
				setIsLoading(false)
			}
		}
	}

	return (
		<div className='wrapper'>
			<div className='form-box register'>
				<form onSubmit={handleSubmit}>
					<h1>Registration</h1>
					<div className='input-box'>
						<input value={id} onChange={e => setId(e.target.value)} type='text' placeholder='Username' />
						<FaUser className='icon' />
					</div>
					<div className='input-box'>
						<input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' />
						<FaEnvelope className='icon' />
					</div>
					<div className='input-box'>
						<input
							value={password}
							onChange={e => setPassword(e.target.value)}
							type='password'
							placeholder='Password'
						/>
						<FaLock className='icon' />
					</div>

					<button type='submit' disabled={isLoading}>
						{isLoading ? 'Registering...' : 'Register'}
					</button>


					<div className='register-link'>
						<p>
							Arleady have an account?
							<a href='/'>Login</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Register
