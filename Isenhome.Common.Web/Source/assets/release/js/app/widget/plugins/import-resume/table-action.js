define("app/widget/plugins/import-resume/table-action", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./table-action.html", "shared/helper/utils"], function (a, b, c, d) {
	function e() {
		var b = this,
		c = [];
		b.$required.find(":checkbox:checked").each(function () {
			c.push(a(this).val())
		}),
		b.publish("plugins/import-resume/initial/load", {
			required : c.join(",")
		})
	}
	function f(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function g(a) {
		var b = this;
		b.$required = b.$element.find(".required"),
		b.$btnBatchAdd = b.$element.find('[data-action="batch/add"]'),
		e.call(b),
		a.resolve()
	}
	return b.extend({
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		"hub/plugins/import-resume/toggle/bacthadd" : function (b, c) {
			var d = this,
			e = c.filter(function (b, c) {
					return a(c).data("existed")
				});
			e.length ? d.$btnBatchAdd.addClass("disabled") : d.$btnBatchAdd.removeClass("disabled")
		},
		"dom/action.click.change" : a.noop,
		"dom/action/batch/add.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target);
			e.hasClass("disabled") || d.publish("plugins/import-resume/collect/selected", "import")
		},
		"dom/action/batch/delete.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish("plugins/import-resume/collect/selected", "delete")
		},
		"dom/action/dropdown.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = e.siblings(".dropdown-menu"),
			g = a(document),
			h = e.closest(".btn-group");
			d.$element.find(".btn-group").removeClass("open"),
			h.toggleClass("open"),
			g.on("click.btn.dropdown", function (b) {
				var c = a(b.target);
				!c.closest(f).length && h.hasClass("open") && (h.removeClass("open"), g.off("click.btn.dropdown"))
			})
		},
		"dom/action/required/filter.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			f = a(c.target);
			f.closest(".btn-group").removeClass("open"),
			e.call(d)
		}
	})
})