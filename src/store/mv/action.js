import axios from 'axios'
import * as types from './mutation-types'
import * as urls from '../remote-urls'
import * as operateFuncs from '../../utils/song-operate-func'
import * as factory from '../../utils/DataFactory'
import * as util from '../../utils/common'

//查询mv列表
export function mv_list({commit}, {param, callback}) {
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