const apiUrl = import.meta.env.VITE_API_URL;

export const contactCreate = async (token, { first_name, last_name, email, phone }) => {
  return await fetch(`${apiUrl}/contacts`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'accept': 'application/json',
			Authorization: token
		},
		body: JSON.stringify({ first_name, last_name, email, phone })
	})
}

export const contactList = async (token, { name, email, phone, page }) => {
	const url = new URL(`${apiUrl}/contacts`)
	if(name) url.searchParams.append('name', name)
	if(email) url.searchParams.append('email', email)
	if(phone) url.searchParams.append('phone', phone)
	if(page) url.searchParams.append('page', page)

	return await fetch(url, {
		method: 'GET',
		headers: {
				'accept': 'application/json',
				Authorization: token
		}
	})
}
export const contactDelete = async (token, id) => {
	return await fetch(`${apiUrl}/contacts/${id}`, {
		method: 'DELETE',
		headers: {
			'accept': 'application/json',
			Authorization: token
		}
	})
}
