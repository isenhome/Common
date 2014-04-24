define("app/widget/modal/add-shortlist/main", ["jquery", "shared/widget/modal/base", "troopjs-utils/deferred", "template!./main.html", "template!./job-options.html", "shared/helper/utils", "shared/helper/validate", "app/widget/common/select2/main"], function (a, b, c, d, e, f, g) {
	function h(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function i(a) {
		var b = this;
		b.$job = b.$element.find('[name="job"]'),
		b.$labelPeople = b.$element.find(".label-people"),
		b.$labelCompany = b.$element.find(".label-company"),
		b.$form = b.$element.find("form"),
		g(b.$form, {
			rules : {
				job : {
					required : !0
				}
			}
		}),
		b.$element.on("hidden", function () {
			b.$job.children().not(":eq(0)").remove(),
			b.$job.unweave()
		}),
		a.resolve()
	}
	var j = {
		JOBLIST : "rest/joborder/livejobs?<type>=<id>",
		ADD_SHORTLIST_COMPANY : "/rest/joborder/<id>/targetcompany/add",
		ADD_SHORTLIST_PEOPLE : "/rest/joborder/<id>/shortlist/add"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"sig/start" : function (a, b) {
			i.call(this, b)
		},
		"sig/stop" : function (a, b) {
			this.$job.select2("destroy"),
			b.resolve()
		},
		"hub/modal/addshortlist/show" : function (a, b) {
			var c = this,
			d = c.$element,
			e = d.find(".text_line");
			j.JOBLIST,
			c._ids = b.ids,
			c._onSuccess = b.onSuccess,
			c._type = b.type,
			e.text(b.names.join(", ")),
			"people" === c._type ? (c.$job.data("type", "candidate_id"), c.$labelPeople.removeClass("hide"), c.$labelCompany.addClass("hide")) : "company" === c._type && (c.$job.data("type", "client_id"), c.$labelPeople.addClass("hide"), c.$labelCompany.removeClass("hide")),
			1 === c._ids.length ? c.$job.data("typeId", c._ids[0]) : c.$job.data("typeId", ""),
			c.$job.attr("data-weave", "app/widget/common/job-select/main").weave(),
			d.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (b, d) {
			var e,
			g,
			h = this,
			i = h.$element,
			k = a(d.target),
			l = h.$job.val();
			h.$form.valid() && (l || f.alert("error", "Job Id丢失，请关闭弹出层，重新添加!"), "people" === h._type ? (e = {
						candidate_ids : h._ids
					}, g = j.ADD_SHORTLIST_PEOPLE.replace("<id>", l)) : "company" === h._type && (e = {
						client_ids : h._ids
					}, g = j.ADD_SHORTLIST_COMPANY.replace("<id>", l)), h.publish("ajax", {
					url : g,
					data : {
						data : JSON.stringify(e)
					},
					type : "post"
				}, c().done(function (a) {
						i.modal("hide"),
						a.status ? (f.alert("success", "Add shortlist successfully!"), h._onSuccess && h._onSuccess(a)) : f.alert("error", a.message)
					}), k))
		}
	})
})