define("app/widget/system/email/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	var h = {
		ENABLE : "/rest/user/enablepop",
		EMAIL_SETTING : "/rest/user/changeemailpassword"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			c.$whenGroup = c.$element.find(".when-group"),
			c._user = b.user,
			c.$element.find("[name=username]").val(c._user.email),
			c.$element.find("[name=password]").val(c._user.emailpassword),
			c._user.enablePop ? c.$element.find('[name="enablepop"]').filter('[value="true"]').prop("checked", !0) : c.$element.find('[name="enablepop"]').filter('[value="false"]').prop("checked", !0)
		},
		"dom/action.click" : a.noop,
		"dom/action/enablepop.click" : function (b, c) {
			var d = this,
			e = a(c.target);
			"true" === e.val() ? d.$whenGroup.removeClass("hide") : d.$whenGroup.addClass("hide")
		},
		"dom/action/save.click" : function (b, e) {
			e.preventDefault();
			var g = a(e.target),
			i = this,
			j = a(e.target).parents("form"),
			k = j.find("[name=password]").val(),
			l = {},
			m = {};
			if (!k)
				return f.alert("error", "Password can not be empty."), void 0;
			var n,
			o,
			p = [],
			q = c(),
			r = c();
			p.push(q.promise(), r.promise()),
			l.id = this._user.id,
			l.emailpassword = k,
			m = {
				enablePop : "true" === i.$element.find('[name="enablepop"]:checked').val(),
				when : i.$element.find('[name="when"]:checked').val()
			},
			i.publish("ajax", {
				url : h.EMAIL_SETTING,
				data : {
					data : JSON.stringify(l)
				},
				type : "post"
			}, q.done(function (a) {
					n = a,
					o && (n.status && o.status ? f.alert("success", "Email setting success!") : (n.status || f.alert("error", n.message), o.status || f.alert("error", o.message)))
				}), g),
			i.publish("ajax", {
				url : h.ENABLE,
				data : {
					data : JSON.stringify(m)
				},
				type : "post"
			}, r.done(function (a) {
					o = a,
					n && (n.status && o.status ? f.alert("success", "Email setting success!") : (n.status || f.alert("error", n.message), o.status || f.alert("error", o.message)))
				}), g),
			d.call(a, p)
		},
		"dom/action/edit.click" : function (a, b) {
			b.preventDefault(),
			this.publish("modal/email-signature/show")
		},
		"dom/action/test.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			g = a(d.target),
			h = this.$element.find("[name=password]");
			return h.val() ? (e.publish("ajax", {
					url : "/rest/user/testmail"
				}, c().done(function (a) {
						a.status ? f.alert("success", "Send test email success.") : f.alert("error", "Send test email failed. You may not [ Save ] it before send or invalid password.")
					}), g), void 0) : (h.focus(), f.alert("error", "Password can not be empty."), void 0)
		}
	})
})