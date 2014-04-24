define("app/widget/system/base/options-item", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils"], function (a, b) {
	function c(a) {
		var b = this;
		b.html(b._template, b._json, a)
	}
	return b.extend(function (a, b, c) {
		this._json = c || {}

	}, {
		"sig/initialize" : function (a, b) {
			c.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/delete/status.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target);
			var e = window.confirm("确认要删除这条吗?");
			e && d.$element.remove()
		},
		"dom/action/transfer/status.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target);
			var e = {};
			d.publish("system/get/data", e),
			d.publish("system/modal/merge-node/show", {
				type : e.type,
				selected : {
					id : d._json.code,
					name : d._json.value
				},
				data : e.data,
				onSuccess : function () {}

			})
		},
		randomKey : function () {
			return parseInt(1e5 * Math.random(), 10)
		}
	})
})