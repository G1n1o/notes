import React from 'react'

import LiveTvIcon from '@mui/icons-material/LiveTv';

function Header() {
	function handleLogout() {
		sessionStorage.clear()
	}

	return (
		<header>
			<h1>
				<LiveTvIcon />
				Best Movie Quotes
			</h1>
			<div className='logout'>
				<a href='/' onClick={handleLogout}>
					Logout
				</a>
			</div>
		</header>
	)
}

export default Header
