<template>
	<div :class="'navbar' + (this.conf.dynimicBg?' dynimic-opacity':'')">
		<div id="navbarBg" class="bg"></div>
		<div class="navbar-inner">
			<div class="left">
				<a v-if="conf.return" href="" class="link icon-only back">
					<i class="fa  fa-angle-left fa-2x"></i>
				</a>
			</div>
			<div class="center">
				<span v-if="conf.title">{{ title }}</span>
				<!-- <input v-if="conf.search" type="text" placeholder="歌曲名/歌手名" v-model="keyword"> -->
			</div>
			<div class="right">
				<!-- <a v-if="search" class="link icon-only" @click="onSearch()">
					搜索
				</a> -->
			</div>
		</div>
	</div>
</template>

<script>
	import {config} from '../utils/navbar-config'
	// import {e, EVENT} from '../e'
	export default {
		// data() {
		// 	return {
		// 		keyword: ''
		// 	}
		// },
		props: {
			title: "",
			page: {
				type: String,
				default() {
					return "library"
				}
			}
		},
		// computed: {
		// 	...mapState({
		// 		hotKeywords: state => state.hotKeywords
		// 	})
		// },
		created() {
			this.conf = config[this.page]
			// $("#keywordInput").focus((e) => {
			// 	if(this.keyword != "") {
			// 		// this.viewState = 2
			// 		e.$emit(EVENT.SEARCH.KEY_TOUCH, 2)
			// 	}else {
			// 		// this.viewState = 1
			// 		e.$emit(EVENT.SEARCH.KEY_TOUCH, 1)
			// 	}
			// })
			// $("#keywordInput").focus()

			// this.$watch("keyword", () => {
			// 	if(this.keyword == "") {
			// 		// this.viewState = 1
			// 		e.$emit(EVENT.SEARCH.KEY_TOUCH, 1)
			// 	}else {
			// 		// this.viewState = 2
			// 		e.$emit(EVENT.SEARCH.KEY_TOUCH, 2)
			// 		// this.queryTip()
			// 	}
			// })
		},
		mounted() {
			if(this.conf.dynimicBg) {
				$(".page-content").scroll((e) => {
					let scrollTop = e.target.scrollTop
					let opacity = scrollTop/100 < 1 ? scrollTop/100 : 1
					$("#navbarBg").css("opacity", opacity)
				})
			}
		},
		methods: {
			// onSearch() {
			// 	e.$emit(EVENT.SEARCH.SEARCH_BTN_TOUCH, this.keyword)
			// }
		}
	}
</script>