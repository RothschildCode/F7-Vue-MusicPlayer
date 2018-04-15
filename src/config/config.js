import cover from '../assets/cd.jpg'

var APP_DEF_CONF = {
	cover,
	authorName: "享受生活",
	songName: "倾听音乐",
	lrcs: "[00:00]倾听音乐[00:00]享受生活",
	mode: "LOOP",
	quality: "NORMAL",
	status: "PAUSE"
}

var VIEW_MODE = [
	{
		id: 1,
		name: "标准模式",
		layout: {
			cover: true,
			lrc: {
				visible: true,
				height: 30
			},
			backBlur: true
		}
	},
	{
		id: 2,
		name: "歌词模式",
		layout: {
			cover: false,
			lrc: {
				visible: true,
				height: 60
			},
			backBlur: true
		}
	},
	{
		id: 3,
		name: "背景模式",
		layout: {
			cover: false,
			lrc: {
				visible: false
			},
			backBlur: false
		}
	}
]

var MENUS = [
	{
		label: "主题",
		event: function() {

		}
	}
]

export {
	VIEW_MODE,
	MENUS,
	APP_DEF_CONF
}