<template>
	<div class="library-view">
		<div class="toolbar tabbar">
			<div class="toolbar-inner">
				<a href="#recommend" class="tab-link active">搜索</a>
				<!-- <a href="#ranking" class="tab-link">排行</a> -->
				<!-- <a href="#classify" class="tab-link">分类</a> -->
				<a href="#singer" class="tab-link">歌手</a>
			</div>
		</div>
		<f7-tabs>
		  <f7-tab id="recommend" active @tab:show="tabActived('recommend')">
		  	<library-search-view></library-search-view>
		  </f7-tab>
		  <!-- <f7-tab id="ranking" @tab:show="tabActived('ranking')">
		  	<library-ranking-view></library-ranking-view>
		  </f7-tab>
		  <f7-tab id="classify" @tab:show="tabActived('classify')">
		  	<library-classify-view></library-classify-view>
		  </f7-tab> -->
		  <f7-tab id="singer" @tab:show="tabActived('singer')">
		  	<library-singer-view></library-singer-view>
		  </f7-tab>
		</f7-tabs>
	</div>
</template>

<script>
	import LibrarySearchView from './library-search'
	import LibraryRankingView from './library-ranking'
	import LibraryClassifyView from './library-classify'
	import LibrarySingerView from './library-singer'

	export default {
		data() {
			return {
				activeTab: 'recommend'
			}
		},
		methods: {
			tabActived(tab) {
				this.activedTab = tab
			}
		},
		components: {
			LibrarySearchView,
			LibraryRankingView,
			LibraryClassifyView,
			LibrarySingerView
		}
	}

</script>