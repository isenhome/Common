define("app/widget/security-center/user-activity/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "jquery.datatables.fixedheader"], function (a, b, c, d, e, f) {
	function g(b, d, e) {
		var f,
		g = this;
		f = '<a data-action="profile/open" href="/candidate#<id>"><name></a>',
		g.publish("ajax", {
			url : b
		}, c().done(function (b) {
				var c = a("<ul>");
				if (b.length)
					for (var g, h = b.length; h--; ) {
						var i = "";
						g = b[h],
						g.count > 1 && (i = " ×" + g.count),
						a("<li>").html(f.replace("<id>", g.id).replace("<name>", [g.englishName, g.chineseName].join(" "))).append(i).appendTo(c)
					}
				else
					a("<li>").text("没有明细!").appendTo(c);
				d.fnOpen(e, c, "detailCell")
			}))
	}
	function h(a) {
		var b = k.DETAIL.replace("<type>", a.type).replace("<id>", a.id),
		c = "&start=<start>&end=<end>";
		return a.start && a.end && (b += c.replace(/<start>/, a.start).replace(/<end>/, a.end)),
		b
	}
	function i(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function j(a) {
		var b = this;
		b.$table = b.$element.find("table").dataTable({
				bPaginate : !1,
				bAutoWidth : !1,
				sAjaxDataProp : "",
				aoColumns : l,
				sDom : "<'row'fi>t",
				fnInfoCallback : function (a, b, c, d, e) {
					return "总共: " + e + "条结果"
				},
				oLanguage : {
					sSearch : "搜索"
				}
			}),
		new f(b.$table, {
			offsetTop : 40
		}),
		a.resolve()
	}
	var k = {
		LOG : "/rest/report/operationlog",
		DETAIL : "/rest/report/operationlogdetail?type=<type>&user_id=<id>"
	},
	l = [{
			mData : null,
			mRender : function (a, b, c) {
				var d = '<a href="/user/preview#' + c.id + '" data-action="profile/open">' + c.name + "</a>";
				return d
			}
		}, {
			mData : "CandidateView",
			sType : "numeric",
			fnCreatedCell : function (b, c, d) {
				c > 0 && a(b).attr("data-action", "details/show(" + d.id + ', "CandidateView")').addClass("info")
			}
		}, {
			mData : "CandidateAttachmentView",
			sType : "numeric",
			fnCreatedCell : function (b, c, d) {
				c > 0 && a(b).attr("data-action", "details/show(" + d.id + ', "CandidateAttachmentView")').addClass("info")
			}
		}, {
			mData : "CandidateAttachmentDownload",
			bSortable : "numeric",
			fnCreatedCell : function (b, c, d) {
				c > 0 && a(b).attr("data-action", "details/show(" + d.id + ', "CandidateAttachmentDownload")').addClass("info")
			}
		}, {
			mData : "CandidateList",
			sType : "numeric"
		}
	],
	m = {
		start : null,
		end : null
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"sig/start" : function (a, b) {
			j.call(this, b)
		},
		"hub:memory/user-activity/set/filter" : function (b, d) {
			var e = this;
			a.extend(m, d),
			e.publish("ajax", {
				url : k.LOG,
				data : d,
				type : "get"
			}, c().done(function (a) {
					e.$table.fnClearTable(),
					e.$table.fnAddData(a),
					e.$table.fnDraw()
				}))
		},
		"dom/action.click" : a.noop,
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			f = d.attr("href");
			e.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/details/show.click" : function (b, c, d, e) {
			var f = this,
			i = a(c.target),
			j = i.closest("tr"),
			k = j[0],
			l = h(a.extend(m, {
						type : e,
						id : d
					}));
			f.$table.fnIsOpen(k) ? (f.$table.fnClose(k), j.data("detail") !== e ? (g.call(f, l, f.$table, k), j.data("detail", e), i.closest("td").addClass("selected").siblings().removeClass("selected")) : (j.data("detail", ""), i.removeClass("selected"))) : (g.call(f, l, f.$table, k), j.data("detail", e), i.addClass("selected").siblings().removeClass("selected"))
		}
	})
})