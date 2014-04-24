define("app/widget/security-center/anti-copy/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a, b, d, f, g) {
		var h = this;
		if (f === g)
			e.alert("info", "Nothing changed at all !!!");
		else {
			var i = {
				id : a,
				type : b,
				name : d,
				value : f
			};
			f = isNaN(f) ? f : 1 === parseInt(f, 10) ? "True" : "False",
			h.publish("ajax", {
				url : l.CONFIG_ADD,
				data : {
					data : JSON.stringify(i)
				},
				type : "post"
			}, c().done(function (a) {
					a.status ? e.alert("success", "Saving [ " + f + " ] success.") : e.alert("error", a.message)
				}))
		}
	}
	function g() {
		var a = this,
		b = Array.prototype.slice.call(arguments).join(",");
		a.publish("ajax", {
			url : l.CONFIG_KEYS.replace("<keys>", b),
			type : "get",
			cache : !1
		}, c().done(function (a) {
				h(a)
			}))
	}
	function h(b) {
		for (var c, d, e, f = 0, g = b.length; g > f; f += 1)
			switch (d = b[f], c = a("[name=" + d.name + "]"), c.data("id", d.id), e = c.attr("type").toLowerCase()) {
			case "radio":
				c.filter("[value=" + d.value.toLowerCase() + "]").prop("checked", !0)
			}
	}
	function i(b) {
		var c = a(b.target).closest(".controls"),
		d = c.find("input").prop("disabled");
		c.find("input").prop("disabled", !d),
		c.find("button.action").toggleClass("hide")
	}
	function j(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function k(b) {
		var c = this,
		d = [];
		a(".load-key").each(function () {
			d.push(this.name)
		}),
		g.call(c, d.join(",")),
		b.resolve()
	}
	var l = {
		CONFIG_ADD : "/rest/data/configvalue/add",
		CONFIG_KEYS : "/rest/data/configvalue?keys=<keys>"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			j.call(this, b)
		},
		"sig/start" : function (a, b) {
			k.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/setting/textbox/cancel.click" : function (a, b) {
			b.preventDefault(),
			i(b)
		},
		"dom/action/setting/radio/edit.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target).closest(".controls").find("input"),
			e = d.filter(":checked");
			d.data("original", e.val()),
			i(c)
		},
		"dom/action/setting/radio/save.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target).closest(".controls").find("input"),
			g = e.filter(":checked"),
			h = g.data("id"),
			j = g.attr("name"),
			k = g.val(),
			l = g.data("original");
			f.call(d, h, "", j, k, l),
			i(c)
		}
	})
})