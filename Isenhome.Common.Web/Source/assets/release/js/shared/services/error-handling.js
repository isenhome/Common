define("shared/services/error-handling", ["jquery", "troopjs-core/component/service", "config"], function (a, b, c) {
	function d(b, d, f) {
		var g = this;
		if (!c.debug) {
			var h = {
				context : a.extend(!0, {
					url : window.location.href
				}, f),
				message : b,
				exc_text : d
			};
			return g.publish("ajax", {
				url : e,
				data : {
					data : JSON.stringify(h)
				},
				type : "post"
			}, a.Deferred()),
			!0
		}
	}
	var e = "/rest/data/errorlog";
	return b.extend({
		"sig/initialize" : function (a, b) {
			var e = this;
			c.debug || (window.onerror = function (a, b, c) {
				return d.call(e, a, {
					jsfile : b,
					line : c
				})
			}),
			b.resolve()
		},
		"hub:memory/error/log" : function (a, b, e, f) {
			var g = this;
			c.debug ? console.error(b) : d.call(g, b, e, f)
		}
	})
})