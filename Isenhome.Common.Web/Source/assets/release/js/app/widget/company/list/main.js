define("app/widget/company/list/main", ["jquery", "shared/widget/list/base", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		c(function (a) {
			b.html(d, a)
		}).done(function () {
			b.$container = b.$element.find(".list-container"),
			b.$massActions = b.$element.find(".mass-action .btn"),
			b.$toggleAll = b.$element.find('[data-action="list/toggle/all"]'),
			b.$listview = b.$element.find('[data-action="listview"]'),
			b.viewType ? b.$listview.addClass("table-view").find("span").attr("class", "icon-sqaures") : b.$listview.addClass("detail-view").find("span").attr("class", "icon-list"),
			b.$element.tooltip({
				selector : '[data-toggle="tooltip"]',
				trigger : "hover"
			}),
			a.resolve()
		})
	}
	var f = "/rest/client/list?",
	g = "app/widget/company/item/main";
	return b.extend(function () {
		this._url = f,
		this._listType = "client"
	}, {
		render : function (a) {
			var b = this;
			b.subscribe("context", !0, function (c, d) {
				b._isAdmin = "Admin" === d.user.role ? !0 : !1,
				e.call(b, a)
			})
		},
		appendItems : function (a) {
			var b = this;
			b.$toggleAll.prop("checked", !1),
			b.$toggleAll.prop("indeterminate", !1),
			b.viewType ? a.forEach(function (a) {
				b.$container.append("<tr></tr>"),
				b.$container.children().last().data("json", a).attr("data-weave", g + "(json, " + b.viewType + ")").weave()
			}) : a.forEach(function (a) {
				b.$container.append('<div class="search_item clearfix"></div>'),
				b.$container.children().last().data("json", a).attr("data-weave", g + "(json, " + b.viewType + ")").weave()
			})
		},
		"dom/action/mass/to/folder.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target);
			if (!e.hasClass("disabled")) {
				var f = d.$element.find('[data-action="list/check"]').filter(":checked"),
				h = [];
				f.each(function () {
					h.push(a(this).data("json").id)
				}),
				d.publish("modal/add-to-folder/show", {
					ids : h,
					type : "client",
					multiSelect : !0,
					onSuccess : function (b) {
						f.each(function () {
							a(this).data("json").folders = b
						}),
						f.closest('[data-woven*="' + g + '"]').find(".folder-count").text(b.length).closest("a").find(".muted").text(d.getFolderName(b))
					}
				})
			}
		},
		"dom/action/merge/company.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target);
			if (!e.hasClass("disabled")) {
				var f = d.$element.find('[data-action="list/check"]').filter(":checked"),
				h = [],
				i = [];
				f.each(function () {
					var b = a(this).data("json");
					h.push(b.id),
					i.push(b.name)
				}),
				d.publish("modal/merge-company/show", {
					ids : h,
					onSuccess : function (b) {
						f.each(function () {
							var c = a(this);
							b !== c.data("json").id && c.closest('[data-woven*="' + g + '"]').remove()
						})
					}
				})
			}
		},
		getFolderName : function (a) {
			var b = "",
			c = [];
			return a.length && (a.forEach(function (a) {
					c.push(a.name)
				}), b = c.join(", ")),
			b
		}
	})
})