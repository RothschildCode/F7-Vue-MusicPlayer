import axios from 'axios'
import * as types from './mutation-types'
import * as urls from '../remote-urls'
import * as operateFuncs from '../../utils/song-operate-func'
import * as factory from '../../utils/DataFactory'
import * as util from '../../utils/common'

export function search_songs({commit}, { data, callback }) {
	let param = $.param(data)
	axios.get(urls.SEARCH_URL + param).then(res => {
		let musicList = res.data.lists
		let isNull = true
		let songlist = new Array()
		if(res.data&&res.data.lists&&res.data.lists.length > 0) {
			isNull = false
			songlist = res.data.lists
		}
		callback(songlist, isNull)
	})
}

export function search_hotkey({commit}, callback = () => {}) {
	axios.get(urls.HOT_KEYWORD).then(res => {
		let hotKeywords = new Array();
		$.each(JSON.parse(util.jsonpHandler(res)).data, (i, k) => {
			let keyInfo = k.keyword.split(" ");
			let keyword = keyInfo[1];
			if(keyInfo.length != 2) {
				keyword = k.keyword
			}
			if(keyword.length < 5) {
				hotKeywords.push(keyword)
			}
		})
		// commit(types.GET_HOT_KEYWORD, {
		// 	hotKeywords
		// })
		callback(hotKeywords)
	})
}

export function search_tip({commit}, {keyword, callback}) {
	axios.get(urls.SEARCH_TIP+$.param({keyword})).then((res) => {
		callback(res.data[0].RecordDatas)
	})
}