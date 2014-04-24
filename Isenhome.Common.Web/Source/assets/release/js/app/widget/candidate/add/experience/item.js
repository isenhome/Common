define("app/widget/candidate/add/experience/item", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./item.html", "shared/helper/utils"], function (a, b, c, d) {
	function e() {
		var a = this;
		c(function (b) {
			a.html(d, a._json, b)
		}).done(function () {
			f.call(a)
		})
	}
	function f() {
		var b = this,
		c = b._json,
		d = b.$element,
		e = d.find('[name="started-year-' + b.index + '"]'),
		f = d.find('[name="started-month-' + b.index + '"]'),
		g = d.find('[name="ended-year-' + b.index + '"]'),
		h = d.find('[name="ended-month-' + b.index + '"]'),
		i = d.find('[name="current-' + b.index + '"]');
		if (b.$company = d.find('[name="company-' + b.index + '"]'), b.$title = d.find('[name="title-' + b.index + '"]'), b.$industry = d.find('[name="company-industry-' + b.index + '"]'), b.$city = d.find('[name="company-city-' + b.index + '"]'), b.$function1 = d.find('[name="function1-' + b.index + '"]'), b.cityCombo = d.find('[data-name="company-city-' + b.index + '"]').woven()[0], b.$additionalGroup = d.find(".additional-group"), !a.isEmptyObject(c)) {
			var j = c.start ? c.start.split("-") : [],
			k = c.end ? c.end.split("-") : [];
			e.val(j[0] || ""),
			f.val(parseInt(j[1], 10) || ""),
			g.val(k[0] || ""),
			h.val(parseInt(k[1], 10) || ""),
			d.data("id", c.id),
			c.is_current && (i.trigger("click").closest(".controls").find(".ended-position").addClass("hide"), b._isCurrent = !0)
		}
		b.$element.data("current") && i.attr("data-current", "true")
	}
	function g() {
		var a = this,
		b = a.$company.val().trim();
		return b ? (a.publish("ajax", {
				url : i.COMPANY_CHECK.replace("<name>", window.encodeURIComponent(b))
			}, c().done(function (b) {
					b.status ? (a.$additionalGroup.addClass("hide"), a._isCurrent && a.publish("location/set", b.data.city)) : (a.$additionalGroup.removeClass("hide"), a._json && a._json.city && (a.cityCombo.selectByName(a._json.city), delete a._json.city))
				})), void 0) : (a.$additionalGroup.addClass("hide"), void 0)
	}
	var h = 0,
	i = {
		COMPANY_CHECK : "/rest/client/check_exists?name=<name>"
	};
	return b.extend(function (a, b, c) {
		h++,
		this._json = c,
		this.index = h
	}, {
		"hub:memory/experience/mandatory" : function (a, b) {
			var c = this;
			c.mandatory = b,
			e.call(c)
		},
		"hub:memory/experience/switch/rules" : function (a, b) {
			var c = this,
			d = c.$element.find(".f_req");
			b ? (d.removeClass("hide"), c.$element.find(".not-required").addClass("required").removeClass("not-required")) : (d.addClass("hide"), c.$element.find(".required").removeClass("required").addClass("not-required"))
		},
		"dom/action.click.change" : a.noop,
		"dom/action/remove/experience.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target);
			d.closest(".experience-item").remove()
		},
		"dom/action/experience/city.change" : function (b, c) {
			var d = this,
			e = a(c.target).find("input:hidden");
			d._isCurrent && d.publish("location/set", e.val())
		},
		"dom/action/current/job.change" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.closest(".experience-item"),
			g = e.closest(".experience-block").find('[name*="current"]').not(e);
			e.is(":checked") ? (d._isCurrent = !0, f.find(".ended-position").addClass("hide").removeClass("required").each(function () {
					a(this).val("")
				}), f.find(".current-position").removeClass("hide"), g.filter(":checked").trigger("click")) : (d._isCurrent = !1, f.find(".ended-position").removeClass("hide"), f.find(".current-position").addClass("hide"))
		},
		"dom/action/company/name.change.click" : function (b, c) {
			var d = this,
			e = a(c.target);
			if ("click" === c.namespace) {
				var f = e.val();
				f.length && (e.typeahead("setQuery", ""), e.typeahead("setQuery", f))
			} else
				"change" === c.namespace && e.one("blur", function () {
					window.setTimeout(function () {
						d.checkCompanyName()
					}, 200)
				})
		},
		"dom/action/month.change" : function (b, c) {
			var d = a(c.target);
			d.val().length ? d.prev().addClass("required") : d.prev().removeClass("required")
		},
		checkCompanyName : g
	})
})