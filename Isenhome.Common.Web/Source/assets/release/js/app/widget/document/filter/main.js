define("app/widget/document/filter/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/widget/filter/query"], function (a, b, c, d, e, f, g) {
	function h() {
		g.addAttr({
			content : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && this.addQuery("content", "content=" + encodeURIComponent(c))
			},
			originname : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && this.addQuery("originname", "originname=" + encodeURIComponent(c))
			},
			dateAdded : function (a) {
				var b = a.find('input[name="from"]').val(),
				c = a.find('input[name="to"]').val();
				b && c && this.addQuery("dateAdded", "dateAdded__gt=" + b + "&dateAdded__lt=" + c)
			},
			folder_id : function (a) {
				var b = a.find('[name="folder"]').val();
				b.length && this.addQuery("folder_id", "folder_id=" + b)
			},
			user_id : function (a) {
				var b = a.find('select[name="name"]').val();
				b.length && this.addQuery("user_id", "user_id=" + b)
			}
		})
	}
	function i(a) {
		var b = this;
		d(function (a) {
			b.html(e, this._json, a)
		}).done(function () {
			j.call(b, a)
		})
	}
	function j(a) {
		var b = this;
		b.folderWidget = b.$element.find('[data-name="folder"]').woven()[0],
		a.resolve()
	}
	function k(a) {
		var b,
		c = this,
		d = a[0],
		e = a[1];
		switch (d) {
		case "dateAdded__gt":
		case "dateAdded__lt":
			if ("dateAdded__gt" === d ? c.updateFrom = e : "dateAdded__lt" === d && (c.updateTo = e), c.updateFrom && c.updateTo)
				return c.$element.find('[data-query="dateAdded"]').removeClass("hide").find("span").text(c.updateFrom + " - " + c.updateTo), g.addQuery("dateAdded", "dateAdded__gt=" + c.updateFrom + "&dateAdded__lt=" + c.updateTo), void 0;
			break;
		case "user_id":
			b = c.$element.find('select[name="name"]').find('[value="' + e + '"]').text(),
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(b),
			g.addQuery(d, d + "=" + e);
			break;
		case "folder_id":
			b = c.folderWidget.getNodeNameById(e),
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(b),
			g.addQuery(d, d + "=" + e);
			break;
		case "byfilter":
			break;
		default:
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(window.decodeURIComponent(e)),
			g.addQuery(d, d + "=" + e)
		}
	}
	function l() {
		var a = this;
		g.url = m.SAVE_FILTER,
		a._setFilter = k
	}
	var m = {
		SAVE_FILTER : "/rest/data/queryfilter/document/add"
	};
	return c.extend(function () {
		var a = this;
		l.call(a),
		h.call(a)
	}, {
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"hub:memory/filter/set" : a.around(function (a) {
			return function (b, c) {
				a.call(this, b, c),
				l.call(this)
			}
		})
	})
})