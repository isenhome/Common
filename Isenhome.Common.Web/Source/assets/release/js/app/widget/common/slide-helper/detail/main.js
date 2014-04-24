define("app/widget/common/slide-helper/detail/main", ["compose", "jquery", "shared/widget/common/slide-helper/base", "troopjs-utils/deferred", "template!./main.html"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.html(e, a)
	}
	function g(a) {
		var b = this,
		c = b.$element;
		b.$row = c.find(".row-fluid"),
		a.resolve()
	}
	return c.extend({
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		"dom/action/slide/helper/close.click" : a.around(function (a) {
			return function (b, c) {
				a.call(this, b, c),
				this.id = null
			}
		}),
		"hub/slide-helper/detail/close" : function () {
			var a = this,
			b = a.$element;
			b.removeClass("open max").addClass("hide min"),
			this.id = null
		},
		"hub/candidate/detail/rendered" : function () {
			var a = this;
			a.note ? a.publish("candidate/show/note") : a.publish("candidate/show/resume")
		},
		"hub/slide-helper/detail/reload" : function (a, b, c, d) {
			var e = this,
			f = e.$element;
			e.note = d,
			e.id !== b ? (e.id = b, e.publish("slide/helper/close"), f.addClass("open max").removeClass("hide min"), e.$row.addClass("widget-spin"), e.publish("candidate/slide/detail/id", b)) : e.publish("candidate/detail/rendered")
		}
	})
})