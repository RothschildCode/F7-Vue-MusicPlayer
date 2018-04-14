<template>
	<div class="page singer-page navbar-fixed toolbar-fixed">
		<navbar :title="title" :page="'singer'"></navbar>
		<div id="scrollLoader" class="page-content infinite-scroll">
			<div class="list-block">
				<ul>
					<singer-item v-for="(singer, index) in singersPage.singers" :key="index" :data="singer" ></singer-item>
				</ul>
			</div>

			<!-- 加载提示符 -->
			<div v-if="!isLastPage" class="infinite-scroll-preloader">
				<div class="preloader"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import SingerItem from '../components/SingerItem'
	import Navbar from '../components/Navbar'

	// import {mapState} from 'vuex'
	import {QUERY_SINGER_URL} from '../store/remote-urls'

	export default {
		data() {
			return {
				title: '',
				loading: false,
				pageIndex: 1,
				isLastPage: false,
				singersPage: {
					type: Object,
					default() {
						return {
							singers: [],
							pages: []
						}
					}
				}
			}
		},
		// computed: {
		// 	...mapState({
		// 		singers: state => state.singers
		// 	})
		// },
		mounted() {
			let query = this.$route.query
			let url = query.url
			this.title = query.title
			console.log(url);
			this.getSingerList(url)
		},
		methods: {
			getSingerList(url) {
				this.$f7.showIndicator()
				this.$store.dispatch('getSingersByClassify', {
					url,
					callback: (singersPage) => {
						this.$f7.hideIndicator()
						this.singersPage = singersPage
						this.$$("#scrollLoader").on("infinite", () => {
							if(this.loading) return

							this.pageIndex++
							this.loading = true
							// this.$f7.showIndicator()
							
							this.$store.dispatch('getSingersByClassify', {
								url: this.singersPage.pages[this.pageIndex - 1].url,
								callback: (singersPageInfo) => {
									// this.$f7.hideIndicator()
									this.loading = false
									this.$set(this.singersPage, 'singers', this.singersPage.singers.concat(singersPageInfo.singers))
								}
							})
							if(this.pageIndex >= this.singersPage.pages.length) {
								this.$f7.detachInfiniteScroll(this.$$('#scrollLoader'))
								this.isLastPage = true
							}
						})
					}
				})
			}
		},
		components: {
			SingerItem,
			Navbar
		}
	}
</script>