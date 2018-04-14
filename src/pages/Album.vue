<template>
	<f7-page navbar-fixed toolbar-fixed class="song-list-sheet">
		<navbar page="song-list-sheet" :title="info.detail.name"></navbar>
		<div class="list-cover">
			<div class="back" :style="'background-image:url('+info.img+')'"></div>
			<div class="row wrapper">
				<div class="col-30">
					<img class="sheet-img" :src="info.img" alt="">
				</div>
				<div class="col-70">
					<div class="sheet-name ellipsis" v-html="info.detail.name"></div>
					<div class="sheet-name ellipsis" v-html="info.detail.language"></div>
					<div class="sheet-name ellipsis" v-html="info.detail.company"></div>
					<div class="sheet-name ellipsis" v-html="info.detail.publishTime"></div>
				</div>
			</div>
		</div>
		<div class="list-block">
			<music-list :data="songs" :list="false"></music-list>
		</div>
	</f7-page>
</template>

<style lang="less">
	@import '../css/mixins.less';
	.song-list-sheet {
		.navbar {
			background-color: transparent;
		}
		.page-content{
			margin-top: 0;
		}
	}
</style>

<script>
	import Navbar from '../components/Navbar'
	import MusicList from '../components/MusicList'

	export default {
		data() {
			return {
				info: {detail: {}},
				songs: []
			}
		},
		props: {
			initPageIndex: {
				type: Number,
				default() {
					return 1
				}
			},
			initPageSize: {
				type: Number,
				default() {
					return 10
				}
			}
		},
		mounted() {
			let query = this.$route.query
			this.id = query.id
			this.getData()
		},
		methods: {
			getData() {
				this.$f7.showIndicator()
				this.$store.dispatch('albumJump', {
					id: this.id,
					callback: (album) => {
						this.$f7.hideIndicator()
						this.info = album.info
						this.songs= album.songs
					}
				})
			}
		},
		components: {
			Navbar,
			MusicList
		}
	}
</script>	