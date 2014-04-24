define("shared/widget/page-route/main", ["require", "jquery", "troopjs-core/component/widget", "troopjs-utils/deferred", "shared/services/route", "template!./list.html", "template!./detail.html", "template!./add.html", "template!./merge.html"], function (a, b, c, d, e) {
	function f(a) {
		var b = this,
		c = "",
		d = a.source;
		if (h.test(d))
			c = "list", "list" === d && b.publish(p);
		else if (i.test(d))
			c = "detail", b.publish(l, RegExp.$1);
		else if (j.test(d)) {
			c = "add";
			var e = d.split("!");
			/^id/.test(e[1]) ? (b.publish(m, e[1].split("=")[1]), b.publish("add/other/change", g)) : /^(id)|(file)|(company)/.test(e[1]) ? b.publish("add/other/change", e[1].split("=")[1]) : (b.publish(m, g), b.publish("add/other/change", g))
		} else {
			if (!k.test(d))
				return window.location.hash = "#list", void 0;
			c = "merge",
			b.publish(n, RegExp.$1)
		}
		return c
	}
	var g,
	h = /^list/,
	i = /^detail!id=(.+)/,
	j = /^add/,
	k = /^merge!id=(\d+)$/,
	l = "detail/id/change",
	m = "add/id/change",
	n = "merge/id/change",
	o = "service/route",
	p = "sidebar/set/default";
	return c.extend(function (a) {
		e().start(),
		this._app = b(a).data("app") || "app",
		this._currentType
	}, {
		"hub:memory/route" : function (a, b) {
			var c = this,
			d = f.call(c, b),
			e = window.location.pathname.substring(1).split("/");
			e.length > 1 ? (c._app = e[0], c._type = c._type || e[1]) : c._type = c._type || e[0],
			d && c.render(d),
			c.publish(o, b)
		},
		render : function (b) {
			var c = this;
			c._currentType !== b && (a(["template!./" + b + ".html"], function (a) {
					c.html(a, {
						type : c._type,
						app : c._app
					})
				}), c._currentType = b)
		}
	})
})