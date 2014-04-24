define("app/widget/modal/payment-received/main", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g) {
	function h(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function i(a) {
		var b = this;
		b.$form = b.$element.find("form"),
		b.$payment = b.$element.find('[name="payment"]'),
		b.$receivedDate = b.$element.find('[name="receivedDate"]'),
		g(b.$form, {
			rules : {
				payment : {
					required : !0,
					number : !0
				},
				receivedDate : {
					required : !0,
					dateISO : !0
				}
			}
		}),
		a.resolve()
	}
	var j = {
		PAYMENT_RECEIVED : "/rest/invoice/<id>/paymentreceived"
	};
	return d.extend({
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"sig/start" : function (a, b) {
			i.call(this, b)
		},
		"hub/modal/payment-received/show" : function (a, b, c, d) {
			var e = this,
			f = e.$element;
			f.find(".modal-footer button"),
			e._id = c,
			e._onSuccess = d,
			e.$element.find(".text_line .text").text(e.formatCurrency(b)),
			f.modal("show")
		},
		"dom/action.click" : b.noop,
		"dom/action/yes.click" : function (a, d) {
			d.preventDefault();
			var e = this,
			g = e.$element,
			h = b(d.target);
			if (e.$form.valid()) {
				var i = {
					paymentReceivedDate : e.$receivedDate.val(),
					paymentReceived : e.$payment.val().trim()
				};
				g.modal("hide"),
				e.publish("ajax", {
					url : j.PAYMENT_RECEIVED.replace("<id>", e._id),
					data : {
						data : JSON.stringify(i)
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? (f.alert("success", "Add payment received successful!"), e._onSuccess && e._onSuccess(a)) : f.alert("error", "Add payment received error: " + a.message)
					}), h)
			}
		}
	})
})