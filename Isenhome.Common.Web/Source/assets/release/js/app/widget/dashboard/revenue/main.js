define("app/widget/dashboard/revenue/main", ["jquery", "app/widget/dashboard/widget/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils", "shared/helper/blurb", "flot.resize", "flot.time"], function (a, b, c, d, e, f, g) {
	function h(b, c, d) {
		a('<div id="flot-tooltip" class="flot-tooltip"><div class="tooltip-arrow"></div>' + d + "</div>").css({
			top : c - 43,
			left : b - 15
		}).appendTo("body").fadeIn(200)
	}
	function i() {
		var b = this,
		f = [],
		g = c(),
		h = c();
		f.push(g.promise(), h.promise()),
		b.publish("ajax", {
			url : o.CHART.replace("<userId>", b._userId).replace("<start>", m).replace("<end>", n)
		}, g.done(function (a) {
				b._json.ticks = function () {
					var b = [];
					return a.data.length && a.data[0].values.forEach(function (a) {
						b.push([a.x, a.y])
					}),
					b
				}
				()
			})),
		b.publish("ajax", {
			url : o.TOTAL.replace("<userId>", b._userId).replace("<start>", m).replace("<end>", n)
		}, h.done(function (a) {
				b._json.total = a.aaData[0]
			})),
		d.apply(a, f).done(function () {
			b.html(e, b._json, c().done(function () {
					j.call(b)
				}))
		})
	}
	function j() {
		var b = this,
		c = b.$element;
		b.$content = c.find(".w-box-content"),
		b.$chart = c.find(".chart"),
		b.$content.removeClass("widget-spin"),
		a.plot(b.$chart, [{
					data : b._json.ticks,
					color : "#3a8ce5"
				}
			], {
			xaxis : {
				min : new Date(l.getFullYear() - 1 + "-12-29").getTime(),
				max : new Date(l.getFullYear() + "-12-3").getTime(),
				mode : "time",
				tickSize : [1, "month"],
				monthNames : ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
			},
			yaxis : {
				tickFormatter : function (a, c) {
					return p.CURRENCY_SYM + " " + b.formatCurrency(a.toFixed(c.tickDecimals))
				}
			},
			series : {
				lines : {
					show : !0,
					fill : !0
				},
				points : {
					show : !0
				}
			},
			grid : {
				hoverable : !0,
				clickable : !0
			},
			legend : {
				show : !1
			}
		}),
		b.$chart.bind("plothover", function (c, d, e) {
			if (e) {
				if (k != e.dataIndex) {
					k = e.dataIndex,
					a("#flot-tooltip").remove();
					var f = e.datapoint[1].toFixed();
					h(e.pageX, e.pageY, "¥ " + b.formatCurrency(f))
				}
			} else
				a("#flot-tooltip").remove(), k = null
		})
	}
	var k,
	l = new Date,
	m = l.getFullYear() + "-01-01",
	n = l.getFullYear() + "-12-31",
	o = {
		CHART : "/rest/report/revenue_chart?type=user&filter=user&user_id=<userId>&start=<start>&end=<end>&dateType=dateAdded&time_slice=month",
		TOTAL : "/rest/report/revenue?type=user&filter=user&user_id=<userId>&start=<start>&end=<end>&dateType=dateAdded"
	},
	p = {
		CURRENCY_SYM : g.t("Currency symbol")
	};
	return b.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._userId = b.user.id,
			i.call(c)
		}
	})
})