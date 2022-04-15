export async function createUser(formData) {
	console.log(`creating user with request body\n${formData}`);
	try {
		const response = await fetch(`user/create`, {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});
		const data = await response.json();
		return data;
	}
	catch (err) {
		console.log(err);
		return null;
	}
}

export async function readUser(userID) {
	console.log(`reading user ID ${userID}`);
	try {
		const response = await fetch(`user/get?userID=${userID}`, {
			method: 'GET',
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		return null;
	}
}

export async function updateUser(formData) {
	console.log(`updating user with request body\n${formData}`);
	try {
		const response = await fetch(`user/update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});
		const data = await response.json();
		return data;
	}
	catch (err) {
		console.log(err);
		return null;
	}
}
  
export async function deleteUser(formData) {
	try {
		const response = await fetch(`user/delete?userID=${userID}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData)
		});
		const data = await response.json();
		return data
	}
	catch (err) {
		console.log(err);
		return null;
	}
}