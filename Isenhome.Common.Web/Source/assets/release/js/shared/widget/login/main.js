define("shared/widget/login/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/validate", "ladda", "jquery.cookie"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.publish("ajax", {
			url : i.LINKS
		}, c().done(function (c) {
				b._json.links = c,
				b.html(d, b._json, a)
			}))
	}
	function h(b) {
		var d = this,
		e = d.$element.find("#email"),
		g = d.$element.find("#remember"),
		h = d.$element.find("#password"),
		j = d.$element.find(".btn-login");
		a.cookie("email") && (e.val(a.cookie("email")), g.prop("checked", !0)),
		f(a("#login_form"), {
			onkeyup : !1,
			errorClass : "error",
			validClass : "valid",
			rules : {
				email : {
					required : !0,
					minlength : 3
				},
				password : {
					required : !0,
					minlength : 3
				}
			},
			highlight : function (b) {
				a(b).closest("div").addClass("f_error")
			},
			unhighlight : function (b) {
				a(b).closest("div").removeClass("f_error")
			},
			errorPlacement : function (b, c) {
				a(c).closest("div").append(b)
			},
			submitHandler : function (b) {
				var f = a(b),
				k = e.val().trim(),
				l = h.val().trim(),
				m = g.prop("checked");
				return m ? a.cookie("email", k, {
					expires : 30
				}) : a.removeCookie("email"),
				d.publish("ajax", {
					url : i.LOGIN,
					data : {
						data : JSON.stringify({
							email : k,
							password : l,
							remember : m,
							next : window.location.search ? window.location.search.split("=")[1] + window.location.hash : ""
						})
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? (f.find(".alert").addClass("hide"), window.location.href = a.data) : f.find(".alert").removeClass("hide")
					}), j),
				!1
			}
		}),
		b.resolve()
	}
	var i = {
		LINKS : "rest/data/links",
		LOGIN : "/rest/user/login"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			localStorage.removeItem("tabs"),
			localStorage.removeItem("comet"),
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/open/window.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			f = d.attr("href");
			e.window({
				url : f,
				width : 727,
				height : 1e3
			})
		}
	})
})