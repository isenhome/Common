define("app/widget/system/candidate-required-fields/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.publish("ajax", {
			url : i.CONFIG_KEYS.replace("<keys>", h),
			cache : !1
		}, c().done(function (c) {
				b._json = JSON.parse(c[0].value),
				b._configId = c[0].id,
				b.html(d, a)
			}))
	}
	function g(a) {
		var b = this,
		c = b.$element.find("form");
		for (var d in b._json)
			c.find('[name="' + d + '"]').filter('[value="' + b._json[d] + '"]').prop("checked", !0);
		a.resolve()
	}
	var h = "candidate_require_fields",
	i = {
		CONFIG_KEYS : "/rest/data/configvalue?keys=<keys>",
		CONFIG_ADD : "/rest/data/configvalue/add"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target),
			j = {},
			k = f.$element.find("form");
			if (k.valid()) {
				k.find("input:radio:checked").each(function () {
					var b = a(this);
					j[b.attr("name")] = "true" === b.val()
				});
				var l = {
					id : f._configId,
					type : "",
					name : h,
					value : JSON.stringify(j)
				};
				f.publish("ajax", {
					url : i.CONFIG_ADD,
					data : {
						data : JSON.stringify(l)
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? e.alert("success", "保存成功!") : e.alert("error", a.message)
					}), g)
			}
		},
		"dom/action/required" : function (b, c, d) {
			var e = this,
			f = a(c.target);
			"true" === f.val() && d && e.$element.find('[data-action="required/one(' + d + ')"]').filter("[value=false]").prop("checked", !0)
		},
		"dom/action/required/one.click" : function (b, c, d) {
			var e = this,
			f = a(c.target);
			"true" === f.val() && e.$element.find('[data-action="required(' + d + ')"]').filter("[value=false]").prop("checked", !0)
		}
	})
})