import axios from 'axios'
import * as types from './mutation-types'
import * as urls from '../remote-urls'
import * as operateFuncs from '../../utils/song-operate-func'
import * as factory from '../../utils/DataFactory'

//获取酷狗官网首页的新歌模块
export function home_news({commit}) {
	axios.get(urls.KG_HOME).then((res) => {
		var data = factory.KGHomeNewSong(res)
		commit(types.HOME_NEW, {
			news: data
		})
	})
}

export function home_special({commit}, {url, callback}) {
	axios.get(urls.PROXY + url).then((res) => {
		let data = factory.KGSongSheet(res)
		callback(data.sheets)
	})
}