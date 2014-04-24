define("app/widget/modal/onboard/main", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g) {
	function h(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function i(a) {
		var b = this;
		b.$form = b.$element.find("form"),
		b.$onboard = b.$element.find('[name="onboard"]'),
		b.$probation = b.$element.find('[name="probation"]'),
		g(b.$form, {
			rules : {
				onboard : {
					required : !0
				},
				probation : {
					required : !0
				}
			}
		}),
		a.resolve()
	}
	var j = "/rest/joborder/shortlist/<id>/onboard";
	return d.extend({
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"sig/start" : function (a, b) {
			i.call(this, b)
		},
		"hub/modal/onboard/show" : function (a, b) {
			var c = this,
			d = c.$element,
			e = d.find(".text_line");
			c._flowId = null,
			c._id = b.id,
			c._detail = b.detail,
			c._onSuccess = b.onSuccess,
			c._detail && (c._flowId = c._detail.id, c.$probation.val(c.formatDate(c._detail.probationDate)), c.$onboard.val(c.formatDate(c._detail.onboardDate))),
			e.text(b.name),
			d.modal("show")
		},
		"dom/action.click" : b.noop,
		"dom/action/save.click" : function (a, d) {
			var e = this,
			g = e.$element,
			h = b(d.target);
			if (e.$form.valid()) {
				if (!e._id)
					return f.alert("error", "对不起，信息有丢失，请刷新页面后重试！"), void 0;
				var i = {
					onboardDate : e.$onboard.val(),
					probationDate : e.$probation.val()
				};
				e._flowId && (i.id = e._flowId),
				e.publish("ajax", {
					url : j.replace("<id>", e._id),
					data : {
						data : JSON.stringify(i)
					},
					type : "post"
				}, c().done(function (a) {
						g.modal("hide"),
						a.status ? (f.alert("success", "候选人的基本信息已经更新（包括目前公司，职位及薪资），候选人状态已更新为“成功的候选人”"), e._onSuccess && e._onSuccess(a)) : f.alert("error", a.message)
					}), h)
			}
		}
	})
})