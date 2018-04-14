<template>
	<f7-block class="no-margin-top">
		<div class="ranking-list">
			<ranking-item v-for="(ranking, index) in rankings" :key="index" :data="ranking"></ranking-item>
		</div>			
	</f7-block>
</template>

<style>
	.ranking-list {
		background-color: #fff;
	}
</style>

<script>
	import RankingItem from '../components/RankingItem'
	import {mapState} from 'vuex'
	export default {
		computed: {
			...mapState({
				rankings: state => state.rankings
			})
		},
		mounted() {
		  this.$store.dispatch('getRanking')
		},
		components: {
			RankingItem
		}
	}
</script>
