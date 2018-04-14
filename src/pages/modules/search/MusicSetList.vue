<template>
	<div class="page-content">
		<div class="list-block">
			<ul class="album-list">
				<li v-for="(item, index) in list">
					<a href="" class="item-link item-content" @click="click(item)">
						<div class="item-media">
							<img :src="item.img" alt="">
						</div>
						<div class="item-inner">
							<div v-if="setType==1" class="item-title">
								<div class="ellipsis" v-html="item.specialname"></div>
								<div class="ellipsis item-subtitle" v-html="item.nickname"></div>
							</div>
							<div v-if="setType==2" class="item-title">
								<div class="ellipsis special-name" v-html="item.title"></div>
								<div class="ellipsis nick-name" v-html="item.albumname"></div>
								<div class="ellipsis publish-time" v-html="item.singer"></div>
							</div>
							<div v-if="setType==3" class="item-title">
								<div class="ellipsis special-name" v-html="item.MvName"></div>
								<div class="ellipsis nick-name" v-html="item.SingerName"></div>
								<div class="ellipsis publish-time" v-html="'时长:' + item.duration"></div>
							</div>
						</div>
					</a>
				</li>
			</ul>
		</div>		
	</div>
</template>

<style lang="less">
	@import '../../../css/mixins.less';
	.album-list {
		font-size: .8rem;
		.special-name {
			
		}
		.nick-name {
			color: @mainColor;
		}
		.publish-time {
			color: #999;
		}
	}
</style>

<script>
	export default {
		props: {
			keyword: {
				type: String,
				default() {
					return ""
				}
			},
			initSetType: {
				type: Number,
				default() {
					return 1
				}
			},
			initPageIndex: {
				type: Number,
				default() {
					return 1
				}
			},
			initPageSize: {
				type: Number,
				default() {
					return 10
				}
			}
		},
		data() {
			return {
				list: [],
				setType: this.initSetType,
				pageIndex: this.initPageIndex,
				pageSize: this.initPageSize,
				total: 0
			}
		},
		mounted() {
			if(this.keyword != null && this.keyword != "") {
				this.query()
			}
		},
		methods: {
			query(page=1) {

				var action = null

				switch(this.setType) {
					case 1:
						action = 'searchSpecialList'
						break
					case 2:
						action = 'searchAlbumList'
						break
					case 3:
						action = 'searchMVList'
						break
				}

				this.$store.dispatch(action, {
					param: {
						page,
						pagesize: 10,
						keyword: this.keyword,
					},
					callback: (data) => {
						this.pageIndex = data.page
						this.total = data.total
						this.list = data.lists
					}
				})
			},
			click(item) {
				switch(this.setType) {
					case 1:
						this.$f7.mainView.router.load({url: `/musicset/?id=${item.specialid}&type=${this.setType}`})
					case 2: 
						this.$f7.mainView.router.load({url: `/musicset/?id=${item.albumid}&type=${this.setType}`})
				}
			}
		}
	}
</script>