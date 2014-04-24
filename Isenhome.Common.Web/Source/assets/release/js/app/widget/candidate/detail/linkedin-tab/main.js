define("app/widget/candidate/detail/linkedin-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.publish("ajax", {
			url : g.PROFILE.replace("<url>", b._url)
		}, c().done(function (c) {
				c.status ? (b._json = c, b.html(e, b._json, a)) : 401 === c.message ? d.alert("error", 'Linkedin绑定已过期，请点击<a href="/bind/oauth" tagert="_blank">此处</a>重新绑定!') : 404 === c.message ? d.alert("error", "此Linkedin的PublicURL已经移除!") : d.alert("error", c.message)
			}))
	}
	var g = {
		PROFILE : "/rest/linkedin/profile/url=<url>"
	};
	return b.extend(function (a, b, c) {
		this._url = c
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			d.widgetLoaded.call(this),
			b.resolve()
		}
	})
})