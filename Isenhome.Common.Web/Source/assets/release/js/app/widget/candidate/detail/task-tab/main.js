define("app/widget/candidate/detail/task-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		c(function (a) {
			b.html(e, a)
		}).done(function () {
			b.$tbody = b.$element.find("tbody"),
			a.resolve()
		})
	}
	function g(a) {
		var b = this;
		b.publish("ajax", {
			url : b._url.replace("<page>", i)
		}, c().done(function (c) {
				b.$tbody.empty(),
				c.list.length && c.list.forEach(function (a) {
					b.appendItem(a)
				}),
				b.publish(j, c),
				b.publish(k, "task", c.count),
				d.widgetLoaded.call(b),
				a.resolve()
			}))
	}
	var h = {
		DONE : "/rest/todo/done"
	},
	i = 1,
	j = "candidate-task/paging/set",
	k = "candidate/action/count";
	return b.extend(function (a, b, c) {
		this._url = "/rest/todo/list?page=<page>&candidate_id=" + c
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			var c = this;
			g.call(c, b)
		},
		"hub/make/load" : function (a, b) {
			var d = this;
			i = b.page,
			g.call(d, c())
		},
		"hub/candidate/task/tab/reload" : function () {
			var a = this;
			i = 1,
			g.call(a, c())
		},
		appendItem : function (a) {
			var b = this;
			b.$tbody.append("<tr></tr>"),
			b.$tbody.children().last().data("json", a).attr("data-weave", "app/widget/task/item(json)").weave()
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