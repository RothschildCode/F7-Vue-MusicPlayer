<template>
	<div class="new-songs-view">
		<div class="navbar buttons-row subtoolbar" theme-dynamic-render>
			<a v-for="(reg, index) in news.region" :href="'#' + reg.id" class="button tab-link" :class="{active: index == 0}" v-html="reg.name"></a>
		</div>
		<div class="page-content">
			<div class="tabs subtoolbar-fixed">
				<div v-for="(reg, index) in news.region" :id="reg.id" class="tab" :class="{active: index == 0}">
					<div class="list-block">
						<music-list :data="news.map[reg.id]"></music-list>
					</div>
				</div>
			</div>			
		</div>
	</div>
</template>


<script>
	import MusicList from '../components/MusicList'
	import vuex, {mapState} from 'vuex'

	export default {
		computed: {
			...mapState({
				news: state => state.home.news
			})
		},
		mounted() {
			this.$store.dispatch('home_news')
		},
		methods: {
			click(data) {
				this.$f7.mainView.router.load({url: `/song-list-sheet/?url=${data.url}`})
			}
		},
		components: {
			MusicList
		}
	}
</script>