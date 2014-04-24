define("app/widget/candidate/work-experience/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		a.done(function () {
			e.widgetLoaded.call(b)
		}),
		b.publish("ajax", {
			url : h.replace("<id>", b.id)
		}, c().done(function (e) {
				b._json = e,
				c(function (a) {
					b.html(d, b._json, a)
				}).done(function () {
					g.call(b, a)
				})
			}))
	}
	function g(a) {
		var b = this;
		b.$element.find(".function").tooltip(),
		a.resolve()
	}
	var h = "/rest/candidate/experience/<id>";
	return b.extend(function (a, b, c) {
		this.id = c
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		}
	})
})