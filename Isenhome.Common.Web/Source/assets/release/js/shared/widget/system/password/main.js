define("shared/widget/system/password/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		c(function (a) {
			b.html(d, b._json, a)
		}).then(function () {
			a.resolve()
		})
	}
	function h(a) {
		var b = this,
		c = b.$element.find("form");
		f(c, {
			rules : {
				originpass : {
					required : !0
				},
				newpass : {
					required : !0
				},
				confirmpass : {
					required : !0
				}
			}
		}),
		a.resolve()
	}
	var i = "/rest/user/changepassword";
	return b.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"hub:memory/context" : function (a, b) {
			this._user = b.user
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target),
			h = a(d.target).parents("form"),
			j = h.find("[name=originpass]").val(),
			k = h.find("[name=newpass]").val(),
			l = h.find("[name=confirmpass]").val(),
			m = this._user,
			n = {};
			return h.valid() ? k != l ? (e.alert("error", "Your confirm password doesn't match your new password"), void 0) : (n.email = m.email, n.origin = j, n.new = k, f.publish("ajax", {
					url : i,
					data : {
						data : JSON.stringify(n)
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? e.alert("success", "Change password success!") : e.alert("error", a.message)
					}), g), void 0) : !1
		},
		"dom/action/open/authenticator.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish("modal/authenticator/show")
		}
	})
})