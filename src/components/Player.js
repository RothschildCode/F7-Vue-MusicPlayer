import * as urls from '../store/remote-urls'
import * as status from '../utils/song-status'
import {numberToSlong} from '../utils/common'

class Player {
	constructor() {
		this.isPlaying = false
		this.songList = []
	}
	ready(song) {
		
	}
	play(song) {
		if(!this.isPlaying) {

			this.player.audio.play()
			this.isPlaying = true
			this.setSongStatus(status.SONG_STATUS_PLAYING)
		}
	}
	pause() {
		if(this.isPlaying) {
			this.player.audio.pause()
			this.isPlaying = false
			this.setSongStatus(status.SONG_STATUS_PAUSE)
		}
	}
	stop() {
		if(this.isPlaying) {
			this.pause()
		}
		this.player.audio.currentTime = 0
		this.setSongStatus(status.SONG_STATUS_NORMAL)
	}
	setSongStatus(status) {
		if(this.currentSong) { this.currentSong.setStatus(status) }
		if(this.player) { this.player.$set(this.player.attr, 'status', status) }
	}
	addSong(song) {
		this.songList.push(song)
		if(!this.isPlaying) {
			this.play()
		}
	}
	next() {

	}
	prev() {

	}
	setSong(song, songComponent) {
		this.player.$set(this.player.attr, 'title', song.songname)
		let albumUrl = urls.SINGER_ALBUM_URL + song.albummid + '.jpg'
		this.player.$set(this.player.attr, 'album', albumUrl)
		this.player.back.style.backgroundImage = "url(" + albumUrl + ")"
		if(this.isPlaying) { this.stop() }
		this.player.audio.setAttribute('src', song.songurl)
		this.currentSong = songComponent 
		this.play()
	}
	setPlayTime(time) {

	}
	setAudioComponent(component) {
		this.player = component
		let comp = this.player
		this.player.audio.addEventListener('loadedmetadata', (e) => {
			comp.slideBar.setAttribute('max', e.target.duration)
			comp.$set(comp.attr, 'duration', numberToSlong(e.target.duration))
		})
		this.player.audio.addEventListener('timeupdate', () => {
			if(comp.slideBar.touch == true) return
			comp.slideBar.value = comp.audio.currentTime
			comp.$set(comp.attr, 'currentTime', numberToSlong(comp.audio.currentTime))
		})
		this.player.audio.addEventListener('ended', () => {
			if(comp.slideBar.touch == true) return
			comp.slideBar.value = comp.audio.currentTime
			comp.$set(comp.attr, 'currentTime', numberToSlong(comp.audio.currentTime))
		})
		this.player.slideBar.addEventListener('change', (e) => {
			let target = e.target
			comp.audio.currentTime = target.value
			e.target.touch = false
		})
		this.player.slideBar.addEventListener('mousedown', (e) => {
			e.target.touch = true
		})
		this.player.slideBar.addEventListener('click', (e) => {
			console.log('click')
		})
		this.player.slideBar.addEventListener('input', (e) => {
			comp.$set(comp.attr, 'currentTime', numberToSlong(e.target.value))
		})
	}
}

let player = new Player()

export {player}