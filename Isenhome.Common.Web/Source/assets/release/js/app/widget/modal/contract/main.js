define("app/widget/modal/contract/main", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/blurb", "shared/helper/validate"], function (a, b, c, d, e, f, g, h) {
	function i() {
		var a = this,
		b = a._json;
		a.$start.val(b.startDate),
		a.$end.val(b.expireDate),
		a.$title.val(b.invoiceTitle),
		a.$probation.find('option[value="' + b.probation + '"]').prop("selected", !0),
		a.$feeStructure.val(b.feeStructure),
		a.$contractName.val(b.contractName)
	}
	function j(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function k(a) {
		var b = this,
		c = b.$element;
		b.$form = c.find("form"),
		b.$start = c.find('[name="startDate"]'),
		b.$end = c.find('[name="endDate"]'),
		b.$title = c.find('[name="title"]'),
		b.$probation = c.find('[name="probation"]'),
		b.$feeStructure = c.find('[name="feeStructure"]'),
		b.$contractName = c.find('[name="name"]'),
		b.$contractName.val(l.CONTRACT),
		h(b.$form, {
			rules : {
				name : {
					required : !0
				},
				title : {
					required : !0
				},
				feeStructure : {
					required : !0
				},
				probation : {
					required : !0
				},
				startDate : {
					required : !0,
					date : !0
				},
				endDate : {
					required : !0,
					date : !0
				}
			}
		}),
		a.resolve()
	}
	var l = {
		CONTRACT : "Contract",
		REQUIRED_MESSAGE : "This field is required"
	};
	for (var m in l)
		l.hasOwnProperty(m) && (l[m] = g.t(l[m]));
	return d.extend({
		"sig/initialize" : function (a, b) {
			j.call(this, b)
		},
		"sig/start" : function (a, b) {
			k.call(this, b)
		},
		"hub/modal/add/contract/show" : function (a, b, c, d, e) {
			var f = this,
			g = f.$element;
			f._url = b,
			f._onSuccess = d,
			f._clientId = c,
			e ? (f._json = e, i.call(f)) : f._json = null,
			g.modal("show")
		},
		"dom/action.click" : b.noop,
		"dom/action/save.click" : function (a, d) {
			d.preventDefault();
			var e = this,
			g = b(d.target),
			h = e.$element;
			if (e.$form.valid()) {
				!function () {
					var a = [];
					return h.find('[name="structure"]').each(function () {
						var c = b(this).val(),
						d = b(this).next().val().trim();
						a.push(c + ": " + d)
					}),
					a.join("<br />")
				}
				();
				var i = {
					startDate : e.$start.val().trim(),
					expireDate : e.$end.val().trim(),
					invoiceTitle : e.$title.val().trim(),
					probation : e.$probation.val().trim(),
					feeStructure : e.$feeStructure.val().trim(),
					contractName : e.$contractName.val().trim(),
					client : {
						id : e._clientId
					}
				};
				e._json && e._json.id && (i.id = e._json.id),
				h.modal("hide"),
				e._url ? e.publish("ajax", {
					url : e._url,
					data : {
						data : JSON.stringify(i)
					},
					type : "post"
				}, c().done(function (a) {
						h.modal("hide"),
						a.status ? (f.alert("success", "Add contract successfully!"), e._onSuccess && e._onSuccess(a)) : f.alert("error", a.message)
					}), g) : e._onSuccess(i)
			}
		}
	})
})