import Vuex from 'vuex'
import Vue from 'vue'
import PlayerModule from './player'
import SingerModule from './singer'
import SongsModule from './songs'
import SearchModule from './search'
import SpecialModule from './special'
import MvModule from './mv'
import HomeModule from './home'

Vue.use(Vuex)

var modules = {
  player: PlayerModule,
  singer: SingerModule,
  songs: SongsModule,
  search: SearchModule,
  special: SpecialModule,
  mv: MvModule,
  home: HomeModule
}

export default new Vuex.Store({
  modules
})