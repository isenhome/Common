define("app/widget/dashboard/task/main", ["jquery", "app/widget/dashboard/widget/main", "troopjs-utils/deferred", "template!./main.html", "template!./item.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		a.html(d, a._json, c().done(function () {
				h.call(a)
			}))
	}
	function h() {
		var b = this,
		d = b.$element;
		b.$count = d.find(".count"),
		b.$content = d.find(".w-box-content"),
		b.$more = d.find('[data-action="load/more"]'),
		b.$allDone = d.find(".all-done"),
		b.publish("ajax", {
			url : k.LIST.replace("<user_id>", b._userId).replace("<page>", i).replace("<paginate>", j)
		}, c().done(function (c) {
				if (b.$count.text(c.count), c.list.length) {
					var d = a(e(c.list));
					b.$content.append(d),
					c.current >= c.pages && b.$more.addClass("disabled")
				} else
					b.$allDone.removeClass("hide"), b.$more.addClass("disabled");
				b.$content.removeClass("widget-spin")
			}))
	}
	var i = 1,
	j = 5,
	k = {
		DONE : "/rest/todo/done",
		LIST : "/rest/todo/list?&page=<page>&paginate_by=<paginate>&done__eq=&user_id=<user_id>&date__until_today="
	};
	return b.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._userId = b.user.id,
			g.call(c)
		},
		"dom/action.change" : a.noop,
		"dom/action/load/more.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target);
			g.hasClass("disabled") || (i += 1, f.publish("ajax", {
					url : k.LIST.replace("<user_id>", f._userId).replace("<page>", i).replace("<paginate>", j)
				}, c().done(function (b) {
						if (b.list.length) {
							b.current >= b.pages && f.$more.addClass("disabled");
							var c = a(e(b.list));
							f.$content.append(c)
						}
					})))
		},
		"dom/action/check/one.change" : function (b, d) {
			var e = this,
			g = a(d.target),
			h = g.data("id"),
			i = g.is(":checked");
			e.publish("ajax", {
				url : k.DONE,
				data : {
					data : JSON.stringify({
						ids : [h],
						done : i
					})
				},
				type : "POST"
			}, c().done(function (b) {
					b.status ? (g.closest(".w-box-container").fadeOut(function () {
							a(this).remove(),
							e.$element.find(".w-box-container").length || e.$allDone.fadeIn()
						}), e.$count.text(parseInt(e.$count.text(), 10) - 1), f.alert("success", "任务状态更改成功!")) : f.alert("error", b.message)
				}))
		}
	})
})