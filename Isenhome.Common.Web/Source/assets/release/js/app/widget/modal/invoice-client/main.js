define("app/widget/modal/invoice-client/main", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g) {
	function h(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function i(a) {
		var b = this;
		b.$form = b.$element.find("form"),
		g(b.$form, {
			rules : {
				sentDate : {
					required : !0,
					dateISO : !0
				}
			}
		}),
		a.resolve()
	}
	var j = {
		SEND_TO_CLIENT : "/rest/invoice/<id>/invoicesent"
	};
	return d.extend({
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"sig/start" : function (a, b) {
			i.call(this, b)
		},
		"hub/modal/invoice-client/show" : function (a, b, c) {
			var d = this,
			e = d.$element;
			e.find(".modal-footer button"),
			d._id = b,
			d._onSuccess = c,
			e.modal("show")
		},
		"dom/action.click" : b.noop,
		"dom/action/yes.click" : function (a, b) {
			b.preventDefault();
			var d = this,
			e = d.$element;
			if (d.$form.valid()) {
				var g = {
					sentDate : d.$element.find('[name="sentDate"]').val()
				};
				e.modal("hide"),
				d.publish("ajax", {
					url : j.SEND_TO_CLIENT.replace("<id>", d._id),
					data : {
						data : JSON.stringify(g)
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? (f.alert("success", "Add invoice sent successful!"), d._onSuccess && d._onSuccess(a)) : f.alert("error", a.message)
					}))
			}
		}
	})
})