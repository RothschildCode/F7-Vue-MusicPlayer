<template>
	<div class="list-block mv-list">
		<ul>
			<li v-for="(mv, index) in mvs">
				<a href="" class="item-link item-content">
					<div class="item-media">
						<img :src="'http://imge.kugou.com/mvhdpic/240/20170118/' + mv.Pic" alt="">
					</div>
					<div class="item-inner">
						<div class="item-title">
							<div class="ellipsis mv-name" v-html="mv.MvName"></div>
							<div class="ellipsis singer-name" v-html="mv.SingerName"></div>
						</div>
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			keyword: {
				type: String,
				default() {
					return ""
				}
			}
		},
		mounted() {
			this.$watch("keyword", () => {
				if(this.keyword != "" && this.keyword != null) {
					this.query()
				}
			})
		},
		methods: {
			
		}
	}
</script>