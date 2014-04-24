define("app/widget/security-center/login-log/filter/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils", "shared/widget/filter/query"], function (a, b, c, d, e, f, g, h) {
	function i() {
		h.addAttr({
			loginDate : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && (b('[data-query="loginDate"]').removeClass("hide").find("span").text(c), this.addQuery("loginDate", "date=" + c))
			},
			user : function (a) {
				var c = a.find('select[name="user"] :selected').text(),
				d = a.find('select[name="user"]').val();
				c.length && d.length && (b('[data-query="user"]').removeClass("hide").find("span").text(c), this.addQuery("user", "user__eq=" + d))
			},
			ipAddress : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && (b('[data-query="ipAddress"]').removeClass("hide").find("span").text(c), this.addQuery("ipAddress", "ip__eq=" + c))
			},
			ipCity : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && (b('[data-query="ipCity"]').removeClass("hide").find("span").text(c), this.addQuery("ipCity", "location=" + c))
			},
			browser : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && (b('[data-query="browser"]').removeClass("hide").find("span").text(c), this.addQuery("browser", "browser=" + c))
			},
			loginStatus : function (a) {
				var c = parseInt(a.find("select").val(), 10),
				d = a.find("select :selected").text();
				(c.length || d.length) && (b('[data-query="loginStatus"]').removeClass("hide").find("span").text(d), this.addQuery("loginStatus", "success__eq=" + (0 === c ? "" : c)))
			},
			multipleLogin : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && (b('[data-query="multipleLogin"]').removeClass("hide").find("span").text(c), this.addQuery("multipleLogin", "times=" + c))
			}
		})
	}
	function j(a) {
		this.html(f, this._json, a)
	}
	function k(a) {
		var b,
		c = this,
		d = a[0],
		e = a[1];
		switch (d.indexOf("_") > -1 && (d = d.substring(0, d.indexOf("_"))), d) {
		case "date":
			c.$element.find('[data-query="loginDate"]').removeClass("hide").find("span").text(e),
			h.addQuery("loginDate", "date=" + e);
			break;
		case "user":
			b = c.$element.find('select[name="user"]').find('[value="' + e + '"]').text(),
			c.$element.find('[data-query="user"]').removeClass("hide").find("span").text(b),
			h.addQuery("user", "user__eq=" + e);
			break;
		case "ip":
			c.$element.find('[data-query="ipAddress"]').removeClass("hide").find("span").text(e),
			h.addQuery("ipAddress", "ip__eq=" + e);
			break;
		case "location":
			c.$element.find('[data-query="ipCity"]').removeClass("hide").find("span").text(e),
			h.addQuery("ipCity", "location=" + e);
			break;
		case "browser":
			c.$element.find('[data-query="browser"]').removeClass("hide").find("span").text(e),
			this.addQuery("browser", "browser=" + e);
			break;
		case "success":
			b = c.$element.find('select[name="status"]').find('[value="' + e + '"]').text(),
			c.$element.find('[data-query="loginStatus"]').removeClass("hide").find("span").text(b),
			h.addQuery("loginStatus", "success__eq=" + e);
			break;
		case "times":
			c.$element.find('[data-query="multipleLogin"]').removeClass("hide").find("span").text(e),
			h.addQuery("multipleLogin", "times=" + e)
		}
	}
	return c.extend(function () {
		var a = this;
		a._setFilter = k,
		i.call(a)
	}, {
		"sig/initialize" : function (a, b) {
			j.call(this, b)
		},
		"hub:memory/route" : function (a, b) {
			var c = this,
			d = new Date;
			b.source || c.publish("make/route", {
				list : "",
				filter : "date=" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
				page : 1
			})
		}
	})
})