import axios from 'axios'
import * as types from './mutation-types'
import * as urls from '../remote-urls'
import * as operateFuncs from '../../utils/song-operate-func'
import * as factory from '../../utils/DataFactory'

export function songs_types({commit}, callback = () => {}) {
	axios.get(urls.SONG_CLASSIFY_URL).then(res => {
		let obj = JSON.parse(util.jsonpHandler(res))
		let types = obj.data.categories
		commit(types.SONGS_TYPES, {
			types
		})
		callback()
	})
}

export function songs_songs({commit}, data,callback =() => {}) {
	let url = urls.CLASSIFY_POST_URL + '&rnd=' + Math.random() + '&categoryId=' + data
	axios.get(url).then(res => {
		let obj = JSON.parse(util.jsonpHandler(res))
		let songs = obj.data.list
		commit(types.SONGS_SONGS, {
			songs
		})
	})
}