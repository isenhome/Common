define("shared/services/load-context", ["compose", "troopjs-core/component/service", "troopjs-utils/when", "config"], function (a, b, c, d) {
	var e,
	f = {
		CONTEXT : "/rest/user/context"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			var c = this;
			"/" !== window.location.pathname ? $.get(f.CONTEXT).done(function (a) {
				var f = a;
				d.userLang = f.status !== e && !f.status || !f.user.lang ? "zh_CN" : f.user.lang,
				window.localStorage.setItem("lang", d.userLang),
				d.userContext = f,
				c.publish("context", f),
				b.resolve()
			}) : (c.publish("context", null), b.resolve())
		}
	})
})