define("app/widget/common/attachment-view/resume", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./resume.html", "template!./item.html", "shared/helper/utils", "bootstrap.editable"], function (a, b, c, d, e, f) {
	function g(b) {
		var d = this;
		d.publish("ajax", {
			url : j.FILE_LIST.replace("<type>", d._type).replace("<id>", d._id)
		}, c().done(function (c) {
				c.length && d.$list.removeClass("hide");
				var f = a(e({
							list : c,
							allowDownload : d._allowDownload,
							userId : d._userId
						}));
				f.find("[data-weave]").each(function () {
					a(this).weave()
				}),
				d.$list.html(f),
				b && b(),
				f.find("i.label").on("shown", function () {
					a(this).closest("li").addClass("editing")
				}).on("hidden", function () {
					a(this).closest("li").removeClass("editing")
				})
			}))
	}
	function h(a) {
		var b = this;
		c(function (a) {
			b.html(d, b._json, a)
		}).then(function () {
			i.call(b, a)
		})
	}
	function i(b) {
		var c = this;
		return g.call(c),
		c._readOnly ? (c.$element.find(".dropdown-menu").addClass("read-only"), void 0) : (c.$element.find(".upload-file").data("json", {
				multiple : !0,
				data : {
					type : c._type,
					external_id : c._id
				},
				beforeSubmit : function (a, b, d) {
					var e = JSON.parse(d.data.data);
					e.tag = b.find('[name="tag"]').val(),
					d.data.data = JSON.stringify(e),
					c.$element.find(".upload-file").prev().addClass("hide")
				},
				success : function (a) {
					a.status ? (f.alert("success", "Upload file successfully!"), g.call(c, function () {
							c.$count.text(parseInt(c.$count.text(), 10) + 1)
						})) : f.alert("error", "Upload file error!"),
					c.$element.find(".upload-file").prev().removeClass("hide")
				}
			}).attr("data-weave", "shared/widget/common/upload/main(json)").weave(), c.$element.editable({
				selector : "i.label",
				mode : "inline",
				emptytext : "未知",
				source : j.CATEGORY.replace("<type>", k[c._type]),
				sourceCache : !0,
				url : j.EDIT_CATE,
				params : function (a) {
					return a.id = a.pk,
					a.tag = a.value,
					delete a.value,
					delete a.pk,
					delete a.name, {
						data : JSON.stringify(a)
					}
				},
				success : function (b) {
					a(this).css("background-color", b.data.tag.color).text(b.data.tag.value)
				},
				error : function (a) {
					var b = JSON.parse(a.responseText);
					f.alert("error", b.message)
				}
			}), a(document).on("click.resume", function (b) {
				a(b.target).closest(c.$element).length || (c.$element.remove(), a(document).off(b))
			}), b.resolve(), void 0)
	}
	var j = {
		FILE_LIST : "/rest/file/list/<type>/<id>",
		PREVIEW : "/rest/file/preview/",
		DOWNLOAD : "/rest/file/download/<uuidname>",
		DELETE : "/rest/file/del",
		CATEGORY : "/rest/data/options?type=<type>",
		EDIT_CATE : "/rest/file/edit"
	},
	k = {
		candidate : "candidate_attachment_category",
		clientcompany : "client_attachment_category",
		joborder : "joborder_attachment_category"
	};
	return b.extend(function (b) {
		var c = a(b),
		d = this;
		d._type = c.data("type"),
		d._id = c.data("id"),
		d._readOnly = c.data("readOnly"),
		d._allowDownload = c.data("allowDownload"),
		d._userId = c.data("userId"),
		d.$count = c.data("$count"),
		d._paste = c.data("paste")
	}, {
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"sig/start" : function (a, b) {
			this.$list = this.$element.find(".nav-stack"),
			b.resolve()
		},
		"sig/stop" : function (b, c) {
			a(document).off("click.resume"),
			c.resolve()
		},
		"dom/action.click" : a.noop,
		"dom/action/preview.click" : function (b, c, d, e) {
			c.preventDefault();
			var f = this,
			g = a(c.target);
			g.closest(".dropdown").removeClass("open"),
			f.$element.remove(),
			f.publish("slide-helper/attachment/reload", d, null, e)
		},
		"dom/action/attachment/delete.click" : function (b, d, e) {
			d.preventDefault();
			var g = this,
			h = a(d.target),
			i = window.confirm("你确认要删除文件吗？");
			i && g.publish("ajax", {
				url : j.DELETE,
				type : "post",
				data : {
					data : JSON.stringify({
						uuidnames : [e]
					})
				}
			}, c().done(function () {
					f.alert("success", "Delete attachment successfully!"),
					h.closest("li").remove(),
					g.$count.text(parseInt(g.$count.text(), 10) - 1)
				}))
		},
		"dom/action/attachment/profile/open.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.attr("href");
			f.window({
				url : e,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/attachment/download.click" : function (a, b, c) {
			b.preventDefault(),
			window.open(j.DOWNLOAD.replace("<uuidname>", c), "target=_blank")
		},
		"dom/action/show/paste/modal.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish("modal/paste-resume/show", {
				external_id : c._id,
				onSuccess : function () {
					g.call(c, function () {
						c.$count.text(parseInt(c.$count.text(), 10) + 1)
					})
				}
			})
		}
	})
})