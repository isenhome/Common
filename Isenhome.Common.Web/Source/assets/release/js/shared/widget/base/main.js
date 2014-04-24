define("shared/widget/base/main", ["compose", "jquery", "troopjs-core/component/widget", "troopjs-utils/deferred", "shared/helper/utils"], function (a, b, c) {
	function d(a) {
		a.resolve()
	}
	return c.extend(function () {
		var a = this;
		a._json = {}

	}, {
		"sig/initialize" : function (a, b) {
			d.call(this, b)
		},
		formatCurrency : function (a) {
			if (isNaN(a))
				return a;
			for (var b, c = 0 > a ? "-" : "", d = Math.abs(a).toString().split("."), e = d[0], f = d.length > 1 ? "." + d[1] : "", g = e.length, h = g - 1, i = []; h >= 0; )
				h > 2 ? i.unshift(e.slice(h - 2, h + 1)) : i.unshift(e.slice(0, h + 1)), h -= 3;
			return b = i.length > 1 ? i.join(",") : i[0],
			c + b + f
		},
		formatDate : function (a) {
			try {
				var b = new Date(a.replace(/-/g, "/"));
				return [b.getFullYear(), b.getMonth() + 1, b.getDate()].join("-")
			} catch (c) {
				throw c
			}
		},
		getKeyValues : function (a, b) {
			for (var c = [], d = 0; d < a.length; d += 1)
				c.push(a[d][b]);
			return c.join(",")
		},
		convertText : function (a) {
			return a ? a.replace(/()|()/g, "<br>") : ""
		}
	})
})