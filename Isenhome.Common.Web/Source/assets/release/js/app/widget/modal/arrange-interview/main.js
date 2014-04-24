define("app/widget/modal/arrange-interview/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function h(a) {
		var b = this,
		c = b.$element;
		b.$form = c.find("form"),
		b.$date = c.find('[name="date"]'),
		b.$hour = c.find('[name="hour"]'),
		b.$minute = c.find('[name="minute"]'),
		b.$interviewer = c.find('[name="interviewer"]'),
		b.$interviewer1 = c.find('[name="interviewer1"]'),
		b.$interviewer2 = c.find('[name="interviewer2"]'),
		b.$reminder = c.find('[name="reminder"]'),
		b.$btnSave = c.find(".btn-save"),
		b.$btnReactive = c.find(".btn-reactive"),
		b.$btnDanger = c.find(".btn-danger"),
		f(b.$form, {
			rules : {
				date : {
					required : !0
				}
			}
		}),
		c.on("hide", function () {
			delete b._flowId,
			b.$interviewer.select2("data", null),
			b.$interviewer1.select2("data", null).closest(".controls").addClass("hide"),
			b.$interviewer2.select2("data", null).closest(".controls").addClass("hide"),
			b.$btnSave.addClass("hide"),
			b.$btnReactive.addClass("hide"),
			b.$btnDanger.addClass("hide")
		}),
		a.resolve()
	}
	var i = {
		SAVE : "/rest/joborder/shortlist/<id>/arrangeclientinterview",
		CONTACT : "/rest/candidate/list?company_id=<id>&current=latest&ordering=englishName"
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"hub/modal/interview/show" : function (a, b) {
			var c = this,
			d = c.$element,
			e = d.find(".name"),
			f = i.CONTACT.replace("<id>", b.client.id);
			if (c._jobsubmissionId = b.jobsubmissionId, c.$interviewer.data("url", f), c.$interviewer1.data("url", f), c.$interviewer2.data("url", f), e.text(b.name), b.data) {
				b.data.active ? (c.$btnSave.removeClass("hide"), c.$btnDanger.removeClass("hide")) : c.$btnReactive.removeClass("hide"),
				c._id = b.id,
				c._flowId = b.data.id,
				c._onSuccess = b.onSuccess;
				var g = new Date(b.data.date);
				c.$date.val(g.getFullYear() + "-" + (parseInt(g.getMonth(), 10) + 1) + "-" + g.getDate()),
				c.$hour.val(g.getHours()),
				c.$minute.val(g.getMinutes()),
				c.$reminder.val(b.data.delta),
				b.data.interviewer && c.$interviewer.val(b.data.interviewer),
				b.data.interviewer1 && c.$interviewer1.val(b.data.interviewer1).closest(".controls").removeClass("hide"),
				b.data.interviewer2 && c.$interviewer1.val(b.data.interviewer2).closest(".controls").removeClass("hide")
			} else
				c._id = b.id, c._onSuccess = b.onSuccess, c._client = b.client, c._candidate = b.candidate, c._jobid = b.jobid, c._sid = b.sid, c.$reminder.val(-10), c.$btnSave.removeClass("hide");
			d.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (c, d, f) {
			var g,
			h,
			j = this,
			k = j.$element,
			l = a(d.target);
			j.$form.valid() && (g = {
					date : j.$date.val() + " " + j.$hour.val() + ":" + j.$minute.val(),
					delta : j.$reminder.val(),
					interviewer : j.$interviewer.val(),
					interviewer1 : j.$interviewer1.val(),
					interviewer2 : j.$interviewer2.val(),
					active : "invalid" === f ? !1 : !0
				}, j._flowId ? (g.id = j._flowId, h = function (a) {
					j._onSuccess(a)
				}) : h = function (a) {
				j._onSuccess(a),
				j.publish("modal/email/confirm/show", {
					client : j._client,
					candidate : j._candidate,
					jobid : j._jobid,
					sid : j._sid,
					onSuccess : j._onSuccess,
					jobsubmissionId : j._jobsubmissionId
				})
			}, j.publish("ajax", {
					url : i.SAVE.replace("<id>", j._id),
					data : {
						data : JSON.stringify(g)
					},
					type : "post"
				}, b().done(function (a) {
						k.modal("hide"),
						a.status ? ("invalid" === f ? e.alert("success", "客户面试作废") : "reactive" === f ? e.alert("success", "客户面试取消作废") : e.alert("success", "客户面试保存成功"), h && h(a)) : e.alert("error", a.message)
					}), l))
		},
		"dom/action/add/interviewer.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".control-group").find(".controls").filter(".hide").eq(0);
			return e.length ? (e.removeClass("hide"), void 0) : (alert("最多添加3个面试官!"), void 0)
		},
		"dom/action/remove/field.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".controls").addClass("hide");
			e.find("input").val(""),
			e.find('[data-woven*="shared/widget/common/comtree/main"]').length && e.find('[data-woven*="shared/widget/common/comtree/main"]').woven()[0].reset()
		}
	})
})