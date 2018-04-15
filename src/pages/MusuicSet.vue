<template>
	<f7-page navbar-fixed toolbar-fixed class="song-list-sheet">
		<!-- <navbar page="song-list-sheet" :title="data.spcialName"></navbar> -->
		<div class="navbar">
			<div class="navbar-inner">
				<div class="left">
					<a class="link icon-only back">
						<i class="fa  fa-angle-left fa-2x"></i>
					</a>
				</div>
				<div class="center">
					
				</div>
				<div class="right">
					
				</div>

		        <div class="subnavbar">
					<div class="buttons-row">
						<a href="#list" class="button tab-link active">歌曲</a>
						<a href="#remark" class="button tab-link">介绍</a>
					</div>
		        </div>

			</div>
		</div>		

		<header-cover v-if="setType == 1" :src="data.specialImg" :labels="[data.spcialName, data.specialCreat]"></header-cover>
		<header-cover v-if="setType == 2" :src="data.img" :labels="[data.name, data.language, data.company, data.publicTime]"></header-cover>
	
		<div class="page-content">
			<div class="tabs">
			  <div id="list" class="tab active">
				<div class="list-block">
					<music-list :data="list"></music-list>
				</div>
			  </div>
			  <div id="remark" class="tab">
				<div class="content-block">
			      <div v-if="setType==2" v-html="data.text" class="content-block-inner"></div>
			    </div>
			  </div>				
			</div>			
		</div>
	</f7-page>
</template>

<style lang="less">
	@import '../css/mixins.less';
	.song-list-sheet {
		.navbar {
			background-color: transparent;
			.subnavbar {
				top: 8.94em;
			}
		}
		> .page-content {
			overflow: hidden;
			margin-top: 0;
			padding: 0;
		}
		#list {
			.list-block {
				padding-bottom: 170px;
			}
		}
	}
</style>

<script>
	import Navbar from '../components/Navbar'
	import MusicList from '../components/MusicList'
	import HeaderCover from '../components/HeaderCover'

	export default {
		data() {
			return {
				data: {},
				list: [],
				setType: 1
			}
		},
		mounted() {
			let query = this.$route.query
			this.id = query.id
			this.setType = query.type
			this.getData()
		},
		methods: {
			getData() {
				this.$f7.showIndicator()

				var action = this.setType == 1 ? 'searchSpecial' : 'searchAlbum'

				this.$store.dispatch(action, {
					id: this.id,
					callback: (data) => {
						this.$f7.hideIndicator()
						this.data = data.data
						this.list = data.list
					}
				})
			}
		},
		components: {
			Navbar,
			HeaderCover,
			MusicList
		}
	}
</script>	