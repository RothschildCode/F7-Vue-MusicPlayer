<template>
	<div class="list-block">
		<ul>
			<li v-for="(g, i) in groups">
				<div class="item-content">
					<div class="item-media"></div>
					<div class="item-inner">
						<div class="item-title">
							<div class="ellipsis group-name">
								
							</div>
							<div class="ellipsis group-subtitle">
								
							</div>
							<div class="ellipsis group-after">
								
							</div>
						</div>
					</div>
				</div>
			</li>	
		</ul>		
	</div>
</template>

<script>
	export default {
		props: {
			groups: {
				type: Array,
				defualt() {
					return []
				}
			},
			titleAttr: {
				type: String,
				default() {
					return ""
				}
			},
			subtitleAttr: {
				type: String,
				default() {
					return ""
				}
			},
			afterAttr: {
				type: String,
				default() {
					return ""
				}
			},
			linkAttr: {
				
			}
		},
		methods: {

		}
	}
</script>