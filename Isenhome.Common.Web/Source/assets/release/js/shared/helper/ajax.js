define("shared/helper/ajax", ["compose", "jquery", "troopjs-core/remote/ajax", "troopjs-utils/deferred", "shared/helper/utils"], function (a, b, c, d, e) {
	var f;
	return c.extend({
		"hub/ajax" : a.around(function (a) {
			return function (c, g, h, i) {
				var j = this,
				k = h || d();
				i && i instanceof b && i.prop("disabled", !0);
				try {
					k.fail(function (a) {
						try {
							switch (a.status) {
							case 500:
								e.alert("error", JSON.parse(a.responseText).message);
								break;
							case 404:
								e.alert("error", "请求地址错误!");
								break;
							default:
								e.alert("error")
							}
						} catch (b) {
							e.alert("error"),
							j.publish("error/log", b.message, b.stack, {
								response : a
							})
						}
					}).always(function (a) {
						i && i.prop("disabled", !1),
						a.status === f || a.status || "login required" !== a.message || (e.alert("error", "登录超时,跳转到登录页面..."), window.setTimeout(function () {
								window.location.reload()
							}, 800))
					}),
					a.call(this, c, g, k)
				} catch (l) {
					i && i.prop("disabled", !1),
					j.publish("error/log", l.message, l.stack)
				}
			}
		})
	})
})