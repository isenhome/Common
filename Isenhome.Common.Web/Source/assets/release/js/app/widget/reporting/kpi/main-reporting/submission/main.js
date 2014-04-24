define("app/widget/reporting/kpi/main-reporting/submission/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "jquery.datatables"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.publish("ajax", {
			url : g.LIST.replace("<ids>", b._ids)
		}, c().done(function (c) {
				b._json = c,
				b.html(d, b._json, a)
			}))
	}
	function f(a) {
		var b = this;
		b.oTable = b.$element.dataTable({
				sDom : "t",
				bPaginate : !1,
				bLengthChange : !1,
				aaSorting : []
			}),
		a.resolve()
	}
	var g = {
		LIST : "/rest/joborder/shortlist?paginate_by=200&id__s=<ids>"
	};
	return b.extend(function (a, b, c, d) {
		var e = this;
		e._ids = c,
		this.type = d.replace(" by owner", "").replace(" ", "")
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