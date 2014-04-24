define("app/widget/candidate/add/education/item", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./item.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		c(function (a) {
			b.html(d, b._json, a)
		}).done(function () {
			f.call(b, a)
		})
	}
	function f(b) {
		var c = this,
		d = c._json,
		e = c.$element,
		f = e.find('[name="started-year-' + c.index + '"]'),
		g = e.find('[name="started-month-' + c.index + '"]'),
		h = e.find('[name="ended-year-' + c.index + '"]'),
		i = e.find('[name="ended-month-' + c.index + '"]'),
		j = e.find('[name="current-' + c.index + '"]');
		if (!a.isEmptyObject(d)) {
			var k = d.start ? d.start.split("-") : [],
			l = d.end ? d.end.split("-") : [];
			f.val(k[0] || ""),
			g.val(parseInt(k[1], 10) || ""),
			h.val(l[0] || ""),
			i.val(parseInt(l[1], 10) || ""),
			e.data("id", d.id),
			d.is_current && (j.trigger("click").closest(".controls").find(".ended-position").addClass("hide"), c._isCurrent = !0)
		}
		c.$element.data("current") && j.attr("data-current", "true"),
		b.resolve()
	}
	var g = 0;
	return b.extend(function (a, b, c) {
		g++,
		this._json = c || {},
		this.index = g
	}, {
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"dom/action.click.change" : a.noop,
		"dom/action/remove/education.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target);
			d.closest(".education-item").remove()
		},
		"dom/action/current/school.change" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.closest(".education-item"),
			g = e.closest(".education-block").find('[name*="current"]').not(e);
			e.is(":checked") ? (d._isCurrent = !0, f.find(".ended-position").addClass("hide"), f.find(".current-position").removeClass("hide"), g.filter(":checked").trigger("click")) : (d._isCurrent = !1, f.find(".ended-position").removeClass("hide"), f.find(".current-position").addClass("hide"))
		}
	})
})