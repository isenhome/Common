define("app/widget/plugins/import-resume/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "template!./attachment.html", "shared/helper/utils", "jquery.datatables.fixedheader"], function (a, b, c, d, e, f) {
	function g(b) {
		var c = this,
		d = window.confirm("确定要删除所选择的数据吗？"),
		e = [];
		d && (b.forEach(function (a) {
				a.filelist && a.filelist.forEach(function (a) {
					e.push(a.filename)
				})
			}), a.ajax({
				url : m.DELETE,
				data : {
					data : JSON.stringify({
						filelist : e
					})
				},
				type : "POST"
			}).done(function (a) {
				a.status ? (c.publish("plugins/import-resume/update/source"), f.alert("success", "删除" + b.length + "条数据成功!")) : f.alert("error", a.data)
			}).fail(function (a, b) {
				f.alert("error", b)
			}))
	}
	function h() {
		var a = this;
		a.publish("ajax", {
			url : m.CHECK
		}, c().done(function (b) {
				b.total ? (a.$element.find(".upload-form p.text-error").removeClass("hide"), a.$btnFile.addClass("disabled"), a.$element.find(".check-progress").text(b.left.toFixed(2)), setTimeout(function () {
						h.call(a)
					}, 500)) : (a.$btnFile.removeClass("disabled"), a.$element.find(".upload-form p.text-error").addClass("hide"))
			}))
	}
	function i() {
		var a = this;
		a.publish("plugins/import-resume/toggle/bacthadd", a.$element.find('[name="resume-checkbox"]:checked'))
	}
	function j(a) {
		var b = this;
		b.html(d, a)
	}
	function k(a) {
		var b = this;
		b.$btnFile = b.$element.find(".btn-file"),
		b.oTable = b.$element.find("table").dataTable({
				bPaginate : !1,
				bAutoWidth : !1,
				sAjaxDataProp : "",
				aoColumns : p,
				sDom : "<'row'fi<'dt_actions'>>t",
				fnInfoCallback : function (a, b, c, d, e) {
					return "总共: " + e + "条结果"
				},
				oLanguage : {
					sSearch : "搜索"
				}
			}),
		b.$element.find(".dt_actions").attr("data-weave", n).weave(),
		b.$btnFile.data("json", {
			type : null,
			url : m.UPLOAD,
			beforeSubmit : function () {
				b.publish("plugins/import-resume/modal/upload/show")
			},
			uploadProgress : function (a, c, d, e) {
				b.publish("plugins/import-resume/modal/upload/upload-progress", e)
			},
			success : function (a) {
				a.status ? b.publish("plugins/import-resume/modal/upload/check") : (f.alert("error", a.data), b.publish("plugins/import-resume/modal/upload/close"))
			},
			validate : function (a) {
				return o.test(a.name) ? a.size > 4e7 ? (f.alert("error", "压缩文件不超过40MB!"), !1) : !0 : (f.alert("error", "请以zip压缩包格式后上传！"), !1)
			}
		}).attr("data-weave", "shared/widget/common/upload/main(json, validate)").weave(c().done(function () {
				h.call(b)
			})),
		a.resolve()
	}
	var l,
	m = {
		UPLOAD : "/rest/importer/upload",
		CHECK : "/rest/importer/check",
		LIST : "/rest/importer/list",
		DELETE : "/rest/importer/delete",
		PREVIEW : "/rest/importer/preview?f="
	},
	n = "app/widget/plugins/import-resume/table-action",
	o = /\.zip$/,
	p = [{
			mData : null,
			bSortable : !1,
			mRender : function (a, b, c) {
				var d = '<input type="checkbox" data-existed="' + (c.candidate_id ? "true" : "false") + '" data-action="select/one" name="resume-checkbox" value="' + c.index + '">';
				return d
			}
		}, {
			mData : "filename",
			bSortable : !1,
			mRender : function (b, c, d) {
				var f = "";
				if (d.filelist) {
					var g = a(e(d.filelist));
					g.find("[data-weave]").weave(),
					f = g[0].outerHTML
				}
				return f
			}
		}, {
			mData : null,
			sType : "string",
			mRender : function (a, b, c) {
				return c.englishName + (c.englishName ? "<br>" : "") + c.chineseName
			}
		}, {
			mData : "gender",
			sType : "string",
			mRender : function (a) {
				var b;
				return b = a ? "男" : "女"
			}
		}, {
			mData : "dateOfBirth",
			sType : "date"
		}, {
			mData : "city",
			sType : "string"
		}, {
			mData : "mobile",
			sType : "numeric"
		}, {
			mData : "email",
			sType : "string"
		}, {
			mData : "company",
			sType : "string"
		}, {
			mData : "title",
			sType : "string"
		}, {
			mData : "filetime",
			sType : "date",
			mRender : function (a) {
				return a.replace(/T.*$/, "")
			}
		}, {
			mData : "candidate_id",
			sType : "string",
			mRender : function (a) {
				var b;
				return b = a ? '<span class="label">已存在</span>' : '<span class="label label-info">可导入</span>'
			}
		}
	],
	q = m.LIST,
	r = "",
	s = "",
	t = "";
	return b.extend({
		"sig/initialize" : function (a, b) {
			j.call(this, b)
		},
		"sig/start" : function (a, b) {
			k.call(this, b)
		},
		"hub/plugins/import-resume/collect/selected" : function (b, c) {
			var d = this,
			e = [],
			h = d.oTable.fnGetData();
			if (d.oTable.find("tbody :checked").each(function (a, b) {
					e.push(parseInt(b.value, 10))
				}), h = a.grep(h, function (a) {
						return e.indexOf(a.index) > -1
					}), "import" === c) {
				if (!h.length)
					return f.alert("error", "请先选择要导入的数据！"), void 0;
				d.publish("plugins/modal/batch-add/show", h)
			} else if ("delete" === c) {
				if (!h.length)
					return f.alert("error", "请先选择要删除的数据！"), void 0;
				g.call(d, h)
			}
		},
		"hub/plugins/import-resume/update/source" : function (a, b) {
			var d = this;
			b !== l && (t = b, q = m.LIST + "?" + t + r + s),
			d.publish("ajax", {
				url : q
			}, c().done(function (a) {
					d.oTable.fnClearTable(),
					d.oTable.fnAddData(a),
					d.oTable.fnDraw()
				}))
		},
		"hub:momery/plugins/import-resume/initial/load" : function (a, b) {
			var c = this;
			b.required && (s = "&required=" + b.required),
			c.publish("plugins/import-resume/update/source", s)
		},
		"hub/plugins/import-resume/change/zip" : function (a, b) {
			var c = this;
			r = b ? "&dirname=" + b : "",
			q = m.LIST + "?" + (t ? t : "") + (r ? r : "") + (s ? s : ""),
			c.publish("plugins/import-resume/update/source")
		},
		"hub/plugins/import-resume/change/required" : function (a, b) {
			var c = this;
			s = b ? "&required=" + b : "",
			q = m.LIST + "?" + (t ? t : "") + (r ? r : "") + (s ? s : ""),
			c.publish("plugins/import-resume/update/source")
		},
		"dom/action.click" : a.noop,
		"dom/action/select/one.click" : function (b, c) {
			var d = this,
			e = a(c.target);
			e.is(":checked") ? e.closest("tr").addClass("rowChecked") : e.closest("tr").removeClass("rowChecked"),
			i.call(d)
		},
		"dom/action/select/all.click" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.prop("checked"),
			g = d.oTable.find(":checkbox").not(":disabled").prop("checked", f);
			f ? g.closest("tr").addClass("rowChecked") : g.closest("tr").removeClass("rowChecked"),
			i.call(d)
		},
		"dom/action/show/attachments" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".dropdown");
			e.hasClass("open") ? e.removeClass("open") : (e.addClass("open"), a(document).on("click.resume.dropdown", function (b) {
					a(b).closest(e).length || (e.removeClass("open"), a(document).off("click.resume.dropdown"))
				}))
		},
		"dom/action/resume/preview.click" : function (a, b, c) {
			b.preventDefault();
			var d = this,
			e = window.encodeURIComponent(c);
			d.publish("slide-helper/attachment/reload", e, "importer")
		}
	})
})