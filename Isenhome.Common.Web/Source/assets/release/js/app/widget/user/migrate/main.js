define("app/widget/user/migrate/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(b) {
		var f = this,
		g = [];
		if (f.uid) {
			var i = c(),
			j = c();
			g.push(i.promise(), j.promise()),
			f.publish("ajax", {
				url : h.USER.replace("<id>", f.uid)
			}, i.done(function (a) {
					f._json.user = a
				})),
			f.publish("ajax", {
				url : h.OVERVIEW.replace("<id>", f.uid)
			}, j.done(function (a) {
					f._json.overview = a
				})),
			d.apply(a, g).done(function () {
				f.html(e, f._json, b)
			})
		} else
			b.reject()
	}
	function g(a) {
		var b = this;
		b.username = [b._json.user.englishName, b._json.user.chineseName].join(" "),
		a.resolve()
	}
	var h = {
		USER : "/rest/user/<id>",
		OVERVIEW : "/rest/manage/datamigration/<id>/overview"
	};
	return b.extend(function () {
		var a = window.location.hash.replace(/^#/, "");
		this.uid = a.match(/(?:\D*)(\d*)(?:\D*)/)[1]
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/open/migration.click" : function (b, c, d, e) {
			c.preventDefault();
			var f = this,
			g = a(c.target);
			g.hasClass("disabled") || f.publish("modal/data-migration/show", {
				id : this.uid,
				name : f.username,
				hasShare : e,
				onSuccess : function () {
					g.closest("td").prev("td").text("0"),
					g.addClass("disabled")
				},
				type : d,
				number : f._json.overview[d]
			})
		}
	})
})