import * as actions from './action'
import mutations from './mutations'

const state = {
  searchSongs: {},
  rankings: {},
  songClassifyList: {},
  singerClassifyList: {},
  classifyPostList: {},
  singers: [],
  songList: [],
  readySong: {},
  config: {},
  singerClassifies: [],
  songs: [],
  KGSongSheet: {},
  homeNewSong: {
    region: [],
    map: {}
  },
  starAnchorList: [],
  songSheet: {
  	other: {},
  	songs: []
  },
  lang: cache.get('lang') || 'en'
}

export default {
	state,
	mutations,
	actions
}