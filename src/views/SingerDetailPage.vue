<template>
	<div class="page singer-page navbar-fixed toolbar-fixed">
		<div class="navbar">
			<div class="navbar-inner">
				<div class="left">
					<a class="link icon-only back">
						<i class="fa  fa-angle-left fa-2x"></i>
					</a>
				</div>
				<div class="center">
					
				</div>
				<div class="right">
					
				</div>
			</div>
		</div>		

		<div class="page-content">
			<search-result-view :word="keyword"></search-result-view>
		</div>

	</div>

</template>


<script>
	import Navbar from '../components/Navbar'
	import SearchResultView from './SearchResultView'
	import vuex, {mapState} from 'vuex'

	export default {
		data() {
			return {
				keyword: '',
			}
		},
		created() {
			let query = this.$route.query
			this.keyword = query.keyword
		},
		components: {
			Navbar,
			SearchResultView
		}
	}
</script>