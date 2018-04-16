import Vue from 'vue'
import * as types from './mutation-types'

export default {
	[types.PLAYER_ADDED_LIST_UPDATE] (state, {addedlist}) {
		Vue.set(state, 'addedlist', addedlist)
	},
	[types.PLAYER_LOAD] (state, {readySong}) {
		Vue.set(state, 'readySong', readySong)
	},
	[types.PLAYER_CONFIG_UPDATE] (state, {config}) {
		Vue.set(state, 'config', config)
	},
	[types.PLAYER_INIT] (state, {readySong, config}) {
		Vue.set(state, 'readySong', readySong)
		Vue.set(state, 'config', config)
	}
}