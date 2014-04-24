define("app/widget/candidate/add/education/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "template!./item.html"], function (a, b, c, d, e) {
	function f(b) {
		var e = this;
		e.$element;
		var f,
		g,
		h = a("<div></div>"),
		j = [];
		if (e._json)
			for (var k = 0, l = e._json.length; l > k; k++) {
				var m = e._json[k],
				n = a('<div class="education-item"></div>').data("json", m).attr("data-weave", i + "(json)");
				f = c(),
				g = f.promise(),
				j.push(g),
				h.append(n.weave(f))
			}
		d.apply(a, j).then(function () {
			e.$footer.before(h),
			b.resolve()
		})
	}
	function g(a) {
		var b = this;
		b.html(e, a)
	}
	function h(a) {
		var b = this;
		b.$footer = b.$element.find(".footer"),
		f.call(b, a)
	}
	var i = "app/widget/candidate/add/education/item";
	return b.extend(function (a, b, c) {
		var d = this;
		d._json = c
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			var c = this;
			"reset" !== c._flag ? h.call(c, b) : b.resolve()
		},
		"hub:memory/education/reset" : function (a, b) {
			var d = this;
			b && (d._flag = "reset", d.$element.find(".education-item").remove(), d._json = b, h.call(d, c()), d.publish("education/reset", null))
		},
		"dom/action.click" : a.noop,
		"dom/action/add/education.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target);
			var e = a('<div class="education-item"></div>').attr("data-weave", i).weave();
			d.$footer.before(e)
		}
	})
})