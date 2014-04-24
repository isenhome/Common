define("shared/widget/common/quick-search/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html", "template!./suggestion.html"], function (a, b, c, d, e, f) {
	function g(b) {
		var d = this;
		clearTimeout(l),
		l = setTimeout(function () {
				var e = new Date;
				o.push(e),
				d.publish("ajax", {
					url : p.SEARCH + window.encodeURIComponent(b)
				}, c().done(function (b) {
						if (o[o.length - 1] === e) {
							var c = a(f(b));
							n = b.candidate.length + b.client.length + b.joborder.length,
							n ? (d.$suggestion.html(c), c.find("[data-weave]").weave(), d.$suggestion.removeClass("hide")) : (m = -1, d.$suggestion.addClass("hide")),
							o = []
						}
					}))
			}, 300)
	}
	function h(a, b) {
		var c,
		d = this;
		"up" === b ? m >= 0 ? m-- : m = n : n > m ? m++ : m = 0,
		d.$element.find(".suggestion-item").removeClass("hover"),
		c = d.$element.find(".suggestion-item").eq(m).addClass("hover"),
		a.val(c.find(".name").text()),
		(-1 === m || m === n) && a.val(k || "")
	}
	function i(a) {
		var b = this;
		b.html(e, a)
	}
	function j(b) {
		var c = this;
		c.$suggestion = c.$element.find(".quick-search-suggestion"),
		c.$element.on("mouseenter mouseleave", ".suggestion-item", function (b) {
			"mouseleave" === b.type ? (a(this).removeClass("hover"), m = -1) : "mouseenter" === b.type && (a(this).addClass("hover"), m = c.$element.find(".suggestion-item").index(a(this)))
		}).on("click", ".suggestion-item", function () {
			window.location = a(this).data("url")
		}),
		b.resolve()
	}
	var k,
	l,
	m = -1,
	n = 0,
	o = [],
	p = {
		SEARCH : "/rest/data/quick_search?name="
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"sig/start" : function (a, b) {
			j.call(this, b)
		},
		"dom/action.submit.keyup" : a.noop,
		"dom/action/submit.submit" : function () {
			return !1
		},
		"dom/action/quick/search.keyup" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = c.originalEvent.keyCode,
			i = e.val();
			if (!i.length)
				return m = -1, d.$suggestion.addClass("hide"), void 0;
			switch (f) {
			case 38:
				h.call(d, e, "up");
				break;
			case 40:
				h.call(d, e, "down");
				break;
			case 13:
				if (m > -1) {
					var j = d.$element.find(".suggestion-item").filter(".hover");
					window.location = j.data("url")
				}
				break;
			default:
				k = i,
				g.call(d, i)
			}
		},
		"dom/action/suggestion/item.mouseout.mousein" : function (b, c) {
			a(c.target)
		},
		"hub/quick/search/show" : function () {
			var b = this;
			b.$element.removeClass("hide"),
			b.$element.find("input")[0].focus(),
			a(document).on("click", function (c) {
				var d = a(c.target);
				d.closest(b.$element).length || (m = -1, b.$element.addClass("hide"), b.$suggestion.addClass("hide"), b.$element.find("input").val(""), k = null, b.publish("header/quick/search/show"), a(document).off(c))
			})
		}
	})
})