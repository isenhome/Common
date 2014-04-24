define("app/widget/document/list/main", ["jquery", "shared/widget/list/base", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		c(function (a) {
			b.html(d, a)
		}).done(function () {
			b.$container = b.$element.find(".list-container"),
			b.$massActions = b.$element.find(".mass-action .btn"),
			b.$toggleAll = b.$element.find('[data-action="list/toggle/all"]'),
			b.$listview = b.$element.find('[data-action="listview"]'),
			b.viewType ? b.$listview.addClass("table-view").attr("title", "切换为详细视图").find("span").attr("class", "icon-sqaures") : b.$listview.addClass("detail-view").attr("title", "切换为列表视图").find("span").attr("class", "icon-list"),
			b.$element.tooltip({
				selector : '[data-toggle="tooltip"]',
				trigger : "hover"
			}),
			a.resolve()
		})
	}
	var g = {
		LIST : "/rest/document/list?",
		DELETE : "/rest/file/del"
	};
	return b.extend(function () {
		this._url = g.LIST,
		this._listType = "document"
	}, {
		render : function (a) {
			f.call(this, a || c())
		},
		appendItems : function (a) {
			var b = this;
			b.$toggleAll.prop("checked", !1),
			b.$toggleAll.prop("indeterminate", !1),
			b.viewType ? a.forEach(function (a) {
				b.$container.append("<tr></tr>"),
				b.$container.children().last().data("json", a).attr("data-weave", "app/widget/document/detail/main(json, " + b.viewType + ")").weave()
			}) : a.forEach(function (a) {
				b.$container.append('<div class="search_item clearfix"></div>'),
				b.$container.children().last().data("json", a).attr("data-weave", "app/widget/document/detail/main(json, " + b.viewType + ")").weave()
			})
		},
		"dom/action/upload.click" : function () {
			var a = this;
			a.publish("modal/upload-document/show", {
				onSuccess : function () {
					a.publish("list/reload")
				}
			})
		},
		"dom/action/mass/to/folder.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target);
			if (!e.hasClass("disabled")) {
				var f = d.$element.find('[data-action="list/check"]').filter(":checked"),
				g = [];
				f.each(function () {
					g.push(a(this).data("json").id)
				}),
				d.publish("modal/add-to-folder/show", {
					multiSelect : !0,
					ids : g,
					type : "document",
					onSuccess : function () {
						d.publish("list/reload")
					}
				})
			}
		},
		"dom/action/mass/delete.click" : function (b, d) {
			var f = this,
			h = a(d.target);
			if (!h.hasClass("disabled")) {
				var i = window.confirm("确定要删除所选文件吗?");
				if (i) {
					var j = f.$element.find('[data-action="list/check"]').filter(":checked"),
					k = [];
					j.each(function () {
						k.push(a(this).data("json").uuidname)
					}),
					f.publish("ajax", {
						url : g.DELETE,
						type : "post",
						data : {
							data : JSON.stringify({
								uuidnames : k
							})
						}
					}, c().done(function (a) {
							a.status ? (f.publish("list/reload"), e.alert("success", "文档删除成功!")) : e.alert("error", a.message)
						}))
				}
			}
		}
	})
})