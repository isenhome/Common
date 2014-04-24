define("app/widget/invoice/list/main", ["jquery", "shared/widget/list/base", "template!./main.html", "troopjs-utils/deferred", "shared/helper/utils", "shared/helper/blurb", "jquery.datatables.fixedheader"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		a.$table.fnSort([[0, "desc"]])
	}
	function h(a) {
		var b = "";
		switch (a) {
		case "Invoice Added":
			b = -1;
			break;
		case "To be sent":
			b = 0;
			break;
		case "Sent":
			b = 1;
			break;
		case "Received":
			b = 2
		}
		return b
	}
	function i(a) {
		var b = "";
		switch (a) {
		case "Invoice Added":
			b = "label-purple";
			break;
		case "To be sent":
			b = "label-lightblue";
			break;
		case "Sent":
			b = "label-blue";
			break;
		case "Received":
			b = "label-red"
		}
		return b
	}
	function j(a) {
		a.closest(".btn-group").removeClass("open")
	}
	function k(a) {
		var b = this;
		b.html(c, a),
		a.resolve()
	}
	function l(a) {
		var b = this;
		b.$totalReceived = b.$element.find(".totoal-received"),
		b.$container = b.$table = b.$element.find("table").dataTable({
				bPaginate : !1,
				bAutoWidth : !1,
				sAjaxDataProp : "list",
				aoColumns : q,
				sDom : "t",
				oLanguage : {
					sProcessing : "<div class='widget-spin'></div>",
					sLoadingRecords : "<div class='widget-spin'></div>"
				}
			}),
		g.call(b),
		a.resolve()
	}
	var m,
	n,
	o = {
		LIST : "/rest/invoice/list?paginate_by=50",
		INVOICE : "/rest/invoice/<id>",
		SAVE_URL : "/rest/joborder/shortlist/<id>/addinvoice",
		SHORTLIST : "/rest/joborder/<id>/shortlist/<sid>"
	},
	p = {
		"Invoice Added" : f.t("Invoice Added"),
		"To be sent" : f.t("To be sent"),
		Sent : f.t("Sent"),
		Received : f.t("Received"),
		Backout : f.t("Backout"),
		"Edit Invoice" : f.t("Edit Invoice"),
		"Invoice sent" : f.t("Invoice sent"),
		"Invoice received payment" : f.t("Invoice received payment"),
		"Reset invoice" : f.t("Reset invoice"),
		"View Revenue Allocation" : f.t("View Revenue Allocation"),
		CURRENCY_SYM : f.t("Currency symbol")
	};
	a.extend(jQuery.fn.dataTableExt.oSort, {
		"formatted-date-pre" : function (a) {
			a = "-" === a ? 0 : a.replace(/<span[^>]*>(\d+)<\/span>/g, "$1");
			var b = a.replace(/(\d*-\d*-\d*).*/g, "$1");
			return new Date(b)
		},
		"formatted-date-asc" : function (a, b) {
			return a - b
		},
		"formatted-date-desc" : function (a, b) {
			return b - a
		}
	});
	var q = [{
			mData : null,
			sType : "formatted-date",
			mRender : function (a, b, c) {
				var d = "";
				return d = m(c.dateAdded) + '<br><a href="user/preview#' + c.user.id + '" data-action="profile/open">' + c.user.englishName + "</a>"
			}
		}, {
			mData : null,
			mRender : function (a, b, c) {
				for (var d = c.assignments, e = "", f = 0, g = d.length; g > f; f++)
					e += '<a href="user/preview#' + d[f].user.id + '" data-action="profile/open">' + d[f].user.englishName + "</a><br>";
				return e
			}
		}, {
			mData : null,
			mRender : function (a, b, c) {
				var d,
				e = c.candidate;
				return d = e.englishName + "<br>" + e.chineseName
			}
		}, {
			mData : null,
			mRender : function (a, b, c) {
				var d = c.client,
				e = "";
				return e = '<p class="fixed-width">' + d.name + "<br>(ID: " + d.id + ")" + "</p>"
			}
		}, {
			mData : null,
			mRender : function (a, b, c) {
				var d = c.joborder;
				return d.jobTitle + "<br>(ID: " + d.id + ")"
			}
		}, {
			mData : "sentDate",
			sType : "date",
			mRender : function (a) {
				return a ? m(a) : "N/A"
			}
		}, {
			mData : "paymentReceivedDate",
			sType : "date",
			mRender : function (a) {
				return a ? m(a) : "N/A"
			}
		}, {
			mData : "invoiceAmount",
			mRender : function (a) {
				return p.CURRENCY_SYM + " " + n(a)
			}
		}, {
			mData : "paymentReceived",
			mRender : function (a) {
				var b;
				return b = a ? p.CURRENCY_SYM + " " + n(a) : "N/A"
			}
		}, {
			mData : null,
			mRender : function (a, b, c) {
				var d,
				e = c.status;
				return d = c.active ? '<span class="label ' + i(e) + '">' + p[e] + "</span>" : '<span class="label label-inverse">' + p.Backout + "</span>" + '<p class="hint">' + m(c.lastUpdateDate) + "<br>" + c.invalidReason + "</p>"
			}
		}, {
			mData : null,
			mRender : function (a, b, c) {
				var d,
				e = c.status,
				f = c.active,
				g = c.id,
				i = [c.candidate.englishName, c.candidate.chineseName].join(" ").trim(),
				j = c.joborder.id,
				k = c.jobsubmission;
				return d = '<div class="btn-group"><button class="btn btn-small dropdown-toggle" data-toggle="dropdown"><i class="icon-list-alt"></i></button><ul class="dropdown-menu"><li class="' + (-1 === h(e) ? "disabled" : "") + '">' + '<a href="#" data-action="invoice/edit(' + i + ", " + g + ", " + j + ", " + k + ')">' + p["Edit Invoice"] + "</a>" + "</li>" + "<li>" + '<a href="#" data-action="view/revenue(' + g + ')">' + p["View Revenue Allocation"] + "</a>" + "</li>" + '<li class="' + (-1 === h(e) || e >= 1 || !f ? "disabled" : "") + '">' + '<a href="#" data-action="send/to/client(' + g + ')">' + p["Invoice sent"] + "</a>" + "</li>" + '<li class="' + (-1 !== h(e) && f ? "" : "disabled") + '">' + '<a href="#" data-action="payment/received(' + g + "," + c.invoiceAmount + ')">' + p["Invoice received payment"] + "</a>" + "</li>",
				f && (d += '<li class="divider"></li><li><a href="#" data-action="reset/invoice(' + g + ')">' + p["Reset invoice"] + "</a>" + "</li>"),
				d += "</ul></div>"
			},
			bSortable : !1
		}
	];
	return b.extend(function () {
		this._url = o.LIST,
		this._listType = "invoice",
		m = this.formatDate,
		n = this.formatCurrency
	}, {
		"sig/initialize" : function (a, b) {
			k.call(this, b)
		},
		"sig/start" : function (a, b) {
			l.call(this, b)
		},
		renderList : function (a) {
			var b,
			c = this,
			d = c._json,
			e = d.total;
			c.$table.fnClearTable(),
			c.$table.fnAddData(d.list),
			c.$table.fnDraw(),
			c._json = {},
			d.list.forEach(function (a) {
				c._json[a.id] = a
			});
			for (b in e)
				c.$element.find("." + b).text(p.CURRENCY_SYM + " " + c.formatCurrency(e[b]));
			g.call(c),
			a.resolve()
		},
		"dom/action.click" : a.noop,
		"dom/action/invoice/edit.click" : function (b, c, f, g, h, i) {
			c.preventDefault();
			var k = this,
			l = a(c.target),
			m = l.closest("li"),
			n = l.closest("tr")[0];
			m.hasClass("disabled") || (k.publish("ajax", {
					url : o.SHORTLIST.replace("<id>", h).replace("<sid>", i)
				}, d().done(function (a) {
						var b = a.detail.filter(function (a) {
								return "OfferSign" === a.type
							});
						b = b[b.length - 1],
						k.publish("modal/invoice-finance/show", {
							name : f,
							invoiceId : g,
							data : k._json[g],
							operator : "finance",
							offerInfo : b,
							onSuccess : function () {
								k.updateRow(g, n),
								e.alert("success", "Save invoice successfully!")
							}
						})
					})), j(l))
		},
		"dom/action/send/to/client.click" : function (b, c, d) {
			c.preventDefault();
			var e = this,
			f = a(c.target),
			g = f.closest("li"),
			h = f.closest("tr")[0];
			g.hasClass("disabled") || (e.publish("modal/invoice-client/show", d, function () {
					e.updateRow(d, h),
					g.addClass("disabled")
				}), j(f))
		},
		"dom/action/payment/received.click" : function (b, c, d, e) {
			c.preventDefault();
			var f = this,
			g = a(c.target),
			h = g.closest("li"),
			i = g.closest("tr")[0];
			h.hasClass("disabled") || (f.publish("modal/payment-received/show", e, d, function () {
					f.updateRow(d, i),
					h.addClass("disabled")
				}), j(g))
		},
		"dom/action/reset/invoice.click" : function (b, c, d) {
			c.preventDefault();
			var e = this,
			f = a(c.target),
			g = f.closest("tr")[0];
			e.publish("modal/reset-invoice/show", d, function () {
				e.updateRow(d, g)
			}),
			j(f)
		},
		"dom/action/view/revenue.click" : function (a, b, c) {
			b.preventDefault();
			var d = this;
			d.publish("modal/allocation-revenue/show", {
				invoiceId : c
			})
		},
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			f = d.attr("href");
			e.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		},
		updateRow : function (a, b) {
			var c = this;
			c.publish("ajax", {
				url : o.INVOICE.replace("<id>", a)
			}, d().done(function (a) {
					c._json[a.id] = a,
					c.$table.fnUpdate(a, b)
				}))
		}
	})
})