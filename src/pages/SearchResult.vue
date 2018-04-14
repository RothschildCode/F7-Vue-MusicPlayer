<template>
	<div class="search-result">
		<div class=" navbar buttons-row subtoolbar">
			<a href="#single" class="button tab-link active">单曲</a>
			<a href="#sheets" class="button tab-link">歌单</a>
			<a href="#album" class="button tab-link">专辑</a>
			<a href="#mv" class="button tab-link">MV</a>
		</div>

		<div class="page-content">
			<div class="tabs">
			  <div id="single" class="tab active">
				<div id="searchListScrollLoader" class="page-content infinite-scroll search-view">	
					<div class="list-block" v-if="keyword!=''&&keyword!=null">
						<music-list id="song-list" :data="searchSongs"></music-list>
					</div>
					<div class="infinite-scroll-preloader">
						<div v-if="loading&&!isLastPage" class="preloader"></div>
						<div v-if="!loading&&!isLastPage"><span  @click="loadMore()">加载更多</span></div>	
						<div v-if="isLastPage" v-html="'没有更多了>_<|||'"></div>
					</div>
				</div>	
			  </div>
			  <div id="sheets" class="tab">
			  	<music-set-list :keyword="keyword" :initSetType="1"></music-set-list>
			  </div>
			  <div id="album" class="tab">
				<music-set-list :keyword="keyword" :initSetType="2"></music-set-list>
			  </div>
			  <div id="mv" class="tab">
				<music-set-list :keyword="keyword" :initSetType="3"></music-set-list>
			  </div>
			</div>			
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
	.search-result {
		.tabs .tab {
			-webkit-overflow-scrolling: touch;
			height: -webkit-fill-available;
			height: fill-available;
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
	import MusicList from '../components/MusicList'
	import MusicSetList from './modules/search/MusicSetList'
	import vuex, {mapState} from 'vuex'

	export default {
		data() {
			return {
				keyword: this.word,
				loading: false,
				isLastPage: false,
				pageIndex: 1,
				searchSongs:[]
			}
		},
		props: ['word'],
		computed: {
			...mapState({
				hotKeywords: state => state.hotKeywords
			})
		},
		mounted() {
			this.onSearch()
		},
		methods: {
			onSearch: function(page = 1) {
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
			MusicList,
			MusicSetList
		}
	}
</script>