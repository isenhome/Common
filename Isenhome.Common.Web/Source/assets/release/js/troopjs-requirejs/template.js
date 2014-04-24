define("troopjs-requirejs/template", [], function () {
	function a(a) {
		function b(a, b, c) {
			return l[m] = b ? '" +' + c + '+ "' : '";' + c + 'o += "',
			"<%" + String(m++) + "%>"
		}
		function j(a, b) {
			return l[b]
		}
		function k(a, b) {
			return i[b] || b
		}
		var l = [],
		m = 0;
		return ('function template(data) { var o = "' + a.replace(c, "").replace(d, b).replace(f, k).replace(e, j) + '"; return o; }').replace(g, h)
	}
	var b = {
		node : function () {
			var a = require.nodeRequire("fs");
			return function (b, c) {
				c(a.readFileSync(b, "utf8"))
			}
		},
		browser : function () {
			var a,
			b,
			c,
			d = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"];
			if ("undefined" == typeof XMLHttpRequest) {
				for (c = 0; 3 > c; c++) {
					a = d[c];
					try {
						b = ActiveXObject(a);
						break
					} catch (e) {}

				}
				throw new Error("XHR: XMLHttpRequest not available")
			}
			return b = XMLHttpRequest,
			function (a, c) {
				var d = new b;
				d.open("GET", a, !0),
				d.onreadystatechange = function () {
					4 === d.readyState && c(d.responseText)
				},
				d.send(null)
			}
		},
		rhino : function () {
			var a = "utf-8",
			b = java.lang.System.getProperty("line.separator");
			return function (c, d) {
				var e,
				f = new java.io.File(c),
				g = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(f), a)),
				h = new java.lang.StringBuffer,
				i = "";
				try {
					for (e = g.readLine(), e && e.length() && 65279 === e.charAt(0) && (e = e.substring(1)), h.append(e); null !== (e = g.readLine()); )
						h.append(b), h.append(e);
					i = String(h.toString())
				}
				finally {
					g.close()
				}
				d(i)
			}
		},
		borked : function () {
			return function () {
				throw new Error("Environment unsupported.")
			}
		}
	},
	c = /^[\t]+|[\t]+$/g,
	d = /<%(=)?([\S\s]*?)%>/g,
	e = /<%(\d+)%>/gm,
	f = /(["\t])/gm,
	g = /o \+= "";| \+ ""/gm,
	h = "",
	i = {
		'"' : '\\"',
		"" : "\",
		"	" : "\\t",
		"" : "\"
	},
	j = {},
	k = b["undefined" != typeof process && process.versions && process.versions.node ? "node" : "undefined" != typeof window && window.navigator && window.document || "undefined" != typeof importScripts ? "browser" : "undefined" != typeof Packages ? "rhino" : "borked"]();
	return {
		load : function (b, c, d, e) {
			var f = c.toUrl(b);
			k(f, function (g) {
				try {
					g = "define(function() { return " + a(g, b, f, e.template) + "; })"
				} catch (h) {
					throw h.message = "In " + f + ", " + h.message,
					h
				}
				e.isBuild ? j[b] = g : g += "//@ sourceURL='" + f + "'",
				d.fromText(b, g),
				c([b], function (a) {
					d(a)
				})
			})
		},
		write : function (a, b, c) {
			j.hasOwnProperty(b) && c.asModule(a + "!" + b, j[b])
		}
	}
})