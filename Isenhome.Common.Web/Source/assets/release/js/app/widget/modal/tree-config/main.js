define("app/widget/modal/tree-config/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.html(d, a)
	}
	function h(a) {
		var b = this;
		b.$form = b.$element.find("form"),
		b.$name = b.$element.find('[name="name"]'),
		f(b.$form),
		a.resolve()
	}
	return c.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"hub/modal/tree-config/show" : function (a, b) {
			var c = this,
			d = c.$element;
			switch (c.operation = "", c.$tree = b.$tree, c.node = b.node, c.onSuccess = b.onSuccess, b.operation) {
			case "edit":
				c.operation = "updateNode",
				c.$name.val(c.node.name);
				break;
			case "after":
				c.operation = "addNodeAfter";
				break;
			case "before":
				c.operation = "addNodeBefore";
				break;
			case "parent":
				c.operation = "addParentNode";
				break;
			case "append":
				c.operation = "appendNode"
			}
			"edit" === c.operation && c.$name.val(c.node.name),
			d.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (a, b) {
			b.preventDefault();
			var c = this,
			d = c.$element;
			return c.$form.valid() ? (d.modal("hide"), "updateNode" === c.operation ? c.$tree.tree("updateNode", c.node, c.$name.val().trim()) : c.$tree.tree(c.operation, {
					label : c.$name.val().trim()
				}, c.node), void 0) : !1
		}
	})
})