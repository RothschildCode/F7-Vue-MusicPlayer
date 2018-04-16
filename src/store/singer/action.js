import axios from 'axios'
import * as types from './mutation-types'
import * as urls from '../remote-urls'
import * as operateFuncs from '../../utils/song-operate-func'
import * as factory from '../../utils/DataFactory'

export function singer_areas({commit}, {callback}) {
	axios.get(urls.INIT_SINGER_CLASSIFIES_URL).then(res => {
		let areas = new Array()
		let doms = $(res).find('.sng1').parent().find('a')
		$.each(doms, (index, d) => {
			areas.push({
				text: $(d).html(),
				url: $(d).attr('href')
			})
		})
		// commit(types.SINGER_AREAS, {
		// 	areas
		// })
		callback(areas)
	})
}

export function singer_singers({commit}, {url, callback}) {
	axios.get(urls.PROXY + url).then(res => {
		let singerlist = factory.KGSingersByType(res)
		// commit(types.SINGER_SINGERS, {
		// 	singerlist
		// })
		callback(singerlist)
	})
}

export function singer_songs() {
	axios.get(urls.PROXY + url).then(res => {
		let songlist = factory.KGSongsBySinger(res)
		// commit(types.SINGER_SONGS, {
		// 	songlist
		// })
		callback(songlist)
	})
}