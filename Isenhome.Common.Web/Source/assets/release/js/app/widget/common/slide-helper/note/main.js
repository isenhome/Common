define("app/widget/common/slide-helper/note/main", ["jquery", "shared/widget/common/slide-helper/base", "troopjs-utils/deferred", "template!./main.html"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.html(d, a)
	}
	function f(a) {
		var b = this,
		c = b.$element;
		b.$row = c.find(".row-fluid"),
		a.resolve()
	}
	var g = "app/widget/<type>/detail/note-tab/main",
	h = "app/widget/<type>/detail/shortlist-tab/main",
	i = "app/widget/candidate/detail/target-tab/main",
	j = "app/widget/candidate/detail/email-tab/main",
	k = "app/widget/<type>/detail/task-tab/main",
	l = "app/widget/candidate/detail/floating-tab/main",
	m = "app/widget/company/detail/jobs-tab/main",
	n = {
		PEOPLE : "/rest/candidate/<id>"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"sig/start" : function (a, b) {
			f.call(this, b)
		},
		"hub/slide-helper/note/close" : function () {
			this.$element.addClass("hide")
		},
		"hub/slide-helper/note/reload" : function (a, b, d) {
			var e = this,
			f = e.$element,
			h = c().done(function () {
					e.$element.removeClass("widget-spin")
				});
			e._json = b,
			e.publish("slide/helper/close"),
			e.$element.addClass("widget-spin"),
			f.addClass("open max").removeClass("hide min"),
			e.$row.unweave(c().done(function () {
					"object" == typeof e._json && e.$row.data("content", e._json).attr("data-weave", g.replace("<type>", d) + "(content)").weave(h),
					"number" == typeof e._json && e.publish("ajax", {
						url : n.PEOPLE.replace("<id>", e._json)
					}, c().done(function (a) {
							e.$row.data("content", a).attr("data-weave", g.replace("<type>", d) + "(content)").weave(h)
						}))
				}))
		},
		"hub/slide-helper/shortlist/reload" : function (a, b, d) {
			var e = this,
			f = e.$element,
			g = c().done(function () {
					e.$element.removeClass("widget-spin")
				});
			e.publish("slide/helper/close"),
			e.$element.addClass("widget-spin"),
			f.addClass("open max").removeClass("hide min"),
			e.$row.unweave(c().done(function () {
					e.$row.data("content", e._json).attr("data-weave", h.replace("<type>", d) + "(" + b + ")").weave(g)
				}))
		},
		"hub/slide-helper/target/reload" : function (a, b) {
			var d = this,
			e = d.$element,
			f = c().done(function () {
					d.$element.removeClass("widget-spin")
				});
			d.publish("slide/helper/close"),
			d.$element.addClass("widget-spin"),
			e.addClass("open max").removeClass("hide min"),
			d.$row.unweave(c().done(function () {
					d.$row.attr("data-weave", i + "(" + b + ")").weave(f)
				}))
		},
		"hub/slide-helper/email/reload" : function (a, b) {
			var d = this,
			e = d.$element,
			f = c().done(function () {
					d.$element.removeClass("widget-spin")
				});
			d.publish("slide/helper/close"),
			d.$element.addClass("widget-spin"),
			e.addClass("open max").removeClass("hide min"),
			d.$row.unweave(c().done(function () {
					d.$row.attr("data-weave", j + "(" + b + ")").weave(f)
				}))
		},
		"hub/slide-helper/task/reload" : function (a, b, d) {
			var e = this,
			f = e.$element,
			g = c().done(function () {
					e.$element.removeClass("widget-spin")
				});
			e.publish("slide/helper/close"),
			e.$element.addClass("widget-spin"),
			f.addClass("open max").removeClass("hide min"),
			e.$row.unweave(c().done(function () {
					e.$row.attr("data-weave", k.replace("<type>", d) + "(" + b + ")").weave(g)
				}))
		},
		"hub/slide-helper/floating/reload" : function (a, b) {
			var d = this,
			e = d.$element,
			f = c().done(function () {
					d.$element.removeClass("widget-spin")
				});
			d.publish("slide/helper/close"),
			d.$element.addClass("widget-spin"),
			e.addClass("open max").removeClass("hide min"),
			d.$row.unweave(c().done(function () {
					d.$row.attr("data-weave", l + "(" + b + ")").weave(f)
				}))
		},
		"hub/slide-helper/job/reload" : function (a, b) {
			var d = this,
			e = d.$element,
			f = c().done(function () {
					d.$element.removeClass("widget-spin")
				});
			d.publish("slide/helper/close"),
			d.$element.addClass("widget-spin"),
			e.addClass("open max").removeClass("hide min"),
			d.$row.unweave(c().done(function () {
					d.$row.attr("data-weave", m + "(" + b + ")").weave(f)
				}))
		}
	})
})