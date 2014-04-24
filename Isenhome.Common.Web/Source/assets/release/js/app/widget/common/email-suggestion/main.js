define("app/widget/common/email-suggestion/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "shared/helper/blurb", "jquery.tagit"], function (a, b, c, d, e) {
	function f(b) {
		var d = this,
		e = {
			tagLimit : d.tagLimit
		};
		a.extend(!0, e, {
			allowSpaces : !0,
			autocomplete : {
				source : function (a, b) {
					var e = this,
					f = e.element.tagit("assignedTags");
					d.publish("ajax", {
						url : g + window.encodeURIComponent(a.term)
					}, c().done(function (a) {
							var c = [],
							e = d.$element.data("emailType"),
							g = i;
							e && (g = e),
							a.forEach(function (a) {
								var b,
								d = [a.englishName, a.chineseName].join(" ").trim();
								g.forEach(function (e) {
									a[e] && (b = '"' + d + '" [' + h[e] + "]" + " <" + a[e] + ">", f.indexOf(b) < 0 && c.push(b))
								})
							}),
							b(c)
						}))
				}
			}
		}),
		d.$element.tagit(e),
		b.resolve()
	}
	var g = "/rest/candidate/email_autocomplete?email=",
	h = {
		email : e.t("Private email"),
		email1 : e.t("Work email"),
		email2 : e.t("Other")
	},
	i = ["email", "email1", "email2"];
	return b.extend(function () {
		this.tagLimit = this.$element.data("max")
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		}
	})
})