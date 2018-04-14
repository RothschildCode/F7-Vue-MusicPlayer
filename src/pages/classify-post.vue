<template>
	<f7-page>
		<f7-navbar :title="title"></f7-navbar>
		<div class="list-block media-list">
			<ul>
				<li v-for="(item, index) in classifyPostList">
					<a href="#" class="item-link item-content" @click="click(item)">
						<div class="item-media">
							<img :src="item.imgurl" width="50">
						</div>
						<div class="item-inner">
							<div class="item-title-row">
								<div class="item-title">{{ item.dissname }}</div>
								<div class="item-after">{{ item.introduction }}</div>
							</div>
							<!-- <div class="item-subtitle">Beatles</div> -->
							<!-- <div class="item-text">Lorem ipsum dolor sit amet...</div> -->
						</div>
					</a>
				</li>
			</ul>
		</div>
	</f7-page>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		computed: {
			...mapState({
				classifyPostList: state => state.classifyPostList
			})
		},
		mounted() {
			let query = this.$route.query
			let dataKey = query.dataKey
			this.title = query.title
			this.getPostList(dataKey)
		},
		methods: {
			getPostList(data) {
				this.$nextTick(_ => {
					this.$f7.showIndicator()
					this.$store.dispatch('getInitClassifyPostList', data, () => {
						this.$f7.hideIndicator()
					})
				})
			},
			click(data) {
				this.$f7.mainView.router.load({url: `/singer-post/?title=${data.Fsinger_name}`})
			}
		}
	}
</script>