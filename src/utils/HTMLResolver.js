function HTMLResolver(config) {
	this.start = config.start
	this.end = config.end
	this.startRollLen = config.startRollLen||0
	this.endRollLen = config.endRollLen||0
	this.res = config.res
}


HTMLResolver.prototype.resolver = function() {
	let beginIndex = this.res.indexOf(this.start) + (this.start.length) - this.startRollLen
	let endIndex = this.res.indexOf(this.end, beginIndex)
	var jsonStr = this.res.substring(beginIndex, endIndex).trim()
	return jsonStr.substring(0, jsonStr.length - this.endRollLen)
}

HTMLResolver.prototype.object = function() {
	return JSON.parse(this.resolver())
}

HTMLResolver.prototype.eval = function() {
	var data = {}
	eval('data = ' + this.resolver())
	return data
}

export default HTMLResolver