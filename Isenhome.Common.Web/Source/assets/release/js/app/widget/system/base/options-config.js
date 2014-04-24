define("app/widget/system/base/options-config", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "shared/helper/validate", "jquery.ui"], function (a, b, c, d, e) {
	function f(b) {
		var d = this;
		d.html(d._template, d._json, b),
		d.publish("ajax", {
			url : h.CONFIG_KEYS.replace("<type>", d._type),
			cache : !1
		}, c().done(function (b) {
				d._json = b,
				b.forEach(function (b) {
					var e = a('<div class="category-block"></div>');
					e.data("json", b).attr("data-weave", d._itemWidget + "(json)").weave(c(function () {
							d.$element.find('[data-action="add/status"]').closest(".control-group").before(e)
						}))
				})
			}))
	}
	function g(a) {
		var b = this;
		b.$form = b.$element.find("form"),
		b.$form.sortable({
			items : ".category-block",
			handle : ".handler",
			cursor : "move",
			axis : "y"
		}),
		e(b.$form),
		a.resolve()
	}
	var h = {
		CONFIG_KEYS : "/rest/data/options?type=<type>",
		CONFIG_ADD : "/rest/data/options/add"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/add/status.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			f = a(d.target),
			g = a('<div class="category-block"></div>');
			g.attr("data-weave", e._itemWidget).weave(c(function () {
					f.closest(".control-group").before(g)
				}))
		},
		"dom/action/save.click" : function (b, e) {
			e.preventDefault();
			var f = this,
			g = a(e.target),
			i = {},
			j = [];
			return f.$form.valid() ? (f.$element.find(".category-block").each(function () {
					var b = a(this);
					j.push({
						code : b.find('[name*="en_US"]').val().trim(),
						zh_CN : b.find('[name*="zh_CN"]').val().trim(),
						en_US : b.find('[name*="en_US"]').val().trim(),
						color : b.find('[name*="color"]').val() || "",
						is_buildin : 1 == b.find('[name*="is_buildin"]').val()
					})
				}), i = {
					type : f._type,
					values : j
				}, f.publish("ajax", {
					url : h.CONFIG_ADD,
					data : {
						data : JSON.stringify(i)
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? (d.alert("success", "保存成功!"), a.data && a.data.length && d.alert("info", a.data.join(", ") + "已经被关联，请刷新页面，并选择“转移到”，将关联数据移除后再删除!")) : d.alert("error", a.message)
					}), g), void 0) : !1
		},
		"hub/system/get/data" : function (b, c) {
			var d = this;
			c.type = d._type,
			c.data = [],
			d.$element.find(".category-block").each(function () {
				var b = a(this);
				c.data.push({
					id : b.find('[name*="en_US"]').val().trim(),
					label : b.find('[name*="zh_CN"]').val().trim()
				})
			})
		}
	})
})