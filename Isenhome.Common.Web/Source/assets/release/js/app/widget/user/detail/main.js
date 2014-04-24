define("app/widget/user/detail/main", ["compose", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		a._id !== i && a._isAdmin !== i && a.publish("ajax", {
			url : j.USER.replace("<id>", a._id)
		}, d().done(function (b) {
				a._json = b,
				h.call(a)
			}))
	}
	function h() {
		var a = this,
		b = d();
		b.done(function () {
			e.widgetLoaded.call(a)
		}),
		a.html(f, a._json, b)
	}
	var i,
	j = {
		USER : "/rest/user/<id>",
		EDIT_USER : "/user/edit#",
		RESET_PASSWORD : "/rest/user/resetpassword"
	};
	return c.extend({
		"hub:memory/detail/id/change" : function (a, b) {
			var c = this;
			c._id = b,
			g.call(c)
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._isAdmin = "Admin" === b.user.role ? !0 : !1,
			g.call(c)
		},
		"dom/action.click" : b.noop,
		"dom/action/history/back.click" : function (a, b) {
			b.preventDefault(),
			window.history.back()
		},
		"dom/action/edit/user.click" : function (a, b, c) {
			b.preventDefault(),
			window.location.href = j.EDIT_USER + c
		},
		"dom/action/reset/password.click" : function (a, b, c) {
			b.preventDefault();
			var f = this,
			g = window.confirm("Do you really want to reset this user's passowrd?");
			g && f.publish("ajax", {
				url : j.RESET_PASSWORD,
				data : {
					data : JSON.stringify({
						email : c
					})
				},
				type : "post"
			}, d().done(function (a) {
					a.status ? e.alert("success", "Reset user's passowrd successfully!") : e.alert("error", a.message)
				}))
		}
	})
})