define("app/widget/reporting/revenue/filter/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		var b = new Date(a),
		c = b.getFullYear(),
		d = b.getMonth() + 1,
		e = b.getDate();
		return c + "-" + d + "-" + e
	}
	function g(a, b) {
		a.closest("ul").find(".active").removeClass("active"),
		a.closest("li").addClass("active"),
		this.publish("revenue/show", b)
	}
	function h(a, b) {
		var c = this;
		a && b ? (c.$from.text(a), c.$to.text(b), c.$period.show(), c.$all.hide()) : (c.$period.hide(), c.$all.show())
	}
	function i(a) {
		this.$element.find(".viewtype").toggleClass("hide", a)
	}
	function j() {
		var a = this;
		d(function (b) {
			a.html(e, a._json, b)
		}).then(function () {
			k.call(a)
		})
	}
	function k() {
		var a = this;
		a.$from = a.$element.find("#from"),
		a.$to = a.$element.find("#to"),
		a.$period = a.$element.find(".period"),
		a.$all = a.$element.find(".all"),
		t.filter = "user",
		t.filter_id = this._user.id,
		a.$element.find('[data-action*="thisyear"]').trigger("click")
	}
	var l = Date.now(),
	m = new Date,
	n = l - 864e5 * ((m.getDay() || 7) - 1),
	o = n + 5184e5,
	p = l - 864e5 * (m.getDate() - 1),
	q = new Date(m.getFullYear(), m.getMonth() + 1, 0),
	r = m.getFullYear() + "-01-01",
	s = m.getFullYear() + "-12-31";
	(new Date).getFullYear() - 1 + "-01-01",
	(new Date).getFullYear() - 1 + "-12-31";
	var t = {
		type : "user",
		filter : "",
		filter_id : "",
		start : r,
		end : s,
		dateType : "signDate"
	};
	return c.extend(function () {}, {
		"hub:memory/context" : function (a, b) {
			this._json.user = this._user = b.user,
			j.call(this)
		},
		"hub:memory/filter/kpi/update" : function (a, c, d, e) {
			b.extend(t, c);
			var f = this.$element.find("#category");
			f.closest("ul").find(".active").removeClass("active"),
			e ? (f.html(d).parent().removeClass("hide"), this.$element.find("input[value=user]").prop("checked", !0)) : (f.parent().addClass("hide"), f.parent().before(b('<li class="active">').append(b('<a data-action="myteam" href="#' + c.filter_id + '">' + d + "</a>"))))
		},
		"dom/action.change" : b.noop,
		"dom/action/myself.click" : function (a, c) {
			c.preventDefault();
			var d = this._user,
			e = b(c.target);
			t.type = "user",
			t.filter = "user",
			t.filter_id = d.id,
			i.call(this, !0),
			g.call(this, e, t)
		},
		"dom/action/myteam.click" : function (a, c) {
			c.preventDefault(),
			this._user;
			var d = b(c.target),
			e = d.attr("href").slice(1);
			d.parent().nextUntil(".text-line").remove(),
			d.parent().next(".text-line").addClass("hide"),
			t.type = this.$element.find(":radio:checked").val(),
			t.filter = "team",
			t.filter_id = e,
			i.call(this, !1),
			g.call(this, d, t)
		},
		"dom/action/date.click" : function (a, b) {
			b.stopPropagation()
		},
		"dom/action/custom.click" : function (a, c) {
			c.preventDefault(),
			this._user;
			var d = b(c.target),
			e = d.closest("form"),
			f = e.find("[name=from]").val(),
			i = e.find("[name=to]").val(),
			j = d.closest(".dropdown");
			t.start = f,
			t.end = i,
			h.call(this, t.start, t.end),
			g.call(this, d, t),
			j.removeClass("open")
		},
		"dom/action/viewtype.change" : function (a, b) {
			this._user,
			t.type = b.target.value,
			this.publish("revenue/show", t)
		},
		"dom/action/data/type.change" : function (a, c) {
			var d = b(c.target);
			t.dateType = d.val(),
			g.call(this, d, t)
		},
		"dom/action/change/date.click" : function (a, c, d) {
			c.preventDefault(),
			this._user;
			var e,
			i,
			j = b(c.target);
			switch (d) {
			case "today":
				t.start = f(m),
				t.end = f(m);
				break;
			case "thisweek":
				t.start = f(n),
				t.end = f(o);
				break;
			case "thismonth":
				t.start = f(p),
				t.end = f(q);
				break;
			case "thisyear":
				t.start = r,
				t.end = s;
				break;
			case "lastweek":
				i = m.getTime() - 1e3 * 60 * 60 * 24 * (m.getDay() ? m.getDay() : 7),
				e = new Date(i).getTime() - 5184e5,
				t.start = f(e),
				t.end = f(i);
				break;
			case "lastmonth":
				e = new Date(m.getFullYear(), m.getMonth() - 1, 1).getTime(),
				i = new Date(m.getFullYear(), m.getMonth(), 0).getTime(),
				t.start = f(e),
				t.end = f(i);
				break;
			case "lastyear":
				e = new Date(m.getFullYear() - 1, 0, 1).getTime(),
				i = new Date(m.getFullYear() - 1, 11, 31).getTime(),
				t.start = f(e),
				t.end = f(i);
				break;
			case "all":
				e = new Date("1900-1-1").getTime(),
				i = new Date("2099-12-31").getTime(),
				t.start = f(e),
				t.end = f(i)
			}
			"all" !== d ? h.call(this, t.start, t.end) : h.call(this),
			g.call(this, j, t)
		}
	})
})