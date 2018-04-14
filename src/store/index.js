import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import mutations from './mutations'
import StoreCache from '../utils/storeCache'

Vue.use(Vuex)
let cache = new StoreCache('vuex')

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

export default new Vuex.Store({
  state,
  actions,
  mutations
})