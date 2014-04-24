define("shared/widget/common/comtree/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/blurb", "jquery.tree"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		if (a === k || isNaN(a))
			b.$tree.tree("selectNode", null), b.$element.removeClass("on").find(".comtree-title span").text("请选择"), b.$hidden.val(null);
		else {
			var c = b.$tree.tree("getNodeById", a);
			c && (b.$tree.tree("selectNode", c), b.$element.removeClass("on").find(".comtree-title span").text(c.name), b.$hidden.data("text", c.name), b.$hidden.val(c.id))
		}
	}
	function h(a) {
		var b = this,
		c = b.$tree.tree("getNodeByName", a);
		c && (b.$tree.tree("selectNode", c), b.$element.removeClass("on").find(".comtree-title span").text(c.name), b.$hidden.data("text", c.name), b.$hidden.val(c.id))
	}
	function i(a) {
		var b = this;
		b._url ? b.publish("ajax", {
			url : b._url
		}, c().done(function (e) {
				b._json = e,
				c(function (a) {
					b.html(d, b._name, a)
				}).done(function () {
					j.call(b, a)
				})
			})) : c(function (a) {
			b.html(d, b._name, a)
		}).done(function () {
			j.call(b, a)
		})
	}
	function j(a) {
		var b = this;
		b.$drop = b.$element.find(".comtree-drop"),
		b.$tree = b.$element.find(".comtree-tree"),
		b.$search = b.$drop.find(".search input"),
		b.$hidden = b.$element.find('input[type="hidden"]'),
		b.$tree.tree({
			data : b._json
		}),
		b.$tree.on("tree.click tree.select", function (a) {
			var c = a.node;
			c && (b.$element.removeClass("on").find(".comtree-title span").text(c.name), b.$hidden.data("text", c.name), b.$hidden.val(c.id), b.$hidden.trigger("change"))
		}),
		b._id !== k && g.call(b, b._id),
		b._required && b.$element.find('input[type="hidden"]').addClass("required"),
		b.subscribe(b._hub, !0, function (a, c) {
			b.loadData(c)
		}),
		a.resolve()
	}
	var k;
	return {
		PLEASE_SELECT : f.t("Please select...")
	},
	b.extend(function (a, b, c) {
		var d = this;
		d._id = c,
		d._url = a.data("url"),
		d._name = a.data("name"),
		d._required = a.data("required"),
		d._hub = a.data("hub")
	}, {
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"sig/stop" : function (b, c) {
			a(document).off("mousedown.comtree"),
			c.resolve()
		},
		"dom/action.click.input.keyup.keydown" : a.noop,
		"dom/action/toggle/drop.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target),
			d.$element.hasClass("disabled") || (d.$search.width(d.$element.width() - 26), a(document).off("mousedown.comtree"), d.$element.toggleClass("on"), window.setTimeout(function () {
					a(document).on("mousedown.comtree", function (b) {
						a(b.target).closest(d.$element).length || (d.$element.removeClass("on"), a(this).off("mousedown.comtree"))
					})
				}, 50))
		},
		"dom/action/comtree/search.input.keyup.keydown" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.val().trim(),
			g = new RegExp(f.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
			f.length ? (d.$tree.find(".jqtree-folder").removeClass("jqtree-closed"), d.$tree.find(".jqtree-title").each(function () {
					g.test(a(this).text()) ? a(this).parent(".jqtree_common").removeClass("hide") : a(this).parent(".jqtree_common").addClass("hide")
				})) : (d.$tree.find(".jqtree-folder").addClass("jqtree-closed"), d.$tree.find(".jqtree_common").removeClass("hide"))
		},
		selectByName : function (a) {
			var b = this;
			a && h.call(b, a)
		},
		selectById : function (a) {
			var b = this;
			g.call(b, a)
		},
		getNodeNameById : function (a) {
			var b = this,
			c = b.$tree.tree("getNodeById", a);
			return c && c.name ? c.name : null
		},
		reset : function () {
			var a = this;
			g.call(a)
		},
		loadData : function (a) {
			var b = this;
			b.$tree.tree && (b._json = a, b.$tree.tree("loadData", b._json))
		}
	})
})