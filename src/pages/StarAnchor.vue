<template>
	<f7-page navbar-fixed toolbar-fixed class="star-anchor">
		<navbar :title="title" :page="'staranchor'"></navbar>
		<div class="video-panel">
			<video width="100%" height="100%" class="node-ctl-video" id="1513565491981" controls poster="" autoplay="autoplay" preload="preload" webkit-playsinline="" :src="'http://trackermv.kugou.com/interface/index/?cmd=104&hash=' + video.hash" uc-video-toolbar-id="40850512-d62f-c9d4-86c0-1513565492371">
			</video>
			<div class="buttons-row">
				<a href="#seat" class="button tab-link active">座位</a>
				<a href="#fans" class="button tab-link">粉丝帮</a>
				<a href="#comment" class="button tab-link">评论</a>
			</div>
		</div>

		<div class="list-block"> 
			<div class="tabs">
			  <div id="seat" class="tab active">
			  	<div class="row">
			  		<div v-for="(item, index) in seats" class="col-33">
			  			<img :src="item.img">
			  		</div>
			  	</div>
			  </div>
			  <div id="fans" class="tab">

			  </div>
			  <div id="comment" class="tab">

			  </div>
			</div>
		</div>
	</f7-page>
</template>

<style lang="less">
	.video-js {
		width: 100%;
	}
	.vjs-tech {
		position: inherit !important;
	}
	.my-video-dimensions {
		height: initial;
	}
	.star-anchor {
		.subtoolbar  {
			position: initial;
		}
		video {
			width: 100%;
			height: 100%;
		}
	}
</style>

<script>
	import Navbar from '../components/Navbar'
	export default {
		data() {
			return {
				data: {},
				video: {},
				seats: [],
				commentList: [],
				fansList: [],
				title: '星主播'
			}
		},
		mounted() {
			let query = this.$route.query
			this.id = query.id
			this.getData()
		},
		updated() {
			this.initVideo()
		},
		methods: {
			getData() {
				this.$f7.showIndicator()
				this.$store.dispatch('getKGStarAnchorLive', {
					id: this.id,
					callback: (data) => {
						this.$f7.hideIndicator()
						this.data = data.data
						this.video = data.video
						this.seats = data.seats
						this.commentList = data.commentList
						this.fansList = data.fansList
					}
				})
				this.$store.dispatch('getKGStarAnchorData', {
					id: this.id,
					type: 2,
					callback: (data) => {
						this.fans = data
					}
				})
				this.$store.dispatch('getKGStarAnchorData', {
					id: this.id,
					type: 1,
					callback: (data) => {
						this.seats = data
					}
				})
			},
			initVideo() {
				this.$refs.video
				// videojs(this.$refs.video)
			}
		},
		components: {
			Navbar
		}
	}
</script>	