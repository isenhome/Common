define("app/widget/company/detail/jobs-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g(b) {
		var f = this;
		f._reference,
		f.publish("ajax", {
			url : i.JOBS.replace("<id>", f._id)
		}, c().done(function (g) {
				var h = g.list,
				i = 0,
				j = h.length,
				k = [];
				f.html(e, c().done(function () {
						var c = f.$element.find(".search_panel");
						for (i; j > i; i++) {
							var e = b.promise();
							c.append('<div class="search_item clearfix"></div>'),
							c.children().last().data("json", h[i]).attr("data-weave", "app/widget/job/item/main(json)").weave(b),
							k.push(e)
						}
						d.apply(a, k).then(function () {
							b.resolve()
						})
					}))
			}))
	}
	function h(a) {
		var b = this;
		f.widgetLoaded.call(b),
		a.resolve()
	}
	var i = {
		JOBS : "rest/joborder/list?ordering=-id&client__id__eq=<id>&paginate_by=1000"
	};
	return b.extend(function (a, b, c) {
		this._id = c
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"sig/finalize" : function (a, b) {
			var c = this;
			c.$element.empty(),
			b.resolve()
		}
	})
})