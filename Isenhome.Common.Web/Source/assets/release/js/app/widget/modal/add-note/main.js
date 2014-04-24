define("app/widget/modal/add-note/main", ["jquery", "shared/widget/modal/base", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "template!./questions.html", "template!./status.html", "shared/helper/utils", "shared/helper/validate", "shared/helper/blurb"], function (a, b, c, d, e, f, g, h, i, j) {
	function k() {
		var a = localStorage.getItem(s);
		return a
	}
	function l() {
		var a = this,
		b = k();
		if (b && (b = JSON.parse(b), b.external_id === a.id && b.external_type === a.externalType && b.jobsubmission_id === a.jobsubmissionId && (a.$category.val(b.category).trigger("change"), b.content.forEach(function (b, c) {
						a.$element.find("textarea").eq(c).val(b)
					}), b.status && a.$status.val(b.status), b.date))) {
			var c = new Date(b.date);
			a.$date.val(c.getFullYear() + "-" + (parseInt(c.getMonth(), 10) + 1) + "-" + c.getDate()),
			a.$hour.val(c.getHours()),
			a.$minute.val(c.getMinutes())
		}
	}
	function m() {
		localStorage.removeItem(s)
	}
	function n() {
		var b = this;
		b._saveTimeId = setInterval(function () {
				var c = [];
				b.$element.find("textarea").each(function () {
					c.push(a(this).val())
				});
				var d = {
					external_id : b.id,
					content : c,
					category : b.$category.val(),
					status : b.$status.val(),
					external_type : b.externalType,
					jobsubmission_id : b.jobsubmissionId,
					date : b.$date.val() + " " + b.$hour.val() + ":" + b.$minute.val()
				};
				localStorage.setItem(s, JSON.stringify(d))
			}, 300)
	}
	function o() {
		var a = this;
		m(),
		clearInterval(a._saveTimeId)
	}
	function p() {
		var a = this;
		c(function (b) {
			a.html(e, b)
		}).done(function () {
			q.call(a)
		})
	}
	function q() {
		var b = this,
		c = b.$element;
		b.$form = c.find("form"),
		b.$category = c.find('[name="category"]'),
		b.$status = c.find('[name="status"]'),
		b.$controlGroupQeustion = c.find(".control-group-question"),
		b.$controlsQuestion = c.find(".controls-question"),
		b.$date = c.find('[name="date"]'),
		b.$hour = c.find('[name="hour"]'),
		b.$minute = c.find('[name="minute"]'),
		i(b.$form, {
			rules : {
				category : {
					required : !0
				}
			}
		}),
		c.on("hidden", function () {
			o.call(b),
			b.$category.prop("disabled", !1).find("option:eq(0)").prop("selected", !0),
			b.$controlGroupQeustion.addClass("hide"),
			b.$category.children().not(":eq(0)").remove()
		}),
		c.on("show", function () {
			b.data && b.data.items && b.$element.find("textarea").each(function (c) {
				a(this).val(b.data.items[c].value)
			})
		})
	}
	var r,
	s = "modal/add-note",
	t = {
		ADD : "/rest/note/add",
		CATEGORY : "/rest/data/options?type=<type>",
		STATUS : "/rest/data/options?type=<type>"
	},
	u = {
		HAS_CONTENT : j.t("Do you want to change type? It will clear all you notes.")
	};
	return b.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._userId = b.user.id,
			p.call(c)
		},
		"hub/modal/add-note/show" : function (b, e) {
			var f = this,
			h = f.$element,
			i = [],
			j = c();
			if (f._userId) {
				if (f.externalType = e.externalType, f.optionType = e.optionType, f.id = e.id, f.onSuccess = e.onSuccess, f.data = e.data, f.jobsubmissionId = e.jobsubmissionId || "", f.data ? (f._json = [f.data.category], f.$category.append('<option value="' + f.data.category.code + '" data-index="' + 0 + '">' + f.data.category.value + "</option>")) : (i.push(j.promise()), f.publish("ajax", {
							url : t.CATEGORY.replace("<type>", f.optionType)
						}, j.done(function (a) {
								f._json = a,
								f._json.forEach(function (a, b) {
									f.$category.append('<option value="' + a.code + '" data-index="' + b + '">' + a.value + "</option>")
								})
							}))), "candidate" === f.externalType) {
					f.$status.closest(".control-group").removeClass("hide");
					var k = c(),
					m = "jobsubmission_note_category" === f.optionType ? "jobsubmission_status" : "candidate_status";
					i.push(k.promise()),
					f.publish("ajax", {
						url : t.STATUS.replace("<type>", m)
					}, c().done(function (b) {
							var d = a(g(b));
							d.filter("[data-weave]").weave(c().done(function () {
									f.$status.html(d),
									k.resolve()
								}))
						})),
					f.$element.find('[data-action="zen/mode"]').removeClass("hide")
				} else
					f.$status.empty().closest(".control-group").addClass("hide"), f.$element.find('[data-action="zen/mode"]').addClass("hide");
				d.apply(a, i).done(function () {
					if (f.data) {
						if (f.$category.val(f.data.category.code).trigger("change").prop("disabled", !0), f.data.status && f.$status.val(f.data.status.code), f.data.date) {
							var a = new Date(f.data.date);
							f.$date.val(a.getFullYear() + "-" + (parseInt(a.getMonth(), 10) + 1) + "-" + a.getDate()),
							f.$hour.val(a.getHours()),
							f.$minute.val(a.getMinutes())
						}
						f.jobsubmissionId = f.data.jobsubmission ? f.data.jobsubmission : ""
					} else {
						var b = new Date;
						f.$date.val(b.getFullYear() + "-" + (b.getMonth() + 1) + "-" + b.getDate()),
						f.$hour.val(b.getHours()),
						f.$minute.val(5 * Math.floor(b.getMinutes() / 5))
					}
					l.call(f),
					n.call(f),
					h.modal({
						show : !0,
						backdrop : "static"
					})
				})
			}
		},
		"hub/modal/add-note/update" : function (b, c) {
			var d = this,
			e = a("body");
			e.removeClass("add-note-zen-mode"),
			d.$category.val(c.category).trigger("change"),
			d.$status.val(c.status),
			c.content.forEach(function (a, b) {
				d.$element.find("textarea").eq(b).val(a)
			});
			var f = new Date(c.date);
			d.$date.val(f.getFullYear() + "-" + (parseInt(f.getMonth(), 10) + 1) + "-" + f.getDate()),
			d.$hour.val(f.getHours()),
			d.$minute.val(f.getMinutes())
		},
		"hub/modal/add-note/hide" : function () {
			var b = this,
			c = a("body");
			c.removeClass("add-note-zen-mode"),
			b.$element.modal("hide")
		},
		"dom/action.click.change" : a.noop,
		"dom/action/save.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			f = a(d.target),
			g = [];
			if (e.$form.valid()) {
				e.$element.find("textarea").each(function () {
					g.push(a(this).val())
				});
				var i = {
					external_id : e.id,
					content : g,
					category : e.$category.val(),
					status : e.$status.val(),
					external_type : e.externalType,
					jobsubmission_id : e.jobsubmissionId,
					date : e.$date.val() + " " + e.$hour.val() + ":" + e.$minute.val()
				};
				e.data && (i.id = e.data.id),
				e.publish("ajax", {
					url : t.ADD,
					data : {
						data : JSON.stringify(i)
					},
					type : "POST"
				}, c().done(function (a) {
						a.status ? (e.$element.modal("hide"), h.alert("success", "编辑备注成功!"), e.onSuccess && e.onSuccess(a)) : h.alert("error", a.message)
					}), f)
			}
		},
		"dom/action/note/type.change" : function (b, d) {
			var e,
			g = this,
			h = a(d.target),
			i = h.find(":selected").data("index"),
			j = !1;
			if (g.$element.find(".controls-question textarea").each(function () {
					a(this).val().length && (j = !0)
				}), !j || (e = window.confirm(u.HAS_CONTENT))) {
				if (i === r)
					return g.$controlGroupQeustion.addClass("hide"), void 0;
				var k = a(f(JSON.parse(g._json[i].ext)));
				k.find("[data-weave]").weave(c(function () {
						g.$controlsQuestion.html(k),
						g.$controlGroupQeustion.removeClass("hide")
					}))
			}
		},
		"dom/action/zen/mode.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a("body"),
			f = a(window).height(),
			g = a('<div class="add-note-fullscreen"></div>'),
			h = [];
			d.$element.find("textarea").each(function () {
				h.push(a(this).val())
			});
			var i = {
				external_id : d.id,
				content : h,
				$category : d.$category.clone(),
				$status : d.$status.clone(),
				category : d.$category.val(),
				status : d.$status.val(),
				external_type : d.externalType,
				jobsubmission_id : d.jobsubmissionId,
				date : d.$date.val() + " " + d.$hour.val() + ":" + d.$minute.val(),
				onSuccess : d.onSuccess
			};
			d.data && (i.id = d.data.id),
			g.css({
				height : f
			}),
			e.prepend(g),
			g.data("json", i).data("category", d._json).attr("data-weave", "app/widget/modal/add-note/zen(json, category)").weave(),
			e.addClass("add-note-zen-mode")
		}
	})
})