define("shared/services/comet", ["troopjs-core/component/service", "jquery", "troopjs-utils/deferred", "shared/helper/utils"], function (a, b, c, d) {
	function e() {
		var a = this;
		a.abort || setTimeout(function () {
			f.call(a, a.url)
		}, m)
	}
	function f() {
		var a = this;
		a.ajax = b.ajax({
				url : a.url,
				type : "get",
				dataType : "json",
				timeout : l
			}).done(function (b) {
				b.status && a.publish("comet/" + a.name, b),
				e.call(a)
			}).fail(function () {
				a.abort || j > n && (e.call(a), n++)
			})
	}
	function g(a, b) {
		var c = this;
		if (o[b]) {
			if (o[b] !== a)
				throw "Comet " + b + " has been occupied! Establish comet error!";
			h.apply(c, arguments)
		} else
			h.apply(c, arguments)
	}
	function h(a, b) {
		var c = this;
		o[b] = a,
		c.url = a + "?cid=" + k,
		c.name = b,
		f.call(c)
	}
	function i() {
		var a = this;
		b(window).bind("beforeunload", function () {
			a.disconnect(a.name);
			var b = localStorage.getItem("tabs"),
			c = JSON.parse(b);
			c && 1 !== c.length ? (c = c.filter(function (a) {
						return a !== k
					}), localStorage.setItem("tabs", JSON.stringify(c))) : localStorage.removeItem("tabs"),
			p && localStorage.removeItem("comet")
		})
	}
	var j = 3,
	k = (new Date).getTime(),
	l = 3e5,
	m = 3e3,
	n = 0,
	o = {},
	p = !1,
	q = localStorage.getItem("tabs"),
	r = localStorage.getItem("comet");
	if (q && r) {
		var s = JSON.parse(q);
		s.push(k),
		localStorage.setItem("tabs", JSON.stringify(s))
	} else
		localStorage.setItem("tabs", JSON.stringify([k])), localStorage.setItem("comet", k), p = !0;
	return a.extend({
		connect : function (a, e) {
			var f = this;
			p && g.call(f, a, e),
			window.addEventListener("storage", function (h) {
				var i = h.key;
				switch (i) {
				case "comet":
					if (!h.newValue) {
						var j = localStorage.getItem("tabs"),
						l = JSON.parse(j);
						b.isArray(l) && l[0] === k && (p = !0, g.call(f, a, e), localStorage.setItem("comet", k))
					}
					break;
				case "notification":
					var m = h.newValue;
					if (m && m.length) {
						m = JSON.parse(m);
						var n = b("<div></div>"),
						o = c();
						o.done(function () {
							d.alert("notifiy", n.get(0).outerHTML, !1)
						}),
						n.data("json", m).attr("data-weave", "app/widget/common/notification/main(json)").weave(o)
					}
				}
			}, !1),
			i.call(f)
		},
		disconnect : function () {
			var a = this;
			p && (a.abort = !0, a.ajax.abort())
		}
	})
})