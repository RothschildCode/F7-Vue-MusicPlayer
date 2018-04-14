export function set(k, v) {
	localStorage.setItem(k, v);
}

export function get(k) {
	return localStorage.getItem(k)
}