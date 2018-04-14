<template>
	<div class="song-sheet-view">
		<div class="row no-gutter sheet-list">
			<div v-for="data in KGSongSheet.sheets" class="col-33 sheet-item">
				<a href="" @click="click(data)">
					<img class="sheet-img" :src="data.img" alt="" >
					<div class="sheet-title" v-html="data.title"></div>
					<!-- <span class="sheet-subtitle" v-html="sheet.subtitle"></span> -->
				</a>
			</div>
		</div>
	</div>
</template>

<style lang="less">
	@import "../css/mixins.less";
	.song-sheet-view {
		margin-bottom: @bottomBarHeight;
		.sheet-list {
			padding: 1rem .4rem;
		}
		.type-list {
			position: fixed;
			background-color: @mainColor;
			height: 100%;
			color: #fff;
			.type-list-item {
				padding: 1rem;
			}
		}
		.sheet-item {
			padding: 0 .2rem;
			.sheet-img {
				width: 100%;
				background-image: url(../assets/cd.jpg);
			}
			.sheet-title {
				color: #000;
				font-size: .6rem;
				padding: .2rem 0;
				opacity: .8;
			}
			.sheet-subtitle {

			}
		}
	}

</style>

<script>
	import {mapState} from 'vuex'
	import myStorage from '../utils/storeCache'
	export default {
		data() {
			return {
				img: '../assets/cd.jpg'
			}
		},
		computed: {
			...mapState({
				KGSongSheet: state => state.KGSongSheet
			})
		},
		mounted() {
			this.$store.dispatch('getSongSheet')
		},
		methods: {
			click(data) {
				this.$f7.mainView.router.load({url: `/song-list-sheet/?url=${data.url}`})
			}
		}
	}
</script>