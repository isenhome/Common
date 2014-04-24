define("app/widget/modal/reset-invoice/main", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function h(a) {
		a.resolve()
	}
	var i = {
		RESET_INVOICE : "/rest/invoice/<id>/resetinvoice"
	};
	return d.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"hub/modal/reset-invoice/show" : function (a, b, c) {
			var d = this,
			e = d.$element;
			d._id = b,
			d._onSuccess = c,
			e.modal("show")
		},
		"dom/action.click" : b.noop,
		"dom/action/no.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$element.modal("hide")
		},
		"dom/action/yes.click" : function (a, d) {
			d.preventDefault();
			var e = this,
			g = b(d.target);
			e.publish("ajax", {
				url : i.RESET_INVOICE.replace("<id>", e._id),
				type : "post"
			}, c().done(function (a) {
					e.$element.modal("hide"),
					a.status ? (f.alert("success", "重置发票状态已成功！"), e._onSuccess && e._onSuccess()) : f.alert("error", a.message)
				}), g)
		}
	})
})