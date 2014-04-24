define("shared/widget/modal/email-signature/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function g(a) {
		var b = this;
		b.$textarea = b.$element.find("textarea"),
		a.resolve()
	}
	var h = {
		SIGNATURE_ADD : "/rest/data/userconfig/add"
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		"hub/modal/email-signature/show" : function () {
			var a = this,
			b = a.$element;
			b.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (c, d) {
			d.preventDefault();
			var f = this,
			g = f.$element,
			i = a(d.target);
			f._json.id;
			var j = {
				emailSignature : CKEDITOR.instances[f.$textarea.attr("name")].getData()
			};
			f.publish("ajax", {
				url : h.SIGNATURE_ADD,
				data : {
					data : JSON.stringify(j)
				},
				type : "post"
			}, b().done(function (a) {
					g.modal("hide"),
					a.status ? e.alert("success", "Update email signature success.") : e.alert("error", a.message)
				}), i)
		}
	})
})