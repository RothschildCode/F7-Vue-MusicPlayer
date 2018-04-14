<template>
  <f7-popup id="playerPopup" class="player-popup">
	<div class="page navbar-fixed">
		<div class="navbar">
		    <div class="navbar-inner">
		        <div class="left">
		        	<a href="" class="link icon-only" @click="close()">
		        		<i class="fa fa-angle-down fa-2x"></i>
		        	</a>
		        </div>
		        <div class="center" v-html="readySong.song_name"></div>
		        <div class="right">
		        	<a href="" class="link icon-only close-popup">
		        		<!-- <i class="fa fa-share-alt fa-1x"></i> -->
		        	</a>
		        </div>
		    </div>
		</div>

		<div class="page-content">
			<div class="singer-info">
				<div class="singer-name">
					<span>{{ readySong.author_name }}</span>
					<a v-if="config.quality=='NORMAL'" class="quality-link" @click="qualityClick()">普通品质</a>
					<a v-if="config.quality=='HQ'" class="quality-link" @click="qualityClick()">高品质</a>
					<a v-if="config.quality=='SQ'" class="quality-link" @click="qualityClick()">超品质</a>
					<a v-if="config.quality=='RES'" class="quality-link" @click="qualityClick()">无损</a>
				</div>
				<img :src="readySong.img" width="50%">
			</div>
			<div class="album-back" id="albumBack" :style="'background-image:url('+readySong.img+')'"></div>
			<div class="overlay"></div>
			<div class="play-lrc-tools" id="playLrcTools">
				<span class="based-line"></span>
			</div>
			<div class="play-lrc" id="playLrc">
				<div v-for="lrcItem in attr.lrc" :class="lrcItem.current ? 'current' : ''">{{ lrcItem.text }}</div>
			</div>
		    	<div class="controls">
		    		<div class="row flex-row-wrap controls-bar">
		    			<div class="col-20 controls-item">
		    				<span class="time">{{ attr.duration }}</span>
		    			</div>
		    			<div class="col-60 controls-item align-self-middle">
		    				<input id="slideBar" class="controls-range" min="0" max="0" type="range">
		    			</div>
		    			<div class="col-20 controls-item">
		    				<span class="time">{{ attr.currentTime }}</span>
		    			</div>
		    		</div>
					<div class="row controls-buttons">
						<div class="col-20 controls-item">
							<a v-if="config.mode == 'LOOP'" @click="changeMode()">
								<i class="fa fa-exchange fa-1x"></i>
							</a>
							<a v-if="config.mode == 'SINGLE'" @click="changeMode()">
								<i class="fa fa-lock fa-1x"></i>
							</a>
							<a v-if="config.mode == 'RANDOM'" @click="changeMode()">
								<i class="fa fa-random fa-1x"></i>
							</a>
						</div>
						<div class="col-20 controls-item">
							<a @click="cut('prev')">
								<i class="fa fa-step-backward fa-1x"></i>
							</a>
						</div>
						<div class="col-20 controls-item">
							<a v-if="config.status=='PLAY'" @click="pause()">
								<i class="fa fa-pause fa-1x"></i>
							</a>
							<a v-if="config.status=='PAUSE'" @click="play()">
								<i class="fa fa-play fa-1x"></i>
							</a>
						</div>
						<div class="col-20 controls-item">
							<a @click="cut('next')">
								<i class="fa fa-step-forward fa-1x"></i>
							</a>
						</div>
						<div class="col-20 controls-item">
							<a href="#" data-panel="right" class="icon-only open-panel link">
								<i class="fa fa-list-ul fa-1x"></i>
							</a>
						</div>
					</div>
		    	</div>
		</div>
	</div>
</f7-popup>

</template>

<style lang="less">
	.player-popup {
		.quality-link {
			font-size: .7em;
			color: white;
			padding: 0 2px;
			border: solid #fff 1px;
			border-radius: 2px;
			opacity: .8;
		}
		.singer-info{
			text-align: center;
			.singer-name {
				color: white;
				font-weight: 400;
				margin: 20px;
			}
		}
		.page-content {
			background: #000;
		}
		.navbar{
			background-color: transparent;
			opacity: .8;
			&:after{
				background-color: transparent;
			}
		}
		.page-content {
			// padding-top: 0;
		}
		.controls {
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			.controls-item {
				text-align: center;
				.controls-range {
					width: 100%;
				}
				input[type=range] {
				    -webkit-appearance: none;
				    width: 100%;
				}
				input[type=range]::-webkit-slider-thumb {
				    -webkit-appearance: none;
				}  
				input[type=range]::-webkit-slider-runnable-track {
				    height: 2px;
				}
				input[type=range]:focus {
				    outline: none;
				}
				input[type=range]::-webkit-slider-thumb {
				    -webkit-appearance: none;
				    height: 12px;	
				    width: 12px;
				    margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
				    background: yellow; 
				    border-radius: 50%; /*外观设置为圆形*/
				}
			}
			.controls-bar {
				.time {
					color: white;
					font-size: 10px;
					opacity: .5;
				}
			}
			.controls-buttons {
				margin: 20px 0;
				a {
					color: #fff;
					font-size: 20px;
				}
			}
		}
		.album-back {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			background-position: center;
			background-size: cover;
			filter: blur(50px);
		}
		.overlay{
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			background-color: #000;
			opacity: .5;
		}
		.play-lrc {
			width: 100%;
			height: 168px;
			position: absolute;
			bottom: 20%;
			overflow-y: scroll;
			z-index: 201;
			div {
				height: 24px;
				color: #fff;
				text-align: center;
				line-height: 24px;
				overflow: hidden;
				opacity: .8;
				&.current {
					color: #1ABDE6;
				}
			}
		}

		.play-lrc-tools{
			display: none;
			width: 100%;
			height: 168px;
			position: absolute;
			bottom: 20%;
			overflow-y: scroll;
			z-index: 200;
			.based-line {
				display: block;
				width: 100%;
				border-top: dashed #fff 1px;
				// background-color: #fff;
				position: fixed;
				opacity: .5;
				-webkit-transform: translateY(8200%);
				-moz-transform: translateY(8200%);
				-ms-transform: translateY(8200%);
				-o-transform: translateY(8200%);
				transform: translateY(8200%);
			}
		}
	}
</style>

<script>
	import {mapState} from 'vuex'
	import * as songStatus from '../utils/song-status'

	import { numberToSlong, slongToNumber } from '../utils/common'
	import * as modes from '../utils/play-mode'


	class Player {
		constructor(component) {
			this.comp = component
			this.audio = new Audio()
			this.playing = false
			this.src = ''
			this.mode = modes.SINGLE
			this.init()
		}
		init() {
			let _this = this
			let { slideBar, lrc, lrcTools } = this.comp.tools
			slideBar.addEventListener('click', (e) => {  })
			slideBar.addEventListener('change', (e) => {
				this.audio.currentTime = e.target.value
				slideBar.touch = false
			})
			slideBar.addEventListener('touchstart', (e) => { e.target.touch = true })
			slideBar.addEventListener('mousedown', (e) => { e.target.touch = true })
			slideBar.addEventListener('input', (e) => { this.comp.$set(this.comp.attr, 'currentTime', numberToSlong(e.target.value)) })

			lrc.addEventListener('touchstart', (e) => { 
				e.target.parentNode.touch = true
				lrcTools.style.display = 'block'
			 }, true)
			lrc.addEventListener('touchend', (e) => { 
				e.target.parentNode.touch = false
				lrcTools.style.display = 'none'
				let scrollH = e.target.parentNode.scrollHeight
				let scrollTop = e.target.parentNode.scrollTop
				if(scrollTop > 0) {
					let lrcIndex = Math.round(scrollTop / 24) <= 0 ? 1 : Math.round(scrollTop / 24)
					this.audio.currentTime = this.comp.attr.lrc[lrcIndex + 3].long
				}
			}, true)
			lrc.addEventListener('mousedown', (e) => { 
				e.target.parentNode.touch = true
				lrcTools.style.display = 'block'
			}, true)
			lrc.addEventListener('mouseup', (e) => { 
				e.target.parentNode.touch = false
				lrcTools.style.display = 'none'
			}, true)
			this.audio.addEventListener('loadedmetadata', (e) => { this.setDuration(e.target.duration) })
			this.audio.addEventListener('timeupdate', (e) => {
				if(slideBar.touch != true) { this.setCurrTime() }
				if(!lrc.touch) { this.comp.dynamicLrc(e.target.currentTime) }
			})
			this.audio.addEventListener('ended', (e) => { this.ended() })
		}
		ended() {
			this.stop()
			this.comp.cut('next', true)
		}
		setSrc(url) {
			this.stop()
			this.src = url
			this.audio.src = this.src
		}
		play() {
			if(this.playing) return
			this.audio.play()
			this.playing = true
		}
		stop() {
			this.pause()
			this.audio.currentTime = 0
		}
		pause() {
			this.audio.pause()
			this.playing = false
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

	export default {
		props: {
			attr: {
				type: Object,
				default() {
					return {
						duration: '00:00',
						currentTime: '00:00',
						status: 0,
						singerName: '',
						song: {},
						lrc: []
					}
				}
			}
		},
		computed: {
			...mapState({
				readySong: state => state.readySong,
				config: state => state.config
			})
		},
		mounted() {
			this.tools = {
				back: document.getElementById('albumBack'),
				slideBar: document.getElementById('slideBar'),
				lrc: document.getElementById('playLrc'),
				lrcTools: document.getElementById('playLrcTools')
			}
			this.audio = new Player(this)
			this.$store.dispatch('initPlayerInfo')
		},
		beforeUpdate() {
			// console.log(this.audio.song.hash + '------' + this.readySong.hash)
			if(this.audio.src!=this.readySong.play_url) {
				this.audio.setSrc(this.readySong.play_url)
				this.loadLrc()
			}
			switch(this.config.status) {
				case songStatus.PAUSE:
					this.audio.pause()
					break
				case songStatus.PLAY:
					this.audio.play()
					break
				case songStatus.STOP:
					this.audio.stop()
			}
		},
		methods: {
			setDuration(_duration) {
				this.$set(this.attr, 'duration', _duration)
			},
			setCurrTime(_currTime) {
				this.$set(this.attr, 'currentTime', _currTime)
			},
			setStatus(status) {
				this.$set(this.attr, 'status', status)
			},
			/**
			 * 加载歌词
			 */
			loadLrc() {
				this.tools.lrc.scrollTop = 0
				this.lrc = new Array()
				let lrc = this.readySong.lyrics
				let lines = lrc.split('[')
				let lrcs = new Array()
				for(let i = 0; i < lines.length; i++) {
					let endIndex = lines[i].indexOf(']')
					let long = slongToNumber(lines[i].substring(0, endIndex))
					let text = lines[i].substring(endIndex + 1)
					lrcs.push({
						long,
						text
					})
				}
				this.$set(this.attr, 'lrc', lrcs)
			},
			/**
			 * 动态歌词
			 * 实现动态歌词高亮跟进
			 * @param  {[type]} currentTime [当前播放时间]
			 */
			dynamicLrc(currentTime) {
				for(let i = 0; i < this.attr.lrc.length; i++) {
					this.attr.lrc[i].current = false
				}
				for(let i = this.attr.lrc.length - 1; i > -1; i--) {
					let lrc = this.attr.lrc[i]
					if(lrc.long <= currentTime.toFixed(2)) {
						lrc.current = true
						if(i > 3) {
							this.tools.lrc.scrollTop = (i - 3) * 24
						}
						break
					}
				}
				this.$set(this.attr, 'lrc', this.attr.lrc)
			},
			/**
			 * 切歌
			 * @param  {[type]} dir [prev/next 上一曲/下一曲]
			 */
			cut(dir = 'next', isAuto = false) {
				let action = ''
				switch(dir) {
					case 'prev':
						action = 'operatePrev'
						break
					case 'next':
						action = 'operateNext'
						break
				}
				let _this = this
				this.$store.dispatch(action, {
					isAuto,
					callback: (data) => {
						if(data.ID&&this.readySong.ID
							&&data.ID===this.readySong.ID){
							_this.play()
							return
						}
						this.$store.dispatch('changeSongQuality', {quality: 'NORMAL'})
						this.$store.dispatch('getSongSource', {
							data,
							callback: () => {
								this.$store.dispatch('operatePlay')
							}
						})
					}
				})
			},
			play() {
				this.$store.dispatch('operatePlay')
			},
			pause() {
				this.$store.dispatch('operatePause')
			},
			close() {
				this.$f7.closeModal('#playerPopup')
			},
			audioHandler() {
				switch(this.song.status) {
					case songStatus.PLAY: 
						break;
				}
			},
			changeMode() {
				this.$store.dispatch("changePlayMode")
			},
			changeQuality(quality) {
				let _this = this
				this.$store.dispatch('changeSongQuality', {
					quality,
					callback: (quality) => {
						_this.$store.dispatch('getSongSource', {
							quality
						})
					}
				})
			},
			qualityClick() {
				let _this = this
				let buttons = new Array()
				if(this.readySong.FileHash&&this.readySong.FileSize > 0) {
					buttons.push({
						text: '普通音质',
						onClick: function() {
							_this.changeQuality("NORMAL")
						}
					})
				}
				if(this.readySong.HQFileHash&&this.readySong.HQFileSize > 0&&this.readySong.HQPrice <= 0) {
					buttons.push({
						text: '高品质',
						onClick: function() {
							_this.changeQuality("HQ")
						}
					})
				}
				if(this.readySong.SQFileHash&&this.readySong.SQFileSize > 0&&this.readySong.SQPrice <= 0) {
					buttons.push({
						text: '超品质',
						onClick: function() {
							_this.changeQuality("SQ")
						}
					})
				}
				if(this.readySong.RESFileHash&&this.readySong.RESFileSize > 0) {
					buttons.push({
						text: '无损',
						onClick: function() {
							_this.changeQuality("RES")
						}
					})
				}
				let buttonsCancel = [
					{
						text: '取消',
						color: 'red',

					}
				]
				let groups = [buttons, buttonsCancel]
				this.$f7.actions(groups)
			}
		}
	}
</script>