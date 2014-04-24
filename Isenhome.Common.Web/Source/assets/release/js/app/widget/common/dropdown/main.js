define("app/widget/common/dropdown/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		if (!b._type)
			throw "Please specific dropdown type";
		b.publish("ajax", {
			url : h.replace("<type>", b._type)
		}, c().done(function (c) {
				return "undefined" == typeof c.status || c.status ? (b._json = c, b.append(d, b._json, a), void 0) : (e.alert("error", c.message), void 0)
			}).fail(function () {
				a.resolve()
			}))
	}
	function g(b) {
		var c = this;
		c._selected && (c.$element.val(c._selected), c.$element.find("option").each(function () {
				var b = a(this);
				return b.text() === c._selected ? (b.prop("selected", !0), !1) : void 0
			})),
		b.resolve()
	}
	var h = "/rest/data/options?type=<type>";
	return b.extend(function (a, b, c, d) {
		this._type = c,
		this._selected = d
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		}
	})
})