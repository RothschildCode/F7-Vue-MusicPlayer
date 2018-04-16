<template>
	<div class="home-special">
		<div class="row no-gutter special-list">
			<div v-for="(item, index) in list" class="col-33 special-item">
				<a href="" @click="click(item)">
					<img class="special-img" :src="item.img" alt="" >
					<div class="special-title" v-html="item.title"></div>
					<!-- <span class="sheet-subtitle" v-html="sheet.subtitle"></span> -->
				</a>
			</div>
		</div>
	</div>
</template>

<style lang="less">
	@import "../css/mixins.less";
	.home-special {
		margin-bottom: @bottomBarHeight;
		.special-list {
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
		.special-item {
			padding: 0 .2rem;
			.special-img {
				width: 100%;
			}
			.special-title {
				color: #000;
				font-size: .6rem;
				padding: .2rem 0;
				opacity: .8;
			}
			.special-subtitle {

			}
		}
	}

</style>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				url: this.initUrl,
				list: []
			}
		},
		props: ['initUrl'],
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				this.$store.dispatch('home_special', {
					url: this.url,
					callback: (data) => {
						this.list = data
					}
				})
			},
			click(data) {
				this.$f7.mainView.router.load({url: `/song-list-sheet/?url=${data.url}`})
			}
		}
	}
</script>