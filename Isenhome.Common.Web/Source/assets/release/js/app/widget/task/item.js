define("app/widget/task/item", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./item.html", "shared/helper/utils", "shared/helper/blurb"], function (a, b, c, d, e) {
	function f() {
		var a = this;
		a.html(d, a._json)
	}
	var g = {
		DONE : "/rest/todo/done"
	};
	return b.extend(function (a, b, c) {
		var d = this;
		d._json = c
	}, {
		"hub:memory/context" : function (a, b) {
			var c = this;
			c.userId = b.user.id,
			f.call(c)
		},
		"dom/action.click.change" : a.noop,
		"dom/action/check/one.change" : function (b, d) {
			var f = this,
			h = a(d.target),
			i = h.data("id"),
			j = h.is(":checked");
			f.publish("ajax", {
				url : g.DONE,
				data : {
					data : JSON.stringify({
						ids : [i],
						done : j
					})
				},
				type : "POST"
			}, c().done(function (a) {
					a.status ? e.alert("success", "任务状态更改成功!") : e.alert("error", a.message)
				}))
		},
		"dom/action/edit/todo.click" : function (a, b) {
			b.preventDefault();
			var d = this,
			e = null,
			g = d._json;
			"joborder" === g.external_type || "client" === g.external_type ? e = g.target.name : g.target && g.target.candidate ? e = [g.candidate.englishName, g.candidate.chineseName].join(" ").trim() : g.target && (e = g.target.name),
			d.publish("modal/add/task/show", {
				name : e,
				id : g.target ? g.target.id : null,
				onSuccess : function (a) {
					d._json = a,
					f.call(d, c())
				},
				type : g.external_type,
				data : g
			})
		},
		"dom/action/open/profile.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			f = d.attr("href");
			e.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		},
		getDate : function (a) {
			var b = new Date(a.split(" ")[0]);
			return b.getFullYear() + "-" + (parseInt(b.getMonth(), 10) + 1) + "-" + b.getDate()
		},
		isParticipant : function () {
			for (var a = !1, b = this, c = b._json.users, d = 0, e = c.length; e > d; d++)
				if (b.userId === c[d].id) {
					a = !0;
					break
				}
			return a
		}
	})
})