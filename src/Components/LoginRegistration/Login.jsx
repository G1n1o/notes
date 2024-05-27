import React, { useState, useEffect } from 'react'
import { FaUser, FaLock } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const usenavigate = useNavigate()

	useEffect(() => {
		sessionStorage.clear()
	}, [])

	const proceedLogin = e => {
		e.preventDefault()
		if (validate()) {
			fetch('http://localhost:3333/user/' + username)
				.then(res => {
					return res.json()
				})
				.then(resp => {
					console.log(resp)
					if (Object.keys(resp).length === 0) {
						toast.error('Please Enter valid username')
					} else {
						if (resp.password === password) {
							toast.success('Success')
							sessionStorage.setItem('username',username);
							usenavigate('/notes')
						} else {
							toast.error('Please Enter valid credentials')
						}
					}
				})
				.catch(err => {
					toast.error('Login Failed due to :' + err.message)
				})
		}
	}

	const validate = () => {
		let result = true
		if (username === '' || username === null) {
			result = false
			toast.warning('Please Enter Username')
		}
		if (password === '' || password === null) {
			result = false
			toast.warning('Please Enter Password')
		}
		return result
	}

	return (
		<div className='wrapper'>
			<div className='form-box login'>
				<form onSubmit={proceedLogin}>
					<h1>Login</h1>
					<div className='input-box'>
						<input value={username} onChange={e => setUsername(e.target.value)} type='text' placeholder='Username' />
						<FaUser className='icon' />
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

					<button type='submit'>Login</button>

					<div className='register-link'>
						<p>
							Don't have an account?
							<a href='/register'>Register</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
