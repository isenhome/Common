define("app/widget/user/filter/main", ["jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/widget/filter/query", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g() {
		f.addAttr({
			name : function (b) {
				var c = a.trim(b.find("input").val());
				c.length && this.addQuery("name", "name=" + encodeURIComponent(c))
			},
			team_id : function (a) {
				var b = a.find('[name="team_id"]').val();
				b.length && this.addQuery("team", "team_id=" + b)
			},
			status__eq : function (a) {
				var b = a.find('select[name="status__eq"] :selected').text(),
				c = a.find("select").val();
				b.length && this.addQuery("status__eq", "status__eq=" + c)
			}
		})
	}
	function h(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function i(a) {
		var b,
		c = this,
		d = a[0],
		e = a[1];
		switch (d) {
		case "status__eq":
			b = c.$element.find('[name="' + d + '"]').find('[value="' + window.decodeURIComponent(e) + '"]').text(),
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(b),
			f.addQuery(d, d + "=" + e);
			break;
		case "team_id":
			b = c.$element.find('[data-name="' + d + '"]').woven()[0].getNodeNameById(window.decodeURIComponent(e)),
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(b),
			f.addQuery(d, d + "=" + e);
			break;
		case "byfilter":
			break;
		default:
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(window.decodeURIComponent(e)),
			f.addQuery(d, d + "=" + e)
		}
	}
	var j = {
		SAVE_FILTER : "/rest/data/queryfilter/user/add"
	};
	return b.extend(function () {
		var a = this;
		f.url = j.SAVE_FILTER,
		a._setFilter = i,
		g.call(a)
	}, {
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		}
	})
})