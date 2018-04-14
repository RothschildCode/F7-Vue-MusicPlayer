<template>
	<f7-page>
		<f7-list media-list>
			<f7-list-item 
				v-for="song in musicList"
				media="<span class='fa fa-heart-o fa-1x'></span>"
				:title="song.song_name" 
				:subtitle="song.singer">	
			</f7-list-item>
		</f7-list>
	</f7-page>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed: {
			...mapState({
				musicList: state => state.musicList
			})
		}
	}
</script>