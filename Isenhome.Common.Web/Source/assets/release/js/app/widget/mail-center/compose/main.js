define("app/widget/mail-center/compose/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils", "shared/helper/validate", "shared/helper/blurb"], function (a, b, c, d, e, f, g, h) {
	function i(b, d, e) {
		var g = this,
		h = {},
		i = a(e.target);
		if (g.$form.valid() && !i.hasClass("disabled")) {
			var j = function () {
				var b = [];
				return g.$attachmentGroup.find("li").each(function () {
					b.push(a(this).data("id"))
				}),
				b.join()
			}
			();
			h = {
				cc : g.$cc.val().replace(/\[.*\]/, ""),
				bcc : g.$bcc.val().replace(/\[.*\]/, ""),
				subject : g.$subject.val(),
				content : CKEDITOR.instances["email-content"].getData(),
				to : g.$to.val().replace(/\[.*\]/, ""),
				individually : g.$individually.is(":checked"),
				attachment : j,
				category : "",
				template_id : g._templateId
			},
			g.draftId && (h.draft_id = g.draftId),
			i.addClass("disabled"),
			g.publish("ajax", {
				url : b,
				data : {
					data : JSON.stringify(h)
				},
				type : "post",
				dataType : "json"
			}, c().done(function (a) {
					a.status ? (d && d(a), g.publish(p)) : f.alert("error", a.message)
				}).always(function () {
					i.removeClass("disabled")
				}))
		}
	}
	function j() {
		var b = this;
		b._json.username && b.draftId !== l && (b.draftId ? b.publish("ajax", {
				url : m.VIEW.replace("<id>", b.draftId)
			}, c().done(function (d) {
					b._json = a.extend(!0, b._json, d),
					c(function (a) {
						b.html(e, b._json, a)
					}).done(function () {
						k.call(b)
					})
				})) : c(function (a) {
				b._json = {
					username : b._json.username
				},
				b.html(e, b._json, a)
			}).done(function () {
				k.call(b)
			}))
	}
	function k() {
		var a = this,
		b = a.$element;
		if (a.$content = b.find("textarea"), a.$to = b.find("#to"), a.$cc = b.find("#cc"), a.$bcc = b.find("#bcc"), a.$subject = b.find("#subject"), a.$controlCc = b.find(".control-cc"), a.$controlBcc = b.find(".control-bcc"), a.$individually = b.find('[name="individually"]'), a.$massGroup = b.find('[name="mass-group"]'), a.$count = b.find(".text-count"), a.$form = b.find("form"), a.$attachmentGroup = b.find(".attachment-group"), a.massGroupWidget = b.find('[data-name="mass-group"]').woven()[0], a.$preview = b.find('[name="preview"]'), a.$subjuctView = b.find(".subjuct-view"), a.$contentView = b.find(".content-view"), g(a.$form, {
				rules : {
					to : {
						required : !0,
						emails : !0
					},
					cc : {
						emails : !0
					},
					bcc : {
						emails : !0
					}
				}
			}), a.$to.trigger("change"), a._json.to) {
			var c = a._json.to.split(",");
			c.forEach(function (b) {
				a.$to.tagit("createTag", b)
			})
		}
		if (a._json.cc) {
			a.$controlCc.removeClass("hide");
			var d = a._json.cc.split(",");
			d.forEach(function (b) {
				a.$cc.tagit("createTag", b)
			})
		}
		if (a._json.bcc) {
			a.$controlBcc.removeClass("hide");
			var e = a._json.bcc.split(",");
			e.forEach(function (b) {
				a.$bcc.tagit("createTag", b)
			})
		}
		if (a._json.attachment)
			for (var f = a._json.attachment, h = 0, i = f.length; i > h; h++)
				a.attachmentArr.push({
					id : f[h].attachment_id,
					name : f[h].name
				})
	}
	var l,
	m = {
		VIEW : "/rest/mail/view/<id>",
		SEND : "/rest/mail/send",
		SAVE_DRAFT : "/rest/mail/save_draft",
		PREVIEW : "/rest/data/choosetemplate/0"
	},
	n = {
		email : h.t("Private email"),
		email1 : h.t("Work email"),
		email2 : h.t("Other")
	},
	o = "modal/attachments/show",
	p = "mail-center/update/sidebar/count";
	return b.extend(function () {
		this.attachmentArr = [],
		this.attachmentRefresh = !0,
		this._templateId = "",
		this._emailType = ["email", "email1", "email2"]
	}, {
		"sig/finalize" : function (a, b) {
			var c = this;
			window.clearTimeout(c.timeid),
			c.$element.html(""),
			b.resolve()
		},
		"hub:memory/context" : function (a, b) {
			var c = this,
			d = b.user;
			c._json.username = [d.englishName, d.chineseName].join(" "),
			j.call(c)
		},
		"hub:memory/route" : function (a, b) {
			var c = this;
			c.draftId = b.path[0].split("!")[1] || 0,
			j.call(c)
		},
		"hub/receive/attachments" : function (a, b) {
			var c = this,
			d = "";
			b.forEach(function (a) {
				c.$attachmentGroup.find('[data-id="' + a.id + '"]').length || (d += '<li data-id="' + a.id + '">' + a.type + '<span class="file-type-icon ' + a.ext.toLowerCase() + '">' + a.name + '</span> <a href="#" data-action="attachment/remove"><span class="icon-remove-small"></span></a></li>')
			}),
			d.length && c.$attachmentGroup.removeClass("hide").find("ul").append(d)
		},
		"hub/email/template/switch" : function (a, b) {
			this.$subject.val(b.title),
			this._templateId = b.id
		},
		"dom/action.click.change" : a.noop,
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
		"dom/action/attachment/remove.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = window.confirm("确定要删除此附件吗？");
			e && a(c.target).closest("li").remove(),
			d.$attachmentGroup.find("ul li").length || d.$attachmentGroup.addClass("hide")
		},
		"dom/action/to.change" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.val().trim(),
			g = f ? e.val().split(",").length : 0;
			d.$count && d.$count.text(g),
			g ? d.$preview.prop("disabled", !1) : (d.$preview.is(":checked") && d.$preview.prop("checked", !1).trigger("click").prop("checked", !1), d.$preview.prop("disabled", !0))
		},
		"dom/action/mass/type.change" : function (b, d) {
			var e = this,
			f = a(d.target),
			g = f.val();
			e.$massGroup.children().filter(":not([data-default])").remove(),
			g && e.publish("ajax", {
				url : g
			}, c().done(function (a) {
					e._queryObj = a,
					e.massGroupWidget.loadData(a)
				}))
		},
		"dom/action/mass/add.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			g = a(d.target),
			h = "/rest/candidate/list?<query>&paginate_by=200",
			i = e.$massGroup.val(),
			j = g.closest(".dropdown");
			if (i) {
				var k = e._queryObj.filter(function (a) {
						return a.id == i
					})[0];
				k = k && k.query ? k.query : "folder_id=" + i,
				j.removeClass("open"),
				e.publish("ajax", {
					url : h.replace("<query>", k)
				}, c().done(function (a) {
						var b,
						c,
						d = 0,
						g = a.list.length,
						h = [],
						i = e._emailType ? e._emailType[0] : "";
						for (d; g > d; d++)
							b = a.list[d], c = [b.englishName, b.chineseName].join(" ").trim(), (!e._emailType || e._emailType.length > 1) && (b.email ? i = "email" : b.email1 ? i = "email1" : b.email2 && (i = "email2")), b[i] ? e.$to.tagit("createTag", '"' + c + '" [' + n[i] + "] <" + b[i] + ">") : h.push('<a href="/candidate#detail!id=' + b.id + '" target="_blank">' + c + "</a>");
						h.length && (e._emailType.length > 1 ? f.alert("info", "以下人才没有任何邮箱:<br>" + h.join(", ")) : f.alert("info", "以下人才没有" + n[i] + "邮箱:<br>" + h.join(", ")))
					}))
			}
		},
		"dom/action/toggle/control.click" : function (a, b, c) {
			b.preventDefault();
			var d = this;
			switch (c) {
			case "cc":
				d.$controlCc.toggleClass("hide"),
				d.$cc.tagit("removeAll");
				break;
			case "bcc":
				d.$controlBcc.toggleClass("hide"),
				d.$bcc.tagit("removeAll")
			}
		},
		"dom/action/send/mail.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			i.call(c, m.SEND, function () {
				f.alert("success", "邮件已发送！"),
				c.timeid = window.setTimeout(function () {
						window.location.reload()
					}, 1500)
			}, b)
		},
		"dom/action/save/draft.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			i.call(c, m.SAVE_DRAFT, function (a) {
				f.alert("success", "邮件保存成功！"),
				c.draftId = a.data
			}, b)
		},
		"dom/action/add/attachment.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish(o, {
				joborder : 0,
				clientcompany : 0
			}, c.attachmentRefresh, c.attachmentArr),
			c.attachmentRefresh = !1
		},
		"dom/action/preview.click" : function (b, d) {
			var e = this,
			f = a(d.target);
			f.is(":checked") ? e.$to.val().length ? e.publish("ajax", {
				url : m.PREVIEW,
				data : {
					data : JSON.stringify({
						email : e.$to.val(),
						title : e.$subject.val(),
						content : CKEDITOR.instances["email-content"].getData()
					})
				},
				type : "post"
			}, c().done(function (a) {
					a.status && (e.$subject.closest(".control-group").addClass("hide"), e.$subjuctView.removeClass("hide").find("input").val(a.data.title), e.$content.closest(".control-group").addClass("hide"), e.$contentView.removeClass("hide").html(a.data.content))
				})) : (e.$subject.closest(".control-group").addClass("hide"), e.$subjuctView.removeClass("hide").find("input").val(""), e.$content.closest(".control-group").addClass("hide"), e.$contentView.removeClass("hide").html("")) : (e.$subject.closest(".control-group").removeClass("hide"), e.$subjuctView.addClass("hide"), e.$content.closest(".control-group").removeClass("hide"), e.$contentView.addClass("hide"))
		},
		"dom/action/email/type.change" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.val(),
			g = f.split(",");
			this._emailType = g,
			d.$to.data("emailType", g),
			d.$cc.data("emailType", g),
			d.$bcc.data("emailType", g)
		}
	})
})