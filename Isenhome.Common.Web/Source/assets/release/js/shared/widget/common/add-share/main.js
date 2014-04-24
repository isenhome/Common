define("shared/widget/common/add-share/main", ["compose", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "template!./share.html", "shared/helper/utils", "config"], function (a, b, c, d, e, f, g, h, i) {
	function j(a, c) {
		var d = this,
		e = d.$add.closest(".controls"),
		f = b(g(d._disabled)),
		h = f.find("select"),
		i = f.find(".share-to");
		if (e.before(f), h.find('option[value="' + a + '"]').prop("selected", !0), "people" === a) {
			var j = b('<select data-cache="true" class="input-medium"></select>');
			i.append(j),
			d._disabled && j.prop("disabled", !0),
			j.attr("data-weave", "shared/widget/common/user-list/main(" + c + ")").weave()
		} else if ("team" === a) {
			var k = b('<div style="width: 150px;"></div>');
			d._disabled && k.addClass("disabled"),
			k.addClass("comtree").data("name", "team").data("url", "/rest/data/team").attr("data-weave", "shared/widget/common/comtree/main(" + c + ")").weave(),
			i.append(k)
		}
		f.find("[data-weave]").weave()
	}
	function k() {
		for (var a = this._share, b = 0, c = a.length; c > b; b += 1)
			j.call(this, a[b].type, a[b].value)
	}
	function l(a) {
		var c = a.val(),
		d = a.closest(".add-share"),
		e = d.find(".share-to");
		if (e.children().remove(), "people" === c)
			e.append('<select data-cache="true" class="input-medium"></select>'), e.find("select").attr("data-weave", "shared/widget/common/user-list/main").weave();
		else if ("team" === c) {
			var f = b('<div style="width: 150px;"></div>');
			f.addClass("comtree").data("name", "team").data("url", "/rest/data/team").attr("data-weave", "shared/widget/common/comtree/main").weave(),
			e.append(f)
		}
	}
	function m(a) {
		var b = this;
		d(function (a) {
			b._json = b._disabled,
			b.html(f, b._json, a)
		}).then(function () {
			n.call(b, a)
		}, a.reject, a.notify)
	}
	function n(a) {
		var b = this;
		b.$addBtn = b.$element.find(".text_line"),
		b.$add = b.$element.find(".addshare"),
		b._share && k.call(b),
		a.resolve()
	}
	var o;
	return c.extend(function (a, b, c) {
		var d = this;
		d._share = c,
		d._disabled = d.$element.data("disabled") !== o ? d.$element.data("disabled") : !1
	}, {
		shareType : i.shareType,
		"sig/initialize" : function (a, b) {
			m.call(this, b)
		},
		reRender : function () {
			var a = this,
			b = d();
			b.done(function () {
				var b = a.teamId;
				if (!a._share) {
					if (a._share === !1)
						return;
					"myteam" !== a.shareType || b === o || isNaN(b) ? "everyone" === a.shareType && j.call(a, "everyone") : j.call(a, "team", b)
				}
			}),
			m.call(this, b)
		},
		"hub:memory/context" : function (a, b) {
			var c = this,
			d = c.teamId = b.user.team.id;
			if (!c._share) {
				if (c._share === !1)
					return;
				"myteam" !== c.shareType || d === o || isNaN(d) ? "everyone" === c.shareType && j.call(c, "everyone") : j.call(c, "team", d)
			}
		},
		"dom/action.click.change" : b.noop,
		"dom/action/share/add.click" : function (a, c) {
			c.preventDefault();
			var d = this;
			b(c.target);
			var e = b(g());
			e.find("[data-weave]").each(function () {
				b(this).weave()
			}),
			d.$addBtn.before(e),
			d.$addBtn.prev().find('[name="share_with"]').trigger("change")
		},
		"dom/action/share/with.change" : function (a, c) {
			var d = b(c.target);
			d.next(),
			d.val(),
			l.call(this, d)
		},
		"dom/action/share/remove.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target),
			e = d.closest(".controls");
			e.next().find("select[name=share_with]"),
			window.confirm("Are you really to remove it?") && e.remove()
		},
		loadShare : function (a) {
			var b = this;
			b._share = a,
			b.$element.find(".add-share").remove(),
			k.call(b)
		}
	})
})