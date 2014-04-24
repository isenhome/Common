define("app/widget/candidate/detail/floating-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "template!./main.html", "shared/helper/blurb", "jquery.datatables"], function (a, b, c, d, e, f, g) {
	function h(a) {
		var b = this;
		b.html(f, a)
	}
	function i(b) {
		var f,
		h,
		i = this,
		j = [];
		i.$table = i.$element.find("table"),
		i.publish("ajax", {
			url : i._url
		}, c().done(function (k) {
				k.list.length && k.list.forEach(function (a) {
					f = c(),
					h = f.promise(),
					j.push(h),
					i.appendItem(a, f)
				}),
				d.apply(a, j).then(function () {
					i.$table.dataTable({
						sDom : "ft",
						bPaginate : !1,
						bLengthChange : !1,
						aaSorting : [],
						oLanguage : {
							sSearch : "",
							sEmptyTable : g.t("No data available in table")
						},
						aoColumnDefs : [{
								bSortable : !1,
								aTargets : [0]
							}, {
								bSortable : !1,
								aTargets : [1]
							}
						],
						fnInitComplete : function () {
							var a = i.$table.closest(".dataTables_wrapper").find(".dataTables_filter"),
							b = a.find("label");
							a.prepend('<div class="input-prepend pull-right"><span class="add-on"><i class="icon-search"></i></span></div>'),
							a.find(".input-prepend").append(b),
							b.find("input").attr("placeholder", "搜索")
						}
					})
				}),
				e.widgetLoaded.call(i),
				b.resolve()
			}))
	}
	var j = {
		DONE : "/rest/todo/done"
	};
	return b.extend(function (a, b, c, d) {
		var e = d || "candidate";
		this._url = ("/rest/floating/list?paginate_by=50&<type>=" + c).replace("<type>", e)
	}, {
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"sig/start" : function (a, b) {
			var c = this;
			i.call(c, b)
		},
		"hub/add/task/count" : function () {
			var a = this;
			a.$element.find("tbody").children().remove(),
			i.call(a, c())
		},
		appendItem : function (a, b) {
			var c = this;
			c.$element.find("tbody").append("<tr></tr>"),
			c.$element.find("tbody").children().last().data("json", a).attr("data-weave", "app/widget/floating/item(json)").weave(b)
		},
		"dom/action.change" : a.noop,
		"dom/action/check/all.change" : function (b, d) {
			var f,
			g = this,
			h = a(d.target),
			i = h.is(":checked"),
			k = [];
			i ? (f = g.$element.find("tbody :checkbox").filter(":not(:disabled)").filter(":not(:checked)"), f.prop("checked", !0)) : (f = g.$element.find("tbody :checkbox").filter(":not(:disabled)").filter(":checked"), f.prop("checked", !1)),
			f.each(function () {
				k.push(a(this).data("id"))
			}),
			k.length && g.publish("ajax", {
				url : j.DONE,
				data : {
					data : JSON.stringify({
						ids : k,
						done : i
					})
				},
				type : "POST"
			}, c().done(function (a) {
					a.status ? e.alert("success", "任务状态更改成功!") : e.alert("error", a.data || a.message)
				}))
		}
	})
})