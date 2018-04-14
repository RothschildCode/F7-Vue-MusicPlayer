<template>
	<f7-grid no-gutter class="ranking-item">
		<f7-col width="40">
		</f7-col>
		<f7-col width="60">
			<div class="flex-wrap">
				<f7-list class="song-list">
					<f7-list-item class="ranking-title">{{ data.rankingName }}</f7-list-item>
				</f7-list>
			</div>
		</f7-col>
	</f7-grid>
</template>

<style lang="less">
	.list-block ul:before,
	.list-block .item-inner:after,
	.list-block ul:after{
		background-color: transparent;
	}
	.ranking-item {
		padding: 10px 15px;
		// border-bottom: solid #d2d2d2 1px;
		.song-list {
			font-size: 14px;
			margin: 0 !important;
			.ranking-title{
				font-size: 16px;
				font-weight: 700;
				.item-content{
					.item-inner {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
			.item-content{
				padding-left: 0;
				min-height: 0;
				.item-inner {
					padding: 2px 0;
					min-height: 0;
				}
			}

		}
	}
	.ranking-img {
		width: 100px;
		height: 100px;
	}
</style>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default() {
					return {}
				}
			}
		}
	}
</script>