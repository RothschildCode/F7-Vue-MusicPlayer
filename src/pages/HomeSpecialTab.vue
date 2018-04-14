<template>
	<div>
		<div class="navbar buttons-row subtoolbar">
			<a href="#tab1" class="button tab-link active">推荐</a>
			<a href="#tab2" class="button tab-link">最热</a>
			<a href="#tab3" class="button tab-link">最新</a>
			<a href="#tab4" class="button tab-link">热藏</a>
			<a href="#tab5" class="button tab-link">飙升</a>
		</div>
		<div class="page-content">
			<div class="tabs subtoolbar-fixed">
				<div id="tab1" class="tab active">
					<div class="list-block">
						<home-special initUrl="http://www.kugou.com/yy/special/index/1-5-0.html"></home-special>
					</div>
				</div>
				<div id="tab2" class="tab">
					<div class="list-block">
						<home-special initUrl="http://www.kugou.com/yy/special/index/1-6-0.html"></home-special>
					</div>
				</div>
				<div id="tab3" class="tab">
					<div class="list-block">
						<home-special initUrl="http://www.kugou.com/yy/special/index/1-7-0.html"></home-special>
					</div>
				</div>
				<div id="tab4" class="tab">
					<div class="list-block">
						<home-special initUrl="http://www.kugou.com/yy/special/index/1-8-0.html"></home-special>
					</div>
				</div>
				<div id="tab5" class="tab">
					<div class="list-block">
						<home-special initUrl="http://www.kugou.com/yy/special/index/1-9-0.html"></home-special>
					</div>
				</div>
			</div>			
		</div>
	</div>
</template>


<script>
	import HomeSpecial from '../pages/HomeSpecial.vue'
	import vuex, {mapState} from 'vuex'

	export default {
		components: {
			HomeSpecial
		}
	}
</script>