const apiUrl = import.meta.env.VITE_API_URL;

export const addressCreate = async (token, id, { street, city, province, country, postal_code }) => {
	return fetch(`${apiUrl}/contacts/${id}/addresses`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'accept': 'application/json',
			Authorization: token
		},
		body: JSON.stringify({ street, city, province, country, postal_code })
	})
}

export const addressList = async (token, id) => {
	return fetch(`${apiUrl}/contacts/${id}/addresses`, {
		method: 'GET',
		headers: {
			'accept': 'application/json',
			Authorization: token
		}
	})
}

export const addressDetail = async (token, id, addressid) => {
	return fetch(`${apiUrl}/contacts/${id}/addresses/${addressid}`, {
		method: 'GET',
		headers: {
			'accept': 'application/json',
			Authorization: token
		}
	})
}

export const addressUpdate = async (token, id, addressid, { street, city, province, country, postal_code }) => {
return fetch(`${apiUrl}/contacts/${id}/addresses/${addressid}`, {
	method: 'PUT',
	headers: {
		'content-type': 'application/json',
		'accept': 'application/json',
		Authorization: token
	},
	body: JSON.stringify({ street, city, province, country, postal_code })
})	
}

export const addressDelete = async (token, id, addressid) => {
	return fetch(`${apiUrl}/contacts/${id}/addresses/${addressid}`, {
		method: 'DELETE',
		headers: {
			'accept': 'application/json',
			Authorization: token
		}
	})
}