define("shared/widget/side-bar/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a, b) {
		function c(a, e) {
			b && e && b(e),
			d.unsubscribe(j, c)
		}
		var d = this;
		d.subscribe(j, c),
		d.publish("make/route", {
			filter : a,
			page : 1
		})
	}
	function g(a) {
		var b = this;
		c(function (a) {
			b.html(d, b._json, a)
		}).done(function () {
			h.call(b, a)
		})
	}
	function h(a) {
		var b = this,
		c = b._type;
		switch (c) {
		case "profile":
		case "admin":
		case "extension":
		case "security":
		case "security":
			b.$element.find(".sidebar_inner").attr("data-weave", 'shared/widget/side-bar/admin/main("' + c + '")').weave();
			break;
		case "linkedin":
		case "linkedin_company":
			b.$element.find(".sidebar_inner").attr("data-weave", 'shared/widget/gllue/sidebar/main("' + c + '")').weave();
			break;
		default:
			b.$element.find(".sidebar_inner").attr("data-weave", 'shared/widget/side-bar/saved-filter/main("' + c + '")').weave()
		}
		a.resolve()
	}
	var i = {
		QUERY_FILTER : "/rest/data/queryfilter/<type>",
		DELETE_FILTER : "/rest/data/queryfilter/<type>/del",
		FOLDER_LIST : "/rest/folder/list?type=<type>",
		DELETE_FOLDER : "/rest/folder/delete",
		REORDER : "/rest/data/reorder",
		LISTVIEW : "/rest/user/listview"
	},
	j = "filter/get/count",
	k = "root/update/sidebar";
	return b.extend(function (a, b, c) {
		var d = this;
		d._type = c
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			var c = this;
			c.publish("root/register/sidebar"),
			b.resolve()
		},
		"dom/action.click" : a.noop,
		"dom/action/nav/header.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target);
			d.closest(".nav-list").toggleClass("nav-hidden")
		},
		"dom/action/filter.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			g = e.attr("data-href");
			a(window).width() < 980 && d.$element.find(".sidebar_switch").trigger("click"),
			d.$element.find("li").removeClass("hover"),
			e.closest("li").addClass("hover"),
			f.call(d, g, function (a) {
				e.find(".pull-right").text(a)
			})
		},
		"dom/action/filter/delete.click" : function (b, d) {
			var f = this,
			g = a(d.target),
			h = window.confirm("确认删除此订阅搜索吗?"),
			j = {
				id : g.attr("data-id")
			};
			h && f.publish("ajax", {
				url : i.DELETE_FILTER.replace("<type>", f._type),
				type : "post",
				data : {
					data : JSON.stringify(j)
				}
			}, c().done(function (a) {
					a.status ? (e.alert("success", "订阅搜索删除成功!"), g.closest("li").remove(), f.publish(k)) : e.alert("error", "Delete filter error: " + a.data || a.message)
				}))
		},
		"dom/action/folder/delete.click" : function (b, d) {
			var f = this,
			g = a(d.target),
			h = g.data("id"),
			j = window.confirm("确认删除此文件夹吗?");
			j && f.publish("ajax", {
				url : i.DELETE_FOLDER,
				data : {
					data : JSON.stringify({
						id : h
					})
				},
				type : "post"
			}, c().done(function (a) {
					a.status ? (e.alert("success", "文件夹删除成功!"), g.closest("li").remove()) : e.alert("error", a.message)
				}))
		},
		"dom/action/edit/folder.click" : function (a, b) {
			b.preventDefault(),
			b.stopPropagation();
			var c = this;
			c.publish("modal/add-to-folder/show", "edit")
		}
	})
})