<template>
	<div class="page search-page navbar-fixed toolbar-fixed">
		<div class="navbar">
			<div class="bg"></div>
			<div class="navbar-inner">
				<div class="left">
					<a class="link icon-only back">
						<i class="fa  fa-angle-left fa-2x"></i>
					</a>
				</div>
				<div class="center">
					<input id="keywordInput" type="text" placeholder="歌曲名/歌手名" v-model="keyword">
				</div>
				<div class="right">
					<a class="link icon-only" @click="onSearch()">
						搜索
					</a>
				</div>
			</div>
		</div>

		<div class="page-content">
			<div class="list-block" v-if="viewState == 1">
				<div class="item-content" @click="singerMoldListView()">
					<div class="item-inner">
						<div class="item-title">歌手分类</div>
					</div>
				</div>
			</div>

			<div class="tips" v-if="viewState == 2">
				<div class="list-block">
					<ul>
						<li v-for="(tip, index) in tips" @click="hotKeywordClick(tip.HintInfo)">
							<div class="item-content">
								<div class="item-media">
									<span class="fa fa-search fa-1x"></span>
								</div>
								<div class="item-inner">
									<div class="item-title" v-html="tip.HintInfo"></div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			
			<search-result v-if="viewState == 3" :word="keyword"></search-result>

		</div>

	</div>

</template>

<style lang="less">
	@import "../css/mixins.less";
	.search-page {
		.singer-classify{
			text-align: center;
		}
	}
	.subnavbar {
		background: #fff;
		padding: 0;
	}
	.hot-keyword {
		background-color: white;
		font-size: 1em;
		padding: .5rem;
		.title {
			padding: .4rem 0;
		}
		.k-item {
			padding: .2rem .5rem;
			margin: .2rem;
			color: #333;
			border: 1px solid #333;
			border-radius: 20px;
			display: inline-block;
		}
	}	
	.tips {
		.item-media{
			color: #dbdbdb;
		}
		.item-content {
			font-size: .8rem;
		}
	}
	.search-view {
		.infinite-scroll-preloader{
			margin: 10px 0;
		}
		.page-content {
			padding-top: 0;
		}
	}
	.search-box {
		padding: 1rem;
   		position: relative;
		.search-form {
			border-radius: .5rem;
			-webkit-border-radius: .5rem;
			background-color: #f4f5f7;
			border: #d9d9d9 .1rem solid;
			margin-right: 4rem;
		}
		.search-form:after {
			    content: '';
			    display: block;
			    width: .8rem;
			    height: .8rem;
			    background-image: url(../assets/search-icon.png);
			    background-repeat: no-repeat;
			    background-size: .8rem .8rem;
			    position: absolute;
			    left: 1.5rem;
			    top: 50%;
			    margin-top: -0.3rem;
		}

		.search-keyword {
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			width: 100%;
			outline: 0;
			font-size: .8rem;
			padding: .2rem 1rem .2rem 1.5rem;
			height: 2rem;
			border: 0;
			background-color: rgba(255,255,255,0)
		}

		.search-btn {
			position: absolute;
			width: 3rem;
			height: 2.2rem;
			line-height: 2.2rem;
			bottom: 1rem;
			right: 1rem;
			background-color: #fc9b0b;
			background-image: linear-gradient(to bottom,#fda10d,#f77700);
			font-size: .8rem;
			text-align: center;
			border: 0;
			border-radius: .5rem;
			-webkit-border-radius: .5rem;
			color: #fff
		}

		.search-disabled-btn {
			color: #959595;
			background: #e5e5e5;
		}		
	}
</style>	

<script>
	import Navbar from '../components/Navbar'
	import SearchResult from './SearchResult'
	import vuex, {mapState} from 'vuex'

	// import {eventBus, EVENT} from '../e'

	export default {
		data() {
			return {
				keyword: '',
				loading: false,
				isLastPage: false,
				pageIndex: 1,
				tips: [],
				viewState: 1,
				searchSongs:[]
			}
		},
		computed: {
			...mapState({
				hotKeywords: state => state.hotKeywords
			})
		},
		// created() {
		// 	var _this = this
		// 	this.$on(EVENT.SEARCH.SEARCH_BTN_TOUCH, function(keyword) {
		// 		_this.keyword = keyword
		// 		_this.onSearch()
		// 	})
		// 	this.$on(EVENT.SEARCH.KEY_TOUCH, function(viewState){
		// 		if(viewState != "") {
		// 			_this.queryTip()
		// 		}
		// 		_this.viewState = viewState
		// 	})
		// },
		mounted() {
			$("#keywordInput").focus((e) => {
				if(this.keyword != "") {
					this.viewState = 2
				}else {
					this.viewState = 1
				}
			})
			$("#keywordInput").focus()

			this.$watch("keyword", () => {
				if(this.keyword == "") {
					this.viewState = 1
				}else {
					this.viewState = 2
					this.queryTip()
				}
			})
		},
		methods: {
			onSearch: function(page = 1) {
				this.viewState = 3
				this.$store.dispatch('getSongsByKeyword', {
					data: {
						keyword: this.keyword,
						page
					},
					callback: (searchSongs, isNull) => {
						this.loading = false
						if(isNull) {
							this.$f7.detachInfiniteScroll(this.$$('#searchListScrollLoader'))
							this.isLastPage = true
						}
						let list = new Array();
						if(page == 1) {
							list = searchSongs
						} else {
							list = this.searchSongs.concat(searchSongs)
						}
						this.searchSongs = list
					}
				})
			},
			hotKeywordClick(keyword) {
				this.$set(this, 'keyword', keyword)
				this.onSearch()
			},
			loadMore() {
				this.loading = true
				this.pageIndex++
				this.onSearch(this.pageIndex)
			},
			queryTip() {
				this.$store.dispatch("searchTip", {
					keyword: this.keyword,
					callback: (tips) => {
						this.$set(this, 'tips', tips)
					}
				})
			},
			singerMoldListView() { 
				this.$f7.mainView.router.load({url: `/singerMoldList/`})
			}
		},
		components: {
			Navbar,
			SearchResult
		}
	}
</script>