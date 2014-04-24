define("app/widget/system/candidate-fields/main", ["require", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "template!./components/text.html", "template!./components/multiline.html", "template!./components/radio.html", "template!./components/checkbox.html", "template!./components/dropdown.html", "template!./components/date.html", "shared/helper/utils", "shared/helper/validate", "shared/helper/blurb", "jquery.ui"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
	function o(a, c, d) {
		var e = b(s[c.type](c));
		return a.replaceWith(e),
		e.data("control", c).addClass(function () {
			return d ? "selected" : ""
		}),
		e
	}
	function p() {
		var a = this;
		a.publish("ajax", {
			url : t.TABLE,
			cache : !1
		}, d().done(function (c) {
				c.forEach(function (c) {
					var d = b("<div></div>");
					a.$customForm.append(d),
					c.options && c.options.length && (c.options = JSON.parse(c.options)),
					o.call(a, d, c)
				})
			}))
	}
	function q(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function r(a) {
		var c = this,
		d = c.$element;
		c.$customForm = d.find(".custom-form"),
		c.$customForm.sortable({
			containment : c.$customForm,
			handle : ".icon-move-ns",
			update : function (a, d) {
				var e,
				f = d.item,
				g = f.data("type"),
				h = b.extend(!0, {}, u[g]);
				20 === c.$customForm.find(".control-group").length && (f.remove(), alert("最多添加20个字段!")),
				g && (e = o.call(c, f, h), e.trigger("click"))
			}
		}).disableSelection(),
		d.find(".components-list .component").draggable({
			connectToSortable : c.$customForm,
			helper : "clone",
			revert : "invalid",
			start : function (a, b) {
				b.helper.height(40)
			}
		}),
		p.call(c),
		a.resolve()
	}
	var s = {
		text : f,
		multiline : g,
		radio : h,
		checkbox : i,
		dropdown : j,
		date : k
	},
	t = {
		TABLE : "/rest/data/fields?table=candidate",
		ADD : "/rest/data/fields/add"
	},
	u = {
		text : {
			type : "text",
			label : "文本框",
			help : "",
			required : !1,
			options : "",
			size : "input-medium"
		},
		multiline : {
			type : "multiline",
			label : "多行文本框",
			help : "",
			required : !1,
			options : "",
			size : "input-medium"
		},
		checkbox : {
			type : "checkbox",
			label : "多选框",
			help : "",
			required : !1,
			options : ["选项", "选项", "选项"],
			size : ""
		},
		radio : {
			type : "radio",
			label : "单选框",
			help : "",
			required : !1,
			options : ["选项", "选项", "选项"],
			size : ""
		},
		dropdown : {
			type : "dropdown",
			label : "下拉框",
			help : "",
			required : !1,
			options : ["选项", "选项", "选项"],
			size : ""
		},
		date : {
			type : "date",
			label : "日期",
			help : "",
			required : !1,
			options : "",
			size : ""
		}
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			q.call(this, b)
		},
		"sig/start" : function (a, b) {
			r.call(this, b)
		},
		"hub/system/customize/form/update" : function (a, b) {
			var c = this,
			d = c.$element.find(".control-group").filter(".selected");
			o.call(c, d, b, !0)
		},
		"dom/action.click.dblclick" : b.noop,
		"dom/action/remove/component.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target);
			d.closest(".control-group").fadeOut(500, function () {
				b(this).remove()
			})
		},
		"dom/action/component.click" : function (a, c) {
			var d = this,
			e = b(c.target);
			e.hasClass("selected") || (d.publish("system/customize/form/config", e.data("control")), e.siblings().removeClass("selected"), e.addClass("selected"))
		},
		"dom/action/add/component.dblclick" : function (a, c) {
			var d,
			e = this,
			f = b("<div></div>"),
			g = b(c.target),
			h = b.extend(!0, {}, u[g.data("type")]);
			return e.$customForm.append(f),
			20 === e.$customForm.find(".control-group").length ? (alert("最多添加20个字段!"), void 0) : (d = o.call(e, f, h), d.trigger("click"), void 0)
		},
		"dom/action/save.click" : function (a, c) {
			c.preventDefault();
			var e = this,
			f = b(c.target);
			f.prop("disabled", !0);
			var g = function () {
				var a = [];
				return e.$element.find(".custom-form .control-group").each(function () {
					var c = b.extend(!0, {}, b(this).data("control"));
					c.options = JSON.stringify(c.options),
					a.push(c)
				}), {
					table : "candidate",
					fields : a
				}
			}
			();
			e.publish("ajax", {
				url : t.ADD,
				data : {
					data : JSON.stringify(g)
				},
				type : "post"
			}, d().done(function (a) {
					a.status ? (l.alert("success", n.t("Operate successfully")), e.$element.find(".custom-form .control-group").remove(), p.call(e)) : l.alert("error", a.message)
				}), f)
		}
	})
})