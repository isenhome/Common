define("shared/helper/validate", ["jquery", "shared/helper/blurb", "troopjs-core/pubsub/hub", "troopjs-utils/deferred", "jquery.validate", "jquery.validate.extend"], function (a, b, c, d) {
	var e = /^(http:\/\/)?\w+\.linkedin\.com\/((in\/\w*)|(pub\/((((.*-)+\w*)|.*))?\/\w{1,3}\/\w{1,3}\/\w{1,3}))$/i,
	f = /.*<(.*)>/i,
	g = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
	a.validator.setDefaults({
		ignore : [],
		focusInvalid : !1,
		invalidHandler : function (b, c) {
			var d = a(c.errorList[0].element),
			e = d.offsetParent();
			c.numberOfInvalids() && ("HTML" === e.prop("tagName") || "BODY" === e.prop("tagName") ? e.animate({
					scrollTop : d.offset().top - 45
				}, 1e3) : e.animate({
					scrollTop : d.position().top
				}, 1e3))
		}
	});
	var h = {
		REQUIRED : b.t("This field is required"),
		EMAIL : b.t("Please enter a valid email address"),
		EMAILS : b.t("There are a valid email address"),
		URL : b.t("Please enter a valid URL"),
		DATE : b.t("Please enter a valid date"),
		NUMBER : b.t("Please enter a valid number"),
		DIGITS : b.t("Please enter only digits"),
		MAXLENGTH : b.t("Please enter no more than {0} characters"),
		MINLENGTH : b.t("Please enter at least {0} characters"),
		REQUIRE_FROM_GROUP : b.t("Please fill at least 1 of these fields"),
		IPV4 : b.t("Please enter a valid IP v4 address"),
		MAX : b.t("Please enter a value less than or equal to {0}"),
		MIN : b.t("Please enter a value greater than or equal to {0}"),
		LINKEDIN_ERROR : b.t("Linkedin error")
	};
	a.extend(a.validator.messages, {
		ipv4 : h.IPV4,
		required : h.REQUIRED,
		remote : "Please fix this field.",
		email : h.EMAIL,
		emails : h.EMAILS,
		url : h.URL,
		date : h.DATE,
		dateISO : h.DATE,
		number : h.NUMBER,
		digits : h.DIGITS,
		maxlength : jQuery.validator.format(h.MAXLENGTH),
		minlength : jQuery.validator.format(h.MINLENGTH),
		checkDuplicate : jQuery.validator.format(""),
		require_from_group : jQuery.validator.format(""),
		linkedin : jQuery.validator.format(h.LINKEDIN_ERROR),
		max : jQuery.validator.format(h.MAX),
		min : jQuery.validator.format(h.MIN)
	}),
	a.validator.addMethod("checkDuplicate", function (b, e, f) {
		if (this.optional(e))
			return "dependency-mismatch";
		var g = this.previousValue(e);
		if (this.settings.messages[e.name] || (this.settings.messages[e.name] = {}), g.originalMessage = this.settings.messages[e.name].remote, this.settings.messages[e.name].remote = g.message, f = "string" == typeof f && {
				url : f
			}
			 || f, this.pending[e.name])
			return "pending";
		if (g.old === b)
			return g.valid;
		g.old = b;
		var h = this;
		this.startRequest(e);
		var i = {};
		return f.checkType && (i = {
				data : JSON.stringify({
					type : f.checkType,
					value : a(e).val().trim()
				})
			}),
		c.publish("ajax", a.extend(!0, {
				url : "",
				mode : "abort",
				port : "validate" + e.name,
				dataType : "json",
				data : i,
				async : !1
			}, f), d().done(function (c) {
				h.settings.messages[e.name].remote = g.originalMessage;
				var d = c === !0 || "true" === c;
				if (d) {
					var f = h.formSubmitted;
					h.prepareElement(e),
					h.formSubmitted = f,
					h.successList.push(e),
					delete h.invalid[e.name],
					h.showErrors()
				} else {
					var i = {},
					j = c || h.defaultMessage(e, "remote");
					i[e.name] = g.message = a.isFunction(j) ? j(b) : j,
					h.invalid[e.name] = !0,
					h.showErrors(i)
				}
				g.valid = d,
				h.stopRequest(e, d)
			})),
		"pending"
	}),
	a.validator.addMethod("phone", function (b, c) {
		return a(c).val(b.replace(/\D/g, "")),
		!0
	}),
	a.validator.addMethod("linkedin", function (a) {
		var b;
		return b = a.length ? e.test(a) : !0
	}),
	a.validator.addMethod("emails", function (a, b) {
		var c,
		d = !0,
		e = a.split(",");
		if (this.optional(b))
			return d;
		for (var h = 0, i = e.length; i > h; h++)
			if (c = e[h].replace(f, "$1"), !g.test(c))
				return d = !1, !1;
		return d
	});
	var i = {
		onkeyup : !1,
		errorClass : "help-block text-error",
		errorPlacement : function (b, c) {
			a(c).closest("div").append(b)
		}
	};
	return function (b, c) {
		b.validate(a.extend({}, i, c))
	}
})