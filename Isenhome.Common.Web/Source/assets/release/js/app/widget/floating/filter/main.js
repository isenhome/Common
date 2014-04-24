define("app/widget/floating/filter/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "template!./main.html", "shared/widget/filter/query", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g() {
		f.addAttr({
			candidate_name : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && this.addQuery("candidate_name", "candidate_name=" + encodeURIComponent(c))
			},
			contact_name : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && this.addQuery("contact_name", "contact_name=" + encodeURIComponent(c))
			},
			contact_company_name : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && this.addQuery("contact_company_name", "contact_company_name=" + encodeURIComponent(c))
			},
			note__icontains : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && this.addQuery("note__icontains", "note__icontains=" + encodeURIComponent(c))
			},
			time : function (a) {
				var b = a.find('input[name="from"]').val(),
				c = a.find('input[name="to"]').val();
				b && c && this.addQuery("time", "dateAdded__gt=" + b + "&dateAdded__lt=" + c)
			},
			done__eq : function (a) {
				var b = a.find(":selected"),
				c = b.val();
				this.addQuery("done__eq", "done__eq=" + c)
			},
			user__eq : function (a) {
				var b = a.find("select").val();
				b.length && this.addQuery("user__eq", "user__eq=" + b)
			},
			team_id : function (a) {
				var b = a.find('[name="team_id"]').val();
				b.length && this.addQuery("team_id", "team_id=" + b)
			},
			feedback : function (a) {
				var b = a.find("select").val();
				b.length && this.addQuery("feedback", "feedback=" + encodeURIComponent(b))
			}
		})
	}
	function h(a) {
		var b = this;
		b.publish("ajax", {
			url : l.FEEDBACK
		}, d().done(function (c) {
				b._feedback = c,
				d(function (a) {
					b.html(e, b._json, a)
				}).done(function () {
					i.call(b, a)
				})
			}))
	}
	function i(a) {
		var b = this,
		c = b.$element.find('[name="feedback"]');
		b._feedback.forEach(function (a) {
			c.append('<option value="' + a.code + '">' + a.value + "</option>")
		}),
		a.resolve()
	}
	function j(a) {
		var b,
		c = this,
		d = a[0],
		e = a[1];
		switch (d.indexOf("dateAdded") > -1 && (d = "dateAdded"), d) {
		case "note":
			c.$element.find('[data-query="note"]').removeClass("hide").find("span").text(decodeURIComponent(e)),
			f.addQuery("note", a[0] + "=" + e);
			break;
		case "dateAdded":
			if (a[0].indexOf("gt") > -1 ? c.dateFrom = e : a[0].indexOf("lt") > -1 && (c.dateTo = e), c.dateFrom && c.dateTo)
				return c.$element.find('[data-query="time"]').removeClass("hide").find("span").text(c.dateFrom + " - " + c.dateTo), f.addQuery("time", "dateAdded__gt=" + c.dateFrom + "&dateAdded__lt=" + c.dateTo), void 0;
			break;
		case "done__eq":
		case "user__eq":
		case "feedback":
		case "done__eq":
			b = c.$element.find('[name="' + d + '"]').find('[value="' + window.decodeURIComponent(e) + '"]').text(),
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(b),
			f.addQuery(d, d + "=" + e);
			break;
		case "team_id":
			b = c.$element.find('[data-name="' + d + '"]').woven()[0].getNodeNameById(window.decodeURIComponent(e)),
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(b),
			f.addQuery(d, d + "=" + e);
			break;
		case "byfilter":
			break;
		default:
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(window.decodeURIComponent(e)),
			f.addQuery(d, d + "=" + e)
		}
	}
	function k() {
		var a = this;
		a.dateFrom = null,
		a.dateTo = null
	}
	var l = {
		SAVE_FILTER : "/rest/data/queryfilter/floating/add",
		FEEDBACK : "/rest/data/options?type=floating_feedback"
	};
	return c.extend(function () {
		var a = this;
		f.url = l.SAVE_FILTER,
		a._setFilter = j,
		k.call(a),
		g.call(a)
	}, {
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"hub:momery/filter/set" : a.around(function (a) {
			return function (b, c) {
				a.call(this, b, c),
				k.call(this)
			}
		})
	})
})