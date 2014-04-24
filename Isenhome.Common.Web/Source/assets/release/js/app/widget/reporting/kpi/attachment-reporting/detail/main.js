define("app/widget/reporting/kpi/attachment-reporting/detail/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils", "jquery.datatables"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.publish("ajax", {
			url : h.LIST.replace("<ids>", b._ids)
		}, c().done(function (c) {
				b._json = c,
				b.html(e, b._json, a)
			}))
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
	var h = {
		LIST : "/rest/file/list?paginate_by=200&id__s=<ids>"
	};
	return b.extend(function (a, b, c) {
		var d = this;
		d._ids = c
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		"sig/stop" : function (a, b) {
			this.oTable.fnDestroy(),
			b.resolve()
		}
	})
})