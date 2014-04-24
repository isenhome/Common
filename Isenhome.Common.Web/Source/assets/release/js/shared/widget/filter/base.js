define("shared/widget/filter/base", ["compose", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "shared/widget/filter/query", "config"], function (a, b, c, d, e, f) {
	function g() {
		var a = this.$element.find(".save-filter"),
		b = this.$element.find(".deletable");
		b.filter(":visible").length ? a.removeClass("hide") : a.addClass("hide")
	}
	function h() {
		this.publish("make/route", {
			filter : f.toString(),
			page : 1
		})
	}
	return c.extend({
		"hub:memory/filter/set" : function (a, b) {
			var c = this;
			if (!c._setFilter)
				throw "Derive class must implement _setFilter method.";
			f.reset();
			var d = function () {
				var a = [];
				if (!b)
					return a;
				var c,
				d = b.split("&");
				for (var e in d)
					c = d[e].split("="), a.push(c);
				return a
			}
			();
			c.$element.find(".deletable").addClass("hide");
			for (var e = d.length; e--; )
				c._setFilter.call(c, d[e]);
			g.call(c)
		},
		"hub:memory/reset/filter" : function () {
			f.reset()
		},
		"dom/action.click" : b.noop,
		"dom/action/form.click" : function (a, c, d) {
			c.preventDefault();
			var e = this,
			i = b(c.target),
			j = i.closest("form"),
			k = i.closest(".dropdown");
			f[d](j),
			g.call(e),
			k.removeClass("open"),
			h.call(e)
		},
		"dom/action/tag/remove.click" : function (a, c) {
			var d = b(c.target);
			d.addClass("hide"),
			g.call(this),
			f.deleteQuery(d.data("query")),
			h.call(this)
		},
		"dom/action/filter/save/toggle.click" : function (a, c) {
			c.preventDefault();
			var d = this,
			e = b(c.target);
			e.hasClass("save-filter") ? e.addClass("hide") : g.call(d),
			d.$element.find(".save-filter-form").toggleClass("hide")
		},
		"dom/action/filter/save.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target),
			e = d.closest("form"),
			g = e.find("input"),
			h = b.trim(g.val());
			h.length && (f.save.call(this, h), g.val(""))
		},
		"dom/action/filter/search.click" : function () {
			h.call(this)
		},
		"dom/action/dropdown.click" : function (a, c) {
			c.preventDefault();
			var d = this,
			e = b(c.target),
			f = e.siblings(".dropdown-menu"),
			g = b(document),
			h = e.closest("li");
			d.$element.find(".dropdown").removeClass("open"),
			h.toggleClass("open"),
			g.on("click.filter.dropdown", function (a) {
				var c = b(a.target);
				c.closest(".tt-suggestion").length || c.closest(f).length || c.closest("#ui-datepicker-div").length || !h.hasClass("open") || (h.removeClass("open"), g.off("click.filter.dropdown"))
			})
		},
		"dom/action/moreless.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target);
			this.$element.find("li.divider.last-show").nextUntil(".filter-toggle").toggleClass("hide"),
			d.find("span").toggleClass("icon-arrow-right icon-arrow-left")
		}
	})
})