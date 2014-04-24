define("shared/widget/pagination/main", ["jquery", "shared/widget/base/main", "troopjs-utils/uri", "troopjs-utils/deferred", "template!./main.html"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		"load" === b._type ? b.publish(l, {
			page : a
		}) : b.publish(k, {
			page : a
		})
	}
	function g(a) {
		var b = this;
		a = a || d(),
		b._json.pages ? (a.done(function () {
				b.$element.removeClass("hide")
			}), b.html(e, b._json, a)) : a.resolve()
	}
	function h(a, b) {
		var c = this;
		b.pages ? (c.$element.removeClass("hide"), c._json = b, g.call(c)) : c.$element.addClass("hide")
	}
	var i = 13,
	j = 8,
	k = "make/route",
	l = "make/load";
	return b.extend(function (b, c, d, e) {
		var f = this;
		f._hub = d,
		f._type = e,
		f.subscribe(d + "/paging/set", !0, a.proxy(h, f))
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			b.resolve()
		},
		"sig/stop" : function (b, c) {
			var d = this;
			d.subscribe(hub + "/paging/set", !0, a.proxy(h, d)),
			c.resolve()
		},
		"dom/action.click.keydown" : a.noop,
		"dom/action/page/number.click" : function (b, c, d) {
			c.preventDefault();
			var e = this,
			g = a(c.target);
			g.closest("li").hasClass("disabled") || f.call(e, d)
		},
		"dom/action/page/go/to.keydown" : function (b, c) {
			var d = this,
			e = a(c.target),
			g = c.originalEvent.which,
			h = e.val().trim();
			switch (g) {
			case i:
				h.length && f.call(d, h);
				break;
			case j:
				break;
			default:
				g >= 48 && 57 >= g || g >= 96 && 105 >= g || c.preventDefault()
			}
		}
	})
})