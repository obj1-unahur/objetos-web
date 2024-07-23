import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const AuthCheck = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const handleCookieChange = () => {
			const storedAuth = Cookies.get('authenticated') === 'true'
			setIsAuthenticated(storedAuth)
		}
		handleCookieChange()
		window.addEventListener('cookiechange', handleCookieChange)
		return () => {
			window.removeEventListener('cookiechange', handleCookieChange)
		}
	}, [])

	return isAuthenticated ? children : null
}

export default AuthCheck
