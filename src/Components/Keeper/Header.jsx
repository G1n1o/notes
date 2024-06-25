import React from 'react'

import HighlightIcon from '@mui/icons-material/Highlight'

function Header() {
	function handleLogout() {
		sessionStorage.clear()
	}

	return (
		<header>
			<h1>
				<HighlightIcon />
				Keeper
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
