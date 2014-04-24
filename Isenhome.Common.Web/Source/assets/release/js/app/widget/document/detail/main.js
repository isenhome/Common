define("app/widget/document/detail/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./detail.html", "template!./list.html"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		c(function (b) {
			a.viewType ? a.html(f, a._json, b) : a.html(e, a._json, b)
		}).then(function () {
			h.call(a)
		})
	}
	function h() {
		var a = this,
		b = a.$element;
		a.$folderCount = b.find(".folder-count"),
		a.$listCheck = b.find('[data-action="list/check"]').data("json", a._json),
		b.find("a.image").popover({
			placement : "bottom",
			trigger : "hover",
			html : !0,
			content : '<img width="260" src="' + i.PREVIEW + a._json.uuidname + '">'
		})
	}
	var i = {
		DOWNLOAD : "/rest/file/download/<uuidname>",
		DELETE : "/rest/file/del",
		ADD_CANDIDATE : "/candidate#add!file=<file>",
		PREVIEW : "/rest/file/preview/"
	},
	j = /(jpg)|(gif)|(png)|(jpeg)|(bmp)/i;
	return b.extend(function (a, b, c, d) {
		var e = this;
		e._json = c,
		e.viewType = d
	}, {
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._context = b,
			c._allowDownload = "1" === b.config.attachment_allow_download,
			g.call(c)
		},
		"hub/list/check/all" : function () {
			var a = this;
			a.$listCheck.filter(":not(:disabled)").prop("checked", !0)
		},
		"hub/list/uncheck/all" : function () {
			var a = this;
			a.$listCheck.filter(":not(:disabled)").prop("checked", !1)
		},
		"dom/action.click" : a.noop,
		"dom/action/list/check.click" : function () {
			var a = this;
			a.publish("toggle/mass/action")
		},
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var e = a(c.target),
			f = e.attr("href");
			d.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/show/document.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target),
			d.publish("slide-helper/attachment/reload", d._json.uuidname, null, d._json.ext)
		},
		"dom/action/add/to/folder.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = [];
			d._json.islimited || d._isAdmin || (function () {
				d._json.folders.forEach(function (a) {
					f.push(a.id)
				})
			}
				(), d.publish("modal/add-to-folder/show", {
					ids : [d._json.id],
					type : "document",
					folders : f,
					multiSelect : !0,
					onSuccess : function (a) {
						d._json.folders = a,
						d.$folderCount.text(a.length),
						e.find(".muted").text(d.getFolderName(a))
					}
				}))
		},
		"dom/action/attachment/download.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			window.open(i.DOWNLOAD.replace("<uuidname>", c._json.uuidname), "target=_blank")
		},
		"dom/action/attachment/delete.click" : function (b, e) {
			e.preventDefault();
			var f = this,
			g = a(e.target),
			h = window.confirm("你确认要删除文件吗？");
			h && f.publish("ajax", {
				url : i.DELETE,
				type : "post",
				data : {
					data : JSON.stringify({
						uuidnames : [f._json.uuidname]
					})
				}
			}, c().done(function () {
					d.alert("success", "Delete attachment successfully!"),
					g.closest("li").remove(),
					f.$count.text(parseInt(f.$count.text(), 10) - 1)
				}))
		},
		"dom/action/import/to/system.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target),
			window.open(i.ADD_CANDIDATE.replace("<file>", d._json.uuidname), "_blank")
		},
		_getType : function (a) {
			var b = "";
			return j.test(a) && (b = "image"),
			b
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