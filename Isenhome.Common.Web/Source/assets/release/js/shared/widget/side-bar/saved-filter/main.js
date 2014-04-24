define("shared/widget/side-bar/saved-filter/main", ["jquery", "config", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "template!./main.html", "template!./saved-filter.html", "shared/helper/blurb", "jquery.ui", "jquery.tree"], function (a, b, c, d, e, f, g, h, i) {
	function j() {
		var a,
		b,
		c,
		d = this,
		e = d._path,
		f = 0;
		if (e)
			for (a = e.length, f; a > f; f++)
				p.test(e[f]) && (b = e[f].split("!"), c = b[1], d.$element.find("li").removeClass("hover"), d.$element.find('[data-href="' + window.decodeURIComponent(c) + '"]').closest("li").addClass("hover"))
	}
	function k(a) {
		var b = this;
		b.publish("ajax", {
			url : n.FOLDER_LIST.replace("<type>", b._type)
		}, d().done(function (c) {
				b.$folderList.find(".folder-tree").tree("loadData", c),
				b.publish("update/" + b._type + "/folder", c),
				b._folderLoaded || j.call(b),
				b._folderLoaded = !0,
				b.publish(q),
				a && a.resolve()
			}))
	}
	function l(a) {
		var b = this;
		b._type ? (b._type = "task" === b._type ? "todo" : b._type, b.publish("ajax", {
				url : n.QUERY_FILTER.replace("<type>", b._type)
			}, d().done(function (c) {
					b._json.savedFilters = c,
					d(function (a) {
						b.html(g, b._json, a)
					}).done(function () {
						b.sidebarConfig.forEach(function (a) {
							b.$element.append(b.$element.find('[data-name="' + a + '"]'))
						}),
						b.$element.removeClass("hide"),
						d(function (a) {
							m.call(b, a)
						}).done(function () {
							"candidate" === b._type || "client" === b._type || "document" === b._type ? k.call(b, a) : a.resolve()
						})
					})
				}))) : a.resolve()
	}
	function m(b) {
		var c = this;
		c.$folderList = c.$element.find(".folder-list"),
		c.$element.on("mouseenter mouseleave", ".folder-list", function (a) {
			"mouseenter" === a.type ? c.$element.find(".edit").removeClass("hide") : c.$element.find(".edit").addClass("hide")
		}),
		c.$folderList.find(".folder-tree").tree({
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
		c.publish(q),
		c.$element.find(".saved-filter, .favorite-filter").sortable({
			axis : "y",
			handle : ".icon-move-ns",
			items : "li:not(.nav-header)",
			placeholder : "sortable-placeholder",
			forcePlaceholderSize : !0,
			update : function () {
				var b = [];
				a(this).find("a[data-id]").each(function () {
					b.push(a(this).data("id"))
				}),
				c.publish("ajax", {
					url : n.REORDER,
					data : {
						data : JSON.stringify({
							type : "queryfilter",
							ids : b
						})
					},
					type : "post"
				}, d().done(function (a) {
						a.status ? f.alert("success", o.SUCCESSFUL) : f.alert("success", a.message)
					}))
			}
		}),
		c.$element.sortable({
			axis : "y",
			handle : ".nav-header",
			items : "ul.nav-list",
			placeholder : "sortable-placeholder",
			forcePlaceholderSize : !0,
			update : function () {
				var b = [];
				a(this).find("ul[data-name]").each(function () {
					b.push(a(this).data("name"))
				}),
				c.publish("ajax", {
					url : n.LISTVIEW,
					data : {
						data : JSON.stringify({
							list : c._type,
							key : "sidebar",
							value : b
						})
					},
					type : "post"
				}, d().done(function (a) {
						a.status || f.alert("error", a.message)
					}))
			}
		}),
		b.resolve()
	}
	var n = {
		QUERY_FILTER : "/rest/data/queryfilter/<type>",
		DELETE_FILTER : "/rest/data/queryfilter/<type>/del",
		FOLDER_LIST : "/rest/folder/list?type=<type>",
		DELETE_FOLDER : "/rest/folder/delete",
		REORDER : "/rest/data/reorder",
		LISTVIEW : "/rest/user/listview"
	},
	o = {
		SUCCESSFUL : i.t("Operate successfully")
	},
	p = /^filter!/,
	q = "root/update/sidebar";
	return c.extend(function (a, c, d) {
		this._type = d,
		this.sidebarConfig = [],
		b.userContext.user.listview[d] && b.userContext.user.listview[d].sidebar && (this.sidebarConfig = b.userContext.user.listview[d].sidebar)
	}, {
		"sig/initialize" : function (a, b) {
			l.call(this, b)
		},
		"hub:memory/side-bar/update/folder" : function () {
			k.call(this)
		},
		"hub:memory/route" : function (a, b) {
			var c = this;
			c._path = b.path,
			j.call(c)
		},
		"hub:memory/sidebar/set/default" : function () {
			var a = this,
			b = a.$element.find("[data-href]:eq(0)");
			b.trigger("click")
		},
		"hub/saved/filter/add" : function (b, c) {
			var d = this,
			e = d.$element.find(".search-item");
			e.length ? e.eq(e.length - 1).parent().after(h(c)) : a("#saved-searchs").after(h(c)),
			d.$element.find(".search-item").last().trigger("click"),
			d.publish(q)
		}
	})
})