define("app/widget/security-center/user-activity/filter/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		var b = new Date(a),
		c = b.getFullYear(),
		d = b.getMonth() + 1,
		e = b.getDate();
		return c + "-" + d + "-" + e
	}
	function g(a, b) {
		var c = this;
		s.start = a || "",
		s.end = b || "",
		c.$from.text(a),
		c.$to.text(b)
	}
	function h(a) {
		a.closest("ul").find(".active").removeClass("active"),
		a.closest("li").addClass("active")
	}
	function i(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function j(a) {
		var b = this;
		b.$from = b.$element.find(".from"),
		b.$to = b.$element.find(".to"),
		b.$element.find("ul li a:eq(0)").trigger("click"),
		a.resolve()
	}
	var k = "modal/activity-alert/show",
	l = new Date,
	m = f(l),
	n = function () {
		var a = l.getDay(),
		b = l.getDate() - a + (0 === a ? -6 : 1);
		return f(new Date(l.setDate(b)))
	}
	(),
	o = f(l.setDate(1)),
	p = l.getFullYear() + "-01-01",
	q = {
		today : m,
		thisWeek : n,
		thisMonth : o,
		thisYear : p
	},
	r = "user-activity/set/filter",
	s = {
		start : "",
		end : ""
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"sig/start" : function (a, b) {
			j.call(this, b)
		},
		"dom/action.click" : b.noop,
		"dom/action/date.click" : function (a, c, d) {
			c.preventDefault();
			var e = this,
			f = b(c.target);
			d ? (g.call(e, q[d], q.today), e.publish(r, s)) : (g.call(e), e.publish(r)),
			h(f)
		},
		"dom/action/custom/date.click" : function (a, c) {
			c.preventDefault();
			var d = this,
			e = b(c.target),
			f = e.closest("form"),
			i = f.find('[name="from"]').val(),
			j = f.find('[name="to"]').val(),
			k = e.closest(".dropdown");
			i && j && (g.call(d, i, j), d.publish(r, s), h(k.find("a")), k.removeClass("open"))
		},
		"dom/action/set/activity/alert.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish(k)
		}
	})
})