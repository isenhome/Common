define("shared/widget/modal/feedback-quick-post/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "template!./attachment.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g) {
	function h() {
		var b = this;
		b.$btnFile.data("json", {
			multiple : !0,
			data : {
				type : "other"
			},
			beforeSubmit : function () {
				b.$btnFile.prev().addClass("hide"),
				this.$controls = b.$btnFile.closest(".controls"),
				this.$controls.addClass("text_line")
			},
			success : function (c) {
				if (b.$btnFile.prev().removeClass("hide"), this.$controls.removeClass("text_line"), c.status) {
					var d = a(e(c.data));
					b.$attachmentList.append(d),
					b.$attachmentList.closest(".controls").removeClass("hide")
				} else
					f.alert("error", c.message)
			},
			error : function () {
				this.$controls.removeClass("text_line")
			}
		}).attr("data-weave", "shared/widget/common/upload/main(json)").weave()
	}
	function i(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function j(a) {
		var b = this,
		c = b.$element;
		b.$form = c.find("form"),
		b.$type = c.find('[name="type"]'),
		b.$subject = c.find('[name="subject"]'),
		b.$content = c.find('[name="content"]'),
		b.$btnFile = c.find(".upload-file"),
		b.$attachmentList = c.find(".attachment-list"),
		h.call(b),
		g(b.$form),
		c.on("hidden", function () {
			b.$attachmentList.empty(),
			b.$attachmentList.closest(".controls").addClass("hide")
		}),
		a.resolve()
	}
	var k = {
		ADD : "/rest/user/issue_add"
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"sig/start" : function (a, b) {
			j.call(this, b)
		},
		"hub/modal/feedback-quick-post/show" : function () {
			var a = this,
			b = a.$element;
			b.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (c, d) {
			d.preventDefault();
			var e = this,
			g = e.$element,
			h = a(d.target);
			if (e.$form.valid()) {
				var i = function () {
					var b = [];
					return e.$element.find(".attachment-item").each(function () {
						b.push(a(this).data("id"))
					}),
					b
				}
				();
				e.publish("ajax", {
					url : k.ADD,
					data : {
						data : JSON.stringify({
							type : e.$type.val(),
							title : e.$subject.val().trim(),
							content : e.$content.val().trim(),
							attachments : i,
							status : "pending"
						})
					},
					type : "post"
				}, b().done(function (a) {
						g.modal("hide"),
						a.status ? f.alert("success", "反馈发送成功") : f.alert("error", a.message)
					}), h)
			}
		},
		"dom/action/remove/attachment.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = window.confirm("确定要删除此附件吗?");
			e && (1 === d.closest(".controls").find("li").length && d.closest(".controls").addClass("hide"), d.closest("li").remove())
		}
	})
})