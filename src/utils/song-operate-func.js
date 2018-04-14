import * as Data from '../utils/local-storage'
import * as modes from '../utils/play-mode'
import * as qualities from '../utils/song-quality'

export function add(list, data) {
	let exist = false
	if(!list) {
		list = new Array()
	}
	for(let i = 0; i < list.length; i++) {
		if(list[i].ID === data.ID) {
			exist = true
		}
	}
	if(!exist) {
		list.push(data)
	}
	setSongList(list)
}
export function remove(list, data) {
	for(let i = 0; i < list.length; i++) {
		if(list[i].ID === data.ID) {
			list.splice(i, 1)
			break
		}
	}
	setSongList(list)
}

export function setStatus(song, status) {
	song.status = status
	setReadySong(song)
}

export function next(list, data, mode, isAuto) {
	let song = null
	switch(mode) {
		case modes.RANDOM:
			song = list[Math.floor(Math.random() * list.length)]
			break
		default:
			if(!isAuto) {
				if(!data) {
					song = list[0]
				} else {
					for(let i = 0; i < list.length; i++) {
						if(list[i].ID.toLowerCase() === data.ID.toLowerCase()) {
							if(i < list.length) {
								song = list[i+1]
							}else{
								song = list[0]
							}
						}
					}
				}
				break
			} else {
				song = data
			}
			
	}
	if(!song) {
		song = list[0]
	}
	setReadySong(song)
	return song
}

export function prev(list, data, mode) {
	let song = null
	switch(mode) {
		case modes.RANDOM:
			song = list[Math.floor(Math.random() * list.length)]
			break
		default: 
			if(!data) {
				song = list[list.length - 1]
			} else {
				for(let i = 0; i < list.length; i++) {
					if(list[i].ID.toLowerCase() === data.ID.toLowerCase()) {
						if(i > 0) {
							song = list[i - 1]
						}else{
							song = list[list.length -1]
						}
					}
				}
			}
			break		
	}
	if(!song) {
		song = list[0]
	}
	setReadySong(song)
	return song
}

export function getSongList() {
	let songList = JSON.parse(Data.get('songList'))
	if(!songList instanceof Array) songList = new Array()
	return songList
}
export function setSongList(list) {
	if(!list instanceof Array || !list.push) {
		console.error('歌曲列表对象不是有效的数组')
		return
	}
	Data.set('songList', JSON.stringify(list))
}

export function getReadySong() {
	let json = Data.get('readySong')
	let readySong = null
	if(json) readySong = JSON.parse(json)
	return readySong
}
export function setReadySong(readySong) {
	Data.set('readySong', JSON.stringify(readySong))
}

export function getConfig() {
	let json = Data.get('config')
	let config = null
	if(json) config = JSON.parse(json)
	return config
}

export function setConfig(config) {
	Data.set('config', JSON.stringify(config))
}

export function getPlayMode() {
	return Data.get('playMode')
}
export function setPlayMode(mode) {
	let config = getConfig()
	config.mode = mode
	setConfig(config)
}

export function changePlayMode(config) {
	switch(config.mode) {
		case modes.LOOP:
			config.mode = modes.SINGLE
			break
		case modes.SINGLE:
			config.mode = modes.RANDOM
			break
		case modes.RANDOM:
			config.mode = modes.LOOP
			break
	}
	setConfig(config)
	return config
}

function checkQualityIsFree(song, quality) {
	swtich()
}

export function getQuality(song, quality) {
	let currQualityIsFee = false
	switch(quality) {
		case qualities.NORMAL:
			if(song.FileHash&&song.FileSize>0&&song.price<=0) song.hash = FileHash
			break
		case qualities.HQ:
			if(song.HQFileHash&&song.HQFileSize>0&&song.HQPrice<=0) song.hash = FileHash
			break
		case qualities.SQ:
			if(song.SQFileHash&&song.SQFileSize>0&&song.SQPrice<=0) song.hash = FileHash
			break
		case qualities.RES:
			if(song.RESFileHash&&song.RESFileSize>0&&song.RESPrice<=0) song.hash = FileHash
			break		
	}
	if(!currQualityIsFee) {

	}
}