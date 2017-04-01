const storage = {};

const getItem = key => {
	let value = storage[key];
	if(storage[key]) {
		try {
			return JSON.parse(storage[key]);
		}
		catch(e) {}
	}
	return false;
}

const setItem = (key, value) => {
	storage[key] = JSON.stringify(value);
}

export default {
	getItem,
	setItem
}