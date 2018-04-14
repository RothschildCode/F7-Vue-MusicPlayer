import HTMLResolver from './HTMLResolver'
import KGFMTypes from '../local/json/fm-type'

function HTMLSubstring(res, keyword, patchLen = 2, objType = 'array') {
	let endChar = ';'
	switch(objType) {
		case 'array':
			endChar = ']' + endChar
			break
		case 'object':
			endChar = '}' + endChar
	}
	let beginIndex = res.indexOf(keyword) + (keyword.length + patchLen)
	console.log(beginIndex);
	let endIndex = res.indexOf(endChar, beginIndex) + endChar.length - 1
	console.log(res.substring(beginIndex, endIndex));
	return JSON.parse(res.substring(beginIndex, endIndex))
}

function parseCommonSongObj(songs) {
	$.each(songs, (i, s) => {
		s.FileHash = s.hash
		s.FileSize = s.filesize
		s.SQFileHash = s.hash_320
		s.SQFileSize = s.filesize_320
		s.RESFileHash = s.hash_flac
		s.RESFileSize = s.filesize_flac
		s.ID = s.hash
		s.AlbumID = s.album_id
		s.SongName = s.songname
		s.SingerName = s.singername
	})
	return songs
}

/**
 * 查询电台数据
 * 返回数据：电台列表;电台分类集合
 * @param {[type]} res [description]
 */
export function KGFM(res) {
	let fmList = HTMLSubstring(res, "radioData")
	return {
		fmList,
		types: KGFMTypes
	}
}
/**
 * 根据歌手查询歌曲列表
 * @param {[type]} res [description]
 */
export function KGSongsBySinger(res) {
	let songs = HTMLSubstring(res, "songsdata")
	songs = parseCommonSongObj(songs)
	return songs
}
/**
 * 根据歌手类型查询歌手
 * 返回对象：歌手列表;分页信息
 * @param {[type]} res [description]
 */
export function KGSingersByType(res) {
	let headDoms = $(res).find("#list_head").find("li")
	let list1Doms = $(res).find("#list1").find("li")
	let myPageDoms = $(res).find("#mypage").find("a[id^='page_']")
	console.log(myPageDoms)
	let singers = new Array()
	let pages = new Array()
	//添加第一页到总页数对象
	pages.push({url: "", pageIndex: 1})

	$.each(headDoms, (index, d) => {
		singers.push({
			singerName: $(d).find(".pic").attr("title"),
			singerAlbum: $(d).find(".pic").find("img").attr("_src"),
			url: $(d).find(".pic").attr("href"),
			index: index
		})
	})
	$.each(list1Doms, (index, d) => {
		singers.push({
			singerName: $(d).find("a").attr("title"),
			// singerAlbum: $(d).find(".pic").find("img").attr("src"),
			url: $(d).find("a").attr("href"),
			index: parseInt($(d).find(".ran").html())
		})
	})

	$.each(myPageDoms, (index, d) => {
		if(!isNaN(parseInt($(d).html()))) {
			pages.push({
				url: $(d).attr("href"),
				pageIndex: $(d).html()
			})
		}
	})

	return {
		singers: singers, 
		pages: pages
	}
}
/**
 * 获取歌单数据
 * 返回数据：歌单列表;歌单类型集合
 * @param {[type]} res [description]
 */
export function KGSongSheet(res) {
	let sheetTypeDoms = $(res).find("#dl").find("a")
	let sheetsDoms = $(res).find("#ulAlbums").find("li")
	let sheetTypes = new Array()
	let sheets = new Array()
	$.each(sheetTypeDoms, (i, d) => {
		sheetTypes.push({
			name: $(d).attr("title"),
			url: $(d).attr("href")
		})
	})
	$.each(sheetsDoms, (i, d) => {
		sheets.push({
			url: $(d).find(".top").find("a").attr("href"),
			img: $(d).find("img").attr("_src"),
			creater: $(d).find(".top").find("em").html(),
			title: $(d).find(".top").find("a").html(),
			subtitle: $(d).find(".text").html()
		})
	})
	return {
		sheets,
		sheetTypes
	}
}
/**
 * 根据歌单获取歌曲数据
 * 返回数据：歌曲列表;歌单信息
 * @param {[type]} res [description]
 */
export function KGSongsBySheet(res) {
	var listResolver = new HTMLResolver({
			start: '[',
			end: 'specialData',
			startRollLen: 1,
			endRollLen: 1,
			res
		}),
		dataResolver = new HTMLResolver({
			start: 'specialData =',
			end: ';',
			res
		})

	return {
		list: parseCommonSongObj(listResolver.object()),
		data: dataResolver.eval()
	}
}

/**
 * 获取酷狗排行榜
 * @param {[type]} res [description]
 */
export function KGRanking(res) {
	var $res = $(res);
	let rankings = new Array();
	let rankingDomList = $res.find(".pc_rank_sidebar.pc_rank_sidebar_first").find("ul").find("li");
	$.each(rankingDomList, (i, r) => {
		let $r = $(r)
		rankings.push({
			rankingName: $r.find("a").attr("title"),
			rankingLink: $r.find("a").attr("href")
		})
	})

	return rankings
}

export function handleAlbumJump(res) {
	return {
		data: {
			img: $(res).find(".loadPic").attr("src"),
			name: $(res).find(".intro").find(".detail").find("strong").attr("title"),
			language: $(res).find("#language").html(),
			company: $(res).find("#company").html(),
			publicTime: $(res).find("#publish_time").html(),
			text: $(res).find("#intro_text").html()
		},
		list: parseCommonSongObj(HTMLSubstring(res, "data = ", 0)),
	}
}

export function KGHomeNewSong(res) {
	var $tabs = $(res).find('#SongtabContent ul')
	var region = [
		{
			id: 'cn',
			name: '华语'
		},
		{
			id: 'useuro',
			name: '欧美'
		},
		{
			id: 'kor',
			name: '韩国'
		},
		{
			id: 'jp',
			name: '日本'
		}
	]
	var map = {}
	for (var i = 0; i < region.length; i++) {
		var $tab = $($tabs[i])
		var songs = new Array()
		var $songs = $tab.find('li')
		for (var j = 0; j < $songs.length; j++) {
			var $song = $($songs[j])
			var song = JSON.parse($song.attr('data'))
			song.SongName = song.FileName.split('-')[1].trim()
			song.SingerName = song.FileName.split('-')[0].trim()
			song.FileHash = song.Hash
			song.FileSize = song.size
			song.ID = song.Hash
			song.AlbumID = song.albumId
			songs.push(song)
		}
		map[region[i].id] = songs
	}
	return {
		region,
		map
	}
}

//酷狗星主播板块
export function KGStarAnchorList(res) {
	var $list = $(res).find('.index_list_box.clearfix li')
	var list = []
	for (var i = 0; i < $list.length; i++) {
		var $item = $($list[i])
		list.push({
			id: $item.find('.img_link.super_jump').data('concertid'),
			img: $item.find('.img_link.super_jump img').attr('_src'),
			title: $item.find('.title.super_jump').html(),
			watched: $item.find('.num_txt').html(),
			time: $item.find('.time').html()
		})
	}
	return list
}

export function KGStarAnchorLive(res) {

	var resolver = new HTMLResolver({
		start: 'g_liveData =',
		end: ';',
		res
	})
	var $commentList = $(res).find('#commentListBox li')
	var commentList = []
	for (var i = 0; i < $commentList.length; i++) {
		var $c = $($commentList[i])
		commentList.push({
			img: $c.find('.imgbox.nick_name_super_jump img').attr('src'),
			nickname: $c.find('.nick_name.nick_name_super_jump').html(),
			time: $c.find('.time').html(),
			txt: $c.find('.txt').html()
		})
	}

	var data = resolver.object()
	data.reviewHash = JSON.parse(data.reviewHash)

	return {
		commentList,
		data,
		video: data.reviewHash[0]
	}
}

export function KGSpecialMold(res) {
	var $molds = $(res).find('#dl a')
	var molds = new Array()
	for (var i = 0; i < $molds.length; i++) {
		var $mold = $($molds[i])
		molds.push({
			text: $mold.html(),
			url: $mold.attr('href')
		})
	}
	return molds
}