define("app/widget/company/detail/changelog/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/blurb", "shared/helper/utils"], function (a, b, c, d, e, f, g) {
	function h(b) {
		var f = this,
		g = c(),
		h = c(),
		l = [g.promise(), h.promise()];
		f.publish("ajax", {
			url : i.LOG.replace("<id>", f._id)
		}, g.done(function (a) {
				f._json = a,
				f.publish(j, "change", a.length)
			})),
		f.publish("ajax", {
			url : i.EXT
		}, h.done(function (a) {
				var b = JSON.parse(a[0].value);
				for (var c in b)
					k[c] = b[c]
			})),
		d.apply(a, l).done(function () {
			f.html(e, f._json, b)
		})
	}
	var i = {
		LOG : "/rest/updatelog/list?type=client&external_id=<id>",
		EXT : "/rest/data/configvalue?keys=company_field_names"
	},
	j = "company/action/count",
	k = {
		industry : f.t("Industry"),
		industry1 : f.t("Industry"),
		industry2 : f.t("Industry"),
		city : f.t("City"),
		city1 : f.t("City"),
		city2 : f.t("City"),
		type : f.t("Company Type"),
		bd : "BD"
	};
	return b.extend(function (a, b, c) {
		this._id = c
	}, {
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		getField : function (a) {
			var b = "";
			return b = k[a] || a
		},
		getValue : function (a, b) {
			var c = b;
			switch (a) {
			case "type":
				c = f.t(c + " company")
			}
			return c
		},
		"dom/action.click" : a.noop,
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.attr("href");
			g.window({
				url : e,
				name : "User Profile",
				width : "1024"
			})
		}
	})
})