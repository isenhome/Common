define("app/widget/security-center/ip-privacy/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		a.publish("ajax", {
			url : j.CONFIG_KEYS.replace("<keys>", "ip_whitelist"),
			type : "get",
			cache : !1
		}, c().done(function (b) {
				var c = b[0];
				a._json = JSON.parse(c.value),
				h.call(a)
			}))
	}
	function h() {
		var a = this;
		c(function (b) {
			a.html(d, a._json, b)
		}).done(function () {
			i.call(a)
		})
	}
	function i() {
		var a = this,
		b = a._json.ips,
		c = 0;
		a.$enable = a.$element.find('[name="enable"]'),
		a.$ipWhite = a.$element.find('[name="ip-whitelist"]'),
		a.$userWhite = a.$element.find('[name="user-whitelist"]'),
		a.$segmentCopy = a.$element.find(".segment").eq(0).clone(),
		a.$segmentAdd = a.$element.find('[data-action="add/segment"]'),
		a.$ipSetting = a.$element.find(".ip-setting"),
		a.$form = a.$element.find("form"),
		a.$enable.filter('[value="' + a._json.enable + '"]').prop("checked", !0).trigger("click"),
		b.forEach(function (b) {
			var d = b.match(/(.*)-(.*)/);
			d ? (c > 0 && a.$segmentAdd.trigger("click"), a.$element.find(".from").eq(c).val(d[1]), a.$element.find(".to").eq(c).val(d[2]), c++) : a.$ipWhite.tagit("createTag", b)
		}),
		f(a.$form, {
			rules : {
				ipv4 : {
					ipv4 : !0
				}
			}
		})
	}
	var j = {
		CONFIG_ADD : "/rest/data/configvalue/add",
		CONFIG_KEYS : "/rest/data/configvalue?keys=<keys>"
	};
	return b.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			b.user.emailpassword && (c.emailEnabled = !0),
			g.call(c)
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target);
			if (f.$form.valid()) {
				var h = f.$ipWhite.val(),
				i = f.$userWhite.val(),
				k = function () {
					var b = [],
					c = f.$element.find(".to");
					return f.$element.find(".from").each(function (d) {
						var e = a(this);
						e.val().trim().length && b.push(e.val().trim() + "-" + c.eq(d).val().trim())
					}),
					b
				}
				(),
				l = h.split(",").concat(k),
				m = JSON.stringify({
						ips : l,
						users : i,
						enable : Boolean("true" === f.$enable.filter(":checked").val())
					}),
				n = {
					type : "",
					name : "ip_whitelist",
					value : m
				};
				f.publish("ajax", {
					url : j.CONFIG_ADD,
					data : {
						data : JSON.stringify(n)
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? e.alert("success", "Saving success.") : e.alert("error", a.data)
					}), g)
			}
		},
		"dom/action/add/segment.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target);
			e.closest(".controls").before(d.$segmentCopy.clone())
		},
		"dom/action/remove/segment.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target);
			d.closest(".controls").remove()
		},
		"dom/action/enable.click" : function (b, c) {
			var d = this,
			e = a(c.target);
			"true" === e.val() ? d.$ipSetting.removeClass("hide") : d.$ipSetting.addClass("hide")
		}
	})
})