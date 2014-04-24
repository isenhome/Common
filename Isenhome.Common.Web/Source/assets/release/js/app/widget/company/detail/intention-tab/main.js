define("app/widget/company/detail/intention-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html", "jquery.datatables"], function (a, b, c, d, e) {
	function f() {
		var a = this;
		a.publish("ajax", {
			url : g.LIST.replace("<id>", a._id)
		}, c().done(function (b) {
				a._json = b,
				a.html(e, a._json)
			}).always(function () {
				d.widgetLoaded.call(a)
			}))
	}
	var g = {
		LIST : "/rest/candidate/targetcompany/list?client=<id>"
	};
	return b.extend(function (a, b, c) {
		this._id = c
	}, {
		"hub:memory/context" : function (a, b) {
			this.userId = b.user.id,
			f.call(this)
		},
		"dom/action.click" : a.noop,
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var e = a(c.target),
			f = e.attr("href");
			d.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/edit/target.click" : function (a, b, d) {
			b.preventDefault();
			var e = this,
			g = e._json[d];
			e.publish("modal/target-company/show", {
				id : g.candidate.id,
				data : g,
				onSuccess : function () {
					f.call(e, c())
				}
			})
		}
	})
})