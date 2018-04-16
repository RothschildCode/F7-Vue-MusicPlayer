<template>
	<li class="singer-item">
		<a href="#" class="item-link item-content" @click="click(data)">
			<div class="item-media"><img v-if="data.singerAlbum" class="singer-item-avd" :src="data.singerAlbum"></div>
			<div class="item-inner">
				<div class="item-title-row">
					<div class="item-title" v-html="data.singerName"></div>
				</div>
			</div>
		</a>
	</li>	
</template>

<style lang="less">
	.singer-item {
		.item-link {
			padding-left: 0;
			margin-left: 15px;
		}
		.singer-item-avd {
			// border-radius: 50%;
		}
		.item-title{
			font-size: 16px;
		}
	}
</style>

<script>
	export default {
		props : {
			data: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		methods: {
			click(data) {
				this.$f7.mainView.router.load({url: `/singer-detail/?keyword=${data.singerName}&pic=${data.singerAlbum}`})
			}
		}
	}
</script>