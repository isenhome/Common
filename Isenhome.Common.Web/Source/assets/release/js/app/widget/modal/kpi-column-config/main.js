define("app/widget/modal/kpi-column-config/main", ["jquery", "troopjs-utils/deferred", "shared/widget/base/main", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		var c = this;
		c.publish("ajax", {
			url : h.NOTE_CATEGORY
		}, b().done(function (b) {
				c._json.note = b,
				c.html(d, c._json, a)
			}))
	}
	function g(a) {
		var c = this;
		c.$checkbox = c.$element.find(":checkbox"),
		c.publish("ajax", {
			url : h.USERCONFIG
		}, b().done(function (a) {
				var b,
				d;
				if (a && a.kpiFields) {
					b = a.kpiFields;
					for (d in b)
						b[d] || c.$checkbox.filter('[data-mapping="' + d + '"]').prop("checked", !1)
				} else
					e.alert("error", a.message)
			})),
		a.resolve()
	}
	var h = {
		CONFIG_ADD : "/rest/data/userconfig/add",
		NOTE_CATEGORY : "rest/data/options?type=candidate_note_category,jobsubmission_note_category",
		USERCONFIG : "/rest/data/userconfig/"
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		"hub/modal/kpi-column-config/show" : function () {
			var a = this,
			b = a.$element;
			b.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (c, d) {
			var f = this,
			g = a(d.target),
			i = {},
			j = {};
			f.$checkbox.each(function () {
				var b = a(this);
				j[b.data("mapping")] = b.prop("checked")
			}),
			i.kpiFields = JSON.stringify(j),
			f.$element.modal("hide"),
			f.publish("ajax", {
				url : h.CONFIG_ADD,
				data : {
					data : JSON.stringify(i)
				},
				type : "post"
			}, b().done(function (a) {
					a.status ? e.alert("success", "Update custom kpi fields success.") : e.alert("error", a.message)
				}), g)
		},
		"dom/action/column.click" : function (b, c) {
			var d = this;
			d.publish("kpi/toggle/column", a(c.target).attr("data-mapping"))
		}
	})
})