define("shared/widget/system/preference/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils", "shared/helper/validate", "config"], function (a, b, c, d, e, f, g, h, i) {
	function j(a) {
		var b = this;
		d(function (a) {
			b.html(f, b._json, a)
		}).done(function () {
			k.call(b, a)
		})
	}
	function k(a) {
		var b = this;
		b.$form = b.$element.find("form"),
		b.$peopleTag = b.$element.find('[name="people-tag"]'),
		b.$jobTag = b.$element.find('[name="job-tag"]'),
		h(b.$form, {
			rules : {
				language : {
					required : !0
				},
				"people-tag" : {
					required : !0
				},
				"job-tag" : {
					required : !0
				}
			}
		}),
		a.resolve()
	}
	function l() {
		var a = this,
		b = a.user.lang;
		b && a.$element.find('[value="' + b + '"]').prop("checked", !0)
	}
	var m = {
		USER_ADD : "/rest/user/changelanguage"
	};
	return c.extend({
		config : i,
		"sig/initialize" : function (a, b) {
			j.call(this, b)
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			c.user = b.user,
			l.call(c)
		},
		"dom/action.click" : b.noop,
		"dom/action/save" : function (a, c) {
			c.preventDefault();
			var e = this,
			f = b(c.target);
			e.$form.valid() && (e.user.lang = e.$element.find('[name="language"]:checked').val(), f.attr("disabled", !0), e.publish("ajax", {
					url : m.USER_ADD,
					data : {
						data : JSON.stringify(e.user)
					},
					type : "post"
				}, d().done(function (a) {
						a.status || g.alert("error", a.message),
						window.location.reload()
					})))
		}
	})
});
