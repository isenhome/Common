define("app/widget/modal/invalid-invoice/main", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g) {
	function h(a) {
		var b = this;
		b.publish("ajax", {
			url : j.REASON
		}, c().done(function (c) {
				b._json.reasons = c,
				b.html(e, b._json, a)
			}))
	}
	function i(a) {
		var b = this;
		b.$form = b.$element.find("form"),
		b.$reason = b.$element.find('[name="reason"]'),
		g(b.$form, {
			rules : {
				reason : {
					required : !0
				}
			}
		}),
		a.resolve()
	}
	var j = {
		REASON : "/rest/data/options?type=invoice_invalid_reason",
		INVALID_INVOICE : "/rest/invoice/<id>/invalidinvoice"
	};
	return d.extend({
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"sig/start" : function (a, b) {
			i.call(this, b)
		},
		"hub/modal/confirm/invalid-invoice/show" : function (a, b) {
			var c = this,
			d = c.$element;
			c._id = b.id,
			c._onSuccess = b.onSuccess,
			d.modal("show")
		},
		"dom/action.click" : b.noop,
		"dom/action/add.click" : function (a, b) {
			b.preventDefault();
			var d = this,
			e = d.$element;
			if (d.$form.valid()) {
				var g = {
					data : JSON.stringify({
						invalidReason : d.$reason.find(":selected").val()
					})
				};
				d.publish("ajax", {
					url : j.INVALID_INVOICE.replace("<id>", d._id),
					type : "post",
					data : g
				}, c().done(function (a) {
						a.status ? (d._onSuccess && d._onSuccess(a), f.alert("success", "作废发票成功!")) : f.alert("error", a.message)
					})),
				e.modal("hide")
			}
		},
		"dom/action/cancel.click" : function (a, b) {
			b.preventDefault();
			var c = this,
			d = c.$element;
			d.modal("hide")
		}
	})
})