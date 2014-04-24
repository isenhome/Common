define("app/widget/system/joborder-fields/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.publish("ajax", {
			url : i.CONFIG_KEYS.replace("<keys>", h),
			cache : !1
		}, c().done(function (c) {
				b._json = JSON.parse(c[0].value),
				b._configId = c[0].id,
				b.html(d, b._json, a)
			}))
	}
	function g(a) {
		a.resolve()
	}
	var h = "joborder_field_names",
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
				j = {
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
		}
	})
})