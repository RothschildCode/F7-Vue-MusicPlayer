<template>
	<div class="notifications mini-player-view">
		<div class="block-content">
			<div class="row">
				<div class="col-20">
					<img data-popup="#playerPopup" class="album open-popup align-self-middle" :src="readySong.img" width="50">
				</div>
				<div class="col-50 align-self-middle">
					<div class="item-inner">
						<div class="item-title">{{readySong.song_name}}</div>
						<div class="item-subtitle">{{readySong.author_name}}</div>
					</div>
				</div>
				<div class="col-15 align-self-middle">
					<a v-if="config.status == 'PAUSE'" class="fa fa-play fa-1x" @click="play()"></a>
					<a v-if="config.status == 'PLAY'" class="fa fa-pause fa-1x" @click="pause()"></a>
				</div>
				<div class="col-15 align-self-middle">
					<a class="fa fa-step-forward fa-1x" @click="next()"></a>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less">
	@import '../css/mixins.less';
	.mini-player-view{
		width: 100%;
		height: @bottomBarHeight;
		background-color: @miniPlayerColor;
		// border-top: solid #e6e6e6 1px;
		bottom: 0;
		top: auto;
		display: block !important;
		padding: 0;
		z-index: 10999;
		box-shadow: 0 -1px 10px #d2d2d2;
		.album {
			margin: 10px;
			border-radius: 50%;
		}
		a {
			color: #808080;
		}
		.item-title {
			height: 1.6rem;
			line-height: 1.6rem;
			font-size: @miniPlayerTitleSize;
			color: @miniPlayerTitleColor;
			overflow: hidden;
		}
		.item-subtitle {
			color: @miniPlayerSubtitleColor;
			font-size: @miniPlayerSubtitleSize;
		}
	}
</style>

<script type="text/javascript">
	import {mapState} from 'vuex'

	export default {
		computed: {
			...mapState({
				readySong: state => state.player.readySong,
				config: state => state.player.config
			})
		},
		mounted() {
			this.$store.dispatch('player_init')
		},
		methods: {
			pause() {
				this.$store.dispatch('player_pause')
			},
			play() {
				this.$store.dispatch('player_play')
			},
			next() {
				this.$store.dispatch("player_next", {
					isAuto: false,
					callback: (data) => {
						if(data.ID&&this.readySong.ID
							&&data.ID===this.readySong.ID){
							_this.play()
							return
						}
						this.$store.dispatch('player_load', {
							data,
							callback: (_data) => {
								this.$store.dispatch('player_source', {
									hash: _data.ID
								})
							}
						})
					}
				})
			}
		}

	}
</script>