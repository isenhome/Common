define("shared/widget/common/autosize/main", ["jquery", "troopjs-core/component/widget", "jquery.autosize"], function (a, b) {
	return b.extend({
		"sig/initialize" : function (a, b) {
			var c = this;
			c.$element.autosize().trigger("autosize.resize").css("resize", "none"),
			b.resolve()
		}
	})
})