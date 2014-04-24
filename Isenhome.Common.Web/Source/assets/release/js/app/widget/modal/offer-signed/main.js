define("app/widget/modal/offer-signed/main", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g) {
	function h(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function i(a) {
		var b = this,
		c = b.$element;
		b.$form = c.find("form"),
		b.$signed = c.find('[name="signed"]'),
		b.$package = c.find('[name="package"]'),
		b.$onboard = c.find('[name="onboard"]'),
		b.$consultant = c.find('[name="consultant"]'),
		b.$salaryStructure = c.find('[name="salaryStructure"]'),
		b.$btnSave = c.find(".btn-save"),
		b.$btnReactive = c.find(".btn-reactive"),
		b.$btnDanger = c.find(".btn-danger"),
		g(b.$form, {
			rules : {
				"package" : {
					required : !0,
					number : !0,
					min : 0
				},
				signed : {
					required : !0
				},
				onboard : {
					required : !0
				},
				consultant : {
					required : !0
				}
			}
		}),
		b.$element.on("hidden", function () {
			b.$consultant.unweave(),
			b.$btnSave.addClass("hide"),
			b.$btnReactive.addClass("hide"),
			b.$btnDanger.addClass("hide")
		}),
		a.resolve()
	}
	var j = {
		SIGN : "/rest/joborder/shortlist/<sid>/offersign",
		INVALID_OFFER : "rest/joborder/shortlist/<sid>/invalidoffersign"
	},
	k = "shared/widget/common/user-list/main";
	return d.extend({
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"sig/start" : function (a, b) {
			i.call(this, b)
		},
		"hub/modal/offersigned/show" : function (a, b) {
			var d = this,
			e = d.$element,
			f = e.find(".text_line"),
			g = c();
			d._obj = b,
			d._id = b.id,
			d._onSuccess = b.onSuccess,
			b.detail ? (d._detail = b.detail, d.$signed.val(d.formatDate(d._detail.signDate)), d.$onboard.val(d.formatDate(d._detail.onboardDate)), d.$package.val(d._detail.annualSalary), d.$salaryStructure.val(d._detail.salaryStructure), g.done(function () {
					d.$consultant.val(d._detail.user.id).trigger("change")
				}), d._detail.active ? (d.$btnDanger.removeClass("hide"), d.$btnSave.removeClass("hide")) : d.$btnReactive.removeClass("hide")) : d.$btnSave.removeClass("hide"),
			b.mainConsultantId && g.done(function () {
				d.$consultant.val(b.mainConsultantId).trigger("change")
			}),
			d.$consultant.data("list", b.userlist).attr("data-weave", k + "(list)").weave(g),
			f.text(b.name),
			e.modal("show")
		},
		"dom/action.click" : b.noop,
		"dom/action/save.click" : function (a, d, e) {
			var g = this,
			h = g.$element,
			i = b(d.target);
			if (g.$form.valid()) {
				var k = {
					signDate : g.$signed.val(),
					onboardDate : g.$onboard.val(),
					annualSalary : g.$package.val().trim(),
					salaryStructure : g.$salaryStructure.val(),
					user_id : g.$consultant.val(),
					active : "invalid" === e ? !1 : !0
				};
				g._obj.detail && (k.id = g._detail.id),
				g.publish("ajax", {
					url : j.SIGN.replace("<sid>", g._id),
					data : {
						data : JSON.stringify(k)
					},
					type : "post"
				}, c().done(function (a) {
						h.modal("hide"),
						a.status ? ("invalid" == e ? f.alert("success", "Offer已作废") : "reactive" === e ? f.alert("success", "Offer已取消作废") : f.alert("success", "Offer保存成功"), g._onSuccess && g._onSuccess(a)) : f.alert("error", a.message)
					}), i)
			}
		}
	})
})