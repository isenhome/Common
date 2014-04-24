define("app/widget/company/add/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils", "shared/helper/validate", "shared/helper/blurb"], function (a, b, c, d, e, f, g) {
	function h() {
		var b = this,
		e = [],
		f = c(),
		g = c();
		e.push(f.promise(), g.promise()),
		b.publish("ajax", {
			url : m.VERIFY
		}, f.done(function (a) {
				b._json.client_need_verify = a[0] ? 1 === parseInt(a[0].value, 10) ? !0 : !1 : !1
			})),
		b.publish("ajax", {
			url : m.EXTRA_FIELDS
		}, g.done(function (a) {
				b.extraFields = JSON.parse(a[0].value)
			})),
		d.apply(a, e).done(function () {
			b.editMode ? i.call(b) : j.call(b)
		})
	}
	function i() {
		var b = this,
		e = [],
		f = c(),
		g = c();
		e.push(f.promise(), g.promise()),
		b.publish("ajax", {
			url : m.CLIENT_LIST.replace("<clientId>", b._cid)
		}, f.done(function (a) {
				b._json = a
			})),
		b.publish("ajax", {
			url : m.CONTRACT.replace("<clientId>", b._cid)
		}, g.done(function (a) {
				b._contracts = a
			})),
		d.apply(a, e).done(function () {
			j.call(b)
		})
	}
	function j() {
		var a = this;
		c(function (b) {
			a.html(e, a._json, b)
		}).done(function () {
			k.call(a)
		})
	}
	function k() {
		var b = this,
		d = "";
		a("#bd"),
		c(),
		b.editMode && (d = b._json.share),
		b.$form = b.$element.find("form"),
		b.$userGroup = b.$element.find(".user-group"),
		b.$contractGroup = b.$element.find(".contract-group"),
		b.$name = b.$form.find("#name"),
		b.$name1 = b.$form.find("#name1"),
		b.$name2 = b.$form.find("#name2"),
		b.$existing = b.$form.find(".control-existing"),
		b.$city = b.$form.find('[name="city"]'),
		b.$city1 = b.$form.find('[name="city1"]'),
		b.$city2 = b.$form.find('[name="city2"]'),
		b.$industry = b.$form.find('[name="industry"]'),
		b.$industry1 = b.$form.find('[name="industry1"]'),
		b.$industry2 = b.$form.find('[name="industry2"]'),
		g(b.$form, {
			rules : {
				name : {
					required : !0,
					checkDuplicate : {
						url : m.COMPANY_CHECK,
						type : "get",
						data : {
							name : function () {
								return b.$name.val().trim()
							},
							id : b._json.id || null
						},
						dataFilter : function (a) {
							var b = JSON.parse(a);
							return b.data ? '"该公司已经存在"' : '"true"'
						}
					}
				},
				name1 : {
					checkDuplicate : {
						url : m.COMPANY_CHECK,
						type : "get",
						data : {
							name : function () {
								return b.$name1.val().trim()
							},
							id : b._json.id || null
						},
						dataFilter : function (a) {
							var b = JSON.parse(a);
							return b.data ? '"该公司已经存在"' : '"true"'
						}
					}
				},
				name2 : {
					checkDuplicate : {
						url : m.COMPANY_CHECK,
						type : "get",
						data : {
							name : function () {
								return b.$name2.val().trim()
							},
							id : b._json.id || null
						},
						dataFilter : function (a) {
							var b = JSON.parse(a);
							return b.data ? '"该公司已经存在"' : '"true"'
						}
					}
				},
				type : {
					required : !0
				},
				industry : {
					required : !0
				},
				city : {
					required : !0
				}
			}
		}),
		b.$element.find(".control-contract").data("json", b._contracts).attr("data-weave", n + "(json)").weave(),
		a(".control-share").data("json", d).attr("data-weave", "shared/widget/common/add-share/main(json)").weave(c().done(function () {
				b.editMode && b.$element.find('[name="type"]').filter('[value="' + b._json.type + '"]').trigger("click")
			})),
		f.widgetLoaded.call(b)
	}
	var l,
	m = {
		CLIENT_LIST : "/rest/client/<clientId>",
		ADD : "/rest/client/add",
		VERIFY : "/rest/data/configvalue?keys=client_need_verify",
		COMPANY_SUGGESTION : "/rest/client/list?&paginate_by=1000&company_name=<name>",
		COMPANY_CHECK : "/rest/client/check_exists",
		CONTRACT : "/rest/client/<clientId>/contracts",
		EXTRA_FIELDS : "/rest/data/configvalue?keys=company_field_names"
	},
	n = "app/widget/common/add-contract/main";
	return b.extend({
		extFields : ["ext1", "ext2", "ext3", "ext4", "ext5", "ext6"],
		companNames : ["name1", "name2"],
		"hub:memory/add/id/change" : function (a, b) {
			var c = this;
			c._cid = b,
			c.editMode = c._cid !== l ? !0 : !1,
			h.call(c)
		},
		"dom/action.click.change.input" : a.noop,
		"dom/action/type.change" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.val(),
			g = d.$element.find('[name="contract"]');
			"client" === f ? (d.$contractGroup.removeClass("hide"), d.$userGroup.removeClass("hide"), g.length && g.rules("add", {
					required : !0
				})) : "bding" === f ? (d.$contractGroup.addClass("hide"), d.$userGroup.removeClass("hide"), g.length && g.rules("remove")) : (d.$contractGroup.addClass("hide"), d.$userGroup.addClass("hide"), g.length && g.rules("remove"))
		},
		"dom/action/check/company.input" : function (b, d) {
			var e = this,
			f = a(d.target),
			g = f.val().trim();
			g.length >= 1 ? e.publish("ajax", {
				url : m.COMPANY_SUGGESTION.replace("<name>", window.encodeURIComponent(g))
			}, c().done(function (a) {
					var b = a.list;
					e.publish("company/existing/update", b)
				})) : e.publish("company/existing/update")
		},
		"dom/action/add.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			g = a(d.target);
			if (!e.$form.valid())
				return !1;
			var h = a('[name="type"]').filter(":checked").val(),
			i = function () {
				var b = [];
				return e.$element.find('[name="share_with"]').each(function () {
					var c = a(this),
					d = c.val(),
					e = function () {
						var a;
						return c.next().find("select").length ? a = c.next().find("select").val() : c.next().find("input").length && (a = c.next().find("input").val()),
						a
					}
					();
					b.push({
						type : d,
						value : e
					})
				}),
				b
			}
			(),
			j = function () {
				var b = [];
				return a(".contract").each(function () {
					b.push(a(this).data("contract"))
				}),
				b
			}
			(),
			k = {
				name : e.$name.val().trim(),
				type : h,
				industry : e.$industry.val(),
				industry1 : e.$industry1.val(),
				industry2 : e.$industry2.val(),
				city : e.$city.val(),
				city1 : e.$city1.val(),
				city2 : e.$city2.val(),
				shares : i,
				contracts : j,
				ext1 : e.$element.find('[name="ext1"]').val(),
				ext2 : e.$element.find('[name="ext2"]').val(),
				ext3 : e.$element.find('[name="ext3"]').val(),
				ext4 : e.$element.find('[name="ext4"]').val(),
				ext5 : e.$element.find('[name="ext5"]').val(),
				ext6 : e.$element.find('[name="ext6"]').val(),
				folder_id : e.$element.find('[name="folder"]').val()
			};
			e.$name1.length && (k.name1 = e.$name1.val().trim()),
			e.$name2.length && (k.name2 = e.$name2.val().trim()),
			k.bd = "normal" === h || "generated" === h ? null : a("#bd").val(),
			e.editMode && (k.id = e._cid),
			e.publish("ajax", {
				url : m.ADD,
				type : "post",
				data : {
					data : JSON.stringify(k)
				}
			}, c().done(function (a) {
					a.status ? e.editMode ? (f.alert("success", "编辑公司成功!"), window.location.hash = "detail!id=" + e._json.id) : (f.alert("success", "新增公司成功!"), window.location.hash = "list") : f.alert("error", a.message)
				}), g)
		},
		"dom/action/add/industry.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".control-group").find(".controls").filter(".hide").eq(0);
			return e.length ? (e.removeClass("hide"), void 0) : (alert("最多添加3个职能!"), void 0)
		},
		"dom/action/remove/field.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".controls").addClass("hide");
			e.find("input").val(""),
			e.find('[data-woven*="shared/widget/common/comtree/main"]').length && e.find('[data-woven*="shared/widget/common/comtree/main"]').woven()[0].reset()
		},
		"dom/action/add/city.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".control-group").find(".controls").filter(".hide").eq(0);
			return e.length ? (e.removeClass("hide"), void 0) : (alert("最多添加3个城市!"), void 0)
		}
	})
})