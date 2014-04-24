define("app/widget/common/birthday/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/blurb", "app/widget/common/select2/main"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function f(a) {
		var b,
		c = this,
		d = c.$element.find("#birthMonth"),
		e = c.$element.find("#birthDay");
		c.$year = c.$element.find("#birthYear"),
		c._dateOfBirth && (b = c._dateOfBirth.split("-"), c.$year.val(b[0]), d.prop("disabled", !1), e.prop("disabled", !1), c._monthNull || d.val(b[1]), c._dayNull || e.val(b[2])),
		c.$year.select2(),
		a.resolve()
	}
	return b.extend(function (b, c, d, e, f) {
		var g = this;
		g._dateOfBirth = d,
		g._monthNull = e,
		g._dayNull = f,
		g._required = a(b).data("required") === !0
	}, {
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"sig/start" : function (a, b) {
			f.call(this, b)
		},
		"sig/stop" : function (a, b) {
			this.$year.select2("destroy"),
			b.resolve()
		},
		"dom/action.change" : a.noop,
		"dom/action/year.change" : function (b, c) {
			var d = a(c.target).val(),
			e = this.$element.find("#birthMonth"),
			f = this.$element.find("#birthDay");
			d ? (e.val("").prop("disabled", !1), f.val("").prop("disabled", !1)) : (e.val("").prop("disabled", !0), f.val("").prop("disabled", !0))
		}
	})
})