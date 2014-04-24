define("app/widget/job/add/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "template!app/widget/common/company-suggestion/main.html", "template!./attachment.html", "shared/helper/utils", "shared/helper/validate", "shared/helper/blurb", "jquery.ui", "app/widget/common/select2/main", "bootstrap.editable"], function (a, b, c, d, e, f, g, h, i) {
	function j(a) {
		for (var b = this, c = a.split(","), d = c.length; d--; )
			b.$tags.tagit("createTag", c[d])
	}
	function k() {
		for (var b, c = this, d = [], e = !1, f = 0; f < c._json.users.length; f += 1)
			b = c._json.users[f], "BD" === b.type && a("#bd").attr("data-weave", "shared/widget/common/user-list/main(" + b.user.id + ")").weave(), "Main Consultant" === b.type && (e = !0, a("#consultant").attr("data-weave", "shared/widget/common/user-list/main(" + b.user.id + ")").weave()), ("Researcher" === b.type || "Consultant" === b.type) && d.push(b);
		e || a("#consultant").attr("data-weave", "shared/widget/common/user-list/main").weave(),
		c.$element.find(".control-consultant").data("json", d).attr("data-weave", "app/widget/common/add-consultant/main(json)").weave()
	}
	function l() {
		var b = this;
		b.$btnFile.data("json", {
			multiple : !0,
			data : {
				type : "joborder"
			},
			beforeSubmit : function (a, c, d) {
				this.$controls = b.$btnFile.closest(".controls"),
				this.$controls.addClass("text_line");
				var e = JSON.parse(d.data.data);
				e.tag = c.find('[name="tag"]').val(),
				d.data.data = JSON.stringify(e)
			},
			success : function (c) {
				this.$controls.removeClass("text_line"),
				c.status ? c.data.forEach(function (d, e) {
					var g = a(f(c.data));
					b.$attachmentList.append(g),
					b.$attachmentList.closest(".controls").removeClass("hide"),
					g.find("[data-weave]").weave(),
					0 === e && d.tags && j.call(b, d.tags),
					b._attachments.push(d.id)
				}) : g.alert("error", "Upload file error!")
			},
			error : function () {
				this.$controls.removeClass("text_line")
			}
		}).attr("data-weave", "shared/widget/common/upload/main(json)").weave()
	}
	function m() {
		var a = this;
		a.editMode !== q && a.userId !== q && a.publish("ajax", {
			url : r.EXTRA_FIELDS
		}, c().done(function (b) {
				a.extraFields = JSON.parse(b[0].value),
				a._jobId ? (a.editMode = !0, n.call(a)) : o.call(a)
			}))
	}
	function n() {
		var a = this;
		a.publish("ajax", {
			url : r.JOBORDER + a._jobId
		}, c().done(function (b) {
				a._json = b,
				o.call(a)
			}))
	}
	function o() {
		var a = this;
		c(function (b) {
			a.html(d, a._json, b)
		}).done(function () {
			p.call(a)
		})
	}
	function p() {
		var b,
		d = this;
		d.$form = d.$element.find("form").eq(1),
		d.$invoiceTitle = d.$form.find("#invoice-title"),
		d.$feeStructure = d.$form.find("#fee-structure"),
		d.$probation = d.$form.find("#probation"),
		d.$contact = d.$form.find("#contact"),
		d.$company = d.$form.find("#company"),
		d.$tags = d.$element.find("#tags"),
		d.$btnFile = d.$element.find(".upload-file"),
		d.$priority = d.$element.find('[name="priority"]'),
		d.$jobStatus = d.$element.find('[name="jobStatus"]'),
		d.cityWidget = d.$element.find('[data-name="city"]').woven()[0],
		d.$attachmentList = d.$element.find(".attachment-list"),
		l.call(d),
		d.$company.select2({
			placeholder : i.t("Please select"),
			minimumInputLength : 1,
			ajax : {
				url : r.CLIENT.replace("<id>", d.userId),
				dataType : "json",
				quietMillis : 100,
				data : function (a, b) {
					return {
						company_name : a,
						page : b
					}
				},
				results : function (a) {
					var b = a.current < a.pages;
					return {
						results : a.list,
						more : b
					}
				}
			},
			initSelection : function (b, c) {
				var e = a(b).val();
				"" !== e && a.ajax(r.CLIENT.replace("<id>", d.userId), {
					data : {
						id : e
					},
					dataType : "json"
				}).done(function (a) {
					a.list.length && c(a.list[0])
				})
			},
			formatResult : function (a) {
				return a.ctype = t[a.type],
				e(a)
			},
			formatSelection : function (a, b) {
				b.text(a.name)
			},
			escapeMarkup : function (a) {
				return a
			}
		}),
		h(d.$form, {
			rules : {
				jobName : {
					required : !0
				},
				company : {
					required : !0
				},
				contact : {
					required : !0
				},
				"function" : {
					required : !0
				},
				city : {
					required : !0
				},
				BD : {
					required : !0
				},
				"Main Consultant" : {
					required : !0
				},
				totalCount : {
					required : !0,
					number : !0
				},
				priority : {
					required : !0
				}
			}
		}),
		d.editMode ? (k.call(d), b = d._json.tags, d.$jobStatus.val(d._json.jobStatus), d.$priority.val(d._json.priority), d.$element.find(".control-group-contacts").data("json", d._json.contacts).attr("data-weave", s + "(" + d.userId + ", json )").weave(), d.publish("ajax", {
				url : r.GET_ATTACHMENTS.replace("<id>", d._jobId)
			}, c().done(function (b) {
					var c = a(f(b));
					d.$attachmentList.append(c),
					c.find("[data-weave]").weave(),
					d.$attachmentList.closest(".controls").removeClass("hide")
				}))) : (d.$element.find(".control-group-contacts").attr("data-weave", s + "(" + d.userId + ")").weave(), d.$element.find(".control-consultant").attr("data-weave", "app/widget/common/add-consultant/main").weave(), a("#bd").attr("data-weave", "shared/widget/common/user-list/main").weave(), a("#consultant").attr("data-weave", "shared/widget/common/user-list/main").weave()),
		d.$element.editable({
			selector : "span.label",
			mode : "inline",
			emptytext : "未知",
			source : r.CATEGORY,
			sourceCache : !0,
			url : r.EDIT_CATE,
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
				g.alert("error", b.message)
			}
		}),
		g.widgetLoaded.call(d)
	}
	var q,
	r = {
		FN : "/rest/data/function/list",
		CLIENT : "/rest/client/list?paginate_by=10&user_id=<id>&allow_new_job=1",
		CLIENT_DETAIL : "/rest/client/<id>",
		ADD : "/rest/joborder/add",
		UPLOAD : "/rest/file/upload",
		JOBORDER : "/rest/joborder/",
		EXTRA_FIELDS : "/rest/data/configvalue?keys=joborder_field_names",
		CATEGORY : "/rest/data/options?type=joborder_attachment_category",
		EDIT_CATE : "/rest/file/edit",
		GET_ATTACHMENTS : "/rest/file/list/joborder/<id>"
	},
	s = "app/widget/job/add/contacts",
	t = {
		ADD_CONTACT : i.t("Please add a contact for this company"),
		client : i.t("client company"),
		bding : i.t("bding company"),
		normal : "",
		generated : ""
	};
	return b.extend(function () {
		this._attachments = []
	}, {
		extFields : ["ext1", "ext2", "ext3", "ext4", "ext5", "ext6"],
		"sig/stop" : function (a, b) {
			this.$company.select2("destroy"),
			b.resolve()
		},
		"hub:memory/add/id/change" : function (a, b) {
			var c = this;
			c._jobId = b,
			c.editMode = c._jobId !== q ? !0 : !1,
			m.call(c)
		},
		"hub:memory/context" : function (a, b) {
			this.userId = b.user.id,
			m.call(this)
		},
		"dom/action.click.change" : a.noop,
		"dom/action/attachment/preview.click" : function (a, b, c) {
			b.preventDefault();
			var d = this;
			d.publish("slide-helper/attachment/reload", c)
		},
		"dom/action/reset.click" : function () {
			var b = this;
			b.$element.find(".tagItem").remove(),
			a("#contact").html("")
		},
		"dom/action/company.change" : function (b, d) {
			var e = this,
			f = a(d.target);
			e.publish("ajax", {
				url : r.CLIENT_DETAIL.replace("<id>", f.val())
			}, c().done(function (a) {
					a.city && e.cityWidget.selectById(a.city.id)
				}))
		},
		"dom/action/add.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			f = a(d.target);
			if (!e.$form.valid())
				return !1;
			var h = function () {
				var b = [];
				return e.$element.find('[name="contact"]').each(function () {
					var c = a(this).val();
					c && b.push(c)
				}),
				b
			}
			(),
			i = a('[name="city"]').val(),
			j = a("#jobName").val().trim(),
			k = a('[name="function"]').val(),
			l = a("#company").val();
			a("#contact").val();
			var m = function () {
				var b = [];
				return e.$element.find("select.user").each(function () {
					var c = a(this);
					b.push({
						type : c.attr("name"),
						user_id : c.val()
					})
				}),
				b
			}
			(),
			n = a("#totalCount").val().trim(),
			o = a("#jobStatus").val(),
			p = function () {
				var b = [];
				return e.$element.find(".attachment-item").each(function () {
					b.push(a(this).data("id"))
				}),
				b.join(",")
			}
			(),
			q = {
				city : i,
				jobTitle : j,
				"function" : k,
				client : {
					id : l
				},
				contacts : h,
				users : m,
				tags : e.$tags.val(),
				totalCount : n,
				jobStatus : o,
				attachments : p,
				priority : e.$priority.val(),
				ext1 : e.$element.find('[name="ext1"]').val(),
				ext2 : e.$element.find('[name="ext2"]').val(),
				ext3 : e.$element.find('[name="ext3"]').val(),
				ext4 : e.$element.find('[name="ext4"]').val(),
				ext5 : e.$element.find('[name="ext5"]').val(),
				ext6 : e.$element.find('[name="ext6"]').val()
			};
			e.editMode && (q.id = this._jobId),
			e.publish("ajax", {
				url : r.ADD,
				data : {
					data : JSON.stringify(q)
				},
				type : "post"
			}, c().done(function (a) {
					a.status ? e.editMode ? (g.alert("success", "编辑项目成功!"), window.location.hash = "detail!id=" + e._json.id) : (g.alert("success", "新增项目成功!"), window.location.hash = "list") : g.alert("error", a.message)
				}), f)
		},
		"dom/action/remove/attachment.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = window.confirm("确定要删除此附件吗?");
			e && (1 === d.closest(".controls").find("li").length && d.closest(".controls").addClass("hide"), d.closest("li").remove())
		}
	})
})