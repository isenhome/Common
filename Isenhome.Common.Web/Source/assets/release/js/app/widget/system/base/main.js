define("app/widget/system/base/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "shared/helper/blurb"], function (a, b, c, d, e) {
	function f(b, c, d, e, f) {
		for (var g, h, i = 0, j = f.length; j > i; i += 1)
			h = f[i], e && h.parent_id != ("null" === e ? null : e) || (g = h.content || h.value, c = a("<option>").val(h.id).text(h.name).data("text", g), h.title && c.data("title", h.title), c.appendTo(d));
		b.replaceWith(d)
	}
	function g(b, d, e) {
		var g = this,
		h = b.clone().empty(),
		i = a("<option>").val("").text(p.PLEASE_SELECT).prop("disabled", !0).prop("selected", !0);
		g.publish("ajax", {
			url : d,
			type : "get",
			cache : !1
		}, c().done(function (a) {
				i.appendTo(h),
				d.match(/emailtemplate/) ? g._personal ? f(b, i, h, e, a.user) : f(b, i, h, e, a.system) : f(b, i, h, e, a)
			}))
	}
	function h(a, b) {
		for (var c, d = JSON.parse(b), e = 0, f = d.length; f > e; e++)
			c = '<div class="controls"><input disabled="disabled" data-pairs="name" type="text" value="' + d[e].name + '" placeholder="链接名称"> <input data-pairs="value" disabled="disabled" type="text" value="' + d[e].value + '" placeholder="http://"> <a class="hide" href="#" data-action="remove/field"><span class="icon-remove"></span></a></div>', a.before(c)
	}
	function i() {
		var a = this,
		b = Array.prototype.slice.call(arguments).join(",");
		a.publish("ajax", {
			url : o.CONFIG_KEYS.replace("<keys>", b),
			type : "get",
			cache : !1
		}, c().done(function (a) {
				j(a)
			}))
	}
	function j(b) {
		for (var c, e, f, g = 0, i = b.length; i > g; g += 1)
			switch (e = b[g], c = a("[name=" + e.name + "]"), c.data("id", e.id), f = c.attr("type").toLowerCase()) {
			case "text":
				c.val(e.value);
				break;
			case "radio":
				c.filter("[value=" + e.value.toLowerCase() + "]").prop("checked", !0);
				break;
			case "pairs":
				h(c.closest(".controls"), e.value);
				break;
			default:
				d.alert("error", "Bind config keys error.")
			}
	}
	function k(b, c, e, f, g) {
		if (f === g)
			d.alert("info", "Nothing changed at all !!!");
		else {
			var h = {
				id : b,
				type : c,
				name : e,
				value : f
			};
			f = isNaN(f) ? f : 1 === parseInt(f, 10) ? "True" : "False",
			a.ajax({
				url : o.CONFIG_ADD,
				data : {
					data : JSON.stringify(h)
				},
				type : "post"
			}).done(function (a) {
				a.status ? d.alert("success", "保存成功!") : d.alert("error", a.message)
			}).fail(function (a) {
				d.alert("error", JSON.parse(a.responseText).message)
			})
		}
	}
	function l(b, c) {
		var d = a(b.target).closest(".controls");
		d.find("select").toggleClass("hide"),
		d.find("input").val(c).toggleClass("hide"),
		d.find("button.action").toggleClass("hide"),
		b.preventDefault()
	}
	function m(b) {
		var c = a(b.target).closest(".controls"),
		d = c.find("input").prop("disabled");
		c.find("input").prop("disabled", !d),
		c.find("button").toggleClass("hide"),
		b.preventDefault()
	}
	function n(b) {
		var c = this,
		d = [];
		a(".load-key").each(function () {
			d.push(this.name)
		}),
		i.call(c, d.join(",")),
		a(".load-dropdown").each(function () {
			var b = this.name,
			d = a(this),
			e = d.data("type");
			"function" === this.name || "industry" === this.name ? g.call(c, a(this), o[e.toUpperCase()].replace("<type>", b), "null") : g.call(c, a(this), o[e.toUpperCase()].replace("<type>", b))
		}),
		b.resolve()
	}
	var o = {
		CONFIG_ADD : "/rest/data/configvalue/add",
		CONFIG_DEL : "/rest/data/configvalue/del",
		CONFIG_KEYS : "/rest/data/configvalue?keys=<keys>",
		CONFIG : "/rest/data/configvalue?type=<type>",
		LIST_ADD : "/rest/data/<type>/add",
		LIST_DEL : "/rest/data/<type>/del",
		LIST : "/rest/data/<type>/list",
		EMAIL_ADD : "/rest/data/emailtemplate/add",
		EMAIL_DEL : "/rest/data/emailtemplate/del",
		EMAIL : "/rest/data/emailtemplate/<type>"
	},
	p = {
		PLEASE_SELECT : e.t("Please select")
	};
	return b.extend({
		"sig/start" : function (a, b) {
			n.call(this, b)
		},
		"dom/action.click.change" : a.noop,
		"dom/action/setting/textbox/edit.click" : function (b, c) {
			var d = a(c.target).closest(".controls").find("input"),
			e = d.val();
			d.data("original", e),
			m(c)
		},
		"dom/action/setting/textbox/cancel.click" : function (a, b) {
			m(b)
		},
		"dom/action/setting/textbox/save.click" : function (b, c) {
			var d = a(c.target).closest(".controls").find("input"),
			e = d.data("id"),
			f = d.attr("name"),
			g = d.val(),
			h = d.data("original");
			k(e, "", f, g, h),
			m(c)
		},
		"dom/action/setting/radio/edit.click" : function (b, c) {
			var d = a(c.target).closest(".controls").find("input"),
			e = d.filter(":checked");
			d.data("original", e.val()),
			m(c)
		},
		"dom/action/setting/radio/save.click" : function (b, c) {
			var d = a(c.target).closest(".controls").find("input"),
			e = d.filter(":checked"),
			f = e.data("id"),
			g = e.attr("name"),
			h = e.val(),
			i = e.data("original");
			k(f, "", g, h, i),
			m(c)
		},
		"dom/action/setting/popup/add.click" : function (b, c, d, e) {
			var f = this,
			h = a(c.target).closest(".controls").find("select"),
			i = h.attr("name"),
			j = h.data("type"),
			k = function () {
				g.call(f, h, o[j.toUpperCase()].replace("<type>", i))
			};
			this.publish("modal/setting-" + d + "/show", o[j.toUpperCase() + "_ADD"], k, i, null, null, null, null, e, f._userId),
			c.preventDefault()
		},
		"dom/action/reorder/template.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = e.closest(".controls").find("select"),
			h = f.attr("name"),
			i = f.data("type"),
			j = function () {
				var b = [];
				return f.find("option").each(function () {
					var c = a(this);
					c.val() && b.push({
						id : c.val(),
						label : c.text()
					})
				}),
				b
			}
			();
			d.publish("system/modal/reorder-email-template/show", j, function () {
				g.call(d, f, o[i.toUpperCase()].replace("<type>", h))
			})
		},
		"dom/action/setting/popup/edit.click" : function (b, c, e, f) {
			var h,
			i,
			j,
			k,
			l,
			m,
			n = this,
			p = a(c.target).closest(".controls").find("select"),
			q = p.find(":selected"),
			r = q.val(),
			s = q.prop("disabled");
			return c.preventDefault(),
			!r || s ? (d.alert("info", "Please choose one to EDIT"), p.focus(), void 0) : (h = p.attr("name"), i = q.text(), j = q.data("title"), k = q.data("text"), m = p.data("type"), l = function () {
				g.call(n, p, o[m.toUpperCase()].replace("<type>", h))
			}, this.publish("modal/setting-" + e + "/show", o[m.toUpperCase() + "_ADD"], l, h, r, i, j, k, f), void 0)
		},
		"dom/action/setting/popup/delete.click" : function (b, c) {
			var e,
			f,
			h = this,
			i = a(c.target).closest(".controls").find("select"),
			j = i.attr("name"),
			k = i.find(":selected"),
			l = k.val(),
			m = k.prop("disabled"),
			n = {};
			return c.preventDefault(),
			!l || m ? (d.alert("info", "Please choose one to DELETE"), i.focus(), void 0) : (n.id = l, e = k.text(), f = i.data("type"), window.confirm("Do you really need to delete [ " + e + " ] ?") && a.ajax({
					url : o[f.toUpperCase() + "_DEL"],
					data : {
						data : JSON.stringify(n)
					},
					type : "post"
				}).done(function (a) {
					a.status ? (d.alert("success", "Deleting [ " + e + " ] success."), g.call(h, i, o[f.toUpperCase()].replace("<type>", j))) : d.alert("error", a.message)
				}).fail(function (a) {
					d.alert("error", JSON.parse(a.responseText).message)
				}), void 0)
		},
		"dom/action/setting/dropdown/add.click" : function (b, c) {
			var d = a(c.target).closest(".controls").find("input");
			d.data("id", ""),
			l(c, "")
		},
		"dom/action/setting/dropdown/edit.click" : function (b, c) {
			var e = a(c.target).closest(".controls").find(":selected"),
			f = e.val(),
			g = e.text(),
			h = e.prop("disabled"),
			i = a(c.target).closest(".controls").find("input");
			i.data("id", f),
			i.data("original", g),
			f && !h ? l(c, g) : (c.preventDefault(), d.alert("info", "Please choose one to EDIT"), e.parent().focus())
		},
		"dom/action/setting/dropdown/delete.click" : function (b, e) {
			var f,
			h,
			i = this,
			j = a(e.target).closest(".controls").find("select"),
			k = j.attr("name"),
			l = j.find(":selected"),
			m = l.val(),
			n = l.text(),
			p = l.prop("disabled"),
			q = {
				id : m
			};
			("function" === j.attr("name") || "industry" === j.attr("name")) && (h = "null"),
			j.hasClass("subfunction") && (h = a(".load-dropdown[name=function]").val(), q.parent_id = h),
			j.hasClass("subindustry") && (h = a(".load-dropdown[name=industry]").val(), q.parent_id = h),
			m && !p ? (e.preventDefault(), window.confirm("Do you really need to delete [ " + n + " ] ?") && i.publish("ajax", {
					url : o.LIST_DEL.replace("<type>", k),
					data : {
						data : JSON.stringify(q)
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? (d.alert("success", "Deleting [ " + n + " ] success."), f = j.data("type"), g.call(i, j, o[f.toUpperCase()].replace("<type>", k), h)) : d.alert("error", a.message)
					}))) : (e.preventDefault(), d.alert("info", "Please choose one to DELETE"), l.parent().focus())
		},
		"dom/action/setting/dropdown/save.click" : function (b, e) {
			var f = this,
			h = a(e.target).closest(".controls").find("select"),
			i = h.attr("name"),
			j = a(e.target).closest(".controls").find("input"),
			k = j.data("id");
			j.attr("name");
			var m,
			n,
			p,
			q = j.val(),
			r = j.data("original");
			q === r ? d.alert("info", "Nothing changed at all !!!") : (m = k ? {
					id : k,
					name : q
				}
				 : {
				name : q
			}, ("function" === h.attr("name") || "industry" === h.attr("name")) && (p = "null"), h.hasClass("subfunction") && (p = a(".load-dropdown[name=function]").val(), m.parent_id = p), h.hasClass("subindustry") && (p = a(".load-dropdown[name=industry]").val(), m.parent_id = p), f.publish("ajax", {
					url : o.LIST_ADD.replace("<type>", i),
					data : {
						data : JSON.stringify(m)
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? (d.alert("success", "Saving [ " + q + " ] success."), n = h.data("type"), g.call(f, h, o[n.toUpperCase()].replace("<type>", i), p)) : d.alert("error", a.message)
					}))),
			l(e, "")
		},
		"dom/action/setting/dropdown/cancel.click" : function (a, b) {
			l(b, "")
		},
		"dom/action/setting/pairs/edit.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".control-group");
			e.find("input:text").prop("disabled", !1),
			e.find('a[data-action="remove/field"]').removeClass("hide"),
			m(c)
		},
		"dom/action/setting/pairs/add.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".controls");
			e.before('<div class="controls"><input data-pairs="name" type="text" placeholder="链接名称"> <input data-pairs="value" type="text" placeholder="http://"> <a href="#" data-action="remove/field"><span class="icon-remove"></span></a></div>')
		},
		"dom/action/setting/pairs/save.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".control-group"),
			f = [],
			g = e.find(".load-key").data(g),
			h = "",
			i = e.find(".load-key").attr("name");
			e.find("input:text").prop("disabled", !0),
			e.find('a[data-action="remove/field"]').addClass("hide"),
			e.find("input:text").each(function () {
				var b = a(this);
				b.val().length || b.closest(".controls").remove()
			}),
			e.find('[data-pairs="name"]').each(function () {
				f.push({
					name : a(this).val(),
					value : a(this).next('[data-pairs="value"]').val()
				})
			}),
			f = JSON.stringify(f),
			k(g, h, i, f, null),
			m(c)
		},
		"dom/action/setting/pairs/cancel.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".control-group");
			e.find("input:text").prop("disabled", !0),
			e.find('a[data-action="remove/field"]').addClass("hide"),
			e.find("input:text").each(function () {
				var b = a(this);
				b.val().length || b.closest(".controls").remove()
			}),
			m(c)
		},
		"dom/action/remove/field.click" : function (b, c) {
			c.preventDefault();
			var d = window.confirm("确定要删除此项吗?");
			d && a(c.target).closest(".controls").remove()
		}
	})
})