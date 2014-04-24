define("app/widget/modal/target-company/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "template!app/widget/common/company-suggestion/main.html", "shared/helper/utils", "shared/helper/validate", "shared/helper/blurb", "app/widget/common/select2/main"], function (a, b, c, d, e, f, g, h) {
	function i(a) {
		var c = this;
		b(function (a) {
			c.html(d, c._json, a)
		}).done(function () {
			j.call(c, a)
		})
	}
	function j(b) {
		var c = this,
		d = c.$element;
		c.$form = d.find("form"),
		c.$target = d.find('[name="target"]'),
		c.$date = d.find('[name="date"]'),
		c.$hour = d.find('[name="hour"]'),
		c.$minute = d.find('[name="minute"]'),
		c.$notes = d.find('[name="notes"]'),
		c.$btnDel = d.find(".btn-danger"),
		c.$target.select2({
			placeholder : "请选择",
			minimumInputLength : 1,
			ajax : {
				url : k.CLIENT,
				dataType : "json",
				quietMillis : 100,
				data : function (a, b) {
					return {
						company_name : a,
						page : b
					}
				},
				results : function (a) {
					var b = a.current < a.pages;
					return {
						results : a.list,
						more : b
					}
				}
			},
			initSelection : function (b, c) {
				var d = a(b).val();
				"" !== d && a.ajax(k.CLIENT, {
					data : {
						id : d
					},
					dataType : "json"
				}).done(function (a) {
					a.list.length && c(a.list[0])
				})
			},
			formatResult : function (a) {
				return a.ctype = l[a.type],
				e(a)
			},
			formatSelection : function (a, b) {
				b.text(a.name)
			},
			escapeMarkup : function (a) {
				return a
			}
		}),
		g(c.$form, {}),
		d.on("hidden", function () {
			c.$target.val("").trigger("change"),
			c.$btnDel.addClass("hide")
		}),
		b.resolve()
	}
	var k = {
		SAVE : "/rest/candidate/targetcompany/add",
		DEL : "/rest/candidate/targetcompany/del",
		CLIENT : "/rest/client/list"
	},
	l = {
		client : h.t("client company"),
		bding : h.t("bding company"),
		normal : "",
		generated : ""
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"sig/stop" : function (a, b) {
			var c = this;
			c.$target.select2("destroy"),
			b.resolve()
		},
		"hub/modal/target-company/show" : function (a, b) {
			var c = this,
			d = c.$element;
			if (c.candidate_id = b.id, c.onSuccess = b.onSuccess, c.data = b.data, c.data) {
				c.$notes.val(c.data.note || "");
				var e = new Date(c.data.date);
				c.$date.val(e.getFullYear() + "-" + (parseInt(e.getMonth(), 10) + 1) + "-" + e.getDate()),
				c.$hour.val(e.getHours()),
				c.$minute.val(e.getMinutes()),
				c.$target.val(c.data.client.id).trigger("change"),
				c.$target.prop("disabled", !0),
				c.$btnDel.removeClass("hide")
			} else {
				var f = new Date;
				c.$date.val(f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate()),
				c.$hour.val(f.getHours()),
				c.$minute.val(5 * Math.floor(f.getMinutes() / 5)),
				c.$target.prop("disabled", !1)
			}
			d.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (c, d) {
			d.preventDefault();
			var e = this,
			g = e.$element,
			h = a(d.targt);
			if (e.$form.valid()) {
				var i = {
					candidate_id : e.candidate_id,
					client_id : e.$target.val(),
					note : e.$notes.val(),
					date : e.$date.val() + " " + e.$hour.val() + ":" + e.$minute.val()
				};
				e.data && (i.id = e.data.id),
				g.modal("hide"),
				e.publish("ajax", {
					url : k.SAVE,
					data : {
						data : JSON.stringify(i)
					},
					type : "post"
				}, b().done(function (a) {
						g.modal("hide"),
						a.status ? (f.alert("success", "添加成功"), e.onSuccess && e.onSuccess()) : f.alert("error", a.message)
					}), h)
			}
		},
		"dom/action/delete.click" : function (c, d) {
			d.preventDefault();
			var e = this,
			g = e.$element,
			h = a(d.targt),
			i = window.confirm("确定要删除吗？");
			if (i) {
				var j = {
					ids : [e.data.id]
				};
				g.modal("hide"),
				e.publish("ajax", {
					url : k.DEL,
					data : {
						data : JSON.stringify(j)
					},
					type : "post"
				}, b().done(function (a) {
						g.modal("hide"),
						a.status ? e.onSuccess && e.onSuccess() : f.alert("error", a.message)
					}), h)
			}
		}
	})
})