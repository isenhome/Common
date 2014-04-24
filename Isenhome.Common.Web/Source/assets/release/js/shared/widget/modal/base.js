define("shared/widget/modal/base", ["jquery", "troopjs-utils/deferred", "shared/widget/base/main"], function (a, b, c) {
	var d = "shared/widget/common/add-share",
	e = "shared/widget/common/comtree/main",
	f = "shared/widget/common/tagit/main",
	g = function (b) {
		var c = a(this);
		if (a(b.target).hasClass("modal") && c.find("form").length) {
			var g = c.find("form"),
			h = c.find('[data-woven*="' + d + '"]'),
			i = c.find('[data-woven*="' + e + '"]'),
			j = c.find('[data-woven*="' + f + '"]');
			g[0].reset(),
			a.isEmptyObject(g.data("validator")) || (g.find(".f_error").removeClass("f_error"), g.data("validator").resetForm()),
			i.each(function () {
				a(this).woven()[0].reset && a(this).woven()[0].reset()
			}),
			j.length && j.tagit("removeAll"),
			h.length && h.woven()[0].reRender()
		}
	};
	return c.extend({
		"sig/start" : function (a, b) {
			this.$element.on("hidden", g),
			b.resolve()
		},
		"hub/modal/unregister/cleanup" : function () {
			this.$element.off("hidden", g)
		},
		"hub/modal/register/cleanup" : function () {
			this.$element.on("hidden", g)
		},
		"dom/action/close.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$element.modal("hide")
		}
	})
})