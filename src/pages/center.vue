<template>
	<f7-page>
		<f7-list media-list>
			<f7-list-item
				:media="user.media"
				:title="user.name"
				:subtitle="user.vip">
			</f7-list-item>
		</f7-list>
	</f7-page>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					"media": "<span class='fa fa-user fa-3x'></span>",
					"name": "用户1",
					"vip": "treu"
				}
			}
		}
	}
</script>