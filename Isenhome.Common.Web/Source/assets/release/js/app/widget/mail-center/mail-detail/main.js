define("app/widget/mail-center/mail-detail/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f() {
		var a = this;
		a.userEmail && a._type && a._id && a.publish("ajax", {
			url : i.DETAIL.replace("<id>", a._id)
		}, c().done(function (b) {
				b.status === h ? (a._json = b, c(function (b) {
						a.html(d, a._json, b)
					}).done(function () {
						g.call(a)
					})) : e.alert("error", b.message)
			}))
	}
	function g() {
		var a = this,
		b = a.$element.find("iframe"),
		c = b.contents();
		a.$resume = a.$element.find('[data-action="resume/type"]'),
		a.$mailReply = a.$element.find(".mail-reply-content"),
		a.$importBtn = a.$element.find(".btn-import"),
		c.find("body").html(a._json.body.replace(/(<html>)|(<\/html>)/gim, "")),
		b.height(c.height());
		for (var d = c[0].getElementsByTagName("a"), e = 0; e < d.length; e++)
			d[e].target = "_blank"
	}
	var h,
	i = {
		DETAIL : "/rest/mail/view/<id>",
		GET_UUIDNAME : "/rest/mail/to_file/<mail>?",
		ADD_CANDIDATE : "/candidate#add!file=<file>"
	};
	return b.extend({
		"sig/finalize" : function (a, b) {
			var c = this;
			c.$element.html(""),
			b.resolve()
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			c.userEmail = b.user.email,
			f.call(c)
		},
		"hub:memory/route" : function (a, b) {
			var c = this;
			c._type = b.path[0],
			c._id = c._type.split("!")[1],
			f.call(c)
		},
		"dom/action.click.change" : a.noop,
		"dom/action/detail/back.click" : function () {
			window.history.back()
		},
		"dom/action/mail/reply.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$mailReply.attr("data-woven") || c.$mailReply.data("json", c._json).attr("data-weave", "app/widget/mail-center/reply/main(json, " + c._id + ")").weave()
		},
		"dom/action/mail/replyall.click" : function (a, b) {
			b.preventDefault();
			var c = this,
			d = [];
			c.$mailReply.attr("data-woven") || (d = c._json.to.split(", ").filter(function (a) {
						return a.indexOf(c.userEmail) > -1 != !0
					}), (d.length || c._json.cc.length) && (d = [d.join(","), c._json.cc].join(",")), c.$mailReply.data("json", c._json).data("cc", d).attr("data-weave", "app/widget/mail-center/reply/main(json, " + c._id + ")").weave())
		},
		"dom/action/mail/forward.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$mailReply.attr("data-woven") || c.$mailReply.data("json", c._json).data("forward", !0).attr("data-weave", "app/widget/mail-center/reply/main(json, " + c._id + ")").weave()
		},
		"dom/action/import/candidate.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target),
			h = function () {
				var b = [];
				return f.$resume.filter(":checked").each(function () {
					b.push("id=" + a(this).val())
				}),
				b
			}
			();
			f.publish("ajax", {
				url : i.GET_UUIDNAME.replace("<mail>", f._id) + h.join("&"),
				type : "get",
				async : !1
			}, c().done(function (a) {
					a.status ? window.open(i.ADD_CANDIDATE.replace("<file>", a.data), "_blank") : e.alert("error", a.message)
				}), g)
		},
		"dom/action/resume/type.change" : function (b, c) {
			var d = this;
			a(c.target),
			d.$resume.filter(":checked").length ? d.$importBtn.removeClass("hide") : d.$importBtn.addClass("hide")
		},
		formatEmail : function (a) {
			return a ? a.replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""
		}
	})
})