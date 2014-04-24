define("shared/services/route", ["jquery", "troopjs-core/component/service", "troopjs-utils/uri"], function (a, b, c) {
	function d() {
		var a,
		b = {},
		d = c(window.location.hash.replace(/^#/, "")).path,
		e = 0,
		g = d ? d.length : null;
		if (g)
			for (e; g > e; e++)
				a = d[e].split(f), b[a[0]] = a[1] || "";
		return b
	}
	var e,
	f = "!",
	g = "filter/get/count";
	return b.extend({
		"hub:memory/service/route" : function (a, b) {
			var c = this,
			d = b.path;
			d && c.publish("list/set/filter", d)
		},
		"hub:memory/make/route" : function (b, c) {
			var f,
			h,
			i = this,
			j = 0,
			k = [],
			l = d();
			typeof l.add !== e && (delete l.add, l.list = ""),
			typeof l.detail !== e && (delete l.detail, l.list = ""),
			typeof l.merge !== e && (delete l.merge, l.list = ""),
			typeof l.compose !== e && (delete l.compose, l.list = ""),
			a.extend(l, c);
			for (f in l)
				k[j] = f + (l[f].toString().length ? "!" + l[f] : ""), j++;
			h = k.join("/"),
			window.location.hash.substring(1) === h ? i.publish(g, null) : window.location.hash = h
		}
	})
})