import axios from 'axios'
import * as types from './mutation-types'
import * as urls from './remote-urls'
import * as util from '../../utils/common'
import * as songStatus from '../../utils/song-status'
import * as qualities from '../../utils/song-quality'

import * as operateFuncs from '../../utils/song-operate-func'
import defaultConf from '../../config/appConf'
import {APP_DEF_CONF} from '../../config/config'
import * as factory from '../../utils/DataFactory'

import {get, set} from '../../utils/local-storage'

export function getSongsByKeyword({commit}, { data, callback }) {
	let param = $.param(data)
	axios.get(urls.SEARCH_URL + param).then(res => {
		// let list = state.searchSongs
		// if(data.page <= 1) list = new Array()
		let musicList = res.data.lists
		let isNull = true
		let searchSongs = new Array()
		if(res.data&&res.data.lists&&res.data.lists.length > 0) {
			isNull = false
			searchSongs = res.data.lists
		}
		//查询歌曲的时候不执行mutation，不需要vux动态渲染
		// commit(types.GET_SONGS_BY_KEYWORD, {
		// 	searchSongs
		// })
		callback(searchSongs, isNull)
	})
}

export function getRanking({commit}, callback = () => {}) {
	axios.get(urls.RANKING_URL).then(res => {
		let rankings = factory.KGRanking(res)
		commit(types.GET_RANKING, {
			rankings
		})
		callback()
	})
}

export function getInitSongClassifyList({commit}, callback = () => {}) {
	axios.get(urls.SONG_CLASSIFY_URL).then(res => {
		let obj = JSON.parse(util.jsonpHandler(res))
		let songClassifyList = obj.data.categories
		commit(types.INIT_SONG_CLASSIFY_LIST, {
			songClassifyList
		})
		callback()
	})
}

export function getInitClassifyPostList({commit}, data,callback =() => {}) {
	let url = urls.CLASSIFY_POST_URL + '&rnd=' + Math.random() + '&categoryId=' + data
	axios.get(url).then(res => {
		let obj = JSON.parse(util.jsonpHandler(res))
		let classifyPostList = obj.data.list
		commit(types.INIT_CLASSIFY_POST_LIST, {
			classifyPostList
		})
	})
}

export function getSingerClassify({commit}) {
	axios.get(urls.INIT_SINGER_CLASSIFIES_URL).then(res => {
		let singerClassifies = new Array()
		let doms = $(res).find('.sng1').parent().find('a')
		$.each(doms, (index, d) => {
			singerClassifies.push({
				text: $(d).html(),
				url: $(d).attr('href')
			})
		})
		commit(types.INIT_SINGER_CLASSIFIES_URL, {
			singerClassifies
		})
	})
}

export function getSingersByClassify({commit}, {url, callback = () => {}}) {
	axios.get(urls.PROXY + url).then(res => {
		let singersPage = factory.KGSingersByType(res)
		commit(types.GET_SINGERS_BY_CLASSIFY, {
			singersPage
		})
		callback(singersPage)
	})
}

export function getSongsBySinger({commit}, {url, callback = () => {}}) {
	axios.get(urls.PROXY + url).then(res => {
		let songs = factory.KGSongsBySinger(res)
		commit(types.GET_SONGS_BY_SINGER, {
			songs
		})
		callback(songs)
	})
}

export function getInitMusicList({commit}, callback = () => {}) {
	axios.get('').then(res => {
		let musicList = res.data.list
		commit(types.INIT_MUSIC_LIST, {
			musicList
		})
		callback()
	}) 
}

export function getSongSource({commit, state}, {data, callback = () => {}, quality}) {
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

		commit(types.GET_SONG_SOURCE, {
			readySong: data
		})
		callback(data)
	})
}

export function operatePlayNew({commit, state}, {data, callback = () => {}}) {
	let songList = state.songList
	operateFuncs.add(songList, data)
	commit(types.OPERATE_COMMIT, {
		songList
	})
	callback(data)
}

export function operatePlay({commit, state}) {
	if(!state.readySong.play_url) return
	let config = state.config
	config.status = songStatus.PLAY
	operateFuncs.setConfig(config)
	commit(types.OPERATE_PLAY, {
		config
	})
}

export function operatePause({commit, state}) {
	let config = state.config
	config.status = songStatus.PAUSE
	operateFuncs.setConfig(config)
	commit(types.OPERATE_PAUSE, {
		config
	})
}

export function operateStop({commit, state}) {
	let config = state.config
	config.status = songStatus.STOP
	operateFuncs.setConfig(config)
	commit(types.OPERATE_STOP, {
		config
	})
}

export function operateAdd({commit, state}, {data, callback = () => {}}) {
	let songList = state.songList
	operateFuncs.add(songList, data)
	commit(types.OPERATE_COMMIT, {
		songList
	})
	callback()
}

export function operateRemove({commit, state}, {data}) {
	let songList = state.songList
	operateFuncs.remove(songList, data)
	commit(types.OPERATE_COMMIT, {
		songList
	})
}

/**
 * 下一曲操作1
 * @param  {[type]}   options.commit   [description]
 * @param  {[type]}   options.state    [description]
 * @param  {[Boolean]}   options.isAuto   [是否是播放器播放结束后自动播放下一首]
 * @param  {Function} options.callback [回调函数]
 */
export function operateNext({commit, state}, {isAuto, callback =() => {}}) {
	let songList = state.songList
	let readySong = operateFuncs.next(songList, state.readySong, state.config.mode, isAuto)
	callback(readySong)
}

export function operatePrev({commit, state}, {callback =() => {}}) {
	let songList = state.songList
	let readySong = operateFuncs.prev(songList, state.readySong, state.config.mode)
	callback(readySong)
}

export function changePlayMode({commit, state}) {
	let config = operateFuncs.changePlayMode(state.config)
	commit(types.CHANGE_PLAY_MODE, {
		config
	})
}

export function changeSongQuality({commit, state}, {quality, callback = () => {}}) {
	let config = state.config
	if(config.quality == quality) return
	config.quality = quality
	operateFuncs.setConfig(config)
	commit(types.CHANGE_SONG_QUALITY, {
		config
	})
	callback(quality)
}

export function getLrc({commit}, {hash, callback = () => {}}) {
	let url = urls.SONG_LRC_URL + hash
	axios.get(url).then(res => {
		callback(res)
	})
}

export function initSongList({commit}) {
	let songList = operateFuncs.getSongList()
	commit(types.OPERATE_COMMIT,  {
		songList
	})
}
export function initPlayerInfo({commit}, callback = () => {}) {
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
	config.status = songStatus.PAUSE
	operateFuncs.setConfig(config)
	commit(types.INIT_PLAYER_INFO, {
		readySong,
		config
	})
}

export function getFm({commit}, callback = () => {}) {
	axios.get(urls.KG_FM_URL).then(res => {
		let KGFM = factory.KGFM(res)
		commit(types.GET_FM, {
			KGFM
		})
		callback(KGFM)
	})
}

export function getSongSheet({commit}, callback = () => {}) {
	axios.get(urls.KG_SONG_SHEET_URL).then(res => {
		let KGSongSheet = factory.KGSongSheet(res)
		commit(types.GET_SONG_SHEET, {
			KGSongSheet
		})
		callback(KGSongSheet)
	})
}

export function getSpecialList({commit}, {url, callback}) {
	axios.get(urls.PROXY + url).then((res) => {
		let data = factory.KGSongSheet(res)
		callback(data.sheets)
	})
}

export function getSpecialMold({commit}) {
	axios.get(urls.KG_SPECIAL_MOLD).then((res) => {
		let list = factory.KGSpecialMold(res)
		commit(types.GET_SPECIAL_MOLD, {
			specialMold: list
		})
	})
}

export function searchSpecial({commit}, {id, callback = () => {}}) {
	axios.get(urls.SEARCH_SPECIAL + id + '.html').then(res => {
		let data = factory.KGSongsBySheet(res)
		callback(data)
	})
}


export function getHotKeyword({commit}, callback = () => {}) {
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
		commit(types.GET_HOT_KEYWORD, {
			hotKeywords
		})
		callback(hotKeywords)
	})
}
//关键字专辑
export function getAlbumByKeyword({commit}, {data, callback}) {
	let param = $.param(data)
	axios.get(urls.ALBUM_BY_KEYWORD + param).then(res => {
		let albums = JSON.parse(util.jsonpHandler(res)).data.lists
		callback(albums)
	})
}
//关键字查MV
export function getMVByKeyword({commit}, {data, callback}) {
	let param = $.param(data)
	axios.get(urls.ALBUM_BY_KEYWORD + param).then(res => {
		let mvs = JSON.parse(util.jsonpHandler(res)).data.lists
		callback(mvs)
	})
}
//获取关键字提示
export function searchTip({commit}, {keyword, callback}) {
	axios.get(urls.SEARCH_TIP+$.param({keyword})).then((res) => {
		callback(res.data[0].RecordDatas)
	})
}
//查询歌单列表
export function searchSpecialList({commit}, {param, callback}) {
	axios.get(urls.SEARCH_SPECIAL_LIST + $.param(param)).then((res) => {
		callback(res.data)
	})
}
//查询专辑
export function searchAlbumList({commit}, {param, callback}) {
	axios.get(urls.ALBUM_SEARCH + $.param(param)).then((res) => {
		callback(res.data)
	})
}
//查询mv列表
export function searchMVList({commit}, {param, callback}) {
	axios.get(urls.SEARCH_MV + $.param(param)).then((res) => {
		var list = res.data.lists
		for (var i = 0; i < list.length; i++) {
			list[i].img = urls.MV_PIC + list[i].Pic.substring(0, 8) + '/' + list[i].Pic
			list[i].duration = util.toMin(list[i].Duration)
		}
		res.data.lists = list
		callback(res.data)
	})
}

//获取专辑歌曲列表
export function searchAlbum({commit}, {id, callback}) {
	axios.get(urls.ALBUM_JUMP + id + "-92.html").then((res) => {
		let albumDetail = factory.handleAlbumJump(res)
		callback(albumDetail)
	})
}
//获取酷狗官网首页的新歌模块
export function getKGHomeNewSong({commit}) {
	axios.get(urls.KG_HOME).then((res) => {
		var data = factory.KGHomeNewSong(res)
		commit(types.GET_KG_HOME_NEWSONG, {
			homeNewSong: data
		})
	})
}

export function getKGStarAnchorList({commit}) {
	axios.get(urls.KG_STARANCHOR_LIST).then((res) => {
		var list = factory.KGStarAnchorList(res)
		commit(types.KG_STARANCHOR_LIST, {
			starAnchorList: list
		})
	})
}

export function getKGStarAnchorLive({commit}, {id, callback}) {
	axios.get(urls.KG_STARANCHOR_LIST + '/' + id).then((res) => {
		var data = factory.KGStarAnchorLive(res)
		callback(data)
	})
}

export function getKGStarAnchorData({commit}, {id, type, callback}) {
	axios.get(urls.KGStarAnchor(id, type)).then((res) => {
		callback(res)
	})
}