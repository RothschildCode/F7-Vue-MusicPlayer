<template>
	<div class="header-cover">
		<div class="header-cover-bg" :style="'background-image:url('+ src||initSrc +')'"></div>
		<div class="row wrapper">
			<div class="col-30">
				<img class="header-cover-img" :src="src||initSrc" alt="">
			</div>
			<div class="col-70">
				<div v-for="label in labels" class="sheet-name ellipsis" v-html="label"></div>
				<!-- <div class="sheet-name ellipsis" v-html="info.detail.name"></div>
				<div class="sheet-name ellipsis" v-html="info.detail.language"></div>
				<div class="sheet-name ellipsis" v-html="info.detail.company"></div>
				<div class="sheet-name ellipsis" v-html="info.detail.publishTime"></div> -->
			</div>
		</div>
	</div>
</template>
<style lang="less">
	.header-cover-bg {
		width: 100%;
		height: 9rem;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		background-size: cover;
		background-position: center;
		filter: blur(10px);
		transform: scale(1.5);
		&:after {
			content: '';
			width: 100%;
			height: 100%;
			background-color: #000;
			opacity: .7;
			position: absolute;
			top: 0;
		}
	}
	.header-cover-img {
		width: 5rem;
		border: solid #000 1px;
	}
	.header-cover{
		.wrapper{
			padding: .7rem;
			.sheet-name {
				color: #fff;
			}
		}
	}	

</style>
<script type="text/javascript">
	import {set, get} from '../utils/local-storage'
	export default {
		data() {
			return {
				initSrc: JSON.parse(get("config")).sheet_def_img
			}
		},
		props: ["src", "labels"]
	}
</script>