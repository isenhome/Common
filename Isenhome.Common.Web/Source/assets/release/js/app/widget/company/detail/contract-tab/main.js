define("app/widget/company/detail/contract-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		a.publish("ajax", {
			url : h.CONTRACT.replace("<id>", a.id)
		}, c().done(function (b) {
				a._json = b,
				a.html(f, a._json),
				e.widgetLoaded.call(a)
			}))
	}
	var h = {
		CONTRACT : "/rest/client/<id>/contracts",
		ADD_CONTRACT : "/rest/client/contractadd"
	};
	return b.extend(function (a, b, c, d) {
		this.id = c,
		this.islimited = d,
		this._json = []
	}, {
		reload : function () {
			this._json = [],
			g.call(this)
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._context = b.user,
			g.call(c)
		},
		"dom/action.click" : a.noop,
		"dom/action/add/contract.click" : function (b, c) {
			var d = this;
			a(c.target),
			d.publish("modal/add/contract/show", h.ADD_CONTRACT, d.id, function (a) {
				a.status ? (d.publish("company/update/count", "contract"), d.reload()) : e.alert("error", a.message)
			})
		},
		"dom/action/open/edit/contract.click" : function (a, b, c) {
			b.preventDefault();
			var d = this,
			f = function () {
				for (var a, b = 0, e = d._json.length; e > b; b++)
					if (d._json[b].id === c) {
						a = d._json[b];
						break
					}
				return a
			}
			();
			d.publish("modal/add/contract/show", h.ADD_CONTRACT, d.id, function (a) {
				a.status ? d.reload() : e.alert("error")
			}, f)
		}
	})
})