<template>
	<div class="star-anchor-list">
		<div class="content-block">
			<div class="content-block-inner">
				<div class="row">
					<div v-for="(item, index) in starAnchorList" class="col-50" @click="click(item)">
						<div class="list-item">
							<img :src="item.img">
							<div class="list-item-inner">
								<div class="list-item-title" v-html="item.title"></div>
							</div>
							<div class="list-item-inner">
								<span class="list-item-watched" v-html="item.watched"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less">
	.star-anchor-list {
		.list-item {
			margin-bottom: 1em;
			border: solid 1px #d2d2d2;
			border-radius: 4px;
			box-shadow: 1px 1px 4px #d2d2d2;
			img {
				width: 100%;
			}
			.list-item-inner {
				padding: .2em .4em;
				.list-item-title {
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
				}
				.list-item-watched {
					font-size: .8em;
					color: #999;
				}
			}
		}
		.content-block {
			margin-top: 0;
			margin-bottom: 4em;
		}
	}
</style>


<script>
	import vuex, {mapState} from 'vuex'

	export default {
		computed: {
			...mapState({
				starAnchorList: state => state.starAnchorList
			})
		},
		mounted() {
			this.$store.dispatch('getKGStarAnchorList')
		},
		methods: {
			click(data) {
				this.$f7.mainView.router.load({url: `/staranchor/?id=${data.id}`})
			}
		}
	}
</script>