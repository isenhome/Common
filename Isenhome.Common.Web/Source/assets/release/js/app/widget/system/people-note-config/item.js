define("app/widget/system/people-note-config/item", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./item.html", "template!app/widget/system/base/question.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
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
			f.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/delete/category" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target);
			var e = window.confirm("确认要删除此类型吗?");
			e && d.$element.remove()
		},
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
		"dom/action/delete/question" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = window.confirm("确认要删除此问题吗?");
			e && d.closest(".controls").remove()
		},
		"dom/action/add/question" : function (b, d) {
			d.preventDefault();
			var f = a(d.target);
			if (10 === f.closest(".control-group").find(".controls:not(.text_line)").length)
				return alert("最多添加十个问题!"), void 0;
			var g = a(e());
			g.find("[data-weave]").weave(c(function () {
					f.closest(".controls").before(g)
				}))
		},
		randomKey : function () {
			return parseInt(1e5 * Math.random(), 10)
		}
	})
})