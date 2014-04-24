define("app/widget/notification-center/filter/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils", "shared/widget/filter/query"], function (a, b, c, d, e, f, g, h) {
	function i() {
		var a;
		h.addAttr({
			type : function (b) {
				a = b.find("select").val(),
				a.length && this.addQuery("type", "type=" + window.encodeURIComponent(a))
			},
			date : function (a) {
				var b = a.find('input[name="from"]').val(),
				c = a.find('input[name="to"]').val();
				b && c && this.addQuery("date", "dateAdded__gt=" + b + "&dateAdded__lt=" + c)
			}
		})
	}
	function j(a) {
		this.html(f, this._json, a)
	}
	function k(a) {
		var c,
		d = this,
		e = a[0],
		f = a[1];
		switch (e.indexOf("dateAdded") > -1 && (e = "dateAdded"), e) {
		case "dateAdded":
			if (a[0].indexOf("gt") > -1 || a[0].indexOf("lt") > -1) {
				if (a[0].indexOf("gt") > -1 ? d.updateFrom = f : a[0].indexOf("lt") > -1 && (d.updateTo = f), d.updateFrom && d.updateTo)
					return d.$element.find('[data-query="date"]').removeClass("hide").find("span").text(d.updateFrom + " - " + d.updateTo), h.addQuery("date", "dateAdded__gt=" + d.updateFrom + "&dateAdded__lt=" + d.updateTo), void 0
			} else
				d.$element.find('a[data-action="date"]').each(function () {
					return b(this).attr("href").substring(1) == a[0] + "=" ? (c = b(this).text(), !1) : void 0
				}), d.$element.find('[data-query="date"]').removeClass("hide").find("span").text(c), h.addQuery("date", a[0] + "=");
			break;
		case "type":
			c = d.$element.find('[name="' + e + '"]').find('[value="' + window.decodeURIComponent(f) + '"]').text(),
			d.$element.find('[data-query="' + e + '"]').removeClass("hide").find("span").text(c),
			h.addQuery(e, e + "=" + f);
			break;
		case "byfilter":
			break;
		default:
			d.$element.find('[data-query="' + e + '"]').removeClass("hide").find("span").text(window.decodeURIComponent(f)),
			h.addQuery(e, e + "=" + f)
		}
	}
	var l = {
		SAVE_FILTER : "/rest/data/queryfilter/message/add"
	};
	return c.extend(function () {
		var a = this;
		h.url = l.SAVE_FILTER,
		a._setFilter = k,
		i.call(a)
	}, {
		"sig/initialize" : function (a, b) {
			j.call(this, b)
		},
		"hub:memory/filter/set" : a.around(function (a) {
			return function (b, c) {
				a.call(this, b, c)
			}
		}),
		"dom/action.click" : b.noop,
		"dom/action/date.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target);
			b('[data-query="date"]').removeClass("hide").find("span").text(d.text()),
			h.addQuery("date", d.attr("href").substring(1)),
			d.closest("form").find("button").trigger("click")
		}
	})
})