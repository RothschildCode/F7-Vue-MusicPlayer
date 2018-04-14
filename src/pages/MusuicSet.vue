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
		<div v-if="setType == 1" class="list-cover">
			<div class="back" :style="'background-image:url('+data.specialImg +')'"></div>
			<div class="row wrapper">
				<div class="col-30">
					<img class="sheet-img" :src="data.specialImg" alt="">
				</div>
				<div class="col-70">
					<div class="sheet-name ellipsis" v-html="data.spcialName"></div>
					<div class="sheet-name ellipsis" v-html="data.specialCreat"></div>
				</div>
			</div>		
		</div>
		<div v-if="setType == 2" class="list-cover">
			<div class="back" :style="'background-image:url('+data.img +')'"></div>
			<div class="row wrapper">
				<div class="col-30">
					<img class="sheet-img" :src="data.img" alt="">
				</div>
				<div class="col-70">
					<div class="sheet-name ellipsis" v-html="data.name"></div>
					<div class="sheet-name ellipsis" v-html="data.language"></div>
					<div class="sheet-name ellipsis" v-html="data.company"></div>
					<div class="sheet-name ellipsis" v-html="data.publicTime"></div>
				</div>
			</div>		
		</div>		
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

	import {get, set} from '../utils/local-storage'

	export default {
		data() {
			return {
				data: {
					specialImg: JSON.parse(get("config")).sheet_def_img
				},
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
			MusicList
		}
	}
</script>	