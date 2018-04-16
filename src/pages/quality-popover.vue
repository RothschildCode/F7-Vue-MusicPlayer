<template>
	<div class="popover popover-quality">
		<div class="popover-angle"></div>
		<div class="popover-inner">
			<div class="list-block">
				<ul>
					<li><a href="#" class="list-button item-link" @click="click('HQ')">高品质</a></li>
					<li><a href="#" class="list-button item-link" @click="click('SQ')">超品质</a></li>
					<li><a href="#" class="list-button item-link" @click="click('RES')">无损</a></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style lang="less">
	
</style>

<script>
	export default {
		methods: {
			click(quality = 'HQ') {
				this.$store.dispatch('player_quality', {
					quality,
					callback: (quality) => {
						this.$store.dispatch('player_source', {
							quality
						})
					}
				})
			}
		}
	}
</script>