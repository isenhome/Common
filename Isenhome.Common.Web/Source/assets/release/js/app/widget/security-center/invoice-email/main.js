define("app/widget/security-center/invoice-email/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f() {
		var a = this;
		a.publish("ajax", {
			url : l.CONFIG_KEYS.replace("<keys>", "invoice_alert"),
			type : "get",
			cache : !1
		}, c().done(function (b) {
				var c = b[0];
				c.value = JSON.parse(c.value),
				g.call(a, c.value),
				i.call(a)
			}))
	}
	function g(a) {
		var b,
		c,
		d = this;
		for (var e in a)
			c = a[e], b = d.$element.find('[name="' + e.replace(/ /g, "-") + '"]'), "boolean" == typeof c ? (b.filter('[value="' + c + '"]').prop("checked", !0), "radio" === b.attr("type") && (m += c === !0 ? 1 : 0)) : "string" == typeof c && h.call(d, b, c)
	}
	function h(a, b) {
		var c = this,
		d = b.split(",");
		if (c.emailEnabled)
			for (var e = 0, f = d.length; f > e; e++)
				a.tagit("createTag", d[e])
	}
	function i() {
		var a = this;
		m ? a.$recieverSetting.removeClass("hide") : a.$recieverSetting.addClass("hide")
	}
	function j() {
		var a = this;
		c(function (b) {
			a.html(d, a._json, b)
		}).done(function () {
			k.call(a)
		})
	}
	function k() {
		var a = this;
		a.$recieverSetting = a.$element.find(".receiver-setting"),
		f.call(a)
	}
	var l = {
		CONFIG_ADD : "/rest/data/configvalue/add",
		CONFIG_KEYS : "/rest/data/configvalue?keys=<keys>"
	},
	m = 0;
	return b.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			b.user.emailpassword && (c.emailEnabled = !0),
			j.call(this)
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target),
			h = {};
			f.$element.find(":radio").filter(":checked").each(function () {
				var b = a(this);
				h[b.attr("name").replace(/-/g, " ")] = Boolean("true" === b.val())
			}),
			h.To = f.$element.find('[name="To"]').val(),
			h["To JobOrder Users"] = f.$element.find('[name="To-JobOrder-Users"]').is(":checked"),
			h = JSON.stringify(h);
			var i = {
				type : "",
				name : "invoice_alert",
				value : h
			};
			f.publish("ajax", {
				url : l.CONFIG_ADD,
				data : {
					data : JSON.stringify(i)
				},
				type : "post"
			}, c().done(function (a) {
					a.status ? e.alert("success", "Saving success.") : e.alert("error", a.data)
				}), g)
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
			m += "true" === e.val() ? 1 : -1,
			i.call(d)
		}
	})
})