define("shared/widget/feedback/quick-post/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.html(d, a)
	}
	return b.extend({
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/quick/post.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish("modal/feedback-quick-post/show")
		}
	})
})