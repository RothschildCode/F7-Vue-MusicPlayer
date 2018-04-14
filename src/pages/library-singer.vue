<template>
	<div class="singer-classify-view">
		<div class="list-block">
			<ul>
				<li class="singer-classify-item" v-for="classify in singerClassifies" @click="routerToSinger(classify)">
					<a href="#" class="item-link item-content">
						<div class="item-inner">
							<div class="item-title" v-html="classify.text"></div>
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
		computed: {
			...mapState({
				singerClassifies: state => state.singerClassifies
			})
		},
		mounted() {
			this.$store.dispatch('getSingerClassify')
		},
		methods: {
			routerToSinger(data) {
				this.$f7.mainView.router.load({url: `/singer-list/?url=${data.url}&title=${data.text}`})
			}
		}
	}
</script>