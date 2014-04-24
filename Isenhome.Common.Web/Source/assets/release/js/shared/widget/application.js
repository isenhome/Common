define("shared/widget/application", ["jquery", "troopjs-utils/deferred", "troopjs-utils/when", "troopjs-utils/tr", "troopjs-utils/grep", "troopjs-utils/uri", "troopjs-core/widget/application", "troopjs-core/route/router", "shared/services/error-handling", "shared/helper/ajax"], function (a, b, c, d, e, f, g, h, i, j) {
	function k(e, f) {
		var g = this,
		h = d.call(l, function (a) {
				return b(function (b) {
					a.signal(e, b)
				})
			});
		return f && c.apply(a, h).then(f.resolve, f.reject, f.notify),
		g.publish("application/signal/" + e, f),
		g
	}
	var l = [h(a(window)), i(), j()];
	return g.extend({
		"sig/initialize" : k,
		"sig/finalize" : k,
		"sig/start" : k,
		"sig/stop" : k
	})
})