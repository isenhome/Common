define("app/widget/candidate/detail/note-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g() {
		var b = this,
		e = j.NOTE.replace("<type>", "candidate").replace("<id>", b._cid),
		f = [],
		g = c(),
		i = c();
		f.push(g.promise(), i.promise()),
		b.publish("ajax", {
			url : e
		}, g.done(function (a) {
				b._json.list = a.list,
				b.publish(k, "note", b._json.list.length)
			})),
		b.publish("ajax", {
			url : j.CATEGORY
		}, i.done(function (a) {
				b._category = {},
				b._counts = {},
				a.forEach(function (a) {
					b._category[a.code] = {
						value : a.value
					},
					b._counts[a.code] = 0
				})
			})),
		d.apply(a, f).done(function () {
			h.call(b)
		})
	}
	function h() {
		var a = this;
		a._reference,
		c(function (b) {
			a._json.list.forEach(function (b) {
				a._counts[b.category.code]++
			}),
			a.html(e, a._json, b)
		}).done(function () {
			i.call(a)
		})
	}
	function i() {
		var a = this;
		a.$items = a.$element.find(".activity-item"),
		f.widgetLoaded.call(a)
	}
	var j = {
		NOTE : "/rest/note/list?paginate_by=200&external_type=<type>&external_id=<id>",
		CATEGORY : "/rest/data/options?type=candidate_note_category",
		DELETE : "/rest/note/delete"
	},
	k = "candidate/action/count";
	return b.extend(function (a, b, c) {
		this._reference = c,
		this._cid = c.id
	}, {
		"sig/finalize" : function (a, b) {
			var c = this;
			c.$element.empty(),
			b.resolve()
		},
		"hub/canddiate/note/tab/reload" : function () {
			g.call(this)
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._isAdmin = "Admin" === b.user.role,
			c._userId = b.user.id,
			g.call(c)
		},
		"dom/action.click" : a.noop,
		"dom/action/edit/note.click" : function (a, b, c) {
			b.preventDefault();
			var d = this,
			e = d._json.list[c];
			d.publish("modal/add-note/show", {
				externalType : "candidate",
				optionType : e.jobsubmission ? "jobsubmission_note_category" : "candidate_note_category",
				data : e,
				id : d._cid,
				onSuccess : function () {
					g.call(d)
				}
			})
		},
		"dom/action/buttons-toggle.click" : function (b, c, d) {
			c.preventDefault();
			var e = this,
			f = a(c.target);
			f.siblings().removeClass("active"),
			f.addClass("active"),
			d ? e.$items.addClass("hide").filter('[data-type="' + d + '"]').removeClass("hide") : e.$items.removeClass("hide")
		},
		"dom/action/delete/note.click" : function (a, b, d) {
			b.preventDefault();
			var e = this,
			h = [d],
			i = window.confirm("确定要删除此备注吗?");
			i && e.publish("ajax", {
				url : j.DELETE,
				data : {
					data : JSON.stringify({
						ids : h
					})
				},
				type : "post"
			}, c().done(function (a) {
					a.status ? (f.alert("success", "备注删除成功!"), g.call(e)) : f.alert("error", a.message)
				}))
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
		}
	})
})