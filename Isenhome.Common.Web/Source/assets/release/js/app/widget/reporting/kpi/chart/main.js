define("app/widget/reporting/kpi/chart/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "nv", "d3"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.html(d, a)
	}
	function f(a, b) {
		var c = a.match(new RegExp("[\\?\\&]" + b + "=([^\\&]*)(\\&?)", "i"));
		return c ? c[1] : c
	}
	function g() {
		var a,
		b = this,
		c = b.route.path.join("&");
		b.$element.find("svg").children().remove(),
		d3.json("/rest/report/kpi_d3?" + c, function (b) {
			nv.addGraph(function () {
				var d = f(c, "chart");
				return a = nv.models[d](),
				a.xAxis.tickFormat(function (a) {
					return d3.time.format("%Y-%m-%d")(new Date(a))
				}).tickValues(b.ticks),
				a.yAxis.tickFormat(d3.format("d")),
				d3.select(".chart svg").datum(b.data).transition().duration(500).call(a),
				nv.utils.windowResize(a.update),
				a
			})
		})
	}
	return b.extend({
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"hub:memory/route" : function (a, b) {
			var c = this;
			c.route = b,
			g.call(c)
		},
		"dom/action.change" : a.noop,
		"dom/action/change/view.change" : function (b, c, d) {
			var e = this,
			f = a(c.target),
			g = f.val(),
			h = e.route.path;
			h.forEach(function (a, b, c) {
				var e = a.indexOf(d);
				e > -1 && (c[b] = d + "=" + g)
			}),
			window.location.hash = h.join("/")
		}
	})
})