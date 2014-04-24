define("app/widget/job/detail/email-tab/row", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./row.html", "shared/helper/utils", "shared/helper/blurb"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b._id ? b.publish("ajax", {
			url : g.LIST.replace("<id>", b._id).replace("<page>", h)
		}, c().done(function (c) {
				b._json = c,
				b.publish(i, c),
				b.html(d, c, a)
			})) : a.resolve()
	}
	function f(a) {
		a.resolve()
	}
	var g = {
		LIST : "/rest/mail/list?paginate_by=20&joborder_id=<id>&page=<page>",
		DETAIL : "/mail/center#inbox/<id>"
	},
	h = 1,
	i = "joborder-email/paging/set";
	return b.extend(function (a, b, c) {
		this._id = c
	}, {
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"sig/start" : function (a, b) {
			f.call(this, b)
		},
		"hub/make/load" : function (a, b) {
			var d = this;
			h = b.page,
			e.call(d, c())
		},
		"hub/add/email/count" : function () {
			var a = this;
			h = 1,
			e.call(a, c())
		},
		"dom/action.click" : a.noop,
		"dom/action/view/detail.click" : function (b, c) {
			var d = a(c.target),
			e = d.closest("tr");
			e.hasClass("unread") && e.removeClass("unread"),
			window.open(g.DETAIL.replace("<id>", e.data("id")), "_blank")
		},
		formatEmail : function (a) {
			return a ? a.replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""
		}
	})
})