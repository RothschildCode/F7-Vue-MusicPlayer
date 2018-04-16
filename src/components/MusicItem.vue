<template>
	<li :class="'swipeout music-item ' + (data&&readySong&&data.ID==readySong.ID ? 'playing' : '')">
		<div class="swipeout-content" @click="click(data)">
			<div class="item-content">
				<div class="item-media">
					<!-- <span v-if="!data.ID||!readySong.ID||data.ID!=readySong.ID" class="fa fa-music fa-1x"></span> -->
					<span v-if="data&&readySong&&data.ID==readySong.ID && (config.status == 'PLAY')" class="fa fa-play-circle-o fa-1x"></span>
					<span v-if="data&&readySong&&data.ID==readySong.ID&& config.status == 'LOADING'" class="fa fa-circle-o-notch fa-spin"></span>
					<span v-if="data&&readySong&&data.ID==readySong.ID&& config.status == 'PAUSE'" class="fa fa-pause fa-1x"></span>
				</div>
				<div class="item-inner">
					<div class="item-title">
						<div class="ellipsis">
							<span class="song-name" v-html="data.SongName"></span>
						</div>
						<div class="ellipsis">
							<span v-if="data.ResFileHash&&!list" class="flag flag-RES align-self-middle">无损</span>
							<span class="singer-name" v-if="data.SingerName" v-html="data.SingerName"></span>
							<span class="album-name" v-if="data.AlbumName" v-html="'《' + data.AlbumName + '》'"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="swipeout-actions-right">
			<a v-if="!list" @click="menuClick(data)" class="bg-blue">
				<span class="fa fa-bars fa-1x"></span>
			</a>
			<a v-if="list" @click="removeFromList(data)" class="bg-red">
				<span class="fa fa-remove fa-1x"></span>
			</a>
		</div>
	</li>
</template>

<style lang="less">
	@import '../css/mixins.less';

	.music-item {
		.singer-name{
			margin-right: 5px;
			color: #999;
		}
		.album-name{
			color:@mainColor;
		}
		em {
			font-style: inherit;
			// color: @mainColor;
		}
		.item-title {
			font-size: @songNameSize;
			> div {
				&:nth-child(1) {

				}
				&:nth-child(2) {
					font-size: .6rem;
				}
			}
		}
		.item-subtitle {
			font-size: @singerNameSize;
		}
		.item-inner {
			// display: block;
		}
		&.playing {
			.item-media,.item-title,.item-subtitle {
				color: @mainColor;
			}
		}
		.flag{
			font-size: .5em;
			color: #A2A2A2;
			padding: 0 4px;
			border-radius: 2px;
			margin-left: 5px;
			display: inline-block;
		}
		.flag-HQ {
			background-color: #2bd56f;
		}
		.flag-SQ {
			background-color: #ee113d;
		}
		.flag-RES{
			border: solid #A2A2A2 1px; 
		}
	}
</style>

<script>
	import {musicPlayer} from './Audio'
	import * as types from '../utils/music-type'
	import * as songStatus from '../utils/song-status'
	import * as operates from '../utils/operate-type'

	import {mapState} from 'vuex'

	export default {
		props: {
			data: {
				type: Object,
				default() {
					return {}
				}
			},
			list: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		computed: {
			...mapState({
				readySong: state => state.player.readySong,
				config: state => state.player.config
			})
		},
		methods: {
			menuClick(data)  {
				let _this = this
				let buttons = []
				buttons = [
					{
						text: '播放歌曲',
						onClick: () => {
							_this.click(data)
						}
					},
					{
						text: '加到歌单',
						onClick: function() {
							_this.add(_this.data)
						}
					}
				]
				let buttonsCancel = [
					{
						text: '取消',
						color: 'red',

					}
				]
				let groups = [buttons, buttonsCancel]
				this.$f7.actions(groups)
			},
			click(data) {
				this.$store.dispatch('player_add', {data})
				this.$store.dispatch('player_quality', {quality: 'NORMAL'})
				this.$store.dispatch('player_source', {
					data,
					callback: () => {
						this.$store.dispatch('player_play')
					}
				})
			},
			add(data) {
				this.$store.dispatch('player_add', {
					data
				})
			},
			removeFromList(data) {
				this.$store.dispatch('player_remove', {
					data
				})
			}
		}
	}
</script>