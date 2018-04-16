import axios from 'axios'
import * as types from './mutation-types'
import * as urls from '../remote-urls'
import * as operateFuncs from '../../utils/song-operate-func'
import * as factory from '../../utils/DataFactory'

//查询歌单列表
export function special_sheets({commit}, {param, callback}) {
	axios.get(urls.SEARCH_SPECIAL_LIST + $.param(param)).then((res) => {
		callback(res.data)
	})
}
//查询专辑列表
export function special_albums({commit}, {param, callback}) {
	axios.get(urls.ALBUM_SEARCH + $.param(param)).then((res) => {
		callback(res.data)
	})
}

export function special_album_detail({commit}, {id, callback}) {
	axios.get(urls.ALBUM_JUMP + id + "-92.html").then((res) => {
		let detail = factory.handleAlbumJump(res)
		callback(detail)
	})
}
export function special_sheet_detail({commit}, {id, callback = () => {}}) {
	axios.get(urls.SEARCH_SPECIAL + id + '.html').then(res => {
		let data = factory.KGSongsBySheet(res)
		callback(data)
	})
}