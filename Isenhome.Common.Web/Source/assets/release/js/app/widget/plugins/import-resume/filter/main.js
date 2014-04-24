define("app/widget/plugins/import-resume/filter/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/widget/filter/query", "shared/helper/utils"], function (a, b, c, d, e, f, g) {
	function h() {
		g.addAttr({
			keyword : function (a) {
				var c = a.find("input").val();
				c.length && (b('[data-query="keyword"]').removeClass("hide").find("span").text(c), this.addQuery("keyword", "content=" + c))
			},
			chineseName : function (a) {
				var c = a.find("input").val();
				c.length && (b('[data-query="chineseName"]').removeClass("hide").find("span").text(c), this.addQuery("chineseName", "chineseName=" + c))
			},
			englishName : function (a) {
				var c = a.find("input").val();
				c.length && (b('[data-query="englishName"]').removeClass("hide").find("span").text(c), this.addQuery("englishName", "englishName=" + c))
			},
			city : function (a) {
				var c = b.trim(a.find('[name="city"]').val()),
				d = a.find('[name="city"]').data("text");
				(c.length || d.length) && (b('[data-query="city"]').removeClass("hide").find("span").text(d), this.addQuery("city", "city=" + d))
			},
			company : function (a) {
				var c = a.find("input").val();
				c.length && (b('[data-query="company"]').removeClass("hide").find("span").text(c), this.addQuery("company", "company=" + c))
			},
			title : function (a) {
				var c = a.find("input").val();
				c.length && (b('[data-query="title"]').removeClass("hide").find("span").text(c), this.addQuery("title", "title=" + c))
			},
			filetime : function (a) {
				var c = a.find('input[name="from"]').val(),
				d = a.find('input[name="to"]').val();
				c && d && (b('[data-query="filetime"]').removeClass("hide").find("span").text(c + " - " + d), this.addQuery("filetime", "filetime__gt=" + c + "&filetime__lt=" + d))
			},
			status : function (a) {
				var c = a.find("select").val(),
				d = a.find('[value="' + c + '"]').text();
				(c.length || d.length) && (b('[data-query="status"]').removeClass("hide").find("span").text(d), this.addQuery("status", "has_candidate_id=" + c))
			},
			dateAdded : function (a) {
				var c = a.find('input[name="from"]').val(),
				d = a.find('input[name="to"]').val();
				c && d && (b('[data-query="dateAdded"]').removeClass("hide").find("span").text(c + " - " + d), this.addQuery("dateAdded", "dateAdded__gt=" + c + "&dateAdded__lt=" + d))
			}
		})
	}
	function i(a) {
		this.html(f, this._json, a)
	}
	function j(a) {
		a.resolve()
	}
	var k = "plugins/import-resume/update/source";
	return c.extend(function () {
		var a = this;
		g.url = null,
		a._setFilter = b.noop,
		h.call(a)
	}, {
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"sig/start" : function (a, b) {
			j.call(this, b)
		},
		"hub/list/load" : function (a, b) {
			var c = this;
			c.publish(k, b.filter)
		}
	})
})