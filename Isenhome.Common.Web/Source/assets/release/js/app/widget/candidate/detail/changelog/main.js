define("app/widget/candidate/detail/changelog/main", ["compose", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/blurb", "shared/helper/utils", "config"], function (a, b, c, d, e, f, g, h, i) {
	function j(a) {
		var c = this,
		g = d(),
		h = d(),
		i = [g.promise(), h.promise()];
		c.publish("ajax", {
			url : l.LOG.replace("<id>", c._id)
		}, g.done(function (a) {
				c._json = a,
				c.publish(m, "change", a.length)
			})),
		c.publish("ajax", {
			url : l.TABLE
		}, h.done(function (a) {
				a.forEach(function (a) {
					o[a.mapping] = a.label
				})
			})),
		e.apply(b, i).done(function () {
			c.html(f, c._json, a)
		})
	}
	var k,
	l = {
		LOG : "/rest/updatelog/list?type=candidate&external_id=<id>",
		TABLE : "/rest/data/fields?table=candidate"
	},
	m = "candidate/action/count",
	n = {
		CURRENCY_UNIT : g.t("Currency unit"),
		CURRENCY_SYM : g.t("Currency symbol")
	};
	switch (i.userLang) {
	case "zh_CN":
		k = 1e4;
		break;
	case "en":
		k = 1e3;
		break;
	default:
		k = 1e4
	}
	var o = {
		industry : g.t("Industry"),
		"function" : g.t("Function"),
		function1 : g.t("Function"),
		function2 : g.t("Function"),
		location : g.t("City"),
		city : g.t("Intention City"),
		city1 : g.t("Intention City"),
		city2 : g.t("Intention City"),
		gender : g.t("Gender"),
		title : g.t("Title"),
		mobile : g.t("Mobil"),
		mobile1 : g.t("Telephone"),
		mobile2 : g.t("Other"),
		dateOfBirth : g.t("Date of birth"),
		chineseName : g.t("Chinese Name"),
		englishName : g.t("English Name"),
		attachment : g.t("Attachment"),
		company : g.t("Company"),
		nationality : g.t("Nationality"),
		address : g.t("address"),
		linkedin : "LinkedIn",
		annualSalary : g.t("Annual Salary"),
		type : g.t("Type"),
		email : g.t("Private email"),
		email1 : g.t("Work email"),
		email2 : g.t("Other"),
		owner : g.t("Owner"),
		is_mpc : "MPC"
	};
	return c.extend(function (a, b, c) {
		this._id = c
	}, {
		"sig/initialize" : function (a, b) {
			j.call(this, b)
		},
		getField : function (a) {
			var b = "";
			return b = o[a] || a
		},
		getValue : function (a, b) {
			var c = b;
			switch (a) {
			case "type":
				"candidate" === b ? c = g.t("Candidate") : "contact" === b ? c = g.t("Contact") : "coldcall" === b && (c = g.t("Cold Call"));
				break;
			case "annualSalary":
				c = n.CURRENCY_SYM + " " + (b / k).toFixed(0) + n.CURRENCY_UNIT;
				break;
			case "is_mpc":
				c = g.t("True" === b ? "Yes" : "No")
			}
			return c
		},
		"dom/action.click" : b.noop,
		"dom/action/profile/open.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target),
			e = d.attr("href");
			h.window({
				url : e,
				name : "User Profile",
				width : "1024"
			})
		}
	})
})