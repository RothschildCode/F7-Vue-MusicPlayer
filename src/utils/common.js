export function jsonpHandler(jsonp) {
	let startChar = jsonp.indexOf('(')
	let endChar = jsonp.lastIndexOf(')')
	return jsonp.substring(startChar + 1, endChar)
}
export function numberToSlong(num) {
	let ceilNum = Math.ceil(num)
	let min = parseInt(num / 60)
	let sec = Math.ceil(num % 60)
	if(min< 10) min = '0' + min
	if(sec < 10) sec = '0' + sec
	return min + ':' + sec
}

export function slongToNumber(slong) {
	let tmp = slong.split(':')
	let min = tmp[0]
	let sec = tmp[1]
	let long = (parseFloat(min) * 60) + (parseFloat(sec))
	return long
}

export function splitJoint(strs) {
	var t = ""
	for (var i = 0; i < strs.length; i++) {
		 t += strs[i]
	}
	return t
}

export function toMin(s) {
	var time = ''
	var m = Math.floor(s / 60) + ''
	var s = s % 60 + ''
	m = (m.length < 2 ? '0' : '') + m
	s = (s.length < 2 ? '0' : '') + m
	time = m + ':' + s
	return time
}