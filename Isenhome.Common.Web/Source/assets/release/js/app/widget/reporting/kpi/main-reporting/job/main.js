define("app/widget/reporting/kpi/main-reporting/job/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "jquery.datatables"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.publish("ajax", {
			url : g.LIST.replace("<ids>", b._ids)
		}, c().done(function (c) {
				b._json = c.list,
				b.html(d, b._json, a)
			}))
	}
	function f(a) {
		var b = this;
		b.oTable = b.$element.dataTable({
				sDom : "t",
				bPaginate : !1,
				bLengthChange : !1,
				aoColumns : [null, null, null, null, null, null, null, null, {
						sType : "enum"
					}, null]
			}),
		a.resolve()
	}
	var g = {
		LIST : "/rest/joborder/list?paginate_by=200&id__s=<ids>"
	};
	return a.extend(a.fn.dataTableExt.oSort, {
		"enum-pre" : function (b) {
			var c = a(b).data("i18n");
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
		var d = this;
		d._ids = c
	}, {
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"sig/start" : function (a, b) {
			f.call(this, b)
		},
		"sig/stop" : function (a, b) {
			this.oTable.dataTable("destroy"),
			b.resolve()
		}
	})
})