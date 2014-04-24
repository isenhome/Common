define("app/widget/job/filter/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/widget/filter/query", "jquery.tagit"], function (a, b, c, d, e, f, g) {
	function h() {
		g.addAttr({
			jobTitle__icontains : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && this.addQuery("jobTitle__icontains", "jobTitle__icontains=" + window.encodeURIComponent(c))
			},
			client__name__icontains : function (a) {
				var c = b.trim(a.find('input[name="company-name"]').val());
				c.length && this.addQuery("client__name__icontains", "client__name__icontains=" + window.encodeURIComponent(c))
			},
			client_type : function (a) {
				var b = a.find('[name="client_type"]').val();
				b.length && this.addQuery("client_type", "client_type=" + window.encodeURIComponent(b))
			},
			tags : function (a) {
				var b = a.find("input").val();
				b && this.addQuery("tags", "tags=" + encodeURIComponent(b))
			},
			industry_id : function (a) {
				var b = a.find('[name="industry_id"]').val();
				b.length && this.addQuery("industry_id", "industry_id=" + b)
			},
			function_id : function (a) {
				var b = a.find('[name="function_id"]').val();
				b.length && this.addQuery("function_id", "function_id=" + b)
			},
			city_id : function (a) {
				var b = a.find('[name="city_id"]').val();
				b.length && this.addQuery("city_id", "city_id=" + b)
			},
			jobStatus__eq : function (a) {
				var b = a.find("select").val();
				b.length && this.addQuery("jobStatus__eq", "jobStatus__eq=" + b)
			},
			priority__eq : function (a) {
				var b = a.find("select").val();
				b.length && this.addQuery("priority__eq", "priority__eq=" + b)
			},
			user : function (a) {
				var b = a.find('select[name="type"]').val(),
				c = a.find('select[name="name"]').val();
				b.length && c.length && this.addQuery("user", b + "=" + c)
			},
			team_id : function (a) {
				var b = a.find('[name="team_id"]').val();
				b.length && this.addQuery("team_id", "team_id=" + b)
			},
			update : function (a) {
				var b = a.find('input[name="from"]').val(),
				c = a.find('input[name="to"]').val();
				b && c && this.addQuery("update", "lastUpdateDate__gt=" + b + "&lastUpdateDate__lt=" + c)
			},
			ext : function (a) {
				var b = a.find('select[name="ext-type"] :selected').val(),
				c = a.find("input").val();
				b.length && c.length && this.addQuery(b, b + "=" + window.encodeURIComponent(c))
			},
			attachment_type : function (a) {
				var b = a.find("select").val();
				b.length && this.addQuery("attachment_type", "attachment_type=" + encodeURIComponent(b))
			}
		})
	}
	function i(a, c, d) {
		var e,
		f = 0,
		g = c.length,
		h = a.clone();
		if (d)
			for (b("<option>").val("").text("------").appendTo(h); g > f; f += 1)
				e = c[f], e.parent_id == d && b("<option>").val(e.id).text(e.name).appendTo(h);
		else
			for (; g > f; f += 1)
				e = c[f], e.parent_id || b("<option>").val(e.id).text(e.name).appendTo(h);
		a.replaceWith(h)
	}
	function j(a) {
		var b = this;
		b.publish("ajax", {
			url : o.EXTRA_FIELDS
		}, d().done(function (c) {
				b.extraFields = JSON.parse(c[0].value),
				b._hasExtra = function () {
					var a = !1;
					for (var c in b.extraFields)
						if (b.extraFields[c]) {
							a = !0;
							break
						}
					return a
				}
				(),
				b.html(e, b._json, a)
			}))
	}
	function k(a) {
		a.resolve()
	}
	function l(a) {
		var c,
		d,
		e,
		f = this,
		h = a[0],
		i = a[1];
		switch (h) {
		case "user_id":
		case "bd_id":
		case "main_consultant_id":
		case "consultant_id":
		case "researcher_id":
			d = f.$element.find('select[name="type"]').find('[value="' + a[0] + '"]').text(),
			e = f.$element.find('select[name="name"]').find('[value="' + i + '"]').text(),
			f.$element.find('[data-query="user"]').removeClass("hide").find("span").text(d + " - " + e),
			g.addQuery("user", h + "=" + i);
			break;
		case "lastUpdateDate":
			if (a[0].indexOf("gt") > -1 || a[0].indexOf("lt") > -1) {
				if (a[0].indexOf("gt") > -1 ? f.updateFrom = i : a[0].indexOf("lt") > -1 && (f.updateTo = i), f.updateFrom && f.updateTo)
					return f.$element.find('[data-query="update"]').removeClass("hide").find("span").text(f.updateFrom + " - " + f.updateTo), g.addQuery("update", "lastUpdateDate__gt=" + f.updateFrom + "&lastUpdateDate__lt=" + f.updateTo), void 0
			} else
				f.$element.find('a[data-action="lastupdate"]').each(function () {
					return b(this).attr("href").substring(1) == a[0] + "=" ? (c = b(this).text(), !1) : void 0
				}), f.$element.find('[data-query="update"]').removeClass("hide").find("span").text(c), g.addQuery("update", a[0] + "=");
			break;
		case "ext1__icontains":
		case "ext2__icontains":
		case "ext3__icontains":
		case "ext4__icontains":
		case "ext5__icontains":
		case "ext6__icontains":
			d = f.$element.find('select[name="ext-type"] [value="' + a[0] + '"]').text(),
			f.$element.find('[data-query="ext"]').removeClass("hide").find("span").text(d + " - " + window.decodeURIComponent(i)),
			g.addQuery("ext", h + "=" + i);
			break;
		case "function_id":
		case "industry_id":
		case "team_id":
		case "city_id":
			c = f.$element.find('[data-name="' + h + '"]').woven()[0].getNodeNameById(window.decodeURIComponent(i)),
			f.$element.find('[data-query="' + h + '"]').removeClass("hide").find("span").text(c),
			g.addQuery(h, h + "=" + i);
			break;
		case "jobStatus__eq":
		case "priority__eq":
		case "client_type":
		case "attachment_type":
			c = f.$element.find('[name="' + h + '"]').find('[value="' + i + '"]').text(),
			f.$element.find('[data-query="' + h + '"]').removeClass("hide").find("span").text(c),
			g.addQuery(h, h + "=" + i);
			break;
		case "byfilter":
			break;
		default:
			f.$element.find('[data-query="' + h + '"]').removeClass("hide").find("span").text(window.decodeURIComponent(i)),
			g.addQuery(h, h + "=" + i)
		}
	}
	function m() {
		var a = this;
		this.ageFrom = null,
		this.maxYear = null,
		this.salaryFrom = null,
		this.salaryTo = null,
		this.updateFrom = null,
		this.updateTo = null,
		g.url = o.SAVE_FILTER,
		a._setFilter = l
	}
	var n = new Date;
	({
		YEAR : n.getFullYear(),
		MONTH : n.getMonth(),
		DATE : n.getDate(),
		DAY : n.getDay()
	});
	var o = {
		SAVE_FILTER : "/rest/data/queryfilter/joborder/add",
		EXTRA_FIELDS : "/rest/data/configvalue?keys=joborder_field_names"
	};
	return c.extend(function () {
		var a = this;
		m.call(a),
		h.call(a)
	}, {
		extFields : ["ext1", "ext2", "ext3", "ext4", "ext5", "ext6"],
		"sig/initialize" : function (a, b) {
			j.call(this, b)
		},
		"sig/start" : function (a, b) {
			k.call(this, b)
		},
		"hub:memory/filter/set" : a.around(function (a) {
			return function (b, c) {
				a.call(this, b, c),
				m.call(this)
			}
		}),
		"dom/action.click" : b.noop,
		"dom/action/lastupdate.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target);
			b('[data-query="update"]').removeClass("hide").find("span").text(d.text()),
			g.addQuery("update", d.attr("href").substring(1)),
			d.closest("form").find("button").trigger("click")
		},
		"dom/action.change" : b.noop,
		"dom/action/function.change" : function (a, c) {
			c.preventDefault();
			var d = b(c.target),
			e = d.val(),
			f = d.next().empty();
			i(f, this._function, e);
			var g = d.next();
			g.children().length > 1 ? g.removeClass("hide") : g.addClass("hide")
		},
		"dom/action/industry.change" : function (a, c) {
			c.preventDefault();
			var d = b(c.target),
			e = d.val(),
			f = d.next().empty();
			i(f, this._industry, e);
			var g = d.next();
			g.children().length > 1 ? g.removeClass("hide") : g.addClass("hide")
		}
	})
})