import React from 'react'
import { Link } from 'react-router-dom'
import HighlightIcon from '@mui/icons-material/Highlight'

function Header() {
	return (
		<header>
			<h1>
				<HighlightIcon />
				Keeper
			</h1>
			<div className='logout'>
				<Link to={'/'}>Logout</Link>
			</div>
		</header>
	)
}

export default Header
