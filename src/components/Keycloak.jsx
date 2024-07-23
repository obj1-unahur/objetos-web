import React, { useState, useEffect } from 'react'
import Keycloak from 'keycloak-js'
import Cookies from 'js-cookie'

const KeycloakComponent = () => {
	const [keycloak, setKeycloak] = useState(null)
	const [authenticated, setAuthenticated] = useState(false)

	useEffect(() => {
		const token = Cookies.get('accessToken')
		const authenticatedCookie = Cookies.get('authenticated')

		const kc = new Keycloak({
			url: 'http://localhost:8080/',
			realm: 'UNAHUR',
			clientId: 'front2',
		})

		kc.init({
			onLoad: 'check-sso',
			token,
			checkLoginIframe: false,
		})
			.then((auth) => {
				setKeycloak(kc)
				setAuthenticated(auth)
				if (auth) {
					Cookies.set('authenticated', 'true')
					Cookies.set('accessToken', kc.token)
				} else {
					Cookies.remove('authenticated')
					Cookies.remove('accessToken')
				}
			})
			.catch((error) => {
				console.error('Authentication Failed:', error)
			})
	}, [])

	const handleLogin = () => {
		if (keycloak) {
			keycloak.login()
		}
	}

	const handleLogout = () => {
		if (keycloak) {
			keycloak
				.logout()
				.then(() => {
					Cookies.remove('authenticated')
					Cookies.remove('accessToken')
					setAuthenticated(false)
				})
				.catch((error) => {
					console.error('Logout Failed:', error)
				})
		}
	}

	return (
		<div>
			{authenticated ? (
				<button
					className="bg-red-600"
					onClick={handleLogout}>
					Cerrar Sesión
				</button>
			) : (
				<button
					className="bg-green-700"
					onClick={handleLogin}>
					Iniciar Sesión
				</button>
			)}
		</div>
	)
}

export default KeycloakComponent
