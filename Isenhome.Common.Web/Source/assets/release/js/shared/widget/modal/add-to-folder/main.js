define("shared/widget/modal/add-to-folder/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "jquery.tree"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.html(d, a)
	}
	function g(c) {
		var d = this,
		f = d.$element;
		d.$body = f.find(".modal-body"),
		d.$add = f.find(".add"),
		d.$edit = f.find(".edit"),
		d.subscribe("update/" + d._type + "/folder", !0, function (c, f) {
			d._json = f,
			d._init ? d.$tree.tree("loadData", d._json) : (d.$tree = d.$element.find(".folder-tree"), d.$contextmenu = d.$element.find(".context-menu"), d.$tree.tree({
					data : d._json,
					onCreateLi : function (a, b) {
						var c = "icon-folder-close",
						e = b.find(".jqtree-title");
						"shared" === a.permission && (c += " icon-folder-share", e.after("<span class='muted pull-right'>创建者: <a href='/user/preview#" + a.user.id + "' data-action='profile/open'>" + a.user.englishName + "</a> (" + d.formatDate(a.dateAdded) + ")</span>")),
						e.before('<span class="' + c + '"></span>&nbsp;')
					},
					dragAndDrop : !0,
					onCanMove : function (a) {
						return "owned" === a.permission ? !0 : !1
					},
					onCanMoveTo : function (a, b, c) {
						return "owned" !== b.permission && "inside" === c ? !1 : !0
					}
				}), d.$tree.on("tree.contextmenu", function (b) {
					var c = b.node,
					e = a(b.target),
					f = e.offset(),
					g = b.click_event.pageX - f.left,
					h = b.click_event.pageY - f.top;
					"shared" === c.permission ? d.$contextmenu.find("li:not(.normal-action)").addClass("disabled") : d.$contextmenu.find("li").removeClass("disabled"),
					d.$contextmenu.css({
						left : g + 20,
						top : h + 50
					}).removeClass("hide"),
					d._selectedNode = c,
					a(document).on("click.contextmenu", function (b) {
						a(b.target).closest(d.$contextmenu).length || (d.$contextmenu.addClass("hide"), a(this).off(b))
					})
				}).on("tree.click", function (a) {
					if (d._edit)
						return !1;
					if (d._multiSelect) {
						a.preventDefault();
						var b = a.node;
						d.$tree.tree("isNodeSelected", b) ? d.$tree.tree("removeFromSelection", b) : d.$tree.tree("addToSelection", b)
					}
				}).on("tree.move", function (a) {
					var c = a.move_info.moved_node;
					c.parent_id = c.parent.id,
					d.DndTimer = setTimeout(function () {
							d.publish("ajax", {
								url : h.DND,
								type : "post",
								data : {
									data : d.$tree.tree("toJson")
								}
							}, b().done(function (a) {
									a.status ? d.publish("side-bar/update/folder") : e.alert("error", a.message)
								}))
						}, 500)
				}), d._init = !0)
		}),
		f.on("hidden", function () {
			if (!d._persist) {
				var a = d.$tree.tree("getSelectedNodes");
				a.forEach(function (a) {
					d.$tree.tree("removeFromSelection", a)
				})
			}
		}),
		c.resolve()
	}
	var h = {
		FOLDER_LIST : "/rest/folder/list?type=<type>",
		ADD_TO_FOLDER : "/rest/folder/addto",
		DND : "/rest/folder/dnd"
	},
	i = "modal/add-to-folder/edit-folder/show";
	return c.extend(function (a, b, c) {
		this._type = c,
		this._persist = !1
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		"hub/modal/add-to-folder/show" : function (a, b) {
			var c = this,
			d = c.$element;
			c._persist ? c._persist = !1 : "edit" === b ? (c._edit = !0, c.$add.addClass("hide"), c.$edit.removeClass("hide")) : (c._edit = !1, c.$add.removeClass("hide"), c.$edit.addClass("hide"), c._ids = b.ids, c._onSuccess = b.onSuccess, c._folders = b.folders, c._multiSelect = b.multiSelect, c._folders && c._folders.forEach(function (a) {
						if (a) {
							var b = c.$tree.tree("getNodeById", a);
							c.$tree.tree("addToSelection", b)
						}
					})),
			d.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/add/folder.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$element.modal("hide"),
			c._persist = !0,
			c.publish(i, {
				type : c._type,
				$tree : c.$tree,
				operation : "new",
				onSuccess : function () {
					c.publish("modal/add-to-folder/show")
				}
			})
		},
		"dom/action/folder/action.click" : function (b, c, d) {
			c.preventDefault();
			var e = this,
			f = a(c.target),
			g = e._selectedNode;
			f.closest("li").hasClass("disabled") || (e._persist = !0, e.$element.modal("hide"), e.$contextmenu.addClass("hide"), a(document).off("click.contextmenu"), e.publish(i, {
					type : e._type,
					$tree : e.$tree,
					node : g,
					operation : d,
					onSuccess : function (a) {
						e.publish("modal/add-to-folder/show"),
						a && ("updateNode" === d ? e.$tree.tree("updateNode", g, a.label) : "removeNode" === d ? e.$tree.tree(d, g) : e.$tree.tree(d, {
								label : a.label,
								id : a.id,
								share : a.share
							}, g))
					}
				}))
		},
		"dom/action/save.click" : function (c, d) {
			d.preventDefault();
			var f = this,
			g = f.$tree.tree("getSelectedNodes");
			f.$element;
			var i = a(d.target),
			j = [],
			k = [];
			!function () {
				g.forEach(function (a) {
					k.push(a.id),
					j.push({
						id : a.id,
						name : a.name
					})
				})
			}
			(),
			f.publish("ajax", {
				url : h.ADD_TO_FOLDER,
				data : {
					data : JSON.stringify({
						ids : k,
						external_ids : f._ids,
						justadd : f._ids.length > 1 ? !0 : !1,
						external_type : f._type
					})
				},
				type : "post"
			}, b().done(function (a) {
					f.$element.modal("hide"),
					a.status ? (f.publish("side-bar/update/folder"), f._onSuccess && f._onSuccess(j), e.alert("success", "加入文件夹成功!")) : e.alert("error", a.message)
				}), i)
		},
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			f = d.attr("href");
			e.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		}
	})
})