define("app/widget/modal/add-attachments/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "template!./items.html", "shared/helper/utils", "shared/helper/blurb", "app/widget/common/select2/main"], function (a, b, c, d, e, f, g) {
	function h() {
		var b = this;
		b.$btnFile.data("json", {
			multiple : !0,
			data : {
				type : "attachment"
			},
			beforeSubmit : function () {
				this.$controls = b.$btnFile.closest(".controls"),
				this.$controls.addClass("text_line")
			},
			success : function (c) {
				if (this.$controls.removeClass("text_line"), c.status) {
					var d = a(e({
								items : c.data
							}));
					b.$localTab.append(d),
					d.find(":checkbox").trigger("click"),
					d.find("[data-weave]").weave()
				} else
					f.alert("error", c.message)
			},
			error : function () {
				this.$controls.removeClass("text_line")
			}
		}).attr("data-weave", "shared/widget/common/upload/main(json)").weave()
	}
	function i(c, d, g, h) {
		var i = this,
		j = i.$element.find("." + d),
		k = a("#" + d);
		j.removeClass("hide"),
		j.addClass("active"),
		j.prevAll().hasClass("active") && j.removeClass("active"),
		h || k.empty();
		var l = function (b) {
			var d;
			if (d = b.length, "object" == typeof g && b.length && (c = g[b[0].external_id]), d) {
				var f = a(e({
							title : c,
							items : b
						}));
				k.append(f),
				i.attachmentArr && k.find(":checkbox").each(function () {
					var b = a(this),
					c = b.val(),
					d = 0,
					e = i.attachmentArr.length;
					for (d; e > d; d++)
						c == i.attachmentArr[d].id && b.prop("checked", !0)
				}),
				f.find("[data-weave]").weave()
			}
		},
		m = function (a, b) {
			f.alert("error", "Load attachments error: " + b)
		};
		if (a.isPlainObject(g))
			for (var o in g)
				i.publish("ajax", {
					url : n.FILE_LIST.replace("<type>", d).replace("<id>", o)
				}, b().done(l).fail(m));
		else
			a.isArray(g) && (g = g.join()), i.publish("ajax", {
				url : n.FILE_LIST.replace("<type>", d).replace("<id>", g)
			}, b().done(l).fail(m))
	}
	function j(c) {
		var d = this,
		e = d.$element.find("." + c),
		f = a("#" + c),
		h = a('<select class="input-xxlarge">').prop("name", c).attr("data-action", "option");
		e.removeClass("hide"),
		e.addClass("active"),
		e.prevAll().hasClass("active") && e.removeClass("active"),
		h.append(a('<option value=""></option>')).appendTo(f),
		"joborder" == c ? d.publish("ajax", {
			url : n.LIVE_JOBS
		}, b().done(function (b) {
				for (var c, d = 0, e = b.length; e > d; d += 1)
					c = b[d], a("<option>").val(c.id).text(c.jobTitle + "(ID:" + c.id + ")").appendTo(h);
				h.select2({
					placeholder : g.t("Please select")
				})
			})) : "clientcompany" == c && d.publish("ajax", {
			url : n.CLIENT.replace("<uid>", d._user.id)
		}, b().done(function (b) {
				if (b.list)
					for (var c, d = 0, e = b.list.length; e > d; d += 1)
						c = b.list[d], a("<option>").val(c.id).text(c.name).appendTo(h);
				h.select2({
					placeholder : g.t("Please select")
				})
			}))
	}
	function k() {
		var a = this;
		a.$element.find(".candidate, .joborder, .clientcompany").removeClass("active").addClass("hide"),
		a.$element.find("#candidate, #joborder, #clientcompany").empty(),
		a.$element.find(".local-upload, #local-upload").removeClass("active"),
		a.$element.find("#local-upload").children(":not(form)").remove()
	}
	function l() {
		var a = this;
		b(function (b) {
			a.html(d, a._json, b)
		}).done(function () {
			m.call(a)
		})
	}
	function m() {
		var a = this;
		a.$localTab = a.$element.find("#local-upload"),
		a.$btnFile = a.$element.find(".upload-file"),
		h.call(a)
	}
	var n = {
		FILE_LIST : "/rest/file/list/<type>/<id>",
		LIVE_JOBS : "/rest/joborder/livejobs",
		CLIENT : "/rest/client/list?paginate_by=10000&user_id=<uid>&allow_new_job=1"
	};
	return c.extend({
		"sig/stop" : function (a, b) {
			this.$element.find("select").select2("destroy"),
			b.resolve()
		},
		"hub:memory/context" : function (a, b) {
			this._user = b.user,
			l.call(this)
		},
		"hub/modal/attachments/show" : function (a, b, c, d, e) {
			var f,
			g = this,
			h = g.$element;
			if (g.attachmentArr = d, g._hasAttachment = !c, g._modal = e, !g._hasAttachment)
				if (k.call(g), b && Object.keys(b).length)
					for (f in b)
						b[f] ? i.call(g, "", f, b[f]) : j.call(g, f);
				else
					g.$element.find('[href="#local-upload"]').trigger("click");
			g.$element.off("hidden"),
			g.$element.on("hidden", function () {
				g.publish(g._modal, {}, !0)
			}),
			h.modal("show")
		},
		"dom/action.click.change" : a.noop,
		"dom/action/confirm.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = d.$element,
			f = [];
			d.attachmentArr ? f = d.attachmentArr : e.find("input:checked").each(function () {
					var b = a(this);
					f.push({
						id : this.value,
						name : b.parent().find(".file-type-icon").text().trim(),
						type : b.parent().find(".label")[0].outerHTML,
						ext : b.data("ext")
					})
				}),
			d.publish("receive/attachments", f),
			d.publish(d._modal, {}, !0),
			d._hasAttachment = !0,
			e.modal("hide")
		},
		"dom/action/option.change" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.find(":selected"),
			g = e.attr("name"),
			h = e.val(),
			j = f.text();
			h && (f.remove(), i.call(d, j, g, h, !0))
		},
		"dom/action/attachment.change" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.val();
			d.attachmentArr && (e.is(":checked") ? d.attachmentArr.push({
					id : f,
					name : e.parent().find(".file-type-icon").text().trim(),
					ext : e.data("ext"),
					type : e.parent().find(".label")[0].outerHTML
				}) : d.attachmentArr = a.grep(d.attachmentArr, function (a) {
						return a.id != f
					}))
		}
	})
})