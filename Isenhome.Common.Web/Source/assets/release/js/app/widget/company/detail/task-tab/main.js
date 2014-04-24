define("app/widget/company/detail/task-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.html(e, a)
	}
	function g(a) {
		var b = this;
		b.publish("ajax", {
			url : b._url
		}, c().done(function (c) {
				c.list.length && c.list.forEach(function (a) {
					b.appendItem(a)
				}),
				d.widgetLoaded.call(b),
				a.resolve()
			}))
	}
	var h = {
		DONE : "/rest/todo/done"
	};
	return b.extend(function (a, b, c) {
		this._url = "/rest/todo/list?external_type=client&external_id=" + c
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			var c = this;
			g.call(c, b)
		},
		"hub/add/task/count" : function () {
			var a = this;
			a.$element.find("tbody").children().remove(),
			g.call(a, c())
		},
		appendItem : function (a) {
			var b = this;
			b.$element.find("tbody").append("<tr></tr>"),
			b.$element.find("tbody").children().last().data("json", a).attr("data-weave", "app/widget/task/item(json)").weave()
		},
		"dom/action.change" : a.noop,
		"dom/action/check/all.change" : function (b, e) {
			var f,
			g = this,
			i = a(e.target),
			j = i.is(":checked"),
			k = [];
			j ? (f = g.$element.find("tbody :checkbox").filter(":not(:disabled)").filter(":not(:checked)"), f.prop("checked", !0)) : (f = g.$element.find("tbody :checkbox").filter(":not(:disabled)").filter(":checked"), f.prop("checked", !1)),
			f.each(function () {
				k.push(a(this).data("id"))
			}),
			k.length && g.publish("ajax", {
				url : h.DONE,
				data : {
					data : JSON.stringify({
						ids : k,
						done : j
					})
				},
				type : "POST"
			}, c().done(function (a) {
					a.status ? d.alert("success", "任务状态更改成功!") : d.alert("error", a.data || a.message)
				}))
		}
	})
})