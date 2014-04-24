define("shared/widget/common/select-template/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.type ? b.publish("ajax", {
			url : g.TEMPLATE.replace("<type>", b.type)
		}, c().done(function (c) {
				b._json = c,
				b._options = [],
				c.system && (b._options = b._options.concat(c.system)),
				c.user && (b._options = b._options.concat(c.user)),
				b.html(d, b._json, a)
			})) : a.resolve()
	}
	var g = {
		TEMPLATE : "/rest/data/emailtemplate/<type>",
		CHOOSE_TEMPLATE : "/rest/data/choosetemplate/<id>"
	};
	return b.extend(function (a, b, c) {
		this.type = c
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"dom/action.change" : a.noop,
		"dom/action/template.change" : function (b, d) {
			var f = this,
			h = a(d.target),
			i = h.val();
			if (i) {
				var j = f._options.filter(function (a) {
						return a.id == i
					})[0],
				k = f.$element.data("variable");
				a.isEmptyObject(k) ? f.publish("email/template/switch", j) : f.publish("ajax", {
					url : g.CHOOSE_TEMPLATE.replace("<id>", j.id),
					data : k
				}, c().done(function (a) {
						a.status ? (j.content = a.data.content, j.title = a.data.title, f.publish("email/template/switch", j)) : e.alert("error", a.message)
					}))
			}
		}
	})
})