<template>
	<div class="panel panel-left panel-reveal menu-panel">
		<div class="page navbar-fixed">
			<div class="navbar">
			    <div class="navbar-inner">
			        <div class="left">菜单</div>
			    </div>
			</div>

			<div class="page-content">
				<div class="list-block">
					<ul>
						<li v-for="item in menus" class="item-content">
							<div class="item-inner">
								<div class="item-title" v-html="item.label"></div>
							</div>
						</li>						
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {MENUS} from '../config/config'
	export default {
		data() {
			return {
				menus: MENUS
			}
		}
	}
</script>
