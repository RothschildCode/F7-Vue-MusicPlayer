<template>
	<div>
		<h4>{{ group.categoryGroupName }}</h4>
		<div class="song-classify">
			<div class="group row no-gutter">
				<div class="col-25" v-for="(classify, index) in group.items">
					<div class="group-item" v-html="classify.categoryName" @click="itemClick(classify)"></div>
				</div>
			</div>
		</div>
	</div>
</template>	

<style lang="less">
	.song-classify {
		.group-item {
			background: white;
			margin: 2px;
			padding: 4px 0;
			border: solid #d2d2d2 1px;
			text-align: center;
		}
	}
</style>

<script>
	export default {
		props: {
			group: {
				type: Object,
				default() {
					return []
				}
			}
		},
		methods: {
			itemClick(data) {
				this.$f7.mainView.router.load({url: `/classify-post/?dataKey=${data.categoryId}&title=${data.categoryName}`})
			}
		}
	}
</script>