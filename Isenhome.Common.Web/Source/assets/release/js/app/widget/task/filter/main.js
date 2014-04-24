define("app/widget/task/filter/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/widget/filter/query", "shared/helper/utils"], function (a, b, c, d, e, f, g) {
	function h() {
		g.addAttr({
			category : function (a) {
				var b = a.find(":selected").val();
				b.length && this.addQuery("category", "category=" + b)
			},
			date : function () {},
			user_id : function (a) {
				var b = a.find(":selected"),
				c = b.val();
				c ? this.addQuery("user_id", "user_id=" + c) : this.deleteQuery("user_id")
			},
			addedBy__eq : function (a) {
				var b = a.find(":selected"),
				c = b.val();
				c ? this.addQuery("addedBy__eq", "addedBy__eq=" + c) : this.deleteQuery("addedBy__eq")
			},
			done__eq : function (a) {
				var b = a.find(":selected"),
				c = b.val();
				this.addQuery("done__eq", "done__eq=" + c)
			},
			team_id : function (a) {
				var b = a.find('[name="team_id"]').val();
				b.length && this.addQuery("team_id", "team_id=" + b)
			}
		})
	}
	function i(a) {
		var b = this;
		b.publish("ajax", {
			url : l.CATEGORY
		}, d().done(function (c) {
				b._json = c,
				b.html(f, b._json, a)
			}))
	}
	function j(a) {
		var c,
		d = this,
		e = a[0],
		f = a[1];
		switch (e.indexOf("date") > -1 && (e = "date"), e) {
		case "date":
			d.$element.find('a[data-action="lastupdate"]').each(function () {
				return b(this).attr("href").substring(1) == a[0] + "=" ? (c = b(this).text(), !1) : void 0
			}),
			d.$element.find('[data-query="date"]').removeClass("hide").find("span").text(c),
			g.addQuery("date", a[0] + "=" + f);
			break;
		case "user_id":
		case "category":
		case "done__eq":
		case "addedBy__eq":
			c = d.$element.find('[name="' + e + '"]').find('[value="' + window.decodeURIComponent(f) + '"]').text(),
			d.$element.find('[data-query="' + e + '"]').removeClass("hide").find("span").text(c),
			g.addQuery(e, e + "=" + f);
			break;
		case "team_id":
			c = d.$element.find('[data-name="' + e + '"]').woven()[0].getNodeNameById(window.decodeURIComponent(f)),
			d.$element.find('[data-query="' + e + '"]').removeClass("hide").find("span").text(c),
			g.addQuery(e, e + "=" + f);
			break;
		case "byfilter":
			break;
		default:
			d.$element.find('[data-query="' + e + '"]').removeClass("hide").find("span").text(window.decodeURIComponent(f)),
			g.addQuery(e, e + "=" + f)
		}
	}
	var k = new Date;
	({
		YEAR : k.getFullYear(),
		MONTH : k.getMonth(),
		DATE : k.getDate(),
		DAY : k.getDay()
	});
	var l = {
		SAVE_FILTER : "/rest/data/queryfilter/todo/add",
		CATEGORY : "/rest/data/options?type=todo_category"
	};
	return c.extend(function () {
		var a = this;
		g.url = l.SAVE_FILTER,
		a._setFilter = j,
		h.call(a)
	}, {
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"hub:momery/filter/set" : a.around(function (a) {
			return function (b, c) {
				a.call(this, b, c)
			}
		}),
		"dom/action.click" : b.noop,
		"dom/action/lastupdate.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target);
			b('[data-query="date"]').removeClass("hide").find("span").text(d.text()),
			g.addQuery("date", d.attr("href").substring(1)),
			d.closest("form").find("button").trigger("click")
		}
	})
})