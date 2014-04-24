define("app/widget/floating/list/main", ["jquery", "shared/widget/list/base", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		var b = this,
		c = b._json.list;
		c.length ? (b.$element.show(), b.$element.find("tbody").children().remove(), b.appendItems(c)) : b.$element.hide(),
		a.resolve()
	}
	var g = {
		DONE : "/rest/floating/done"
	};
	return b.extend(function () {
		this._url = "/rest/floating/list?",
		this._listType = "floating"
	}, {
		"sig/initialize" : function (a, b) {
			var e = this;
			c(function (a) {
				e.html(d, a)
			}).done(function () {
				e.$container = e.$element.find("table"),
				b.resolve()
			})
		},
		appendItems : function (a) {
			var b = this;
			a.forEach(function (a) {
				b.$element.find("tbody").append("<tr></tr>"),
				b.$element.find("tbody").children().last().data("json", a).attr("data-weave", "app/widget/floating/item(json)").weave()
			})
		},
		renderList : function (a) {
			f.call(this, a)
		},
		"dom/action.change" : a.noop,
		"dom/action/check/all.change" : function (b, d) {
			var f,
			h = this,
			i = a(d.target),
			j = i.is(":checked"),
			k = [];
			j ? (f = h.$element.find("tbody :checkbox").filter(":not(:disabled)").filter(":not(:checked)"), f.prop("checked", !0)) : (f = h.$element.find("tbody :checkbox").filter(":not(:disabled)").filter(":checked"), f.prop("checked", !1)),
			f.each(function () {
				k.push(a(this).data("id"))
			}),
			k.length && h.publish("ajax", {
				url : g.DONE,
				data : {
					data : JSON.stringify({
						ids : k,
						done : j
					})
				},
				type : "POST"
			}, c().done(function (a) {
					a.status ? e.alert("success", "任务状态更改成功!") : e.alert("error", a.data || a.message)
				}))
		}
	})
})