<template>
	<f7-page navbar-fixed toolbar-fixed class="song-list-sheet">
		<navbar page="song-list-sheet" :title="info.detail.name"></navbar>
		<header-cover :src="info.img" :labels="[info.detail.name, info.detail.language, info.detail.company, info.detail.publishTime]"></header-cover>
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
	import HeaderCover from '../components/HeaderCover'

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
			HeaderCover,
			MusicList
		}
	}
</script>	