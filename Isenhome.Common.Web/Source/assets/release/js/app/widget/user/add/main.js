define("app/widget/user/add/main", ["compose", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g) {
	function h() {
		var a = this;
		a.editMode !== m && (a.editMode ? j.call(a) : k.call(a))
	}
	function i(a, b) {
		for (var c = [], d = 0, e = b.length; e > d; d++)
			c.push("<option value='" + b[d].id + "'>" + b[d].name + "</option>");
		a.append(c.join(""))
	}
	function j(a) {
		var b = this;
		b.publish("ajax", {
			url : n.USER.replace("<id>", b._id)
		}, d().done(function (c) {
				b._json = c,
				k.call(b, a)
			}))
	}
	function k() {
		var a = this;
		d(function (b) {
			a.html(e, a._json, b)
		}).then(function () {
			l.call(a)
		})
	}
	function l() {
		var a = this;
		a.$form = a.$element.find("form"),
		a.$leaveDateControl = a.$form.find(".leave-date-control"),
		a.$leaveDate = a.$form.find('[name="leaveDate"]'),
		a.$title = a.$form.find("#title"),
		a.$emailLoginName = a.$form.find("#email-login-name"),
		a.publish("ajax", {
			url : n.TITLE
		}, d().done(function (b) {
				b.length && i(a.$title, b),
				a.editMode && a.$title.val(a._json.title.id)
			})),
		g(a.$form, {
			rules : {
				englishName : {
					required : !0
				},
				title : {
					required : !0
				},
				mobile : {
					number : !0
				},
				email : {
					required : !0,
					email : !0
				},
				status : {
					required : !0
				},
				role : {
					required : !0
				},
				kpiReportView : {
					required : !0
				},
				revenueReportView : {
					required : !0
				},
				team : {
					required : !0
				},
				annualTarget : {
					number : !0
				}
			}
		}),
		a.editMode && (b("#role").val(a._json.role), b("#kpiReportView").val(a._json.kpiReportView), b("#revenueReportView").val(a._json.revenueReportView), b("#status").val(a._json.status).trigger("change")),
		f.widgetLoaded.call(a)
	}
	var m,
	n = {
		TITLE : "/rest/data/title/list",
		USER : "/rest/user/<id>",
		ADD : "/rest/user/add"
	};
	return c.extend({
		"hub:memory/add/id/change" : function (a, b) {
			var c = this;
			c._id = b,
			c.editMode = c._id !== m ? !0 : !1,
			h.call(c)
		},
		"dom/action.click.change.input" : b.noop,
		"dom/action/history/back.click" : function (a, b) {
			b.preventDefault(),
			window.history.back()
		},
		"dom/action/employ/status.change" : function (a, c) {
			c.preventDefault();
			var d = this,
			e = b(c.target);
			"Leave" === e.val() ? (d.$leaveDateControl.removeClass("hide"), d.$leaveDate.rules("add", {
					required : !0
				})) : (d.$leaveDateControl.addClass("hide"), d.$leaveDate.rules("remove"))
		},
		"dom/action/email/change.input" : function (a, c) {
			var d = this,
			e = b(c.target);
			d.$emailLoginName.val(e.val().trim())
		},
		"dom/action/user/add.click" : function (a, c) {
			c.preventDefault();
			var e = this,
			g = b(c.target);
			if (e.$form.valid()) {
				var h = {
					englishName : b("#englishName").val().trim(),
					chineseName : b("#chineseName").val().trim(),
					title : b("#title").val(),
					team : b('[name="team"]').val(),
					dateOfBirth : b("#dateOfBirth").val() || null,
					joinInDate : b("#joinInDate").val() || null,
					email : b("#email").val().trim(),
					mobile : b("#mobile").val().trim(),
					officeTel : b("#officeTel").val().trim(),
					status : b("#status").val(),
					role : b("#role").val(),
					kpiReportView : b("#kpiReportView").val(),
					revenueReportView : b("#revenueReportView").val(),
					annualTarget : b("#annualTarget").val().trim() || null,
					isleader : b('[name="isleader"]:checked').val() || !1,
					kpiHide : b('[name="kpiHide"]:checked').val() || !1,
					revenueHide : b('[name="revenueHide"]:checked').val() || !1,
					leaveDate : e.$leaveDate.val() || null,
					email_login_name : e.$emailLoginName.val().trim(),
					uid : e.$element.find("#uid").val().trim()
				};
				e.editMode && (h.id = e._json.id),
				e.publish("ajax", {
					url : n.ADD,
					data : {
						data : JSON.stringify(h)
					},
					type : "post"
				}, d().done(function (a) {
						a.status ? e.editMode ? (f.alert("success", "编辑用户成功!"), window.location.hash = "detail!id=" + e._json.id) : (f.alert("success", "新增用户成功!"), window.location.hash = "list") : f.alert("error", a.message)
					}), g)
			}
		}
	})
})