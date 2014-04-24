define("app/widget/common/custom-fields/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "template!./text.html", "template!./multiline.html", "template!./radio.html", "template!./checkbox.html", "template!./dropdown.html", "template!./date.html"], function (a, b, c, d, e, f, g, h, i, j, k) {
	function l(a) {
		var b = this;
		b.publish("ajax", {
			url : o.TABLE.replace("<table>", b._table)
		}, c().done(function (c) {
				b._fields = c,
				a.resolve()
			}))
	}
	function m(b) {
		var e,
		f = this,
		g = [];
		f._fields.length ? (f._fields.forEach(function (a) {
				e = c(),
				e.done(function () {
					var b = a.mapping,
					c = f._json[b] ? f._json[b].value : "";
					if (c)
						switch (a.type) {
						case "dropdown":
							f.$element.find('select[name="' + b + '"]').val(c);
							break;
						case "radio":
							f.$element.find('input[name="' + b + '"]').filter('[value="' + c + '"]').prop("checked", !0);
							break;
						case "checkbox":
							var d = c.split(",");
							d.forEach(function (a) {
								f.$element.find('input[name="' + b + '"]').filter('[value="' + a + '"]').prop("checked", !0)
							});
							break;
						default:
							f.$element.find('input[name="' + b + '"]').val(c)
						}
				}),
				g.push(e.promise()),
				a.options && (a.options = JSON.parse(a.options)),
				f.append(n[a.type], a, e)
			}), d.apply(a, g).done(function () {
				f.$element.find(".control-group").last().addClass("formSep"),
				b.resolve()
			})) : b.resolve()
	}
	var n = {
		text : f,
		multiline : g,
		radio : h,
		checkbox : i,
		dropdown : j,
		date : k
	},
	o = {
		TABLE : "/rest/data/fields?table=<table>"
	};
	return b.extend(function (a, b, c, d) {
		this._table = c,
		this._json = d
	}, {
		"sig/initialize" : function (a, b) {
			l.call(this, b)
		},
		"sig/start" : function (a, b) {
			m.call(this, b)
		}
	})
})