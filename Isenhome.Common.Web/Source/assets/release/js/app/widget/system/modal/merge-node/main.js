define("app/widget/system/modal/merge-node/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.html(d, a)
	}
	function h(a) {
		var b = this;
		b.$comtree = b.$element.find(".comtree"),
		b.comtree = b.$comtree.woven()[0],
		b.$name = b.$element.find(".name"),
		b.$from = b.$element.find('[name="from"]'),
		b.$to = b.$element.find('[name="to"]'),
		b.$form = b.$element.find("form"),
		f(b.$form, {
			rules : {
				to : {
					required : !0
				}
			}
		}),
		b.$element.on("hidden", function () {
			b.comtree.reset(),
			b.$from.val(""),
			b.$to.val(""),
			b.$name.text("")
		}),
		a.resolve()
	}
	var i = {
		MOVE : "/rest/manage/fk_mv"
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"hub/system/modal/merge-node/show" : function (a, b) {
			var c = this;
			c._onSuccess = b.onSuccess,
			c._type = b.type,
			c.$name.text(b.selected.name),
			c.$from.val(b.selected.id),
			c.comtree.loadData(b.data),
			c.$element.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/transfer.click" : function (c, d) {
			d.preventDefault();
			var f,
			g = this,
			h = a(d.target),
			j = g._type;
			g.$form.valid() && (f = window.confirm("确定要转移所以相关数据到所选节点下吗?此操作不可逆!"), f && g.publish("ajax", {
					url : i.MOVE,
					data : {
						data : JSON.stringify({
							table_type : j,
							from_value : g.$from.val(),
							to_value : g.$to.val()
						})
					},
					type : "post"
				}, b().done(function (a) {
						g.$element.modal("hide"),
						a.status ? g._onSuccess && g._onSuccess(a) : e.alert("error", a.message)
					}), h))
		}
	})
})