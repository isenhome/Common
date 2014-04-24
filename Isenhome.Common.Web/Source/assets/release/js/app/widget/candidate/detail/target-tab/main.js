define("app/widget/candidate/detail/target-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.publish("ajax", {
			url : g.LIST.replace("<id>", b._id)
		}, c().done(function (c) {
				b._json = c,
				b.html(e, b._json, a),
				b.publish(h, "intention", c.length)
			}).always(function () {
				d.widgetLoaded.call(b)
			}))
	}
	var g = {
		LIST : "/rest/candidate/targetcompany/list?candidate=<id>"
	},
	h = "candidate/action/count";
	return b.extend(function (a, b, c) {
		this._id = c
	}, {
		"hub:memory/context" : function (a, b) {
			this.userId = b.user.id,
			f.call(this)
		},
		"hub/candidate/intention/tab/reload" : function () {
			f.call(this, c())
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