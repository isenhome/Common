define("app/widget/common/add-consultant/main", ["compose", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "template!./consultant.html", "shared/helper/utils"], function (a, b, c, d, e, f, g) {
	function h(a, b) {
		a.data("woven") || (b ? a.attr("data-weave", "shared/widget/common/user-list/main(" + b + ")").weave() : a.attr("data-weave", "shared/widget/common/user-list/main").weave())
	}
	function i(a, c) {
		var d = b("#add"),
		e = d.closest(".controls"),
		f = b(g());
		f.find("[data-weave]").each(function () {
			b(this).weave()
		});
		var i = f.find("select[name=type]"),
		j = i.next();
		i.val(a),
		j.attr("name", a),
		h(j, c),
		e.before(f)
	}
	function j() {
		for (var a = this._consultant, b = 0, c = a.length; c > b; b += 1)
			i.call(this, a[b].type, a[b].user.id)
	}
	function k(a) {
		var b = this;
		d(function (a) {
			b.html(f, b._json, a)
		}).then(function () {
			l.call(b, a)
		}, a.reject, a.notify)
	}
	function l(a) {
		var b = this;
		b.$addBtn = b.$element.find(".text_line"),
		b.publish("ajax", {
			url : m.USERLIST
		}, d().done(function (a) {
				b._json.userList = a
			}).then(function () {
				b._consultant && j.call(b)
			}).always(function () {
				a.resolve()
			}))
	}
	var m = {
		USERLIST : "/rest/data/userlist"
	};
	return c.extend(function (a, b, c) {
		var d = this;
		d._consultant = c
	}, {
		"sig/initialize" : function (a, b) {
			k.call(this, b)
		},
		"dom/action.click.change" : b.noop,
		"dom/action/consultant/add.click" : function (a, c) {
			c.preventDefault();
			var d = this;
			b(c.target);
			var e = b(g());
			e.find("[data-weave]").each(function () {
				b(this).weave()
			}),
			d.$addBtn.before(e),
			d.$addBtn.prev().find('[name="type"]').trigger("change")
		},
		"dom/action/consultant/type.change" : function (a, c) {
			var d = b(c.target),
			e = d.siblings("select"),
			f = d.val();
			e.attr("name", f),
			h(e)
		},
		"dom/action/consultant/remove.click" : function (a, c) {
			var d = b(c.target),
			e = d.closest(".controls");
			window.confirm("Are you really to remove it?") && (e.remove(), c.preventDefault())
		}
	})
})