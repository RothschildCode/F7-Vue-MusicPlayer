<template>
	<f7-block>
		<song-classify-group v-for="(group, index) in typelist" :key="index" :group="group"></song-classify-group>
	</f7-block>
</template>

<script>
	import SongClassifyGroup from '../components/SongClassifyGroup'
	import {mapState} from 'vuex'

	export default {
		computed: {
			...mapState({
				typelist: state => state.songs.typelist
			})
		},
		mounted() {
		  this.$store.dispatch('songs_getTypelist')
		},
		components: {
			SongClassifyGroup
		}
	}
</script>