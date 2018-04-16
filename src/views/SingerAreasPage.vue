<template>
	<f7-page navbar-fixed toolbar-fixed class="singer-mold-list">
		<navbar page="singer-mold-list" title="歌手分类"></navbar>
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
	</f7-page>
</template>

<script>
	import Navbar from '../components/Navbar'
	import {mapState} from 'vuex'
	export default {
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
			routerToSinger(item) {
				this.$f7.mainView.router.load({url: `/singer-list/?url=${item.url}&title=${item.text}`})
			}
		},
		components: {
			Navbar
		}
	}
</script>	