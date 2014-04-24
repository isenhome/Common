define("app/widget/security-center/login-log/main", ["jquery", "shared/widget/list/base", "shared/services/route", "template!./main.html", "troopjs-utils/deferred", "shared/helper/utils", "jquery.datatables.fixedheader"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.html(d, a)
	}
	function h(b) {
		var c = this;
		c.$table = c.$element.find("table").dataTable({
				bPaginate : !1,
				bAutoWidth : !1,
				sAjaxDataProp : "list",
				aoColumns : j,
				sDom : "<row'i>t",
				fnInfoCallback : function (a, b, c, d, e) {
					return "总共: " + e + "条结果"
				},
				oLanguage : {
					sProcessing : "<div class='widget-spin'></div>",
					sLoadingRecords : "<div class='widget-spin'></div>"
				},
				fnServerData : function (b, c, d, e) {
					e.jqXHR = a.ajax({
							dataType : "json",
							type : "POST",
							url : b,
							data : c,
							cache : !0,
							success : function (a) {
								d(a)
							}
						})
				}
			}),
		c.$table.fnSort([[0, "desc"]]),
		b.resolve()
	}
	var i = {
		LOG : "/rest/loginlog/list?"
	},
	j = [{
			mData : "dateAdded"
		}, {
			mData : null,
			mRender : function (a, b, c) {
				var d,
				e = c.user;
				return d = e ? '<a href="/user/preview#' + e.id + '" data-action="profile/open">' + [e.englishName, e.chineseName].join(" ") + "</a>" : c.email
			}
		}, {
			mData : "ip"
		}, {
			mData : "location"
		}, {
			mData : "browser.ua_family",
			mRender : function (a) {
				return a ? a.replace(/.*(ucbrowser).*/gi, "$1") : "N/A"
			}
		}, {
			mData : "success",
			mRender : function (a) {
				var b;
				return b = a ? '<span class="label label-success">成功</span>' : '<span class="label label-important">失败</span>'
			}
		}
	];
	return b.extend(function () {
		c().start(),
		this._url = i.LOG
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		renderList : function (a) {
			var b = this;
			b.$table.fnClearTable(),
			b.$table.fnAddData(b._json.list),
			b.$table.fnDraw(),
			a.resolve()
		},
		"hub:memory/route" : function (a, b) {
			var c = this;
			c.publish("service/route", b)
		},
		"dom/action.click" : a.noop,
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.attr("href");
			f.window({
				url : e,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/setting.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish("modal/login-alert/show")
		}
	})
})