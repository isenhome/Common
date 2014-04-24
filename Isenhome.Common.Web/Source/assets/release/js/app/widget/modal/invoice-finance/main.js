define("app/widget/modal/invoice-finance/main", ["compose", "jquery", "troopjs-utils/deferred", "troopjs-utils/when", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate", "shared/helper/blurb", "app/widget/common/select2/main"], function (a, b, c, d, e, f, g, h, i) {
	function j(a, b) {
		for (var c, d = [], e = 0, f = b.length; f > e; e++)
			c = b[e].name || b[e].englishName + " " + b[e].chineseName, d.push("<option value='" + b[e].id + "'>" + c + "</option>");
		a.find("option:not(:first-child)").remove().end().append(d.join(""))
	}
	function k(a) {
		var b = this;
		b.publish("ajax", {
			url : p.LOAD_INVOICE.replace("<id>", b._invoiceId)
		}, c().done(function (a) {
				b._json = a
			}).always(function () {
				a.resolve()
			}))
	}
	function l() {
		var a = this;
		a.$contract.children().length > 1 ? (a.$contract.trigger("change"), a.$contractSelect.removeClass("hide").closest(".controls").removeClass("text_line"), a.$contractInfo.addClass("hide")) : (a.$contractSelect.addClass("hide").closest(".controls").addClass("text_line"), a.$contractInfo.removeClass("hide"))
	}
	function m(a) {
		var e = this,
		f = "object" == typeof e._json.client ? e._json.client.id : e._json.client,
		g = [],
		h = c(),
		i = c(),
		k = c(),
		m = "finance" === e._operator ? p.CONTACT1.replace("<id>", e._data.receiver.id) : p.CONTACT;
		g.push(h.promise(), i.promise(), k.promise()),
		e.publish("ajax", {
			url : p.FINANCE
		}, h.done(function (a) {
				j(e.$finance, a)
			})),
		e.publish("ajax", {
			url : m.replace("<cid>", f).replace("<id>", e._user.id)
		}, i.done(function (a) {
				j(e.$receiver, a.list)
			})),
		e.publish("ajax", {
			url : p.CONTRACT.replace("<id>", f)
		}, k.done(function (a) {
				j(e.$contract, a);
				var c = a;
				e.$contract.find("option:not(:first-child)").remove();
				for (var d = 0, f = c.length; f > d; d++) {
					var g = c[d],
					h = b("<option value='" + g.id + "'>" + g.contractName + "</option>");
					h.data({
						title : g.invoiceTitle,
						probation : g.probation,
						structure : g.feeStructure
					}),
					e.$contract.append(h)
				}
				l.call(e)
			})),
		d.apply(b, g).then(function () {
			a && a.resolve()
		})
	}
	function n(a) {
		var b = this;
		b.html(f, b._json, a)
	}
	function o(a) {
		var b = this,
		c = b.$element;
		b.$form = c.find("form"),
		b.$name = c.find(".name"),
		b.$receiver = c.find('[name="receiver"]').select2({
				placeholder : "请选择"
			}),
		b.$contract = c.find('[name="contract"]').select2({
				placeholder : "请选择"
			}),
		b.$finance = c.find('[name="finance"]').select2({
				placeholder : "请选择"
			}),
		b.$date = c.find('[name="date"]'),
		b.$note = c.find('[name="note"]'),
		b.$mobile = c.find('[name="mobile"]'),
		b.$address = c.find('[name="address"]'),
		b.$candidateId = c.find('[name="candidate-id"]'),
		b.$contractDetails = c.find(".contract-details"),
		b.$contractInfo = c.find(".contract-info"),
		b.$contractSelect = c.find(".contract-select"),
		b.$controlFee = c.find(".control-fee"),
		b.$controlReceived = c.find(".control-received"),
		b.$receiverError = c.find(".receiver-error"),
		h(b.$form),
		c.on("hidden", function () {
			b.$receiverError.addClass("hide")
		}),
		a.resolve()
	}
	var p = {
		FINANCE : "/rest/data/userlist?role=Finance",
		CONTACT : "/rest/candidate/list?paginate_by=200&company_id=<cid>&user_id=<id>&type=contact&ordering=englishName",
		CONTACT1 : "/rest/candidate/list?id=<id>",
		LOAD_INVOICE : "/rest/invoice/<id>",
		CONTRACT : "/rest/client/<id>/contracts",
		CONTACT_DETAIL : "/rest/candidate/<id>",
		REFUND_CONFIRM : "/rest/invoice/<id>/refundconfirm",
		SEND_TO_FINANCE : "/rest/invoice/<id>/sendinvoice",
		EDIT : "/rest/invoice/<id>/note"
	},
	q = {
		CURRENCY_SYM : i.t("Currency symbol")
	};
	return e.extend({
		"sig/initialize" : function (a, b) {
			n.call(this, b)
		},
		"sig/start" : function (a, b) {
			o.call(this, b)
		},
		"sig/stop" : function (a, b) {
			var c = this;
			c.$receiver.select2("destroy"),
			c.$contract.select2("destroy"),
			c.$finance.select2("destroy"),
			b.resolve()
		},
		"hub:memory/context" : function (a, b) {
			this._user = b.user
		},
		"hub/modal/invoice-finance/show" : function (a, b) {
			var d = this,
			e = d.$element;
			e.find(".modal-footer button"),
			d._invoiceId = b.invoiceId,
			d._onSuccess = b.onSuccess,
			d._name = b.name,
			d._data = b.data,
			d._operator = b.operator,
			d.$name.text(d._name),
			d.$element.find(".annual-salary").text(d.formatCurrency(b.offerInfo.annualSalary)),
			d.$element.find(".salary-structure").text(b.offerInfo.salaryStructure || ""),
			"finance" === d._operator ? (d.$finance.select2("readonly", !0), d.$contract.select2("readonly", !0), d.$receiver.select2("readonly", !0), d.$date.prop("readonly", !0)) : (d.$finance.select2("readonly", !1), d.$contract.select2("readonly", !1), d.$receiver.select2("readonly", !1), d.$date.prop("readonly", !1)),
			c(function (a) {
				k.call(d, a)
			}).done(function () {
				c(function (a) {
					m.call(d, a)
				}).done(function () {
					e.modal("show"),
					d._data && (d.$finance.val(d._data.finance.id).trigger("change"), d.$contract.val(d._data.clientContract.id).trigger("change"), d.$receiver.val(d._data.receiver.id).trigger("change"), d.$date.val(d._data.estimatepaymentReceivedDate.split(" ")[0]), d.$note.val(d._data.note), d.$controlFee.removeClass("hide").find(".text_line").text(q.CURRENCY_SYM + " " + d.formatCurrency(d._data.feeCharge)), d._data.paymentReceived ? (d.$controlReceived.removeClass("hide").find(".red").text(q.CURRENCY_SYM + " " + d.formatCurrency(d._data.paymentReceived)), d.$controlReceived.find(".muted").text(d.formatDate(d._data.paymentReceivedDate))) : d.$controlReceived.addClass("hide"))
				})
			})
		},
		"dom/action.click.change" : b.noop,
		"dom/action/contract.change" : function (a, c) {
			var d = this,
			e = b(c.target),
			f = e.find(":selected").data();
			f.title ? (d.$contractDetails.removeClass("hide"), d.$contractDetails.find(".title").text(f.title), d.$contractDetails.find(".probation").text(f.probation), d.$contractDetails.find(".structure").text(f.structure)) : d.$contractDetails.addClass("hide")
		},
		"dom/action/receiver.change" : function (a, d) {
			var e = this,
			f = b(d.target),
			g = f.val();
			g ? e.publish("ajax", {
				url : p.CONTACT_DETAIL.replace("<id>", g)
			}, c().done(function (a) {
					e.$candidateId.val(a.id),
					e.$address.val(a.address),
					e.$mobile.val(a.mobile),
					a.mobile && a.address || e.$receiverError.removeClass("hide").find("a").attr("href", "/candidate#add!id=" + a.id)
				})) : (e.$mobile.val(""), e.$address.val(""))
		},
		"dom/action/yes.click" : function (a, d) {
			d.preventDefault();
			var e,
			f = this,
			h = b(d.target),
			i = f.$element,
			j = {},
			k = "";
			f.$form.valid() && ("finance" === f._operator ? (j = {
						note : f.$note.val(),
						id : f._invoiceId
					}, k = "发票编辑成功!", e = p.EDIT.replace("<id>", f._invoiceId)) : (j = {
						estimatepaymentReceivedDate : f.$date.val(),
						note : f.$note.val(),
						finance : f.$finance.val(),
						clientContract : f.$contract.val(),
						receiver : f.$receiver.val()
					}, k = "已通知财务开票", e = p.SEND_TO_FINANCE.replace("<id>", f._invoiceId)), f.publish("ajax", {
					url : e,
					data : {
						data : JSON.stringify(j)
					},
					type : "post"
				}, c().done(function (a) {
						i.modal("hide"),
						a.status ? (g.alert("success", k), f._onSuccess && f._onSuccess(a)) : g.alert("error", a.message)
					}), h))
		}
	})
})