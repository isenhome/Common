define("app/widget/candidate/add/experience/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "template!./item.html"], function (a, b, c, d, e) {
	function f(b) {
		var e,
		f,
		g = this,
		h = g.$element,
		j = a("<div></div>"),
		k = [];
		if (g._json) {
			for (var l = 0, m = g._json.length; m > l; l++) {
				var n = g._json[l],
				o = a('<div class="experience-item"></div>').data("json", n).attr("data-weave", i + "(json)");
				e = c(),
				f = e.promise(),
				k.push(f),
				j.append(o.weave(e))
			}
			d.apply(a, k).then(function () {
				h.children().not(".header").not(".footer").remove(),
				g.$footer.before(j),
				h.find(".btn:eq(0)").closest(".control-group").remove(),
				h.find(":checkbox").filter('[data-current="true"]').trigger("click").closest(".controls").find(".ended-position").addClass("hide"),
				h.find(".experience-item").each(function (b, c) {
					a(c).woven()[0].checkCompanyName()
				}),
				h.find("textarea").trigger("autosize.resize"),
				b.resolve()
			})
		} else
			e = c(), f = e.promise(), k.push(f), j.append(a('<div class="experience-item" data-current="true"></div>').attr("data-weave", i).weave(e)), d.apply(a, k).then(function () {
				h.children().not(".header").not(".footer").remove(),
				g.$footer.before(j),
				h.find(".btn:eq(0)").closest(".control-group").remove(),
				h.find(":checkbox").filter('[data-current="true"]').trigger("click").closest(".controls").find(".ended-position").addClass("hide"),
				h.find(".experience-item").each(function (b, c) {
					a(c).woven()[0].checkCompanyName()
				}),
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
	var i = "app/widget/candidate/add/experience/item";
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
		"hub:memory/experience/reset" : function (a, b) {
			var d = this;
			b && (d._flag = "reset", d.$element.find(".experience-item").remove(), b.forEach(function (a) {
					a.client = {
						name : a.company
					}
				}), d._json = b, h.call(d, c()), d.publish("experience/reset", null))
		},
		"dom/action.click" : a.noop,
		"dom/action/add/experience.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target);
			var e = a('<div class="experience-item"></div>').attr("data-weave", i).weave();
			d.$footer.before(e)
		}
	})
})