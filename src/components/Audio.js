import * as urls from '../store/remote-urls'
import * as status from '../utils/song-status'
import { numberToSlong } from '../utils/common'


class MusicPlayer {
	constructor() {
		this.isPlaying = false
		this.list = []
		this.currMusic = null
		this.audio = new Audio()
	}
	linkComponent(component) {
		this.comp = component
		let { slideBar } = this.comp.tools
		slideBar.addEventListener('click', (e) => {  })
		slideBar.addEventListener('change', (e) => {
			this.audio.currentTime = e.target.value
			slideBar.touch = false
		})
		slideBar.addEventListener('mousedown', (e) => { e.target.touch = true })
		slideBar.addEventListener('input', (e) => { this.comp.$set(this.comp.attr, 'currentTime', numberToSlong(e.target.value)) })
		this.audio.addEventListener('loadedmetadata', (e) => { this.setDuration(e.target.duration) })
		this.audio.addEventListener('timeupdate', (e) => {
			if(slideBar.touch != true) {
				this.setCurrTime()
			}
		})
	}
	linkPlayList(component) {
		this.listComp = component
		this.listComp.update(this.list, this.currMusic)
	}
	play() {
		if(this.isPlaying) return
		this.audio.play()
		this.isPlaying = true
		this.setStatus(status.PLAY)
	}
	pause() {
		if(!this.isPlaying) return
		this.audio.pause()
		this.isPlaying = false
		this.setStatus(status.PAUSE)
	}
	stop() {
		if(this.isPlaying) { this.pause() }
		this.audio.currentTime = 0
		this.setStatus(status.NORMAL)
	}
	ready(music) {
		this.stop()
		this.currMusic = music
		this.audio.src = music.music.data.songurl
		this.comp.pageRender(music.music.data)
		this.play()
	}
	playNext() {
		if(this.currMusic.index < this.list.length - 1){
			this.ready(this.list[currMusic.index + 1])
		}
	}
	playPrev() {
		if(this.currMusic.index > 0) {
			this.ready(this.list[this.currMusic.index - 1])
		}
	}
	add(music, isPlay = false) {
		let newMusic = {
			index: this.list.length,
			music: music
		}
		this.list.push(newMusic)
		this.listComp.update(this.list, this.currMusic)
		if(isPlay) {
			this.ready(newMusic)
			return
		}
		if(!this.currMusic) {
			this.ready(this.list[0])
		}
	}
	setStatus(status) {
		if(this.currMusic) { this.currMusic.music.component.setStatus(status) }
		if(this.comp) { this.comp.setStatus(status) }
	}
	setDuration(_duration) {
		this.comp.setDuration(numberToSlong(_duration))
		this.comp.tools.slideBar.setAttribute('max', _duration)
	}
	setCurrTime() {
		this.comp.setCurrTime(numberToSlong(this.audio.currentTime))
		this.comp.tools.slideBar.value = this.audio.currentTime
	}
}

let musicPlayer = new MusicPlayer()

export {musicPlayer}