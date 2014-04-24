define("app/widget/system/candidate-fields/config/main", ["require", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "template!app/widget/system/candidate-fields/config/text.html", "template!app/widget/system/candidate-fields/config/multiline.html", "template!app/widget/system/candidate-fields/config/radio.html", "template!app/widget/system/candidate-fields/config/checkbox.html", "template!app/widget/system/candidate-fields/config/dropdown.html", "template!app/widget/system/candidate-fields/config/date.html", "shared/helper/utils", "jquery.ui"], function (a, b, c, d, e, f, g, h, i, j, k) {
	function l(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function m(a) {
		function c() {
			var a = b(this),
			c = a.prop("tagName"),
			e = a.attr("type"),
			f = a.attr("name"),
			g = a.val().trim();
			if ("INPUT" === c)
				if ("text" === e)
					if ("option" === f) {
						var h = [];
						d.$element.find('[name="option"]').each(function () {
							h.push(b(this).val().trim())
						}),
						d._json.options = h
					} else
						d._json[f] = g;
				else
					"radio" === e && "required" === f && (g = "true" === g, d._json[f] = g);
			d.publish("system/customize/form/update", d._json)
		}
		var d = this;
		d.$element.on("input", 'input[type="text"]', c),
		d.$element.on("change", 'input[type="radio"]', c),
		a.resolve()
	}
	var n = {
		text : f,
		multiline : g,
		radio : h,
		checkbox : i,
		dropdown : j,
		date : k
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			l.call(this, b)
		},
		"sig/start" : function (a, b) {
			m.call(this, b)
		},
		"hub/system/customize/form/config" : function (a, b) {
			var c = this;
			if (b) {
				var d = b.type;
				c._json = b,
				c.html(n[d], b)
			}
		},
		"dom/action.click" : b.noop,
		"dom/action/remove/option.click" : function (a, c) {
			c.preventDefault();
			var d = this,
			e = b(c.target);
			e.closest("div").remove();
			var f = [];
			d.$element.find('[name="option"]').each(function () {
				f.push(b(this).val().trim())
			}),
			d._json.options = f,
			d.publish("system/customize/form/update", d._json)
		},
		"dom/action/add/option.click" : function (a, c) {
			c.preventDefault();
			var d = this,
			e = b(c.target);
			e.closest("div").before('<div><input type="text" value="" name="option"> <a href="#" data-action="remove/option"><i class="icon-remove"></i></a></div>');
			var f = [];
			d.$element.find('[name="option"]').each(function () {
				f.push(b(this).val().trim())
			}),
			d._json.options = f,
			d.publish("system/customize/form/update", d._json)
		}
	})
})