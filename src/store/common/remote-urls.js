/**
 * 数据请求代理
 * @type {String}
 */
export const PROXY = 'https://bird.ioliu.cn/v1?url='

export const RANKING_URL = PROXY + 'http://www.kugou.com/yy/html/rank.html'
export const SEARCH_URL = PROXY + 'http://songsearch.kugou.com/song_search_v2?pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&'
//歌手
export const QUERY_SINGER_URL = PROXY + 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&pagesize=100&pagenum=1&g_tk=5381&jsonpCallback=GetSingerListCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'
//歌手分类
export const SINGER_CLASSIFY_URL = '/local/json/singer_classify.json'
//播放器初始数据
export const INIT_PLAYER_INFO_URL = '/config/app.json'
//歌手分类
export const INIT_SINGER_CLASSIFIES_URL = PROXY + 'http://www.kugou.com/yy/html/singer.html'
//歌曲分类
export const SONG_CLASSIFY_URL = PROXY + 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg?g_tk=5381&jsonpCallback=getPlaylistTags&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'
//分类查歌曲
export const CLASSIFY_POST_URL = PROXY + 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&categoryId=165&sortId=5&sin=0&ein=29'
//歌手图片前缀
export const SINGER_ALBUM_URL = PROXY + 'http://y.gtimg.cn/music/photo_new/T002R300x300M000'
//歌曲源
export const SONG_SOURCE_URL = PROXY + 'http://www.kugou.com/yy/index.php?r=play/getdata&'
//歌词
export const SONG_LRC_URL = PROXY + 'http://m.kugou.com/app/i/krc.php?cmd=100&timelength=219000&hash='
//歌单
export const KG_SONG_SHEET_URL = PROXY + 'http://www.kugou.com/yy/special/index/1-5-0.html'
//热词
export const HOT_KEYWORD = PROXY +  "http://so.service.kugou.com/v1/word_nofocus?platform=pc&callback=jQuery180027420813315544534_1494312804509&_=1494312804591"
//关键字查询专辑
export const ALBUM_BY_KEYWORD = PROXY + "http://specialsearch.kugou.com/special_search?callback=jQuery19103894483817897232_1494322572703&pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_=1494322572705"
//关键字提示
export const SEARCH_TIP = PROXY + "http://searchtip.kugou.com/v1/word_recommend?"
//关键字查询歌单s
export const SEARCH_SPECIAL_LIST = PROXY + "http://specialsearch.kugou.com/special_search?"
//关键字查询专辑
export const ALBUM_SEARCH = PROXY + "http://albumsearch.kugou.com/album_search?"
//跳转专辑详情链接
export const ALBUM_JUMP = PROXY + "www2.kugou.kugou.com/yueku/v8/album/single/"

export const SEARCH_SONGS_BY_SHEET = PROXY + "kmr.service.kugou.com/v1/collection/similar"

export const SEARCH_SPECIAL = PROXY + 'http://www.kugou.com/yy/special/single/'

export const SEARCH_MV = PROXY + 'mvsearch.kugou.com/mv_search?'

export const MV_PIC = 'http://imge.kugou.com/mvhdpic/240/'

export const KG_HOME = PROXY + 'www.kugou.com/'

//酷狗星主播板块
export const KG_STARANCHOR_LIST = PROXY + 'live.kugou.com/bo'

//星主播其他信息
//type 0 获取主播人员列表
//type 1 获取粉丝帮
//type 2 获取票数详细
export function KGStarAnchor(id, type) {
	var _s = ''
	switch(type) {
		case 1:
			_s = PROXY + `live.kugou.com/kugoulive/interviewStudio/shineList/3/1/json/callback/${id}/2/1`
			break
		case 2: 
			_s = PROXY + `live.kugou.com/kugoulive/interviewStudio/seatInfo/3/1/json/callback/${id}/2`
			break
	}
	return _s
}

export const KG_MVFM_LIST = PROXY + 'www2.kugou.kugou.com/mv/v9/html/mvradio.html'


export const KG_SPECIAL_MOLD = PROXY + 'www.kugou.com/yy/special/index/1-5-0.html'