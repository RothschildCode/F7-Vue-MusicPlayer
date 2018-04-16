import Vue from 'vue'
import * as types from './mutation-types'
import StoreCache from '../../utils/storeCache'
import find from 'lodash/find'

import * as operateTypes from '../../utils/operate-type'

let cache = new StoreCache('vuex')

export default {
	[types.GET_SONGS_BY_KEYWORD] (state, {searchSongs}) {
		Vue.set(state, 'searchSongs', searchSongs)
	},
	[types.INIT_MUSIC_LIST] (state, {musicList}) {
		Vue.set(state, 'musicList', musicList)
	},
	[types.INIT_SINGER_CLASSIFIES_URL] (state, {singerClassifies}) {
		Vue.set(state, 'singerClassifies', singerClassifies)
	},
	[types.GET_SINGERS_BY_CLASSIFY] (state, {singers}) {
		Vue.set(state, 'singers', singers)
	},
	[types.GET_SONGS_BY_SINGER] (state, {songs}) {
		Vue.set(state, 'songs', songs)
	},
	[types.INIT_SONG_CLASSIFY_LIST] (state, {songClassifyList}) {
		Vue.set(state, 'songClassifyList', songClassifyList)
	},
	[types.INIT_CLASSIFY_POST_LIST] (state, {classifyPostList}) {
		Vue.set(state, 'classifyPostList', classifyPostList)
	},
	[types.GET_RANKING] (state, {rankings}) {
		Vue.set(state, 'rankings', rankings)
	},
	[types.GET_SONG_SOURCE] (state, {readySong}) {
		Vue.set(state, 'readySong', readySong)
	},
	[types.OPERATE_PLAY] (state, {config}) {
		Vue.set(state, 'config', config)
	},
	[types.OPERATE_PAUSE] (state, {config}) {
		Vue.set(state, 'config', config)
	},
	[types.OPERATE_STOP] (state, {config}) {
		Vue.set(state, 'config', config)
	},
	[types.OPERATE_NEXT] (state, {readySong}) {
		Vue.set(state, 'readySong', readySong)
	},
	[types.OPERATE_PREV] (state, {readySong}) {
		Vue.set(state, 'readySong', readySong)
	},
	[types.OPERATE_COMMIT] (state, {songList}) {
		Vue.set(state, 'songList', songList)
	},
	[types.INIT_PLAYER_INFO] (state, {readySong, config}) {
		Vue.set(state, 'readySong', readySong)
		Vue.set(state, 'config', config)
	},
	[types.CHANGE_PLAY_MODE] (state, {config}) {
		Vue.set(state, 'config', config)
	},
	[types.CHANGE_SONG_QUALITY] (state, {config}) {
		Vue.set(state, 'config', config)
	},
	[types.GET_SONG_SHEET] (state, {KGSongSheet}) {
		Vue.set(state, 'KGSongSheet', KGSongSheet)
	},
	[types.GET_SONGS_BY_SHEET] (state, {songSheet}) {
		Vue.set(state, 'songSheet', songSheet)
	},
	[types.GET_HOT_KEYWORD] (state, {hotKeywords}) {
		Vue.set(state, 'hotKeywords', hotKeywords)
	},
	[types.GET_KG_HOME_NEWSONG] (state, {homeNewSong}) {
		Vue.set(state, 'homeNewSong', homeNewSong)
	},
	[types.KG_STARANCHOR_LIST] (state, {starAnchorList}) {
		Vue.set(state, 'starAnchorList', starAnchorList)
	},
	[types.GET_SPECIAL_MOLD] (state, {specialMold}) {
		Vue.set(state, 'specialMold', specialMold)
	}
}