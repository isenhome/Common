define("shared/widget/support-center/detail/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html", "template!./attachment.html", "template!./new-message.html"], function (a, b, c, d, e, f, g) {
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
					var e = a(f(c.data));
					b.$attachmentList.append(e),
					b.$attachmentList.closest(".controls").removeClass("hide")
				} else
					d.alert("error", c.message)
			},
			error : function () {
				this.$controls.removeClass("text_line")
			}
		}).attr("data-weave", "shared/widget/common/upload/main(json)").weave()
	}
	function i() {
		var a = this;
		a.publish("ajax", {
			url : k.DETAIL.replace("<id>", a._id)
		}, c().done(function (b) {
				a._json = b.list[0],
				a.html(e, a._json, c().done(function () {
						j.call(a)
					}))
			}))
	}
	function j() {
		var a = this,
		b = a.$element;
		a.$content = b.find('[name="content"]'),
		a.$wrap = b.find(".bubble-wrap"),
		a.$btn = b.find(".btn-send"),
		a.$btnFile = b.find(".upload-file"),
		a.$attachmentList = b.find(".attachment-list"),
		h.call(a),
		d.widgetLoaded.call(a)
	}
	var k = {
		DETAIL : "/rest/user/issue_list?_id=<id>",
		ADD : "/rest/user/issue_add"
	},
	l = {
		pending : "等待处理",
		processing : "处理中",
		done : "已处理"
	};
	return b.extend({
		"hub:memory/detail/id/change" : function (a, b) {
			var c = this;
			c._id = b,
			i.call(c)
		},
		"dom/action.click.input" : a.noop,
		"dom/action/content.input" : function (b, c) {
			var d = this,
			e = a(c.target);
			e.val().trim().length ? d.$btn.removeClass("disabled") : d.$btn.addClass("disabled")
		},
		"dom/action/send.click" : function (b, e) {
			e.preventDefault();
			var f = this,
			h = a(e.target),
			i = f.$content.val().trim(),
			j = [],
			l = [];
			f.$element.find(".attachment-item").each(function () {
				l.push(a(this).data("id")),
				j.push({
					uuidname : a(this).data("id"),
					originname : a(this).text()
				})
			}),
			f.publish("ajax", {
				url : k.ADD,
				data : {
					data : JSON.stringify({
						_id : f._id,
						content : i,
						attachments : l
					})
				},
				type : "post"
			}, c().done(function (b) {
					if (b.status) {
						var e = a(g({
									content : i,
									attachments : j
								}));
						f.$attachmentList.empty(),
						e.find("[data-weave]").weave(c().done(function () {
								f.$wrap.append(e),
								e.fadeIn()
							})),
						f.$content.val(""),
						d.alert("success", "发送成功！")
					} else
						d.alert("error", b.message)
				}), h)
		},
		showStatus : function (a) {
			return a ? l[a] : l.pending
		}
	})
})