const apiUrl = import.meta.env.VITE_API_URL;

export const userRegister = async ({ username, name, password }) => {
	return await fetch(`${apiUrl}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({ username, name, password })
	})
}

export const userLogin = async ({ username, password }) => {
	return await fetch(`${apiUrl}/users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({ username, name, password })
	})
}