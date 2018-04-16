import Vue from 'vue'
import * as types from './mutation-types'

export default {
	[types.HOME_NEW] (state, {news}) {
		Vue.set(state, 'news', news)
		console.log(state.news)
	}
}