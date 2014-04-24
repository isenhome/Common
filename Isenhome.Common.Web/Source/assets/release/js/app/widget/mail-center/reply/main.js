define("app/widget/mail-center/reply/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g) {
	function h(b, d, e) {
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
				cc : g.$cc.val(),
				bcc : g.$bcc.val(),
				subject : g.$subject.val(),
				content : CKEDITOR.instances["email-content"].getData(),
				to : g.$to.val(),
				individually : g.$individually.is(":checked"),
				attachment : j,
				category : ""
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
					a.status ? (d && d(a), g.publish(n)) : f.alert("error", a.message)
				}).always(function () {
					i.removeClass("disabled")
				}))
		}
	}
	function i() {
		var a = this;
		a._forward ? a.publish("ajax", {
			url : l.GET_ATTACHMENTS.replace("<id>", a._id)
		}, c().done(function (b) {
				a._json.attachment = b,
				c(function (b) {
					a.html(e, a._json, b)
				}).done(function () {
					j.call(a)
				})
			})) : c(function (b) {
			a.html(e, a._json, b)
		}).done(function () {
			j.call(a)
		})
	}
	function j() {
		var b,
		c = this,
		d = c.$element;
		c.$content = d.find("textarea"),
		c.$to = d.find("#to"),
		c.$cc = d.find("#cc"),
		c.$bcc = d.find("#bcc"),
		c.$subject = d.find("#subject"),
		c.$controlCc = d.find(".control-cc"),
		c.$controlBcc = d.find(".control-bcc"),
		c.$individually = d.find('[name="individually"]'),
		c.$massGroup = d.find('[name="mass-group"]'),
		c.$count = d.find(".text-count"),
		c.$form = d.find("form"),
		c.$attachmentGroup = d.find(".attachment-group"),
		c.$attachment = d.find('[name="attachment"]'),
		c.$preview = d.find('[name="preview"]'),
		c.$subjuctView = d.find(".subjuct-view"),
		c.$contentView = d.find(".content-view");
		var e = function () {
			var a,
			b = k.exec(c._json.body);
			return a = b ? RegExp.$1 : c._json.body,
			'<blockquote style="padding-left:1ex; margin: 0px 0px 0px 0.8ex; BORDER-LEFT: #ccc 1px solid">-----原始邮件-----' + a + "</blockquote>"
		}
		();
		if (c.$content.data("origin", e).attr("data-weave", "shared/widget/common/ckeditor/main").weave(), c._json._from && !c._forward) {
			var f = c._json._from.split(",");
			f.forEach(function (a) {
				c.$to.tagit("createTag", a)
			})
		}
		if (c._json.cc && c._json.cc.length) {
			var h = c._json.cc.split(",");
			c.$controlCc.removeClass("hide"),
			h.forEach(function (a) {
				c.$cc.tagit("createTag", a)
			})
		}
		g(c.$form, {
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
		}),
		b = d.removeClass("hide").offset().top,
		a("body").scrollTop(b),
		c.$to.trigger("change")
	}
	var k = /(<body[^]+>[^]+<\/body>)/gi,
	l = {
		SEND : "/rest/mail/send",
		SAVE_DRAFT : "/rest/mail/save_draft",
		PREVIEW : "/rest/data/choosetemplate/0",
		GET_ATTACHMENTS : "/rest/mail/get_attachments/<id>"
	},
	m = "modal/attachments/show",
	n = "mail-center/update/sidebar/count";
	return b.extend(function (a, b, c, d) {
		this._json = c,
		this._id = d,
		a.data("cc") && (this._json.cc = a.data("cc")),
		a.data("forward") && (this._forward = !0),
		this.attachmentArr = [],
		this.attachmentRefresh = !0
	}, {
		"hub:memory/context" : function (a, b) {
			var c = this,
			d = b.user;
			c.username = [d.englishName, d.chineseName].join(" "),
			i.call(c)
		},
		"sig/finalize" : function (a, b) {
			var c = this;
			window.clearTimeout(c.timeid),
			c.$element.html(""),
			b.resolve()
		},
		"hub/receive/attachments" : function (a, b) {
			var c = this,
			d = "";
			b.forEach(function (a) {
				c.$attachmentGroup.find('[data-id="' + a.id + '"]').length || (d += '<li data-id="' + a.id + '">' + a.type + '<span class="file-type-icon ' + a.ext.toLowerCase() + '">' + a.name + '</span> <a href="#" data-action="attachment/remove"><span class="icon-remove-small"></span></a></li>')
			}),
			d.length && c.$attachmentGroup.removeClass("hide").find("ul").append(d)
		},
		"dom/action.click.change" : a.noop,
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
			d.$count.text(g)
		},
		"dom/action/send/mail.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			h.call(c, l.SEND, function () {
				f.alert("success", "邮件回复成功！"),
				c.timeid = window.setTimeout(function () {
						window.location.reload()
					}, 1500)
			}, b)
		},
		"dom/action/save/draft.click" : function (a, b) {
			var c = this;
			h.call(c, l.SAVE_DRAFT, function (a) {
				f.alert("success", "邮件保存成功！"),
				c.draftId = a.data
			}, b)
		},
		"dom/action/add/attachment.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish(m, {
				joborder : 0,
				clientcompany : 0
			}, c.attachmentRefresh, c.attachmentArr),
			c.attachmentRefresh = !1
		},
		formatEmail : function (a) {
			var b = /^(".*")( (<.*>))?$/;
			return b.exec(a),
			'""' === RegExp.$1 ? RegExp.$3.replace("<", "").replace(">", "") : a.replace("<", "&lt;").replace(">", "&gt;")
		},
		"dom/action/preview.click" : function (b, d) {
			var e = this,
			f = a(d.target);
			f.is(":checked") ? e.$to.val().length ? e.publish("ajax", {
				url : l.PREVIEW,
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