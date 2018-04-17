<template>
	<ul class="music-list-view">
		<music-item v-for="(song, index) in data" :key="index"  :data="song" :list="list"></music-item>
	</ul>
</template>

<script>
	import MusicItem from './MusicItem'
	export default {
		props: {
			data: {
				type: Array,
				default() {
					return new Array()
				}
			},
			list: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		components: {
			MusicItem
		}
	}
</script>