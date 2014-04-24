define("app/widget/job/detail/email-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/blurb"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.html(d, this._id, a)
	}
	function g(a) {
		var b = this;
		e.widgetLoaded.call(b),
		a.resolve()
	}
	return b.extend(function (a, b, c) {
		this._id = c
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		}
	})
})