define("app/widget/system/modal/reorder-email-template/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "jquery.tree"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.html(d, a)
	}
	function g(a) {
		var b = this;
		b.$tree = b.$element.find(".tree"),
		b.$tree.tree({
			dragAndDrop : !0,
			onCanMoveTo : function (a, b, c) {
				return "inside" === c ? !1 : !0
			}
		}),
		a.resolve()
	}
	var h = {
		REORDER : "/rest/data/reorder"
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		"hub/system/modal/reorder-email-template/show" : function (a, b, c) {
			var d = this;
			d._onSuccess = c,
			d.$tree.tree("loadData", b),
			d.$element.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (c, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target),
			i = JSON.parse(f.$tree.tree("toJson")),
			j = [];
			i.forEach(function (a) {
				j.push(a.id)
			}),
			f.publish("ajax", {
				url : h.REORDER,
				data : {
					data : JSON.stringify({
						type : "emailtemplate",
						ids : j
					})
				},
				type : "post"
			}, b().done(function (a) {
					f.$element.modal("hide"),
					a.status ? (e.alert("success", "排序成功!"), f._onSuccess && f._onSuccess(a)) : e.alert("error", a.message)
				}), g)
		}
	})
})