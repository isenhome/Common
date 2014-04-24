define("app/widget/system/attachment-type/tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/validate", "jquery.ui"], function (a, b, c, d, e, f) {
	function g(b) {
		var e = this;
		e.html(d, e._json, b),
		e.publish("ajax", {
			url : i.CONFIG_KEYS.replace("<type>", e._type),
			cache : !1
		}, c().done(function (b) {
				e._json = b,
				b.forEach(function (b) {
					var d = a('<div class="category-block"></div>');
					d.data("json", b).attr("data-weave", j + "(json)").weave(c(function () {
							e.$element.find('[data-action="add/category"]').closest(".control-group").before(d)
						}))
				})
			}))
	}
	function h(a) {
		var b = this;
		b.$form = b.$element.find("form"),
		b.$form.sortable({
			items : ".category-block",
			handle : ".handler",
			cursor : "move",
			axis : "y"
		}),
		f(b.$form),
		a.resolve()
	}
	var i = {
		CONFIG_KEYS : "/rest/data/options?type=<type>",
		CONFIG_ADD : "/rest/data/options/add"
	},
	j = "app/widget/system/attachment-type/tab/item";
	return b.extend(function (a, b, c) {
		this._type = c
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/add/category.click" : function (b, d) {
			d.preventDefault();
			var e = a(d.target),
			f = a('<div class="category-block"></div>');
			f.attr("data-weave", j).weave(c(function () {
					e.closest(".control-group").before(f)
				}))
		},
		"dom/action/save.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target),
			h = {},
			j = [];
			return g.hasClass("disabled") || !f.$form.valid() ? !1 : (g.addClass("disabled"), f.$element.find(".category-block").each(function () {
					var b = a(this),
					c = [];
					b.find('[name*="question"]').each(function () {
						a(this),
						c.push({
							field : a(this).val().trim(),
							required : !0
						})
					}),
					j.push({
						code : b.find('[name*="en_US"]').val().trim(),
						zh_CN : b.find('[name*="zh_CN"]').val().trim(),
						en_US : b.find('[name*="en_US"]').val().trim(),
						color : b.find('[name*="color"]').val() || "",
						is_buildin : !1,
						ext : JSON.stringify(c)
					})
				}), h = {
					type : f._type,
					values : j
				}, f.publish("ajax", {
					url : i.CONFIG_ADD,
					data : {
						data : JSON.stringify(h)
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? (e.alert("success", "保存成功!"), a.data && a.data.length && e.alert("info", a.data.join(", ") + "已经被关联，请刷新页面，并选择“转移到”，将关联数据移除后再删除！")) : e.alert("error", a.message)
					}).always(function () {
						g.removeClass("disabled")
					})), void 0)
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