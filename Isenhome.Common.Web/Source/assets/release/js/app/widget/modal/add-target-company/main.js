define("app/widget/modal/add-target-company/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "template!app/widget/common/company-suggestion/main.html", "shared/helper/utils", "shared/helper/validate", "shared/helper/blurb", "app/widget/common/select2/main"], function (a, b, c, d, e, f, g, h) {
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
		c.$notes = d.find('[name="notes"]'),
		c.$importance = d.find('[name="importance"]'),
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
			c.$target.val("").trigger("change")
		}),
		b.resolve()
	}
	var k = {
		LIST : "/rest/client/list?company_name=",
		TARGETS : "/rest/joborder/<jobid>/targetcompany/add",
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
		"hub/modal/add-target-company/show" : function (a, b) {
			var c = this,
			d = c.$element;
			c._jobid = b.jobid,
			c._onSuccess = b.onSuccess,
			c._data = b.data,
			c._data && (c.$notes.val(c._data.note), c.$importance.val(c._data.importance), c.$target.select2("val", c._data.client.id)),
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
					client_ids : [e.$target.val()],
					note : e.$notes.val(),
					importance : e.$importance.val()
				};
				e.data && (i.id = e.data.id),
				g.modal("hide"),
				e.publish("ajax", {
					url : k.TARGETS.replace("<jobid>", e._jobid),
					data : {
						data : JSON.stringify(i)
					},
					type : "post"
				}, b().done(function (a) {
						g.modal("hide"),
						a.status ? (f.alert("success", "添加成功"), e._onSuccess && e._onSuccess()) : f.alert("error", a.message)
					}), h)
			}
		}
	})
})