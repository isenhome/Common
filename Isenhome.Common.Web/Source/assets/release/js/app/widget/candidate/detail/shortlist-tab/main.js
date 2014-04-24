define("app/widget/candidate/detail/shortlist-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.publish("ajax", {
			url : i.replace("<id>", b._id)
		}, c().done(function (c) {
				b._json = c,
				b.html(e, b._json, a),
				b.publish(j, "shortlist", c.length)
			}).always(function () {
				a.resolve()
			}))
	}
	function h(b) {
		var e = this,
		g = [];
		e._json.forEach(function (a, b) {
			var d = c();
			d.promise();
			var f = e.$element.find(".dl-shortlist").eq(b);
			f.data("json", a.detail).attr("data-weave", 'app/widget/shortlist/history(json, "view")').weave(d)
		}),
		d.apply(a, g).done(function () {
			f.widgetLoaded.call(e),
			b.resolve()
		})
	}
	var i = "/rest/joborder/candidate_shortlist/<id>",
	j = "candidate/action/count";
	return b.extend(function (a, b, c) {
		this._id = c
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"hub/candidate/shortlist/tab/reload" : function () {
			var a = this;
			g.call(a, c())
		}
	})
})