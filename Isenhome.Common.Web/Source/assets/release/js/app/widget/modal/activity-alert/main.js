define("app/widget/modal/activity-alert/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		a.publish("ajax", {
			url : j.CONFIG,
			type : "get",
			cache : !1
		}, b().done(function (c) {
				var e = c[0];
				e.value = JSON.parse(e.value),
				a._json = e,
				b(function (b) {
					a.html(d, a._json, b)
				}).done(function () {
					h.call(a)
				})
			}))
	}
	function h() {
		var a = this,
		b = a.$element;
		a.$form = b.find("form"),
		a.$viewCandidateDetail = b.find('[name="viewCandidateDetail"]'),
		a.$viewCandidateAttachment = b.find('[name="viewCandidateAttachment"]'),
		a.$downloadCandidateAttachment = b.find('[name="downloadCandidateAttachment"]'),
		a.$candidateList = b.find('[name="candidateList"]'),
		a.$receiver = b.find('[name="receiver"]'),
		f(a.$form, {
			rules : {
				viewCandidateDetail : {
					number : !0
				},
				viewCandidateAttachment : {
					number : !0
				},
				downloadCandidateAttachment : {
					number : !0
				},
				candidateList : {
					number : !0
				},
				viewContactDetail : {
					number : !0
				},
				contactList : {
					number : !0
				}
			}
		})
	}
	var i = "operation_log_alert",
	j = {
		CONFIG : "/rest/data/configvalue?keys=operation_log_alert",
		CONFIG_ADD : "/rest/data/configvalue/add"
	};
	return c.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			b.user.emailpassword && (c.emailEnabled = !0)
		},
		"hub/modal/activity-alert/show" : function () {
			var a = this,
			b = a.$element;
			g.call(this),
			b.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (c, d) {
			d.preventDefault();
			var f = this,
			g = f.$element,
			h = a(d.target);
			if (f.$form.valid()) {
				var k = JSON.stringify({
						oneday : {
							CandidateList : parseInt(f.$candidateList.val().trim(), 10),
							CandidateView : parseInt(f.$viewCandidateDetail.val().trim(), 10),
							CandidateAttachmentView : parseInt(f.$viewCandidateAttachment.val().trim(), 10),
							CandidateAttachmentDownload : parseInt(f.$downloadCandidateAttachment.val().trim(), 10)
						},
						emailto : f.$receiver.val()
					}),
				l = {
					type : "",
					name : i,
					value : k
				};
				f.publish("ajax", {
					url : j.CONFIG_ADD,
					data : {
						data : JSON.stringify(l)
					},
					type : "post"
				}, b().done(function (a) {
						g.modal("hide"),
						a.status ? e.alert("success", "设置成功！") : e.alert("error", a.message)
					}), h)
			}
		}
	})
})