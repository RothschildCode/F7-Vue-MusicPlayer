import axios from 'axios'
import * as types from './mutation-types'
import * as urls from '../remote-urls'
import * as operateFuncs from '../../utils/song-operate-func'
import * as factory from '../../utils/DataFactory'
import * as qualities from '../../utils/song-quality'
import * as status from '../../utils/song-status'

import defaultConf from '../../config/appConf'

import {get, set} from '../../utils/local-storage'

export function player_source({commit, state}, {data, callback = () => {}, quality}) {
	data = data ? data : state.readySong
	quality = quality ? quality : qualities.NORMAL
	let fileHash = data.FileHash
	switch(quality) {
		case qualities.NORMAL:
			fileHash = data.FileHash
			break
		case qualities.HQ:
			fileHash = data.HQFileHash
			break
		case qualities.SQ:
			fileHash = data.SQFileHash
			break
		case qualities.RES:
			fileHash = data.RESFileHash
			break
	}
	let url = urls.SONG_SOURCE_URL + 'hash=' + fileHash + '&ablum_id=' + data.AlbumID
	axios.get(url).then(res => {
		let songInfo = res.data
		for(let attr in songInfo) {
			data[attr] = songInfo[attr]
		}

		commit(types.PLAYER_LOAD, {
			readySong: data
		})
		callback(data)
	})
}

export function player_load({commit, state}, {data, callback = () => {}}) {
	let addedlist = state.addedlist
	operateFuncs.add(addedlist, data)
	commit(types.PLAYER_ADDED_LIST_UPDATE, {
		addedlist
	})
	callback(data)
}

export function player_play({commit, state}) {
	if(!state.readySong.play_url) return
	let config = state.config
	config.status = status.PLAY
	operateFuncs.setConfig(config)
	commit(types.PLAYER_CONFIG_UPDATE, {
		config
	})
}

export function player_pause({commit, state}) {
	let config = state.config
	config.status = status.PAUSE
	operateFuncs.setConfig(config)
	commit(types.PLAYER_CONFIG_UPDATE, {
		config
	})
}

export function player_stop({commit, state}) {
	let config = state.config
	config.status = status.STOP
	operateFuncs.setConfig(config)
	commit(types.PLAYER_CONFIG_UPDATE, {
		config
	})
}

export function player_add({commit, state}, {data, callback = () => {}}) {
	let addedlist = state.addedlist
	operateFuncs.add(addedlist, data)
	commit(types.PLAYER_ADDED_LIST_UPDATE, {
		addedlist
	})
	callback()
}

export function player_remove({commit, state}, {data}) {
	let addedlist = state.addedlist
	operateFuncs.remove(addedlist, data)
	commit(types.PLAYER_ADDED_LIST_UPDATE, {
		addedlist
	})
}

export function player_next({commit, state}, {isAuto, callback =() => {}}) {
	let addedlist = state.addedlist
	let readySong = operateFuncs.next(addedlist, state.readySong, state.config.mode, isAuto)
	callback(readySong)
}

export function player_prev({commit, state}, {callback =() => {}}) {
	let addedlist = state.addedlist
	let readySong = operateFuncs.prev(addedlist, state.readySong, state.config.mode)
	callback(readySong)
}

export function player_mode({commit, state}) {
	let config = operateFuncs.changePlayMode(state.config)
	commit(types.PLAYER_CONFIG_UPDATE, {
		config
	})
}

export function player_quality({commit, state}, {quality, callback = () => {}}) {
	let config = state.config
	if(config.quality == quality) return
	config.quality = quality
	operateFuncs.setConfig(config)
	commit(types.PLAYER_CONFIG_UPDATE, {
		config
	})
	callback(quality)
}

export function player_lrc({commit}, {hash, callback = () => {}}) {
	let url = urls.SONG_LRC_URL + hash
	axios.get(url).then(res => {
		callback(res)
	})
}

export function player_addedlist({commit}) {
	let addedlist = operateFuncs.getSongList()
	commit(types.PLAYER_ADDED_LIST_UPDATE,  {
		addedlist
	})
}
export function player_init({commit}, callback = () => {}) {
	let readySong = operateFuncs.getReadySong()
	try{
		if(!readySong) {
			readySong = defaultConf.defaultSong
		}
	} catch (e) {
		readySong = defaultConf.defaultSong
	}
	let config = operateFuncs.getConfig()
	if(!config) {
		config = defaultConf.config
		set("config", config)
	} else {
		for(let confAttr in defaultConf.config) {
			config[confAttr] = config[confAttr] ? config[confAttr] : defaultConf.config[confAttr]
		}
	}
	config.status = status.PAUSE
	operateFuncs.setConfig(config)
	commit(types.PLAYER_INIT, {
		readySong,
		config
	})
}