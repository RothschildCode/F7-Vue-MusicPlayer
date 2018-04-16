<template>
	<div class="list-block">
		<ul>
			<li v-for="item in list" @click="click(item)">
				<a class="item-link item-content">
					<div class="item-inner">
						<div class="item-title" v-html="item.label"></div>
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			click(data) {
				this.$f7.mainView.router.load({url: data.posturl(data)})
			}
		}
	}
</script>