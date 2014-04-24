define("app/widget/dashboard/note/main", ["jquery", "app/widget/dashboard/widget/main", "troopjs-utils/deferred", "template!./main.html", "template!./item.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		a.html(d, a._json, c().done(function () {
				h.call(a)
			}))
	}
	function h() {
		var b = this,
		d = b.$element;
		b.$content = d.find(".w-box-content"),
		b.$more = d.find('[data-action="load/more"]'),
		b.publish("ajax", {
			url : k.LIST.replace("<page>", i).replace("<paginate>", j).replace("<userId>", b._userId)
		}, c().done(function (d) {
				if (d.list.length) {
					var f = a(e(d.list));
					f.find("[data-weave]").weave(c().done(function () {
							b.$content.append(f)
						})),
					d.current >= d.pages && b.$more.addClass("disabled")
				} else
					b.$more.addClass("disabled")
			})),
		b.$content.removeClass("widget-spin")
	}
	var i = 1,
	j = 5,
	k = {
		LIST : "/rest/note/list?page=<page>&paginate_by=<paginate>&user=<userId>"
	};
	return b.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._userId = b.user.id,
			g.call(c)
		},
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.attr("href");
			f.window({
				url : e,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/load/more.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target);
			g.hasClass("disabled") || (i += 1, f.publish("ajax", {
					url : k.LIST.replace("<page>", i).replace("<paginate>", j).replace("<userId>", f._userId)
				}, c().done(function (b) {
						if (b.list.length) {
							b.current >= b.pages && f.$more.addClass("disabled");
							var d = a(e(b.list));
							d.find("[data-weave]").weave(c().done(function () {
									f.$content.append(d)
								}))
						}
					})))
		}
	})
})