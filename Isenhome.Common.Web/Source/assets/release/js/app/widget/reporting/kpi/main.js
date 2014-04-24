define("app/widget/reporting/kpi/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils"], function (a, b) {
	return b.extend({
		"hub:memory/route" : function (b, c) {
			var d = this,
			e = a("<div></div>");
			d.$element.empty(),
			"finalized" !== d.phase && (c.query && "main" === c.query.type ? (d.$element.append(e), e.attr("data-weave", "app/widget/reporting/kpi/main-reporting/main").weave()) : c.query && "attachment" === c.query.type ? (d.$element.append(e), e.attr("data-weave", "app/widget/reporting/kpi/attachment-reporting/main").weave()) : c.query && "note" === c.query.type ? (d.$element.append(e), e.attr("data-weave", "app/widget/reporting/kpi/note-reporting/main").weave()) : c.query && "job" === c.query.type ? (d.$element.append(e), e.attr("data-weave", "app/widget/reporting/kpi/job-reporting/main").weave()) : c.query && "task" === c.query.type ? (d.$element.append(e), e.attr("data-weave", "app/widget/reporting/kpi/task-reporting/main").weave()) : c.query && "company" === c.query.type ? (d.$element.append(e), e.attr("data-weave", "app/widget/reporting/kpi/client-reporting/main").weave()) : window.location.hash = "?type=main")
		}
	})
})