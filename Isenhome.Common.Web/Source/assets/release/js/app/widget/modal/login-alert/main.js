define("app/widget/modal/login-alert/main", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g) {
	function h() {
		var a = this;
		a.publish("ajax", {
			url : j.CONFIG,
			type : "get",
			cache : !1
		}, c().done(function (b) {
				if (b.length) {
					var d = b[0];
					a._json = JSON.parse(d.value)
				}
				c(function (b) {
					a.html(e, a._json, b)
				}).done(function () {
					i.call(a)
				})
			}))
	}
	function i() {
		var a = this,
		b = a.$element;
		a.$form = b.find("form"),
		a.$receiver = b.find('[name="receiver"]'),
		a.$times = b.find('[name="times"]'),
		g(a.$form, {
			rules : {
				times : {
					required : !0
				}
			}
		})
	}
	var j = {
		CONFIG : "/rest/data/configvalue?keys=loginlog_alert",
		CONFIG_ADD : "/rest/data/configvalue/add"
	};
	return d.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			b.user.emailpassword && (c.emailEnabled = !0),
			h.call(this)
		},
		"hub/modal/login-alert/show" : function () {
			var a = this,
			b = a.$element;
			b.find(".modal-footer button"),
			b.find(".text_line"),
			b.modal("show")
		},
		"dom/action.click" : b.noop,
		"dom/action/save.click" : function (a, d) {
			d.preventDefault();
			var e = this,
			g = e.$element,
			h = b(d.targt);
			if (e.$form.valid()) {
				var i = JSON.stringify({
						times : parseInt(e.$times.val(), 10),
						emailto : e.$receiver.val()
					}),
				k = {
					type : "",
					name : "loginlog_alert",
					value : i
				};
				g.modal("hide"),
				e.publish("ajax", {
					url : j.CONFIG_ADD,
					data : {
						data : JSON.stringify(k)
					},
					type : "post"
				}, c().done(function (a) {
						g.modal("hide"),
						a.status ? f.alert("success", "设置成功！") : f.alert("error", a.message)
					}), h)
			}
		}
	})
})