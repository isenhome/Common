define("app/widget/mail-center/list/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		return a.replace(/#/g, "%23")
	}
	function g(a, b) {
		b ? a.removeClass("disabled") : a.addClass("disabled")
	}
	function h() {
		var a,
		b,
		d,
		g,
		h = this,
		j = "",
		p = 0,
		q = h.route.path,
		r = q.length;
		if ("[object Array]" === Object.prototype.toString.call(q))
			for (p; r > p; p++) {
				var s = q[p];
				l.test(s) ? a = RegExp.$1 : m.test(s) ? b = RegExp.$1 : n.test(s) && (d = RegExp.$1, h.publish("paginate/set", d))
			}
		h.publish("filter/set", b),
		j = h._url + (a ? "&page=" + a : "") + (b ? "&" + b : "") + (d ? "&paginate_by=" + d : ""),
		o.test(j) && (g = RegExp.$1, h._type = g),
		h.publish("ajax", {
			url : f(j)
		}, c().done(function (a) {
				if ("finalize" !== h.phase) {
					if (a.status !== k && !a.status)
						return e.alert("error", "Filter list error: " + a.message), void 0;
					h._json = a,
					i.call(h)
				}
			}))
	}
	function i() {
		var a = this;
		c(function (b) {
			a.publish(a._listType + r, a._json),
			a.html(d, a._json, b)
		}).done(function () {
			j.call(a)
		})
	}
	function j() {
		var a = this,
		b = a.$element;
		a.$mailList = b.find(".mail-list"),
		a.$actionBtns = b.find(".btn-actions button"),
		a.$btnDel = b.find(".btn-detele"),
		a.$btnRead = b.find(".btn-read"),
		a.$btnUnread = b.find(".btn-unread"),
		a.$tbody = b.find("tbody")
	}
	var k,
	l = /^page!(\d*)/,
	m = /^filter!(.*)/,
	n = /^paginate!(\d*)/,
	o = /(inbox|sending|outbox|draft|trash)/,
	p = {
		LIST : "/rest/mail/list?",
		DELETE : "/rest/mail/delete",
		RESEND : "/rest/mail/resend",
		MARK : "/rest/mail/mark"
	},
	q = "make/route",
	r = "/paging/set",
	s = "mail-center/update/sidebar/count",
	t = "mail-center/sidebar/update/unread";
	return b.extend(function () {
		this._url = p.LIST,
		this._listType = "email"
	}, {
		"sig/finalize" : function (a, b) {
			var c = this;
			c.$element.html(""),
			b.resolve()
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			c.paginate = 10,
			c.context = b,
			c._listType && b.user.listview[c._listType] && (c.paginate = b.user.listview[c._listType].paginate)
		},
		"hub:memory/route" : function (a, b) {
			var c = this;
			if (c.paginate && !c._init) {
				var d,
				e = b.path;
				if ("[object Array]" === Object.prototype.toString.call(e))
					for (var f = 0, g = e.length; g > f; f++) {
						var i = e[f];
						if (n.test(i)) {
							d = RegExp.$1,
							d === c.paginate && (c.route = b, h.call(c), c.loaded = !0);
							break
						}
					}
				if (c.loaded)
					return;
				return c.publish(q, {
					paginate : c.paginate
				}),
				c._init = !0,
				void 0
			}
			c.route = b,
			h.call(c)
		},
		"hub/mail-center/reload/mail" : function () {
			var a = this;
			a.publish(q, {
				page : 1,
				filter : "mbox=inbox"
			})
		},
		"dom/action.click" : a.noop,
		"dom/action/view/detail.click" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.closest("tr");
			f.hasClass("unread") && (f.removeClass("unread"), d.publish("mail-center/sidebar/update/unread", -1)),
			window.location.hash = "draft" === d._type ? "compose!" + f.data("id") : "detail!" + f.data("id")
		},
		"dom/action/check/all.click" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = d.$tbody.find("tr");
			e.prop("checked") ? f.filter(":not(.rowChecked)").addClass("rowChecked").find(":checkbox").prop("checked", !0) : f.filter(".rowChecked").removeClass("rowChecked").find(":checkbox").prop("checked", !1),
			g.call(d, d.$actionBtns, d.$tbody.find("tr :checkbox:checked").length)
		},
		"dom/action/check/one.click" : function (b, c) {
			c.stopPropagation();
			var d = this,
			e = a(c.target),
			f = e.closest("tr");
			e.prop("checked") ? f.addClass("rowChecked") : f.removeClass("rowChecked"),
			g.call(d, d.$actionBtns, d.$tbody.find("tr :checkbox:checked").length)
		},
		"dom/action/add/to/folder.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = [],
			g = d.$tbody.find("tr"),
			h = {
				ids : f,
				type : "email",
				onSuccess : function (b) {
					var c = d.getFolderName(b),
					e = d.getFolderId(b);
					g.each(function () {
						a(this).data("folders", e),
						a(this).find(".folder-name").html(c)
					})
				}
			};
			e.hasClass("disabled") || (g = d.$tbody.find("tr").filter(".rowChecked"), g.each(function () {
					f.push(a(this).data("id"))
				}), 1 === f.length && (h.folders = g.data("folders").toString().split(",")), d.publish("modal/add-to-folder/show", h))
		},
		"dom/action/delete/mail.click" : function (b, d) {
			d.preventDefault();
			var f,
			h,
			i = this,
			j = a(d.target),
			k = [];
			j.hasClass("disabled") || (f = window.confirm("确定要删除所选邮件吗？"), f && (h = i.$tbody.find("tr").filter(".rowChecked"), h.each(function () {
						k.push(a(this).data("id"))
					}), i.publish("ajax", {
						url : p.DELETE,
						data : {
							data : JSON.stringify({
								ids : k
							})
						},
						type : "post"
					}, c().done(function (a) {
							a.status ? (h.remove(), g.call(i, i.$btnDel, !1), e.alert("success", "邮件已删除"), i.publish(s)) : e.alert("error", a.message)
						}))))
		},
		"dom/action/resend.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target),
			h = g.closest("tr"),
			i = [];
			h = f.$tbody.find("tr").filter(".rowChecked"),
			h.each(function () {
				i.push(a(this).data("id"))
			}),
			f.publish("ajax", {
				url : p.RESEND,
				data : {
					data : JSON.stringify({
						ids : i
					})
				},
				type : "post"
			}, c().done(function (a) {
					a.status ? (h.find(".send-fail").remove(), f.publish(s)) : e.alert("error", a.message)
				}), g)
		},
		"dom/action/mark/mail.click" : function (b, d, f) {
			d.preventDefault();
			var g,
			h = this,
			i = a(d.target),
			j = [];
			i.hasClass("disabled") || (g = f ? h.$tbody.find("tr").filter(".rowChecked").filter(".unread") : h.$tbody.find("tr").filter(".rowChecked").filter(":not(.unread)"), g.each(function () {
					j.push(a(this).data("id"))
				}), h.publish("ajax", {
					url : p.MARK,
					data : {
						data : JSON.stringify({
							ids : j,
							status : f
						})
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? f ? (g.removeClass("unread"), h.publish(t, -g.length)) : (g.addClass("unread"), h.publish(t, g.length)) : e.alert("error", a.message)
					})))
		},
		formatEmail : function (a) {
			return a ? a.replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""
		},
		getFolderName : function (a) {
			var b = "";
			return a.forEach(function (a) {
				b += '<span class="label">' + a.name + "</span> "
			}),
			b
		},
		getFolderId : function (a) {
			var b = [];
			return a.forEach(function (a) {
				b.push(a.id)
			}),
			b.join(",")
		}
	})
})