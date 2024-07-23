import React, { useState, useEffect } from 'react'
import Keycloak from 'keycloak-js'
import Cookies from 'js-cookie'

const KeycloakComponent = () => {
	const [keycloak, setKeycloak] = useState(null)
	const [authenticated, setAuthenticated] = useState(false)

	useEffect(() => {
		const kc = new Keycloak({
			url: 'http://localhost:8080/', // Ajusta esta URL según tu configuración
			realm: 'UNAHUR',
			clientId: 'front2',
		})

		kc.init({})
			.then((auth) => {
				setKeycloak(kc)
				setAuthenticated(auth) // Actualiza el estado de autenticación
				if (auth) {
					Cookies.set('authenticated', 'true', { expires: 1 })
					Cookies.set('accessToken', kc.token, { expires: 1 })
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
					setAuthenticated(false) // Actualiza el estado de autenticación
					window.location.reload() // Recarga la página para actualizar la interfaz
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
