import React, { useState, useEffect } from 'react'

const AuthCheck = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const handleStorageChange = () => {
			const storedAuth = localStorage.getItem('authenticated') === 'true'
			setIsAuthenticated(storedAuth)
		}
		handleStorageChange()
		window.addEventListener('storage', handleStorageChange)
		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [])

	return isAuthenticated ? children : null
}

export default AuthCheck
