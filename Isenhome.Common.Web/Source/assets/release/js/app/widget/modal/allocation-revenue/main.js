define("app/widget/modal/allocation-revenue/main", ["compose", "jquery", "troopjs-utils/deferred", "troopjs-utils/when", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g, h) {
	function i() {
		var a = this,
		b = a.$fee.val().trim();
		b >= 0 && (a.$amout.text(b), a.$payment.text(b))
	}
	function j(a, b) {
		var d = this;
		d.publish("ajax", {
			url : n.LOAD_INVOICE.replace("<id>", a)
		}, c().done(function (a) {
				d._json = a
			}).always(function () {
				b.resolve()
			}))
	}
	function k() {
		var a = this,
		c = a._json,
		d = c.feeCharge;
		a.$fee.val(d),
		a.fee = d,
		a.$perRevenve.each(function () {
			b(this).trigger("change")
		}),
		a.$receiver.trigger("change"),
		i.call(a)
	}
	function l(a) {
		var b = this;
		c(function (a) {
			b._json.operator = b._operator,
			b.html(f, b._json, a)
		}).done(function () {
			m.call(b, a)
		})
	}
	function m(a) {
		var b = this,
		c = b.$element;
		b.$form = c.find("form"),
		b.$fee = c.find('[name="fees"]'),
		b.$amout = c.find(".amout"),
		b.$payment = c.find(".payment"),
		b.$perRevenve = c.find(".per-revenue"),
		b.$revenueSum = c.find(".revenue-sum"),
		b._editable || c.find("input").prop("readonly", !0),
		h(b.$form, {
			rules : {
				fees : {
					required : !0,
					number : !0
				}
			}
		}),
		a.resolve()
	}
	var n = {
		FINANCE : "/rest/data/userlist?role=Finance",
		LOAD_INVOICE : "/rest/invoice/<id>",
		CONTRACT : "/rest/client/<id>/contracts",
		CONTACT_DETAIL : "/rest/candidate/<id>",
		REFUND_CONFIRM : "/rest/invoice/<id>/refundconfirm"
	},
	o = /^(?:\d?\d|100)$/;
	return e.extend(function (a, b, c) {
		this._editable = "finance" === c ? !1 : !0
	}, {
		"hub/modal/allocation-revenue/show" : function (a, d) {
			var e = this,
			f = e.$element;
			if (f.find(".modal-footer button"), e._saveUrl = d.saveUrl, e._onSuccess = d.onSuccess, e._json = d.jobAttr, e._operator = d.operator, e._owner = d.owner, e._edit = !1, d.invoiceId)
				e._edit = !0, c(function (a) {
					j.call(e, d.invoiceId, a)
				}).done(function () {
					c(function (a) {
						l.call(e, a)
					}).done(function () {
						k.call(e)
					})
				});
			else {
				for (var g = e._json.userlist = [], h = e._json.users, i = !0, m = h.length; m--; ) {
					for (var n = !1, o = g.length; o--; )
						g[o].user.id == h[m].user.id && (g[o].type += ", " + h[m].type, n = !0);
					n || g.push(JSON.parse(JSON.stringify(h[m])))
				}
				b.each(g, function (a, b) {
					return b.user.id === e._owner.id ? (b.type += ", Owner", i = !1, !1) : void 0
				}),
				i && g.push({
					type : "Owner",
					user : e._owner
				}),
				l.call(e, c())
			}
			f.modal("show")
		},
		"hub:memory/context" : function (a, b) {
			this._user = b.user
		},
		"dom/action.click.change.input" : b.noop,
		"dom/action/update/revenue.change" : function (a, c) {
			this.fee = b(c.target).val().trim(),
			i.call(this)
		},
		"dom/action/per/revenue.change" : function (a, c) {
			var d = this,
			e = b(c.target),
			f = parseFloat(e.val(), 10),
			g = function () {
				var a = 0;
				return d.$perRevenve.each(function () {
					var c = b(this).val();
					(0 === c || c) && (a += parseFloat(b(this).val(), 10))
				}),
				a
			}
			();
			d.fee && e.prev().val(100 * (f / d.fee) + "%"),
			d.$revenueSum.text(g)
		},
		"dom/action/revenue/percentage.change" : function (a, c) {
			var d = this,
			e = b(c.target),
			f = e.val().trim().replace("%", "");
			o.test(f) && d.fee && (e.next().val(d.fee * f / 100).trigger("change"), e.val(f + "%"))
		},
		"dom/action/save.click" : function (a, d) {
			d.preventDefault();
			var e = this,
			f = b(d.target),
			h = e.$element;
			if (e.$form.valid()) {
				var i = function () {
					var a = [];
					return e.$perRevenve.each(function () {
						var c = b(this);
						a.push({
							type : c.attr("data-user-type"),
							user_id : c.attr("data-user-id"),
							revenue : c.val()
						})
					}),
					a
				}
				(),
				j = {
					feeCharge : e.$fee.val(),
					invoiceAmount : e.$fee.val(),
					assignments : i,
					note : ""
				};
				e._edit && (j.id = e._json.id),
				e.publish("ajax", {
					url : e._saveUrl,
					data : {
						data : JSON.stringify(j)
					},
					type : "post"
				}, c().done(function (a) {
						h.modal("hide"),
						a.status ? (g.alert("success", "Save invoice successfully!"), e._onSuccess && e._onSuccess(a)) : g.alert("error", a.message)
					}), f)
			}
		},
		"dom/action/invalid/allocation.click" : function (a, b, c) {
			b.preventDefault();
			var d = this;
			d.$element.modal("hide"),
			d.publish("modal/confirm/invalid-invoice/show", {
				id : c,
				onSuccess : function () {
					window.location.reload()
				}
			})
		}
	})
})