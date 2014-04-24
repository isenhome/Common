define("app/widget/system/company-fields/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.publish("ajax", {
			url : j.CONFIG_KEYS.replace("<keys>", i),
			cache : !1
		}, c().done(function (c) {
				b._json = JSON.parse(c[0].value),
				b._configId = c[0].id,
				b.html(d, b._json, a)
			}))
	}
	function h(a) {
		var b = this,
		c = b.$element.find("form");
		f(c, {
			rules : {
				name : {
					required : !0
				}
			}
		}),
		a.resolve()
	}
	var i = "company_field_names",
	j = {
		CONFIG_KEYS : "/rest/data/configvalue?keys=<keys>",
		CONFIG_ADD : "/rest/data/configvalue/add"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target),
			h = {},
			k = f.$element.find("form");
			if (k.valid()) {
				h = {
					name : k.find("#name").val().trim(),
					name1 : k.find("#name1").val().trim(),
					name2 : k.find("#name2").val().trim(),
					ext1 : k.find("#ext1").val().trim(),
					ext2 : k.find("#ext2").val().trim(),
					ext3 : k.find("#ext3").val().trim(),
					ext4 : k.find("#ext4").val().trim(),
					ext5 : k.find("#ext5").val().trim(),
					ext6 : k.find("#ext6").val().trim()
				};
				var l = {
					id : f._configId,
					type : "",
					name : i,
					value : JSON.stringify(h)
				};
				f.publish("ajax", {
					url : j.CONFIG_ADD,
					data : {
						data : JSON.stringify(l)
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? e.alert("success", "保存成功!") : e.alert("error", a.message)
					}), g)
			}
		}
	})
})