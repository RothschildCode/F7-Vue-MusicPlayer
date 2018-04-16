import Vue from 'vue'
import * as types from './mutation-types'

export default {
	[types.SONGS_TYPES](state, {types}) {
		Vue.set("types", types)
	},
	[types.SONGS_SONGS](state, {songs}) {
		Vue.set("songs", songs)
	}
}