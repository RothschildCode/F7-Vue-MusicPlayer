const DYNAMIC_RENDER_IDENT = "theme-dynamic-render"
export default class ThemeRenderer {
	constructor() {
		this.dynamicRenderDOMs = $("["+DYNAMIC_RENDER_IDENT+"]")
		this.render()
	}
	render() {
		$.each(this.dynamicRenderDOMs, (i, d) => {
			var offsetTop = d.offsetTop
			$(d).css("background-position", "0 -" + offsetTop + "px")
		})
	}
}