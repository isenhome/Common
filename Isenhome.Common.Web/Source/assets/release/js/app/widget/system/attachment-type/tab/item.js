define("app/widget/system/attachment-type/tab/item", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./item.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		c(function (a) {
			b.html(d, b._json, a)
		}).done(function () {
			b.$element.find('[data-action="delete/question"]').eq(0).remove(),
			a.resolve()
		})
	}
	return b.extend(function (a, b, c) {
		this._json = c || {}

	}, {
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/transfer/category" : function (b, c) {
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
		"dom/action/delete/category" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target);
			var e = window.confirm("确认要删除此类型吗?");
			e && d.$element.remove()
		},
		randomKey : function () {
			return parseInt(1e5 * Math.random(), 10)
		}
	})
})