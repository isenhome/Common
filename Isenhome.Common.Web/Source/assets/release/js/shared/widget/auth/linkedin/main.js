define("shared/widget/auth/linkedin/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e) {
	function f(b) {
		var f = this;
		f.publish("ajax", {
			url : g.ISBINDED
		}, c().done(function (h) {
				h.status ? (f._json.isbinded = h.data.binded && h.data.expire >= 0 ? !0 : !1, f._json.isbinded ? f.publish("ajax", {
						url : g.LINKEDIN_PROFILE
					}, c().done(function (c) {
							a.extend(f._json, c, !0),
							f.html(e, f._json, b)
						})) : (f._json.isbinded = !1, f.html(e, f._json, b))) : (d.alert("error", h.message), f.html(e, f._json, b))
			}))
	}
	var g = {
		ISBINDED : "/rest/linkedin/isbinded",
		LINKEDIN_PROFILE : "/rest/linkedin/profile/~",
		REVOKE : "/rest/linkedin/revoke"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			d.widgetLoaded.call(this),
			b.resolve()
		},
		"dom/action.click" : a.noop,
		"dom/action/revoke.click" : function (a, b) {
			b.preventDefault();
			var d = this;
			d.publish("ajax", {
				url : g.REVOKE
			}, c().done(function (a) {
					a.status && window.location.reload()
				}))
		}
	})
})