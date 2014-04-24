define("app/widget/modal/auto-share/main", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function h(a) {
		a.resolve()
	}
	var i = {
		VALID : "/rest/candidate/autoshare"
	};
	return d.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"hub/modal/auto-share/show" : function (a, b) {
			var c = this,
			d = c.$element;
			c._type = b.type,
			c._val = b.val,
			c._onSuccess = b.onSuccess,
			d.modal("show")
		},
		"dom/action.click" : b.noop,
		"dom/action/valid.click" : function () {
			var a = this,
			b = a.$element;
			b.find('[name="date"]');
			var d;
			a.$form.valid() && (d = {
					email : a.$email.val(),
					mobile : a.$mobile.val()
				}, a.publish("ajax", {
					url : i.VALID,
					data : {
						data : JSON.stringify(d)
					},
					type : "post"
				}, c().done(function (b) {
						b.status ? b.data ? (f.alert("success", "验证成功！"), a._onSuccess && a._onSuccess(b)) : f.alert("error", "验证不匹配！") : f.alert("error", "验证不匹配！")
					})), b.modal("hide"))
		},
		"dom/action/confirm.click" : function () {
			var a = this,
			b = a.$element,
			d = {};
			d[a._type] = a._val,
			a.publish("ajax", {
				url : i.VALID,
				data : {
					data : JSON.stringify(d)
				},
				type : "post"
			}, c().done(function (b) {
					b.status ? b.data ? (f.alert("success", "自动验证共享成功！"), a._onSuccess && a._onSuccess(b)) : f.alert("error") : f.alert("error")
				})),
			b.modal("hide")
		}
	})
})