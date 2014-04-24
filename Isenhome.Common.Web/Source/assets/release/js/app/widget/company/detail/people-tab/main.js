define("app/widget/company/detail/people-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "template!./main.html", "template!./item.html", "treetable"], function (a, b, c, d, e, f, g) {
	function h() {
		var a = this;
		a.publish("ajax", {
			url : j.FN_LIST.replace("<cid>", a._cid)
		}, c().done(function (b) {
				a._json = b,
				c(function (b) {
					a.html(f, a._json, b)
				}).done(function () {
					i.call(a)
				})
			}))
	}
	function i() {
		var b = this;
		b.$table = b.$element.find("table"),
		b.$table.treetable({
			expandable : !0,
			onInitialized : function () {
				e.widgetLoaded.call(b)
			},
			onNodeExpand : function () {
				var d = this;
				d.row.data("ttBranch") !== !0 || d.loaded || b.publish("ajax", {
					url : j.PEOPLE_LIST.replace("<cid>", b._cid).replace("<fid>", d.id),
					async : !1
				}, c().done(function (e) {
						var f = a("<div></div>"),
						h = a(g({
									list : e,
									parentId : d.id,
									context : b._context
								}));
						f.append(h),
						h.find("[data-weave]").weave(c().done(function () {
								b.$table.treetable("loadBranch", d, f.html()),
								d.loaded = !0
							}))
					}))
			}
		}),
		b.$element.tooltip({
			selector : '[data-toggle="tooltip"]'
		})
	}
	var j = {
		PEOPLE : "rest/candidate/list?paginate_by=10000&company_id=<id>",
		FN_LIST : "/rest/candidate/function_tree?company_id=<cid>",
		PEOPLE_LIST : "/rest/candidate/function_tree?company_id=<cid>&function_id=<fid>"
	},
	k = '[data-toggle="view"]',
	l = "hide";
	return b.extend(function (a, b, c) {
		this._cid = c
	}, {
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._context = b,
			h.call(c)
		},
		"dom/action.click.mouseover.mouseout" : a.noop,
		"dom/action/add/note.click" : function (b, c, d) {
			c.preventDefault();
			var e = this,
			f = a(c.target);
			e.publish("modal/add-note/show", {
				externalType : "candidate",
				optionType : "candidate_note_category",
				id : d,
				onSuccess : function (a) {
					var b = a.data.status,
					c = f.find(".note-count"),
					d = f.closest("tr");
					c.text(parseInt(c.text(), 10) + 1),
					d.find(".lastupdate").text(e.formatDate(a.data.lastUpdate));
					var g = d.find(".status").eq(0);
					b && g.css("background-color", b.color).text(b.value)
				}
			})
		},
		"dom/action/collapse/all.click" : function () {
			var a = this;
			a.$table.treetable("collapseAll")
		},
		"dom/action/expand/all.click" : function () {
			var a = this;
			a.$table.treetable("expandAll")
		},
		"dom/action/people/note.mouseover.click" : function (b, c, d) {
			c.preventDefault();
			var e = this,
			f = a(c.target);
			return "click" === c.namespace ? (f.hasClass("disabled") || e.publish("modal/add-note/show", {
					externalType : "candidate",
					optionType : "candidate_note_category",
					id : d,
					onSuccess : function () {
						f.find("strong").text(parseInt(f.find("strong").text(), 10) + 1)
					}
				}), void 0) : ("0" != f.find("strong").text() && e.publish("slide-helper/note/reload", d, "candidate"), void 0)
		},
		"dom/action/people/note.mouseout" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target),
			d._json.islimited || d._isAdmin || d.publish("slide-helper/note/close")
		},
		"dom/action/helper/toggle/show.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target);
			d.$element.find(".helper-toggle").find("a").removeClass(l),
			d.$element.find(".helper-toggle").find(k).addClass(l),
			e.addClass(l),
			e.closest(".helper-toggle").find(k).removeClass(l)
		}
	})
})