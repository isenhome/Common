define("app/widget/reporting/revenue/detailTable", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./detailTable.html", "shared/helper/utils", "jquery.datatables"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function g(a) {
		var b = this;
		b.oTable = b.$element.dataTable({
				sDom : "t",
				bPaginate : !1,
				bLengthChange : !1,
				aaSorting : []
			}),
		a.resolve()
	}
	return b.extend(function (a, b, c) {
		this._json = c
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		}
	})
})