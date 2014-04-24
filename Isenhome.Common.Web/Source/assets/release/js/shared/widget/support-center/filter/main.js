define("shared/widget/support-center/filter/main", ["jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/widget/filter/query", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g() {
		f.addAttr({
			title : function (a) {
				var b = a.find("input").val().trim();
				b.length && this.addQuery("title", "title=" + window.encodeURIComponent(b))
			},
			type : function (a) {
				var b = a.find("select").val().trim();
				b.length && this.addQuery("type", "type=" + window.encodeURIComponent(b))
			},
			status : function (a) {
				var b = a.find("select").val().trim();
				b.length && this.addQuery("status", "status=" + window.encodeURIComponent(b))
			},
			date : function (a) {
				var b = a.find("input").val().trim();
				b.length && this.addQuery("date", "date=" + window.encodeURIComponent(b))
			}
		})
	}
	function h(a) {
		var b = this;
		c(function (a) {
			b.html(e, b._json, a)
		}).done(function () {
			i.call(b, a)
		})
	}
	function i(a) {
		var b = this;
		b.publish("make/route", {
			filter : "",
			page : 1
		}),
		a.resolve()
	}
	function j(a) {
		var b,
		c = this,
		d = a[0],
		e = a[1];
		switch (d) {
		case "type":
		case "status":
			b = c.$element.find('[name="' + d + '"]').find('[value="' + window.decodeURIComponent(e) + '"]').text(),
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(b),
			f.addQuery(d, d + "=" + e);
			break;
		default:
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(window.decodeURIComponent(e)),
			f.addQuery(d, d + "=" + e)
		}
	}
	return b.extend(function () {
		var a = this;
		a._setFilter = j,
		g.call(a)
	}, {
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"dom/action.change" : a.noop
	})
})