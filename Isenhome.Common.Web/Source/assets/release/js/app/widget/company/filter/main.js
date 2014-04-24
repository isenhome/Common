define("app/widget/company/filter/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "template!./main.html", "shared/widget/filter/query"], function (a, b, c, d, e, f, g, h) {
	function i() {
		h.addAttr({
			company_name : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && this.addQuery("company_name", "company_name=" + encodeURIComponent(c))
			},
			city_id : function (a) {
				var b = a.find('[name="city_id"]').val();
				b.length && this.addQuery("city_id", "city_id=" + b)
			},
			industry_id : function (a) {
				var b = a.find('[name="industry_id"]').val();
				b.length && this.addQuery("industry_id", "industry_id=" + b)
			},
			type__eq : function (a) {
				var b = a.find('select[name="type__eq"]').val();
				b.length && this.addQuery("type__eq", "type__eq=" + b)
			},
			user : function (a) {
				var b = a.find('select[name="type"]').val(),
				c = a.find('select[name="name"]').val();
				b.length && c.length && this.addQuery("user", b + "=" + c)
			},
			verifystatus : function (a) {
				var b = a.find("select :selected").val();
				b.length && this.addQuery("verifystatus", "verifystatus=" + b)
			},
			folder_id : function (a) {
				var b = a.find('[name="folder_id"]').val();
				b.length && this.addQuery("folder_id", "folder_id=" + b)
			},
			ext : function (a) {
				var b = a.find('select[name="ext-type"] :selected').val(),
				c = a.find("input").val();
				b.length && c.length && this.addQuery("ext", b + "=" + window.encodeURIComponent(c))
			},
			team_id : function (a) {
				var b = a.find('[name="team_id"]').val();
				b.length && this.addQuery("team_id", "team_id=" + b)
			},
			attachment_type : function (a) {
				var b = a.find("select").val();
				b.length && this.addQuery("attachment_type", "attachment_type=" + encodeURIComponent(b))
			}
		})
	}
	function j(a) {
		var b,
		c,
		d,
		e = this,
		f = a[0],
		g = a[1];
		switch (f) {
		case "bd__eq":
		case "user_id":
		case "addedBy__eq":
		case "share_id":
			c = e.$element.find('select[name="type"]').find('[value="' + a[0] + '"]').text(),
			d = e.$element.find('select[name="name"]').find('[value="' + g + '"]').text(),
			e.$element.find('[data-query="user"]').removeClass("hide").find("span").text(d + " - " + c),
			h.addQuery("user", a[0] + "=" + g);
			break;
		case "ext1__icontains":
		case "ext2__icontains":
		case "ext3__icontains":
		case "ext4__icontains":
		case "ext5__icontains":
		case "ext6__icontains":
			c = e.$element.find('select[name="ext-type"] [value="' + a[0] + '"]').text(),
			e.$element.find('[data-query="ext"]').removeClass("hide").find("span").text(c + " - " + window.decodeURIComponent(g)),
			h.addQuery("ext", f + "=" + g);
			break;
		case "type__eq":
		case "verifystatus":
		case "attachment_type":
			b = e.$element.find('[name="' + f + '"] [value="' + decodeURIComponent(g) + '"]').text(),
			e.$element.find('[data-query="' + f + '"]').removeClass("hide").find("span").text(b),
			h.addQuery(f, f + "=" + g);
			break;
		case "city_id":
		case "industry_id":
		case "team_id":
		case "folder_id":
			b = e.$element.find('[data-name="' + f + '"]').woven()[0].getNodeNameById(window.decodeURIComponent(g)),
			e.$element.find('[data-query="' + f + '"]').removeClass("hide").find("span").text(b),
			h.addQuery(f, f + "=" + g);
			break;
		case "byfilter":
			break;
		default:
			e.$element.find('[data-query="' + f + '"]').removeClass("hide").find("span").text(window.decodeURIComponent(g)),
			h.addQuery(f, f + "=" + g)
		}
	}
	function k(a) {
		var c = this,
		f = [],
		h = d(),
		i = d();
		f.push(h.promise(), i.promise()),
		c.publish("ajax", {
			url : n.EXTRA_FIELDS
		}, h.done(function (a) {
				c.extraFields = JSON.parse(a[0].value),
				c._hasExtra = function () {
					var a = !1;
					for (var b in c.extraFields)
						if (c.extraFields[b]) {
							a = !0;
							break
						}
					return a
				}
				()
			})),
		c.publish("ajax", {
			url : n.NEED_VERIFY
		}, i.done(function (a) {
				c.needVerify = "1" === a[0].value
			})),
		e.apply(b, f).done(function () {
			d(function (a) {
				c.html(g, this._json, a)
			}).done(function () {
				l.call(c, a)
			})
		})
	}
	function l(a) {
		var b = this;
		b.folderWidget = b.$element.find('[data-name="folder"]').woven()[0],
		a.resolve()
	}
	function m() {
		var a = this;
		a.city = null
	}
	var n = {
		SAVE_FILTER : "/rest/data/queryfilter/client/add",
		EXTRA_FIELDS : "/rest/data/configvalue?keys=company_field_names",
		NEED_VERIFY : "/rest/data/configvalue?keys=client_need_verify"
	};
	return c.extend(function () {
		var a = this;
		m.call(a),
		h.url = n.SAVE_FILTER,
		a._setFilter = j,
		i.call(a)
	}, {
		extFields : ["ext1", "ext2", "ext3", "ext4", "ext5", "ext6"],
		"sig/initialize" : function (a, b) {
			k.call(this, b)
		},
		"hub:momery/filter/set" : a.around(function (a) {
			return function (b, c) {
				a.call(this, b, c),
				m.call(this)
			}
		})
	})
})