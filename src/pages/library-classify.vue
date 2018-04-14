<template>
	<f7-block>
		<song-classify-group v-for="(group, index) in songClassifyList" :key="index" :group="group"></song-classify-group>
	</f7-block>
</template>

<script>
	import SongClassifyGroup from '../components/SongClassifyGroup'
	import {mapState} from 'vuex'

	export default {
		computed: {
			...mapState({
				songClassifyList: state => state.songClassifyList
			})
		},
		mounted() {
		  this.$store.dispatch('getInitSongClassifyList')
		},
		components: {
			SongClassifyGroup
		}
	}
</script>