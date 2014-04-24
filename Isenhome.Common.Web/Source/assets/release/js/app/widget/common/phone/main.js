define("app/widget/common/phone/main", ["compose", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "template!./phone.html", "shared/helper/utils"], function (a, b, c, d, e, f, g) {
	function h() {
		if (m > l) {
			var a = b("#addphone"),
			c = a.closest(".controls"),
			d = b(g());
			d.find("[data-weave]").each(function () {
				b(this).weave()
			}),
			b('select[name="phones"]').each(function () {
				d.find('[value="' + b(this).val() + '"]').remove()
			}),
			c.prev().find('[name="phones"]').prop("disabled", !0),
			c.before(d),
			l++
		}
	}
	function i(a, b) {
		var c = this,
		d = a,
		e = d.split("#");
		h(),
		c.find("select:not(:disabled)").val(b).next("input").attr("name", b).val(e[0]).next().find("input").val(e[1])
	}
	function j(a) {
		var b = this;
		b.html(f, b._json, a)
	}
	function k(a) {
		var b = this,
		c = b.$element;
		b._phone && b._phone.mobile && c.find("input[name=mobile]").val(b._phone.mobile),
		b._phone && b._phone.officeTel && (c.find("select[name=phones]").eq(0).prop("disabled", !0), i.call(c, b._phone.officeTel, "officeTel")),
		b._phone && b._phone.fax && (c.find("select[name=phones]").eq(1).prop("disabled", !0), i.call(c, b._phone.fax, "fax")),
		a.resolve()
	}
	var l = 1,
	m = 3;
	return c.extend(function (a, b, c) {
		var d = this;
		d._phone = c,
		d.getPhoneData = function () {
			var a = this.$element,
			b = a.find('input[name="mobile"]').val(),
			c = a.find('input[name="officeTel"]').val(),
			d = a.find('input[name="officeTel"]').next().find("input").val(),
			e = a.find('input[name="fax"]').val(),
			f = a.find('input[name="fax"]').next().find("input").val();
			return {
				mobile : b || null,
				officeTel : c ? d ? c + "#" + d : c : null,
				fax : e ? f ? e + "#" + f : e : null
			}
		}
	}, {
		"sig/initialize" : function (a, b) {
			j.call(this, b)
		},
		"sig/start" : function (a, b) {
			k.call(this, b)
		},
		"dom/action.click.change" : b.noop,
		"dom/action/phone/add.click" : function (a, c) {
			if (m > l) {
				var d = b(c.target),
				e = d.closest(".controls"),
				f = b(g());
				f.find("[data-weave]").each(function () {
					b(this).weave()
				}),
				b('[name="phones"]').each(function () {
					f.find('[value="' + b(this).val() + '"]').remove()
				}),
				e.prev().find('[name="phones"]').prop("disabled", !0),
				e.before(f),
				e.prev().find('[name="phones"]').trigger("change"),
				l++
			}
			c.preventDefault()
		},
		"dom/action/phone.change" : function (a, c) {
			var d = b(c.target),
			e = d.val(),
			f = d.next(),
			g = d.closest(".controls");
			f.attr("name", e),
			"mobile" === e ? g.addClass("mobile") : g.removeClass("mobile")
		},
		"dom/action/phone/remove.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target),
			e = d.closest(".controls"),
			f = e.next().find("select[name=phones]");
			window.confirm("Are you really to remove it?") && ((!f.length || f.prop("disabled")) && e.prev().find('[name="phones"]').prop("disabled", !1), e.remove(), l--)
		}
	})
})