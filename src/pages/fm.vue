<template>
	<div class="singer-classify-view">
		<div class="row">
			<div v-for="fm in KGFM.fmList" class="col-33">
				<a href="" class="fm-item">
					<div class="fm-img">
						<img :src="fm" alt="" width="100%">
					</div>
					<span class="fm-name"></span>
				</a>				
			</div>
		</div>
	</div>
</template>

<style lang="less">
	.singer-classify-view {
		.list-block{
			margin-bottom: 70px;
			margin-top: 5rem;
		}
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
				KGFM: state => state.KGFM
			})
		},
		mounted() {
			this.$store.dispatch('getFm')
		},
		methods: {
			routerToSinger(data) {
				this.$f7.mainView.router.load({url: `/singer/?url=${data.url}&title=${data.text}`})
			}
		}
	}
</script>