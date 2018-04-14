<template>
	<f7-page navbar-fixed toolbar-fixed class="singer-mold-list">
		<navbar page="singer-mold-list" title="歌手分类"></navbar>
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
	</f7-page>
</template>

<script>
	import Navbar from '../components/Navbar'
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
			routerToSinger(item) {
				this.$f7.mainView.router.load({url: `/singer-list/?url=${item.url}&title=${item.text}`})
			}
		},
		components: {
			Navbar
		}
	}
</script>	