define("shared/widget/common/slide-helper/base", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "jquery.ui"], function (a, b) {
	function c() {
		var b = this;
		e = a(window).height() - 105,
		b.$element.height(e)
	}
	function d(b) {
		var d = this,
		e = d.$element,
		h = e.find(".handle"),
		i = e.find("iframe"),
		j = e.find(".resize-mask");
		d.$inner = e.find(".inner"),
		e.resizable({
			maxWidth : f,
			minWidth : g,
			handles : {
				w : h
			},
			start : function () {
				i.length && j.css("zIndex", 1),
				e.removeClass("max").removeClass("min")
			},
			stop : function () {
				var a = e.width();
				a === f ? e.addClass("open max").removeClass("min") : a === g && e.removeClass("open max").addClass("min"),
				i.length && j.css("zIndex", -1)
			}
		}),
		a(window).resize(function () {
			c.call(d)
		}),
		b.resolve()
	}
	var e,
	f = 600,
	g = 10;
	return b.extend(function () {
		var a = this;
		c.call(a)
	}, {
		"sig/start" : function (a, b) {
			d.call(this, b)
		},
		"hub:memory/route" : function () {
			this.$element.addClass("hide")
		},
		"dom/action.dblclick.click" : a.noop,
		"dom/action/slide/helper/toggle.dblclick" : function () {
			var a = this,
			b = a.$element;
			b.hasClass("open") ? b.removeClass("open max").addClass("min") : b.addClass("open max").removeClass("min")
		},
		"dom/action/slide/helper/close.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$element.addClass("hide")
		},
		"hub/slide/helper/close" : function () {
			var a = this;
			a.$element.addClass("hide")
		}
	})
})