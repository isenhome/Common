define("app/widget/job/add/contacts", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./contacts.html", "template!./client-contact.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.html(d, a)
	}
	function g(b) {
		var d,
		f = this;
		f.$label = f.$element.find("label"),
		d = f._json ? function () {
			var a = [];
			return f._json.forEach(function (b) {
				a.push({
					id : b.clientContact.id,
					userId : f.userId
				})
			}),
			a
		}
		() : [{
				userId : f.userId
			}
		];
		var g = a(e(d));
		g.find("[data-weave]").weave(c().done(function () {
				f.$label.after(g)
			})),
		b.resolve()
	}
	return b.extend(function (a, b, c, d) {
		this._json = d,
		this.userId = c
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/add/contact.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target),
			h = a(e([{
								userId : f.userId
							}
						]));
			h.find("[data-weave]").weave(c().done(function () {
					g.closest("div").before(h)
				}))
		},
		"dom/action/remove/contact.click" : function (b, c) {
			c.preventDefault(),
			a(c.target).closest(".controls-contact").remove()
		}
	})
})