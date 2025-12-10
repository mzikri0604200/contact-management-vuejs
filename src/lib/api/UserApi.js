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
		body: JSON.stringify({ username, password })
	})
}

export const userDetail = async (token) => {
	return await fetch(`${apiUrl}/users/current`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Authorization':token
		}
	})
}

export const userUpdateProfile = async (token, { name}) => {
  return await fetch(`${apiUrl}/users/current`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ name }),
  });
};

export const userUpdatePassword = async (token, { password}) => {
  return await fetch(`${apiUrl}/users/current`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ password }),
  });
};