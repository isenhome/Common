define("app/widget/modal/data-migration/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "config", "shared/helper/validate", "shared/helper/blurb"], function (a, b, c, d, e, f, g, h) {
	function i(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function j(a) {
		var b = this,
		c = b.$element;
		b.$form = c.find("form"),
		b.$name = c.find(".username"),
		b.$shareControl = c.find(".control-share"),
		b.$toUser = c.find("#owner"),
		b.$number = c.find(".number"),
		b.$type = c.find(".type"),
		b.$btn = c.find("button.btn"),
		g(b.$form, {
			rules : {
				owner : {
					required : !0
				}
			}
		}),
		a.resolve()
	}
	var k = "/rest/manage/datamigration/<id>",
	l = {
		Candidate : h.t("Candidate"),
		Client : h.t("Client Company"),
		LiveJobs : h.t("Live Jobs"),
		SucessfulJobs : h.t("Successed jobs but not received payment")
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"sig/start" : function (a, b) {
			j.call(this, b)
		},
		"hub/modal/data-migration/show" : function (a, b) {
			var c = this,
			d = c.$element;
			c._id = b.id,
			c._onSuccess = b.onSuccess,
			c._hasShare = b.hasShare,
			c._type = b.type,
			c._hasShare ? c.$shareControl.removeClass("hide") : c.$shareControl.addClass("hide"),
			c.$name.text(b.name),
			c.$number.text(b.number),
			c.$type.text(l[b.type]),
			d.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (c, d) {
			var f = this,
			g = f.$element,
			h = a(d.target),
			i = window.confirm("是否确定需要转移改数据？此步骤不可逆！");
			if (i && f.$form.valid()) {
				var j = {
					type : f._type,
					to_user_id : parseInt(f.$toUser.val(), 10)
				};
				f._hasShare && (j.shares = function () {
					var b = [];
					return a('[name="share_with"]').each(function () {
						var c = a(this),
						d = c.val(),
						e = c.next().find(a("input").add("select")).val();
						b.push({
							type : d,
							value : e
						})
					}),
					b
				}
					()),
				f.publish("ajax", {
					url : k.replace("<id>", f._id),
					data : {
						data : JSON.stringify(j)
					},
					type : "POST"
				}, b().done(function (a) {
						g.modal("hide"),
						a.status ? (e.alert("success", "数据转移成功！"), f._onSuccess(a)) : e.alert("error", a.message)
					}), h)
			}
		}
	})
})