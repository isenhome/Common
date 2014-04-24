define("app/widget/mail-center/sidebar/main", ["jquery", "shared/services/route", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "jquery.tree"], function (a, b, c, d, e, f) {
	function g(a, b) {
		function c(a, e) {
			b && e && b(e),
			d.unsubscribe(q, c)
		}
		var d = this;
		d.subscribe(q, c),
		d.publish("make/route", {
			filter : a,
			page : 1
		})
	}
	function h(a) {
		var b = this;
		b.publish("ajax", {
			url : m.FOLDER_LIST
		}, d().done(function (c) {
				b.$folderList.find(".folder-tree").tree("loadData", c),
				b.publish("update/email/folder", c),
				b._folderLoaded || i.call(b),
				b._folderLoaded = !0,
				b.publish(p),
				a && a.resolve()
			}))
	}
	function i() {
		var a,
		b,
		c,
		d = this,
		e = d._path,
		f = 0;
		if (e)
			for (a = e.length, f; a > f; f++)
				l.test(e[f]) && (b = e[f].split("!"), c = b[1], d.$element.find("li").removeClass("hover"), d.$element.find('[data-href="' + window.decodeURIComponent(c) + '"]').closest("li").addClass("hover"))
	}
	function j() {
		var a = this;
		d(function (b) {
			a.html(e, a._json, b)
		}).done(function () {
			a.publish("root/register/sidebar"),
			k.call(a)
		})
	}
	function k() {
		var a = this,
		b = a.$element;
		a.$inbox = b.find(".inbox-count"),
		a.$sending = b.find(".sending-count"),
		a.$outbox = b.find(".outbox-count"),
		a.$draft = b.find(".draft-count"),
		a.$trash = b.find(".trash-count"),
		a.$unread = b.find(".unread-count").text(a.unreadCount),
		a.$link = a.$element.find(".nav-list a"),
		a.$folderList = a.$element.find(".folder-list"),
		a.$element.on("mouseenter mouseleave", ".folder-list", function (b) {
			"mouseenter" === b.type ? a.$element.find(".edit").removeClass("hide") : a.$element.find(".edit").addClass("hide")
		}),
		a.$folderList.find(".folder-tree").tree({
			data : {},
			onCreateLi : function (a, b) {
				var c = b.find(".jqtree-title"),
				d = "icon-folder-close icon-blue";
				"shared" === a.permission && (d += " icon-folder-share"),
				c.before('<i class="' + d + '"></i>&nbsp;'),
				c.after('<sapn class="pull-right">' + a.count + "</sapn>"),
				b.find(".jqtree-element").attr("data-action", "filter").attr("data-id", a.id).attr("data-href", "folder_id=" + a.id)
			},
			selectable : !1,
			slide : !1
		}),
		h.call(this),
		a.publish(o),
		a._rendered = !0
	}
	var l = /^filter!/,
	m = {
		CHECK_MAIL : "/rest/mail/check",
		COUNT : "/rest/mail/group_count",
		FOLDER_LIST : "/rest/folder/list?type=email"
	},
	n = "mail-center/reload/mail",
	o = "mail-center/update/sidebar/count",
	p = "root/update/sidebar",
	q = "filter/get/count";
	return c.extend(function () {
		b().start()
	}, {
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._json.emailEnabled = "" !== b.user.email && "" !== b.user.emailpassword,
			c.unreadCount = b.email_count,
			j.call(c)
		},
		"hub:memory/side-bar/update/folder" : function () {
			h.call(this)
		},
		"hub:memory/route" : function (a, b) {
			var c = this;
			c._path = b.path,
			c._type = c._path ? c._path[0] : "",
			c._rendered && i.call(c)
		},
		"hub:memory/mail-center/update/sidebar/count" : function () {
			var b = this;
			"started" === b.phase && b.publish("ajax", {
				url : m.COUNT
			}, d().done(function (c) {
					b._json = a.extend(!0, b._json, c);
					for (var d in c)
						b["$" + d] && b["$" + d].length && b["$" + d].text(c[d])
				}))
		},
		"hub/mail-center/sidebar/update/unread" : function (a, b) {
			var c = this;
			c.$unread.text(1 * c.$unread.text() + b)
		},
		"dom/action.click" : a.noop,
		"dom/action/check/mail.click" : function (b, c) {
			var e = this,
			g = a(c.target);
			e.publish("ajax", {
				url : m.CHECK_MAIL
			}, d().done(function (a) {
					a.status ? (e.publish(n), e.publish(o)) : f.alert("error", a.mesage),
					g.removeClass("disabled")
				}), g)
		},
		"dom/action/compose/mail.click" : function (b, c) {
			var d = a(c.target);
			d.hasClass("disabled") || (window.location.hash = "compose")
		},
		"dom/action/edit/folder.click" : function (a, b) {
			b.preventDefault(),
			b.stopPropagation();
			var c = this;
			c.publish("modal/add-to-folder/show", "edit")
		},
		"dom/action/filter.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = e.attr("data-href");
			g.call(d, f, function (a) {
				e.find(".pull-right").text(a)
			})
		}
	})
})