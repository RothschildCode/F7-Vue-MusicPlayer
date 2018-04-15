<template>
	<f7-page navbar-fixed toolbar-fixed>
		<navbar page="singer-post" :title="title"></navbar>
		<div class="list-block">
			<music-list :data="songs" :list="false"></music-list>
		</div>
	</f7-page>
</template>

<script>
	import Navbar from '../components/Navbar'
	import MusicList from '../components/MusicList'
	import {mapState} from 'vuex'

	export default {
		data() {
			return {
				title: {
					type: String,
					default() {
						return ''
					}
				}
			}
		},
		computed: {
			...mapState({
				songs: state => state.songs
			})
		},
		mounted() {
			let query = this.$route.query
			let title = query.title
			let url = query.url
			this.title = title
			this.$f7.showIndicator()
			this.$store.dispatch('getSongsBySinger', {
				url,
				callback: () => {
					this.$f7.hideIndicator()
				}
			})
		},
		components: {
			Navbar,
			MusicList
		}
	}
</script>	