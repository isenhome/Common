define("shared/widget/modal/authenticator/main", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g) {
	function h(a) {
		var b = this,
		c = new Image;
		c.onload = function () {
			b.$barcode.attr("src", a)
		},
		c.onerror = function () {
			window.setTimeout(function () {
				h.call(b, a)
			}, 400)
		},
		c.src = a
	}
	function i(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function j(a) {
		var b = this;
		b.$form = b.$element.find("form"),
		b.$barcode = b.$form.find(".barcode"),
		b.$username = b.$form.find(".username"),
		b.$secretkey = b.$form.find(".secretkey"),
		b.$code = b.$form.find('[name="code"]'),
		g(b.$form, {
			rules : {
				code : {
					required : !0
				}
			}
		}),
		a.resolve()
	}
	var k = {
		REGISTER : "/rest/user/login/2step/register",
		UNREGISTER : "/rest/user/login/2step/unregistercheck",
		CHECK : "/rest/user/login/2step/registercheck?code="
	};
	return d.extend({
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"sig/start" : function (a, b) {
			j.call(this, b)
		},
		"hub/modal/authenticator/show" : function () {
			var a = this,
			b = a.$element;
			a.publish("ajax", {
				url : k.REGISTER
			}, c().done(function (c) {
					if (c.status) {
						var d = c.data,
						e = d.barcode;
						e.substring(e.indexOf("otpauth")),
						h.call(a, e),
						a.$username.text(d.username),
						a.$secretkey.text(d.secretkey),
						b.modal("show")
					}
				}))
		},
		"dom/action.click" : b.noop,
		"dom/action/cancel.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$element.modal("hide")
		},
		"dom/action/auth.click" : function (a, b) {
			b.preventDefault();
			var d = this,
			e = d.$element;
			d.$form.valid() && (d.publish("ajax", {
					url : k.CHECK + d.$code.val().trim()
				}, c().done(function (a) {
						a.status || f.alert("error", a.message)
					})), e.modal("hide"))
		}
	})
})