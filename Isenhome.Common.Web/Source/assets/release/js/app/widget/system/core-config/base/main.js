define("app/widget/system/core-config/base/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "jquery.tree"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.publish("ajax", {
			url : h.LIST.replace("<type>", b._type),
			cache : !1
		}, c().done(function (e) {
				b._json = e,
				c(function (a) {
					b.html(d, a)
				}).done(function () {
					g.call(b, a)
				})
			}))
	}
	function g(b) {
		var c = this;
		c.$tree = c.$element.find(".tree"),
		c.$contextmenu = c.$element.find(".context-menu"),
		c.$tree.tree({
			data : c._json,
			dragAndDrop : !0
		}),
		c.$tree.on("tree.move", function (a) {
			var b = a.move_info.moved_node;
			b.parent_id = b.parent.id
		}),
		c.$tree.on("tree.contextmenu", function (b) {
			var d = b.node,
			e = b.click_event.pageX,
			f = b.click_event.pageY;
			c.$tree.tree("getSelectedNode") !== d && c.$tree.tree("selectNode", d),
			c.$contextmenu.css({
				left : e - 10,
				top : f - 10
			}).removeClass("hide"),
			a(document).on("click.contextmenu", function (b) {
				a(b.target).closest(c.$contextmenu).length || (c.$contextmenu.addClass("hide"), a(this).off(b))
			})
		}),
		b.resolve()
	}
	var h = {
		LIST : "/rest/data/<type>",
		ADD : "/rest/data/<type>_add"
	},
	i = "modal/tree-config/show";
	return b.extend(function (a, b, c) {
		this._type = c
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/stop" : function (b, c) {
			a(document).off("click.contextmenu"),
			c.resolve()
		},
		"dom/action.click" : a.noop,
		"dom/action/config/rename" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = d.$tree.tree("getSelectedNode");
			d.$contextmenu.addClass("hide"),
			a(document).off("click.contextmenu"),
			d.publish(i, {
				$tree : d.$tree,
				node : e,
				operation : "edit"
			})
		},
		"dom/action/config/add" : function (b, c, d) {
			c.preventDefault();
			var e = this,
			f = e.$tree.tree("getSelectedNode");
			e.$contextmenu.addClass("hide"),
			a(document).off("click.contextmenu"),
			e.publish(i, {
				$tree : e.$tree,
				node : f,
				operation : d
			})
		},
		"dom/action/config/delete" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = d.$tree.tree("getSelectedNode");
			d.$contextmenu.addClass("hide"),
			a(document).off("click.contextmenu");
			var f = window.confirm("确定要删除这个节点吗？");
			f && d.$tree.tree("removeNode", e)
		},
		"dom/action/config/save" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target);
			f.publish("ajax", {
				url : h.ADD.replace("<type>", f._type),
				type : "post",
				data : {
					data : f.$tree.tree("toJson")
				}
			}, c().done(function (a) {
					a.status ? (e.alert("success", "保存设置成功!"), a.data.length && e.alert("error", a.data.join(", ") + "为关联项目不能删除！请刷新页面，右击该节点，并选择“转移到”，将关联数据移除后再删除！")) : e.alert("error", a.message)
				}), g)
		},
		"dom/action/config/merge.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			f = e.$tree.tree("getSelectedNode");
			e.$contextmenu.addClass("hide"),
			a(document).off("click.contextmenu"),
			e.publish("system/modal/merge-node/show", {
				type : e._type,
				selected : f,
				data : JSON.parse(e.$tree.tree("toJson")),
				onSuccess : function () {
					e.publish("ajax", {
						url : h.LIST.replace("<type>", e._type),
						cache : !1
					}, c().done(function (a) {
							e._json = a,
							e.$tree.tree("loadData", e._json)
						}))
				}
			})
		}
	})
})