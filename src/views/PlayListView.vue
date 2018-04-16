<template>
	<div id="playListPopup" class="panel panel-right panel-cover play-list-popup">
		<div class="page navbar-fixed">
			<div class="navbar">
			    <div class="navbar-inner">
			        <div class="left">
			        	<a href="" class="link icon-only" @click="close()">
			        		<i class="fa fa-remove fa-1x"></i>
			        	</a>
			        </div>   
			        <div class="center">歌曲列表</div>
			        <div class="right">
			        	<a href="" class="link icon-only">
			        		清空
			        	</a>
			        </div>
			    </div>
			</div>

			<div class="page-content">
				<!-- <div class="album-back" id="albumBack" :style="'background-image:url('+readySong.img+')'"></div> -->
				<!-- <div class="overlay"></div>			 -->
				<div class="list-block no-margin-top">
					<music-list id="song-list" :data="addedlist" :list="true"></music-list>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less">
	.panel-overlay {
		z-index: 11999;
	}
	.play-list-popup{
		// height: 40%;
		z-index: 12000 !important;
		top: inherit;
		bottom: 0 !important;
		background-color: transparent;
		.page{
			// height: 40%;
			position: fixed;
			bottom: 0;
			background-color: transparent;
			.navbar {
				background-color: #000;
				// opacity: .5;
				&:after {
					background-color: #fff;
					opacity: .1;
				}
			}
			.list-block {
				ul {
					background: transparent;
					li {
						color: white;
						font-size: 14px;
						.singer-name {
							opacity: .5;
						}
					}
					.item-content {
						background: transparent;
					}
					&:before,
					&:after {
						display: none;
					}					
				}
				.item-inner:after {
					display: none;
				}
			}
			.album-back {
				filter: blur(30px) !important;
			}
		}
		&:before {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			bottom: 0;
			background-color: #000;
			opacity: .85;
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
	}
</style>

<script>
	import MusicList from '../components/MusicList'
	import {mapState} from 'vuex'

	export default {
		computed: {
			...mapState({
				addedlist: state => state.addedlist,
				readySong: state => state.readySong,
			})
		},
		mounted() {
			this.$store.dispatch("player_addedlist")
		},
		methods: {
			close() {
				this.$f7.closePanel('right')
			}
		},
		components: {
			MusicList
		}
	}
</script>