define("app/widget/modal/invoice-alert/main", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "template!./item.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function h(a) {
		var b = this;
		b.$ul = b.$element.find("ul"),
		a.resolve()
	}
	return d.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"hub/modal/invoice-alert/show" : function (a, d) {
			var e = this,
			g = e.$element;
			g.find(".modal-footer button"),
			e._id = d.id,
			e._name = d.name,
			e._candidateId = d.candidateId,
			e._onSuccess = d.onSuccess,
			e._owner = d.owner,
			e._offerInfo = d.offerInfo;
			var h = b(f(d.invoices));
			h.find("[data-weave]").weave(c().done(function () {
					e.$ul.html(h)
				})),
			g.modal("show")
		},
		"dom/action.click" : b.noop,
		"dom/action/yes.click" : function () {
			var a = this,
			b = a.$element;
			b.modal("hide"),
			a.publish("job/item/open/invoice/modal", {
				id : a._id,
				owner : a._owner,
				name : a._name,
				candidateId : a._candidateId,
				onSuccess : a._onSuccess
			})
		},
		"dom/action/no.click" : function () {
			var a = this,
			b = a.$element;
			b.modal("hide")
		}
	})
})