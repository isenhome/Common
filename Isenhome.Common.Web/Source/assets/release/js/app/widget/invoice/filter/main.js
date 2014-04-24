define("app/widget/invoice/filter/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html", "shared/widget/filter/query"], function (a, b, c, d, e, f, g) {
	function h() {
		g.addAttr({
			ordering : function (a) {
				m ? l[m] <= l[a] && (m = a) : m = a,
				this.addQuery("ordering", "ordering=" + m)
			},
			dateAdded : function (a) {
				var b = a.find('input[name="from"]').val(),
				c = a.find('input[name="to"]').val();
				b && c && this.addQuery("dateAdded", "dateAdded__gt=" + b + "&dateAdded__lt=" + c)
			},
			sentDate : function (a) {
				var b = a.find('input[name="from"]').val(),
				c = a.find('input[name="to"]').val();
				b && c && this.addQuery("sentDate", "sentDate__gt=" + b + "&sentDate__lt=" + c)
			},
			paymentReceivedDate : function (a) {
				var b = a.find('input[name="from"]').val(),
				c = a.find('input[name="to"]').val();
				b && c && this.addQuery("paymentReceivedDate", "paymentReceivedDate__gt=" + b + "&paymentReceivedDate__lt=" + c)
			},
			candidate_name : function (a) {
				var b = a.find("input").val().trim();
				b.length && this.addQuery("candidate", "candidate_name=" + b)
			},
			user_id : function (a) {
				var b = a.find("select").val();
				b.length && this.addQuery("user_id", "user_id=" + b)
			},
			client__name__icontains : function (a) {
				var b = a.find("input").val().trim();
				b.length && this.addQuery("client__name__icontains", "client__name__icontains=" + window.encodeURIComponent(b))
			},
			team_id : function (a) {
				var b = a.find('[name="team_id"]').val();
				b.length && this.addQuery("team_id", "team_id=" + b)
			},
			joborder__jobTitle__icontains : function (a) {
				var b = a.find("input").val().trim();
				b.length && this.addQuery("joborder__jobTitle__icontains", "joborder__jobTitle__icontains=" + window.encodeURIComponent(b))
			},
			status__eq : function (a) {
				var b = a.find("select option:selected").val();
				b.length && ("Void" == b ? this.addQuery("active__eq", "active__eq=") : (this.addQuery("status__eq", "status__eq=" + b), this.addQuery("active__eq", "active__eq=1")))
			},
			addedBy__eq : function (a) {
				var b = a.find("select").val();
				b.length && this.addQuery("addedBy__eq", "addedBy__eq=" + b)
			},
			finance__eq : function (a) {
				var b = a.find("select").val();
				b.length && this.addQuery("finance__eq", "finance__eq=" + b)
			},
			note : function (a) {
				var b = a.find("input").val().trim();
				b.length && this.addQuery("note", "note__icontains=" + encodeURIComponent(b))
			}
		})
	}
	function i(a) {
		var c,
		d,
		e = this,
		f = a[0],
		h = a[1];
		switch (f.indexOf("dateAdded") > -1 && (f = "dateAdded"), f.indexOf("sentDate") > -1 && (f = "sentDate"), f.indexOf("paymentReceivedDate") > -1 && (f = "paymentReceivedDate"), f) {
		case "dateAdded":
			if (a[0].indexOf("gt") > -1 || a[0].indexOf("lt") > -1) {
				if (a[0].indexOf("gt") > -1 ? e.dateAddedFrom = h : a[0].indexOf("lt") > -1 && (e.dateAddedTo = h), e.updateFrom && e.updateTo)
					return e.$element.find('[data-query="addedDate"]').removeClass("hide").find("span").text(e.dateAddedFrom + " - " + e.dateAddedTo), g.addQuery("addedDate", "dateAdded__gt=" + e.dateAddedFrom + "&dateAdded__lt=" + e.dateAddedTo), void 0
			} else
				e.$element.find('a[data-type="addedDate"]').each(function () {
					return b(this).attr("href").substring(1) == a[0] + "=" ? (c = b(this).text(), !1) : void 0
				}), e.$element.find('[data-query="addedDate"]').removeClass("hide").find("span").text(c), g.addQuery("addedDate", a[0] + "=");
			break;
		case "sentDate":
			if (a[0].indexOf("gt") > -1 || a[0].indexOf("lt") > -1) {
				if (a[0].indexOf("gt") > -1 ? e.sentDateFrom = h : a[0].indexOf("lt") > -1 && (e.sentDateTo = h), e.updateFrom && e.updateTo)
					return e.$element.find('[data-query="sentDate"]').removeClass("hide").find("span").text(e.sentDateFrom + " - " + e.sentDateTo), g.addQuery("sentDate", "sentDate__gt=" + e.sentDateFrom + "&sentDate__lt=" + e.sentDateTo), void 0
			} else
				e.$element.find('a[data-type="sentDate"]').each(function () {
					return b(this).attr("href").substring(1) == a[0] + "=" ? (c = b(this).text(), !1) : void 0
				}), e.$element.find('[data-query="sentDate"]').removeClass("hide").find("span").text(c), g.addQuery("sentDate", a[0] + "=");
			break;
		case "paymentReceivedDate":
			if (a[0].indexOf("gt") > -1 || a[0].indexOf("lt") > -1) {
				if (a[0].indexOf("gt") > -1 ? e.sentDateFrom = h : a[0].indexOf("lt") > -1 && (e.sentDateTo = h), e.updateFrom && e.updateTo)
					return e.$element.find('[data-query="paymentReceivedDate"]').removeClass("hide").find("span").text(e.sentDateFrom + " - " + e.sentDateTo), g.addQuery("receivedDate", "paymentReceivedDate__gt=" + e.sentDateFrom + "&paymentReceivedDate__lt=" + e.sentDateTo), void 0
			} else
				e.$element.find('a[data-type="paymentReceivedDate"]').each(function () {
					return b(this).attr("href").substring(1) == a[0] + "=" ? (c = b(this).text(), !1) : void 0
				}), e.$element.find('[data-query="paymentReceivedDate"]').removeClass("hide").find("span").text(c), g.addQuery("paymentReceivedDate", a[0] + "=");
			break;
		case "active__eq":
			h || e.$element.find('[data-query="status__eq"]').removeClass("hide").find("span").text("作废"),
			g.addQuery(f, f + "=" + h);
			break;
		case "user_id":
		case "addedBy__eq":
		case "finance__eq":
		case "status__eq":
			d = e.$element.find('[name="' + f + '"]').find('[value="' + window.decodeURIComponent(h) + '"]').text(),
			e.$element.find('[data-query="' + f + '"]').removeClass("hide").find("span").text(d),
			g.addQuery(f, f + "=" + h);
			break;
		case "team_id":
			d = e.$element.find('[data-name="' + f + '"]').woven()[0].getNodeNameById(window.decodeURIComponent(h)),
			e.$element.find('[data-query="' + f + '"]').removeClass("hide").find("span").text(d),
			g.addQuery(f, f + "=" + h);
			break;
		case "byfilter":
			break;
		default:
			e.$element.find('[data-query="' + f + '"]').removeClass("hide").find("span").text(window.decodeURIComponent(h)),
			g.addQuery(f, f + "=" + h)
		}
	}
	function j(a) {
		this.html(f, this._json, a)
	}
	var k = {
		SAVE_FILTER : "/rest/data/queryfilter/invoice/add"
	},
	l = {
		dateAdded : 1,
		sentDate : 2,
		paymentReceivedDate : 3
	},
	m = "";
	return c.extend(function () {
		var a = this;
		g.url = k.SAVE_FILTER,
		a._setFilter = i,
		h.call(a)
	}, {
		"sig/initialize" : function (a, b) {
			j.call(this, b)
		},
		"dom/action.click" : b.noop,
		"dom/action/date/select.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target),
			e = d.attr("data-type");
			b('[data-query="' + e + '"]').removeClass("hide").find("span").text(d.text()),
			g.addQuery(e, d.attr("href").substring(1)),
			d.closest("form").find("button").trigger("click")
		}
	})
})