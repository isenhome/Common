define("app/widget/modal/send-email/main", ["jquery", "troopjs-utils/deferred", "troopjs-utils/when", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate", "app/widget/common/select2/main"], function (a, b, c, d, e, f, g) {
	function h() {
		var a = this,
		b = a.$element.find(".btn.disabled");
		b.length && b.removeClass("disabled"),
		a.publish("editor/reset"),
		a.$template.unweave(),
		a._templateId = "",
		a.$receiver.tagit("removeAll"),
		a.$controlCc.addClass("hide").find("input").tagit("removeAll"),
		a.$controlBcc.addClass("hide").find("input").tagit("removeAll"),
		a.$controlAttachment.addClass("hide").find("ul").html("")
	}
	function i() {
		var a = this;
		b(function (b) {
			a.html(e, b)
		}).done(function () {
			j.call(a)
		})
	}
	function j() {
		var a = this,
		b = a.$element;
		a.$form = b.find("form"),
		a.$receiver = b.find('[name="receiver"]'),
		a.$controlCc = b.find(".control-cc"),
		a.$controlBcc = b.find(".control-bcc"),
		a.$cc = b.find('[name="cc"]'),
		a.$bcc = b.find('[name="bcc"]'),
		a.$subject = b.find('[name="subject"]'),
		a.$controlAttachment = b.find(".control-attachment"),
		a.$content = b.find('[name="send-email-content"]'),
		a.$individually = b.find('[name="individually"]'),
		a.$kpiUser = b.find('[name="kpi-user"]'),
		a.$kpiControl = b.find(".kpi-user"),
		a.$template = b.find('[name="template"]'),
		g(a.$form, {
			rules : {
				receiver : {
					required : !0,
					emails : !0
				},
				cc : {
					emails : !0
				},
				bcc : {
					emails : !0
				},
				subject : {
					required : !0
				}
			}
		})
	}
	var k,
	l = {
		SEND_EMAIL : "/rest/mail/send",
		SIGNATURE : "/rest/data/userconfig/?user_id="
	},
	m = "shared/widget/common/select-template/main";
	return d.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			c.userId = b.user.id,
			c.username = b.user.englishName,
			i.call(c)
		},
		"hub/modal/sendemail/show" : function (b, c, d) {
			var e = this,
			f = e.$element;
			if (d)
				e.publish("modal/register/cleanup");
			else {
				h.call(e),
				e._to = c.emails,
				e._onSuccess = c.onSuccess,
				e._forceRefresh = !0,
				e._cvSendUrl = c.cvSendUrl,
				e._category = c.category || "",
				e._jobsubmissionId = c.jobsubmissionId,
				e._templateVariable = c.templateVariable || {},
				e._emailTemplate = c.emailTemplate,
				e._joborderId = c.joborderId,
				e._parseEmail = c.parseEmail,
				c.individually === k || c.individually ? e.$individually.prop("checked", !0) : e.$individually.prop("checked", !1),
				e._parseEmail || 1 === e._to.length && !a.isEmptyObject(e._templateVariable) ? e.$template.data("variable", e._templateVariable).attr("data-weave", m + '("' + e._emailTemplate + '"")').weave() : e.$template.attr("data-weave", m + '("' + e._emailTemplate + '"")').weave(),
				c.refreshPage && (e._refreshPage = c.refreshPage),
				e._attachment = c.attachment ? c.attachment : null,
				e._checkAttachment = c.checkAttachment ? c.checkAttachment : !1,
				c.sids && (e._sids = c.sids),
				"cv_sent" === e._emailTemplate ? e.$kpiControl.removeClass("hide") : e.$kpiControl.addClass("hide"),
				"cv_sent" === c.type && c.skipSend ? (e.$element.find(".skip").removeClass("hide"), c.sender && (e.$kpiUser.select2({
							data : c.sender
						}), e.$kpiUser.val(c.myId).trigger("change"))) : e.$element.find(".skip").addClass("hide");
				for (var g = 0, i = c.names.length; i > g; g++)
					e.$receiver.tagit("createTag", c.names[g] + " <" + c.emails[g] + ">")
			}
			f.modal({
				show : !0,
				backdrop : "static"
			})
		},
		"hub/email/template/switch" : function (a, b) {
			var c = this;
			c.$element.is(":hidden") || (c._templateId = b.id, c.$subject.val(b.title))
		},
		"hub/receive/attachments" : function (a, b) {
			for (var c = this, d = "", e = 0, f = b.length; f > e; e++)
				c.$controlAttachment.find('[data-id="' + b[e].id + '"]').length || (d += '<li data-id="' + b[e].id + '">' + b[e].type + '<span class="file-type-icon ' + b[e].ext + '">' + b[e].name + '</span> <a href="#" data-action="attachment/remove"><span class="icon-remove-small"></span></a></li>');
			d.length && c.$controlAttachment.removeClass("hide").find("ul").append(d)
		},
		"dom/action.click.change" : a.noop,
		"dom/action/attachment/remove" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = window.confirm("确定要删除此附件吗？");
			e && a(c.target).closest("li").remove(),
			d.$controlAttachment.find("ul li").length || d.$controlAttachment.addClass("hide")
		},
		"dom/action/send.click" : function (d, e) {
			var g = this,
			h = a(e.target),
			i = g.$element,
			j = [];
			if (g.$form.valid()) {
				var k = function () {
					var b = [];
					return g.$controlAttachment.find("li").each(function () {
						b.push(a(this).data("id"))
					}),
					b.join()
				}
				(),
				m = {
					cc : g.$cc.val().replace(/\[.*\] /gi, ""),
					bcc : g.$bcc.val().replace(/\[.*\] /gi, ""),
					content : CKEDITOR.instances[g.$content.attr("name")].getData(),
					subject : g.$subject.val(),
					attachment : k,
					to : g.$receiver.val().replace(/\[.*\] /gi, ""),
					individually : g.$individually.is(":checked"),
					category : g._category,
					template_id : g._templateId,
					jobsubmission_id : g._jobsubmissionId,
					joborder_id : g._joborderId
				};
				if (g._templateVariable)
					for (var n in g._templateVariable)
						m[n] = g._templateVariable[n];
				if (h.data("skip")) {
					if (!window.confirm("Are you really want to proceed without sending email ?"))
						return;
					m.skip = 1
				} else if (!k && g._checkAttachment && !window.confirm("附件中还未选择候选人的推荐报告！请点击“确定”继续发送给客户，或者点击“取消”返回选择附件。"))
					return;
				var o = b();
				if (j.push(o.promise()), g.publish("ajax", {
						url : l.SEND_EMAIL,
						data : {
							data : JSON.stringify(m)
						},
						type : "post",
						dataType : "json"
					}, o.done(function (a) {
							a.status ? (f.alert("success", "邮件发送成功!"), g._onSuccess && g._onSuccess(a)) : f.alert("error", a.message)
						}), h), g._cvSendUrl) {
					var p = b();
					j.push(p.promise()),
					g.publish("ajax", {
						url : g._cvSendUrl,
						data : {
							data : JSON.stringify({
								sids : g._sids,
								user_id : g.$kpiUser.val()
							})
						},
						type : "post"
					}, p.done(function (a) {
							var b = a;
							if (b.status) {
								if (f.alert("success", "邮件发送成功!"), g._onSuccess)
									for (var c in b.data)
										g._onSuccess({
											status : b.status,
											data : b.data[c]
										})
							} else
								f.alert("error", b.message)
						}), h)
				}
				c.apply(a, j).done(function () {
					g._refreshPage && window.setTimeout(function () {
						window.location.reload()
					}, 500)
				}),
				i.modal("hide")
			}
		},
		"dom/action/skip.click" : function () {
			var a = this,
			c = a.$element;
			window.confirm("Are you really want to proceed without sending email ?") && (a.publish("ajax", {
					url : a._cvSendUrl,
					data : {
						data : JSON.stringify({
							sids : a._sids,
							user_id : a.$kpiUser.val()
						})
					},
					type : "post"
				}, b().done(function (b) {
						b.status ? (a._onSuccess && a._onSuccess(), a._refreshPage && window.setTimeout(function () {
								window.location.reload()
							}, 500)) : f.alert("error", b.message)
					})), c.modal("hide"))
		},
		"dom/action/cc.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target),
			d.$controlCc.hasClass("hide") ? d.$controlCc.removeClass("hide") : d.$controlCc.addClass("hide").find("input").tagit("removeAll")
		},
		"dom/action/bcc.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target),
			d.$controlBcc.hasClass("hide") ? d.$controlBcc.removeClass("hide") : d.$controlBcc.addClass("hide").find("input").tagit("removeAll")
		},
		"dom/action/choose.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish("modal/unregister/cleanup"),
			c.$element.modal("hide"),
			c.publish("modal/attachments/show", c._attachment, c._forceRefresh, null, "modal/sendemail/show"),
			c._forceRefresh = !1
		},
		"dom/action/email/type.change" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.val(),
			g = f.split(",");
			this._emailType = g,
			d.$receiver.data("emailType", g),
			d.$cc.data("emailType", g),
			d.$bcc.data("emailType", g)
		}
	})
})