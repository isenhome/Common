define("app/widget/modal/add-floating/main", ["jquery", "troopjs-utils/deferred", "troopjs-utils/when", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate", "shared/helper/blurb"], function (a, b, c, d, e, f, g, h) {
	function i() {
		var a = this,
		b = a.$element.find(".btn.disabled");
		b.length && b.removeClass("disabled"),
		a.publish("editor/reset"),
		a._templateId = "",
		a.$receiver.tagit("removeAll"),
		a.$controlAttachment.addClass("hide").find("ul").html(""),
		a.$controlCc.addClass("hide").find("input").tagit("removeAll"),
		a.$controlBcc.addClass("hide").find("input").tagit("removeAll"),
		a.$sender.html("").addClass("hide").prev().removeClass("hide")
	}
	function j(a) {
		var c = this;
		b(function (a) {
			c.html(e, a)
		}).done(function () {
			k.call(c, a)
		})
	}
	function k(a) {
		var b = this,
		c = b.$element;
		b.$form = c.find("form"),
		b.$sender = c.find('[name="sender"]'),
		b.$receiver = c.find('[name="receiver"]'),
		b.$subject = c.find('[name="subject"]'),
		b.$controlAttachment = c.find(".control-attachment"),
		b.$content = c.find("textarea"),
		b.$individually = c.find('[name="individually"]'),
		b.$massGroup = c.find('[name="mass-group"]'),
		b.$controlCc = c.find(".control-cc"),
		b.$controlBcc = c.find(".control-bcc"),
		b.$cc = c.find('[name="cc"]'),
		b.$bcc = c.find('[name="bcc"]'),
		b.$names = c.find(".names"),
		g(b.$form, {
			rules : {
				receiver : {
					required : !0,
					emails : !0
				},
				subject : {
					required : !0
				}
			}
		}),
		a.resolve()
	}
	var l = {
		SEND_EMAIL : "/rest/floating/add",
		SIGNATURE : "/rest/data/userconfig/?user_id="
	},
	m = {
		email : h.t("Private email"),
		email1 : h.t("Work email"),
		email2 : h.t("Other")
	};
	return d.extend({
		"sig/initialize" : function (a, b) {
			j.call(this, b)
		},
		"hub/modal/add-floating/show" : function (a, b, c) {
			var d = this,
			e = d.$element;
			c ? d.publish("modal/register/cleanup") : (i.call(d), d._onSuccess = b.onSuccess, d._forceRefresh = !0, d._templateVariable = b.templateVariable || {}, d._sender = b.sender, d.$names.text(b.names.join(", ")), d._sender && (d._sender.forEach(function (a) {
						d.$sender.append('<option value="' + a.id + '">' + a.name + "</option>")
					}), d.$sender.removeClass("hide").val(d.userId), d.$sender.prev().addClass("hide")), d._attachment = b.attachment ? b.attachment : null, d._checkAttachment = b.checkAttachment ? b.checkAttachment : !1),
			e.modal({
				show : !0,
				backdrop : "static"
			})
		},
		"hub/email/template/switch" : function (a, b) {
			var c = this;
			c.$element.is(":hidden") || (c._templateId = b.id, c.$subject.val(b.title))
		},
		"hub/receive/floating-attachments" : function (a, b) {
			for (var c, d = this, e = "", f = 0, g = b.length; g > f; f++)
				c = b[f], d.$controlAttachment.find('[data-id="' + c.id + '"]').length || (e += '<li data-external="' + c.external_id + '" data-id="' + c.id + '">' + c.type + '<span class="file-type-icon ' + c.ext + '">' + c.name + '</span> <a href="#" data-action="attachment/remove"><span class="icon-remove-small"></span></a></li>');
			e.length && d.$controlAttachment.removeClass("hide").find("ul").append(e)
		},
		"dom/action.click.change" : a.noop,
		"dom/action/attachment/remove" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = window.confirm("确定要删除此附件吗？");
			e && a(c.target).closest("li").remove(),
			d.$controlAttachment.find("ul li").length || d.$controlAttachment.addClass("hide")
		},
		"dom/action/send.click" : function (c, d) {
			var e = this,
			g = a(d.target),
			h = e.$element;
			if (e.$form.valid()) {
				if (!e.$controlAttachment.find("li").length && !window.confirm("附件中还未选择人才的推荐报告！请点击“确定”继续发送给客户，或者点击“取消”返回选择附件。"))
					return !1;
				var i = function () {
					var b = [];
					return e._attachment.forEach(function (c) {
						var d = [];
						e.$controlAttachment.find('li[data-external="' + c.id + '"]').each(function () {
							d.push(a(this).data("id"))
						}),
						b.push({
							id : c.id,
							attachment_ids : d
						})
					}),
					b
				}
				(),
				j = {
					content : CKEDITOR.instances[e.$content.attr("name")].getData(),
					subject : e.$subject.val(),
					candidates : i,
					to : e.$receiver.val().replace(/\[.*\] /gi, ""),
					individually : e.$individually.is(":checked"),
					template_id : e._templateId,
					jobsubmission_id : e._jobsubmissionId,
					cc : e.$cc.val().replace(/\[.*\] /gi, ""),
					bcc : e.$bcc.val().replace(/\[.*\] /gi, "")
				};
				e._sender && (j.user_id = e.$sender.val()),
				e.publish("ajax", {
					url : l.SEND_EMAIL,
					data : {
						data : JSON.stringify(j)
					},
					type : "post",
					dataType : "json"
				}, b().done(function (a) {
						a.status ? (f.alert("success", "Floating邮件发送成功!"), e._onSuccess && e._onSuccess(a)) : f.alert("error", a.message)
					}), g),
				h.modal("hide")
			}
		},
		"dom/action/choose.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish("modal/unregister/cleanup"),
			c.$element.modal("hide"),
			c.publish("modal/floating-attachments/show", c._attachment, c._forceRefresh, "modal/add-floating/show"),
			c._forceRefresh = !1
		},
		"dom/action/switch/sender.change" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.val();
			d.publish("editor/change/userid", f)
		},
		"dom/action/dropdown.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".dropdown"),
			f = e.find(".dropdown-menu"),
			g = a(document);
			e.toggleClass("open"),
			g.on("click.filter.dropdown", function (b) {
				var c = a(b.target);
				c.closest(f).length || (e.removeClass("open"), g.off("click.filter.dropdown"))
			})
		},
		"dom/action/mass/add.click" : function (c, d) {
			d.preventDefault();
			var e = this,
			g = a(d.target),
			h = "/rest/candidate/list?<query>&paginate_by=200&type=contact",
			i = e.$massGroup.val(),
			j = g.closest(".dropdown");
			i && (j.removeClass("open"), e.publish("ajax", {
					url : h.replace("<query>", "folder_id=" + i)
				}, b().done(function (a) {
						var b,
						c,
						d = 0,
						g = a.list.length,
						h = [],
						i = e._emailType ? e._emailType[0] : "";
						for (d; g > d; d++)
							b = a.list[d], c = [b.englishName, b.chineseName].join(" ").trim(), (!e._emailType || e._emailType.length > 1) && (b.email ? i = "email" : b.email1 ? i = "email1" : b.email2 && (i = "email2")), b[i] ? e.$receiver.tagit("createTag", '"' + c + '" [' + m[i] + "] <" + b[i] + ">") : h.push('<a href="/candidate#detail!id=' + b.id + '" target="_blank">' + c + "</a>");
						h.length && (e._emailType.length > 1 ? f.alert("info", "以下人才没有任何邮箱:<br>" + h.join(", ")) : f.alert("info", "以下人才没有" + m[i] + "邮箱:<br>" + h.join(", ")))
					})))
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