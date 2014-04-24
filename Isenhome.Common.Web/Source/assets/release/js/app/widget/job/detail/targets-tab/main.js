define("app/widget/job/detail/targets-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "template!./main.html", "template!./item.html", "shared/helper/blurb", "jquery.datatables", "bootstrap.editable"], function (a, b, c, d, e, f, g, h) {
	function i() {
		var a = this,
		b = a.$element.find('[data-action="toggle/one"]').length,
		c = a.$element.find('[data-action="toggle/one"]').filter(":checked").length;
		c ? a.$massAction.removeClass("disabled") : a.$massAction.addClass("disabled"),
		b === c ? (a.$toggleAll.prop("indeterminate", !1), a.$toggleAll.prop("checked", !0)) : 0 === c ? (a.$toggleAll.prop("indeterminate", !1), a.$toggleAll.prop("checked", !1)) : c > 0 && b !== c && (a.$toggleAll.prop("checked", !1), a.$toggleAll.prop("indeterminate", !0))
	}
	function j(a) {
		var b = this;
		a.find("a.target-note").editable({
			emptytext : "未填写",
			url : o.EDIT.replace("<jobid>", b._id),
			params : function (a) {
				return a.note = a.value,
				a.id = a.pk,
				delete a.value,
				delete a.pk,
				delete a.name, {
					data : JSON.stringify(a)
				}
			},
			success : function (a) {
				a.status || e.alert("error", a.message)
			},
			error : function (a) {
				var b = JSON.parse(a.responseText);
				e.alert("error", b.message)
			}
		})
	}
	function k(b) {
		var c = this;
		b.find("a.importance").editable({
			emptytext : "未选择",
			source : [{
					code : "High",
					value : h.t("High")
				}, {
					code : "Medium",
					value : h.t("Medium")
				}, {
					code : "Low",
					value : h.t("Low")
				}
			],
			url : o.EDIT.replace("<jobid>", c._id),
			params : function (a) {
				return a.importance = a.value,
				a.id = a.pk,
				delete a.value,
				delete a.pk,
				delete a.name, {
					data : JSON.stringify(a)
				}
			},
			success : function (b, c) {
				b.status ? a(this).text(h.t(c)) : e.alert("error", b.message)
			},
			error : function (a) {
				var b = JSON.parse(a.responseText);
				e.alert("error", b.message)
			}
		})
	}
	function l() {
		var b = this,
		f = [];
		b.publish("ajax", {
			url : o.TARGETS.replace("<jobid>", b._id)
		}, c().done(function (h) {
				b._json = h,
				b.$table.fnDestroy && b.$table.fnDestroy(),
				b.$tbody.empty(),
				b._json.forEach(function (d) {
					var e = c(),
					h = a(g(d));
					f.push(e.promise()),
					b.$tbody.append(h),
					j.call(b, h),
					k.call(b, h),
					h.find("[data-weave]").weave(e)
				}),
				d.apply(a, f).done(function () {
					b.$toggleOne = b.$element.find('[data-action="toggle/one"]'),
					b.$table.dataTable({
						sDom : "ft",
						bDestroy : !0,
						bPaginate : !1,
						bLengthChange : !1,
						aaSorting : [],
						oLanguage : {
							sSearch : ""
						},
						aoColumnDefs : [{
								bSortable : !1,
								aTargets : [0]
							}, {
								bSortable : !1,
								aTargets : [8]
							}
						],
						aoColumns : [null, null, {
								sType : "enum"
							}, null, null, null, null, null, null],
						fnInitComplete : function () {
							b.$table.width("100%");
							var a = b.$element.find(".dataTables_filter"),
							c = a.find("label");
							a.prepend('<div class="input-prepend pull-right"><span class="add-on"><i class="icon-search"></i></span></div>'),
							a.find(".input-prepend").append(c),
							c.find("input").attr("placeholder", "搜索")
						}
					}),
					e.widgetLoaded.call(b)
				})
			}))
	}
	function m(a) {
		var b = this;
		b.html(f, b._json, a)
	}
	function n(a) {
		var b = this;
		b.$massAction = b.$element.find(".mass-aciton .btn"),
		b.$toggleAll = b.$element.find('[data-action="toggle/all"]'),
		b.$table = b.$element.find("table"),
		b.$tbody = b.$element.find("tbody"),
		b.$element.find("table").dataTable({
			sDom : "ft",
			bPaginate : !1,
			bLengthChange : !1,
			aaSorting : [],
			oLanguage : {
				sSearch : ""
			},
			aoColumnDefs : [{
					bSortable : !1,
					aTargets : [0]
				}
			],
			fnInitComplete : function () {
				var a = b.$element.find(".dataTables_filter"),
				c = a.find("label");
				a.prepend('<div class="input-prepend pull-right"><span class="add-on"><i class="icon-search"></i></span></div>'),
				a.find(".input-prepend").append(c),
				c.find("input").attr("placeholder", "搜索")
			}
		}),
		l.call(b),
		a.resolve()
	}
	var o = {
		TARGETS : "/rest/joborder/<jobid>/targetcompany",
		DELETE : "/rest/joborder/<jobid>/targetcompany/del",
		EDIT : "/rest/joborder/<jobid>/targetcompany/edit"
	};
	return a.extend(a.fn.dataTableExt.oSort, {
		"enum-pre" : function (b) {
			var c = a(b).data("value");
			switch (c) {
			case "High":
				return 1;
			case "Medium":
				return 2;
			case "Low":
				return 3;
			default:
				return 4
			}
		},
		"enum-asc" : function (a, b) {
			return b > a ? -1 : a > b ? 1 : 0
		},
		"enum-desc" : function (a, b) {
			return b > a ? 1 : a > b ? -1 : 0
		}
	}),
	b.extend(function (a, b, c) {
		this._id = c
	}, {
		"sig/initialize" : function (a, b) {
			m.call(this, b)
		},
		"sig/start" : function (a, b) {
			n.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/toggle/all.click" : function (b, c) {
			var d = this,
			e = a(c.target);
			e.is(":checked") ? d.$toggleOne.prop("checked", !0) : d.$toggleOne.prop("checked", !1),
			i.call(d)
		},
		"dom/action/toggle/one.click" : function () {
			var a = this;
			i.call(a)
		},
		"dom/action/add/target.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish("modal/add-target-company/show", {
				jobid : c._id,
				onSuccess : function () {
					l.call(c)
				}
			})
		},
		"dom/action/edit/target.click" : function (a, b, c) {
			b.preventDefault();
			var d = this,
			e = d._json.filter(function (a) {
					return a.id === c
				})[0];
			d.publish("modal/add-target-company/show", {
				jobid : d._id,
				data : e,
				onSuccess : function () {
					l.call(d)
				}
			})
		},
		"dom/action/delete/targets.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target);
			if (!g.hasClass("disabled")) {
				var h = window.confirm("确定要删除所选的目标公司吗?");
				if (!h)
					return !1;
				var j = f.$element.find('[data-action="toggle/one"]').filter(":checked"),
				k = j.closest("tr"),
				m = function () {
					var b = [];
					return k.each(function () {
						b.push(a(this).data("id"))
					}),
					b
				}
				();
				g.addClass("disabled"),
				f.publish("ajax", {
					url : o.DELETE.replace("<jobid>", f._id),
					data : {
						data : JSON.stringify({
							client_ids : m
						})
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? l.call(f) : e.alert("error", a.data)
					}).always(function () {
						i.call(f)
					}))
			}
		},
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			f = d.attr("href");
			e.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/show/active.click" : function (a, b, c) {
			b.preventDefault();
			var d = this;
			d.publish("live-job/show/living", c)
		},
		"dom/action/show/inactive.click" : function (a, b, c) {
			b.preventDefault();
			var d = this;
			d.publish("show/rejected", c)
		},
		"dom/action/mass/to/folder.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target);
			if (!e.hasClass("disabled")) {
				var f = d.$element.find('[data-action="toggle/one"]').filter(":checked"),
				g = [];
				f.each(function () {
					g.push(a(this).data("id"))
				}),
				d.publish("modal/add-to-folder/show", {
					multiSelect : !0,
					ids : g,
					type : "client"
				})
			}
		},
		"dom/action/mass/add/shortlist" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target);
			if (!e.hasClass("disabled")) {
				var f = d.$element.find('[data-action="toggle/one"]').filter(":checked"),
				g = [],
				h = [];
				f.each(function () {
					g.push(a(this).data("id")),
					h.push(a(this).closest("tr").find(".client-name").text())
				}),
				d.publish("modal/addshortlist/show", {
					ids : g,
					names : h,
					type : "company"
				})
			}
		}
	})
})