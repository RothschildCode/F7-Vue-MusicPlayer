<template>
	<div class="singer-classify-view">
		<div class="list-block">
			<ul>
				<li class="singer-classify-item" v-for="item in areas" @click="routerToSinger(item)">
					<a href="#" class="item-link item-content">
						<div class="item-inner">
							<div class="item-title" v-html="item.text"></div>
							<div class="item-after"></div>
						</div>
					</a>
				</li>				
			</ul>			
		</div>
	</div>
</template>

<style lang="less">
	.singer-classify-view {

		.singer-classify-item{
			line-height: 4rem;
		}		
	}
</style>

<script>
	// import SingerClassifyList from '../local/json/singer_classify.json'
	import {mapState} from 'vuex'
	export default {
		// computed: {
		// 	...mapState({
		// 		areas: state => state.singer.areas
		// 	})
		// },
		data() {
			return {
				areas: []
			}
		},
		mounted() {
			var _this = this
			this.$store.dispatch('singer_areas', {
				callback: function(data) {
					_this.areas = data
				}
			})
		},
		methods: {
			routerToSinger(data) {
				this.$f7.mainView.router.load({url: `/singer-list/?url=${data.url}&title=${data.text}`})
			}
		}
	}
</script>