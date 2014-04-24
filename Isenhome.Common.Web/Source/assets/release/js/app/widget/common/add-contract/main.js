define("app/widget/common/add-contract/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "template!./item.html", "shared/helper/utils", "shared/helper/blurb"], function (a, b, c, d, e) {
	function f(b, c) {
		var d = a(e(c));
		d.data("contract", c).find("[data-weave]").weave(),
		b.before(d)
	}
	function g(a) {
		var b = this;
		b.html(d, a)
	}
	function h(a) {
		var b = this;
		if (b.$contract = b.$element.find('[name="contract"]'), b.$addControl = b.$element.find("a").closest(".controls"), b._data.length) {
			b.$contract.val(!0);
			for (var c = 0, d = b._data.length; d > c; c++)
				f(b.$addControl, b._data[0])
		}
		a.resolve()
	}
	return b.extend(function (a, b, c) {
		"object" == typeof c && (this._data = c)
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/add/contract.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target);
			e.closest(".controls"),
			d.publish("modal/add/contract/show", null, null, function (a) {
				d.$contract.val(!0),
				f(d.$addControl, a)
			})
		},
		"dom/action/edit/contract.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = e.closest(".controls");
			d.publish("modal/add/contract/show", null, null, function (a) {
				f.data("contract", a)
			}, f.data("contract"))
		},
		"dom/action/remove/contract.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = e.closest(".controls");
			f.remove(),
			d.$element.find(".contract").length || d.$contract.val("")
		}
	})
})