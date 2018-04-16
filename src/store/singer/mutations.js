import Vue from 'vue'
import * as types from './mutation-types'

export default {
	[types.SINGER_AREAS](state, {areas}) {
		Vue.set("areas", areas)
	}
}