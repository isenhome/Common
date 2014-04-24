define("app/widget/task/list/main", ["jquery", "shared/widget/list/base", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		var b = this,
		c = b._json.list;
		c.length ? (b.$container.removeClass("hide"), b.$element.find("tbody").children().remove(), b.appendItems(c)) : b.$container.addClass("hide"),
		a.resolve()
	}
	var g = {
		DONE : "/rest/todo/done"
	};
	return b.extend(function () {
		this._url = "/rest/todo/list?",
		this._listType = "todo"
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
				b.$element.find("tbody").children().last().data("json", a).attr("data-weave", "app/widget/task/item(json)").weave()
			})
		},
		renderList : function (a) {
			f.call(this, a)
		},
		"dom/action.change.click" : a.noop,
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
		},
		"dom/action/add/task.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish("modal/add/task/show", {
				onSuccess : function () {
					c.publish("list/reload")
				}
			})
		}
	})
})