define("app/widget/shortlist/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./detail-item.html", "template!./history.html", "template!./list-item.html", "shared/helper/blurb"], function (a, b, c, d, e, f, g, h) {
	function i() {
		var a = this;
		a.publish("ajax", {
			url : l.SHORTLIST.replace("<id>", a._json.joborder.id).replace("<sid>", a._json.id)
		}, c().done(function (b) {
				if ("started" === a.phase) {
					b.joborder = a._json.joborder,
					a._json = b;
					var d = a.$element.data("status");
					"OfferSign" !== d && "Invoice" !== d && "Onboard" !== d && (a.publish("job/live-job/update/count", d, b.currentStatus), a.$element.data("status", b.currentStatus)),
					c(function (b) {
						j.call(a, b)
					}).done(function () {
						k.call(a)
					})
				}
			}))
	}
	function j(a) {
		var b = this;
		c(function (a) {
			b.viewType ? b.html(g, b._json, a) : b.html(e, b._json, a)
		}).done(function () {
			a && k.call(b, a)
		})
	}
	function k(b) {
		var d = this;
		d.$dropdown = d.$element.find("button.dropdown-toggle"),
		d.$history = d.$element.find(".dl-horizontal"),
		d.$checkbox = d.$element.find('[data-action="shortlist/check"]').data("json", d._json),
		b = b || c(),
		b.done(function () {
			d._json.candidate.islimited && d.$element.find(".btn-group").remove(),
			d._islimited && d.$element.find("button").remove()
		}),
		"OfferSign" === d._json.currentStatus || "Invoice" === d._json.currentStatus || "Onboard" === d._json.currentStatus ? d.$element.attr("data-status", "offer") : d.$element.attr("data-status", d._json.currentStatus),
		d.$element.find(".dropdown-experience").one("show", function () {
			a(this).find(".dropdown-menu").data("id", d._json.candidate.id).attr("data-weave", m + "(id)").weave()
		});
		var e,
		f,
		g,
		h,
		i;
		d.$element.on("mouseenter", "a.candidate-name", function (b) {
			var c = a(b.target);
			"A" !== c.prop("tagName") && (c = c.closest("a")),
			c.closest(".slide-helper").length || (h = function (b) {
				clearTimeout(f),
				a(this).off(b)
			}, i = function (b) {
				g = setTimeout(function () {
						d.publish("slide-helper/detail/close"),
						a(this).off(b)
					}, 600)
			}, a(".slide-helper").off("mouseenter.helper", h).off("mouseleave.helper", i), clearTimeout(e), clearTimeout(f), clearTimeout(g), e = setTimeout(function () {
						d.publish("slide-helper/detail/reload", d._json.candidate.id, "candidate")
					}, 500), c.on("mouseleave", function (b) {
					clearTimeout(e),
					f = setTimeout(function () {
							d.publish("slide-helper/detail/close"),
							a(".slide-helper").off("mouseenter.helper", h).off("mouseleave.helper", i)
						}, 600),
					a(".slide-helper").on("mouseenter.helper", h).on("mouseleave.helper", i),
					c.off(b)
				}))
		}),
		d.$history.data("json", d._json.detail).data("users", d._json.joborder.users).attr("data-weave", "app/widget/shortlist/history(json)").weave(b)
	}
	var l = {
		SEND_CV : "/rest/joborder/<id>/sendcvstoclient",
		SAVE_INVOICE : "/rest/joborder/shortlist/<id>/addinvoice",
		LOAD_INVOICES : "/rest/invoice/list?paginate_by=1000&active__eq=1&jobsubmission__id__eq=<id>",
		EMAIL_TO_CANDIDATE : "/rest/joborder/shortlist/<sid>/emailtocandidate",
		SHORTLIST : "/rest/joborder/<id>/shortlist/<sid>",
		REMOVE : "/rest/joborder/<id>/shortlist/del"
	},
	m = "app/widget/candidate/work-experience/main",
	n = {
		email1 : h.t("Work email")
	};
	return b.extend(function (a, b, c, d, e) {
		var f = c.joborder.users;
		this._json = c,
		this._islimited = d,
		this.currentStatus = c.currentStatus,
		this.viewType = e,
		this.mainConsultant = function () {
			for (var a, b = f.length; b--; )
				if ("Main Consultant" === f[b].type) {
					a = f[b];
					break
				}
			return a
		}
		(),
		this.consultants = function () {
			for (var a = [], b = f.length; b--; ) {
				var c = f[b].user;
				a.filter(function (a) {
					return a.id === c.id
				}).length || a.push({
					id : c.id,
					name : c.englishName
				})
			}
			return a
		}
		()
	}, {
		"hub:memory/context" : function (a, b) {
			var d = this;
			d._context = b,
			j.call(d, c())
		},
		"hub/list/check/all" : function () {
			var a = this;
			a.$element.is(":hidden") || a.$checkbox.filter(":not(:disabled)").prop("checked", !0)
		},
		"hub/list/uncheck/all" : function () {
			var a = this;
			a.$element.is(":hidden") || a.$checkbox.filter(":not(:disabled)").prop("checked", !1)
		},
		"dom/action.click.mouseover.mouseout" : a.noop,
		"dom/action/send/cv.click" : function (b, c, e) {
			c.preventDefault();
			var f = this,
			g = a(c.target),
			h = g.closest("li"),
			j = l.SEND_CV.replace("<id>", f._json.joborder.id);
			if (h.hasClass("disabled"))
				return c.preventDefault(), void 0;
			var k,
			m,
			o = f._json,
			p = o.joborder.contacts,
			q = [],
			r = [],
			s = [];
			p.forEach(function (a) {
				var b,
				c,
				d = a.clientContact;
				m = [d.englishName, d.chineseName].join(" ").trim(),
				d.email ? (b = "email", c = d.email) : d.email1 ? (b = "email1", c = d.email1) : d.email2 && (b = "email2", c = d.email2),
				c ? (k || (k = d.id), q.push('"' + m + '" [' + n.email1 + "]"), r.push(c)) : s.push('<a href="/candidate#detail!id=' + d.id + '" target="_blank">' + m + "</a>")
			}),
			s.length && d.alert("info", "以下人才没有邮箱:<br>" + s.join(", "));
			var t = [];
			f.consultants.forEach(function (a) {
				t.push({
					id : a.id,
					text : a.name
				})
			}),
			f.publish("modal/sendemail/show", {
				parseEmail : !0,
				individually : !1,
				sender : t,
				myId : f._context.user.id,
				names : q,
				emails : r,
				sids : [o.id],
				cvSendUrl : j,
				emailTemplate : "cv_sent",
				category : "CV Sent",
				type : "cv_sent",
				jobsubmissionId : e,
				onSuccess : function () {
					i.call(f)
				},
				skipSend : !0,
				attachment : {
					candidate : o.candidate.id
				},
				checkAttachment : !0,
				templateVariable : {
					candidate_id : o.candidate.id,
					clientcontact_id : k,
					job_id : o.joborder.id
				}
			})
		},
		"dom/action/arrange/interview.click" : function (b, c, e, f) {
			c.preventDefault();
			var g = this,
			h = a(c.target),
			j = h.closest("li");
			if (j.hasClass("disabled"))
				return c.preventDefault(), void 0;
			var k = g._json,
			l = k.candidate,
			m = k.joborder,
			n = k.joborder.contacts,
			o = [],
			p = [],
			q = [];
			n.forEach(function (a) {
				var b = a.clientContact;
				q.push(b.id),
				o.push([b.englishName, b.chineseName].join(" ").trim()),
				p.push(b.email)
			}),
			g.publish("modal/interview/show", {
				id : e,
				sid : k.id,
				name : f,
				onSuccess : function (a) {
					a.status ? i.call(g) : d.alert("error", a.message)
				},
				jobsubmissionId : k.id,
				jobid : m.id,
				client : {
					id : m.client.id,
					contact : {
						ids : q,
						names : o,
						emails : p
					}
				},
				candidate : {
					id : l.id,
					name : [l.englishName, l.chineseName].join(" "),
					email : l.email
				}
			})
		},
		"dom/action/offer/signed.click" : function (b, c, e, f) {
			c.preventDefault();
			var g = this,
			h = a(c.target),
			j = h.closest("li"),
			k = g.mainConsultant ? g.mainConsultant.user.id : null;
			return j.hasClass("disabled") ? (c.preventDefault(), void 0) : (g.publish("modal/offersigned/show", {
					id : e,
					name : f,
					userlist : g.consultants,
					mainConsultantId : k,
					onSuccess : function (a) {
						a.status ? i.call(g) : d.alert("error")
					}
				}), void 0)
		},
		"dom/action/allocation/revenue.click" : function (b, d, e) {
			d.preventDefault();
			var f = this,
			g = a(d.target),
			h = g.closest("li"),
			j = function () {
				i.call(f)
			};
			return h.hasClass("disabled") ? (d.preventDefault(), void 0) : (f.publish("job/set/jobAttr", f), f.publish("ajax", {
					url : l.LOAD_INVOICES.replace("<id>", f._json.id)
				}, c().done(function (a) {
						a.list.length ? f.publish("modal/invoice-alert/show", {
							id : f._json.id,
							owner : f._json.candidate.owner,
							invoices : a.list,
							name : name,
							candidateId : e,
							onSuccess : j
						}) : f.publish("job/item/open/invoice/modal", {
							id : f._json.id,
							owner : f._json.candidate.owner,
							candidateId : e,
							onSuccess : j
						})
					})), void 0)
		},
		"dom/action/invoice/edit.click" : function (b, c, d) {
			c.preventDefault();
			var e = this;
			a(c.target),
			e.publish("job/set/jobAttr", e);
			var f = l.SAVE_INVOICE.replace("<id>", e._json.id);
			e.publish("modal/allocation-revenue/show", {
				saveUrl : f,
				jobAttr : e.jobAttr,
				onSuccess : a.noop,
				invoiceId : d,
				operator : "consultant"
			})
		},
		"dom/action/onboard.click" : function (b, c, e, f) {
			c.preventDefault();
			var g = this,
			h = a(c.target),
			j = h.closest("li");
			return j.hasClass("disabled") ? (c.preventDefault(), void 0) : (e ? g.publish("modal/onboard/show", {
					id : e,
					name : f,
					onSuccess : function () {
						i.call(g)
					}
				}) : d.alert("error", "对不起，信息有丢失，请刷新页面后重试！"), void 0)
		},
		"dom/action/comment/add.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target);
			e.closest("li");
			var f = d._json;
			d.publish("modal/add-note/show", {
				externalType : "candidate",
				optionType : "jobsubmission_note_category",
				id : f.candidate.id,
				jobsubmissionId : d._json.id,
				onSuccess : function () {
					i.call(d)
				}
			})
		},
		"dom/action/comment/edit.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target);
			e.closest("li");
			var f = d._json;
			d.publish("modal/add-note/show", {
				externalType : "candidate",
				optionType : "jobsubmission_note_category",
				id : f.id,
				data : e.closest("dd").data("json"),
				jobsubmissionId : d._json.id,
				onSuccess : function () {
					i.call(d)
				}
			})
		},
		"dom/action/send/email.click" : function (a, b, c, d, e, f, g) {
			b.preventDefault();
			var h = this;
			h.publish("modal/sendemail/show", {
				names : [c],
				emails : [d],
				emailTemplate : "candidate_email",
				category : "emailtocandidate",
				jobsubmissionId : h._json.id,
				onSuccess : function () {
					i.call(h)
				},
				attachment : {
					joborder : g,
					clientcompany : e
				},
				templateVariable : {
					candidate_id : f,
					job_id : g
				}
			})
		},
		"dom/action/send/to/finance.click" : function (b, c, d) {
			c.preventDefault();
			var e = this;
			a(c.target);
			var f = e._json;
			e.publish("job/set/jobAttr", e);
			var g = e._json.detail.filter(function (a) {
					return "OfferSign" === a.type
				});
			g = g[g.length - 1],
			e.publish("modal/invoice-finance/show", {
				name : [f.candidate.chineseName, f.candidate.englishName].join(" ").trim(),
				jobAttr : e.jobAttr,
				onSuccess : function () {
					i.call(e)
				},
				invoiceId : d,
				offerInfo : g,
				operator : "consultant"
			})
		},
		"dom/action/edit/to/finance.click" : function (b, d, e) {
			d.preventDefault();
			var f = this;
			a(d.target);
			var g = f._json,
			h = f._json.detail.filter(function (a) {
					return "OfferSign" === a.type
				});
			h = h[h.length - 1],
			f.publish("ajax", {
				url : "/rest/invoice/" + e
			}, c().done(function (a) {
					f.publish("modal/invoice-finance/show", {
						name : [g.candidate.chineseName, g.candidate.englishName].join(" ").trim(),
						invoiceId : e,
						data : a,
						operator : "consultant",
						offerInfo : h,
						onSuccess : function () {
							i.call(f)
						}
					})
				}))
		},
		"dom/action/open/profile.click" : function (b, c) {
			c.preventDefault();
			var e = a(c.target),
			f = e.attr("href");
			d.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/edit/interview.click" : function (b, c, d) {
			c.preventDefault();
			var e = this;
			a(c.target);
			var f = e._json,
			g = f.candidate,
			h = f.joborder;
			e.publish("modal/interview/show", {
				id : e._json.id,
				data : JSON.parse(d.replace(/\$/g, '"')),
				name : [g.chineseName, g.englishName].join(" ").trim(),
				onSuccess : function () {
					i.call(e)
				},
				client : {
					id : h.client.id
				}
			})
		},
		"dom/action/offer/edit.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = d._json;
			d.publish("modal/offersigned/show", {
				id : f.id,
				name : [f.candidate.chineseName, f.candidate.englishName].join(" ").trim(),
				detail : e.closest("dd").data("json"),
				userlist : d.consultants,
				onSuccess : function () {
					i.call(d)
				}
			})
		},
		"dom/action/onboard/edit.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = d._json;
			d.publish("modal/onboard/show", {
				id : f.id,
				name : [f.candidate.chineseName, f.candidate.englishName].join(" ").trim(),
				detail : e.closest("dd").data("json"),
				onSuccess : function () {
					i.call(d)
				}
			})
		},
		"dom/action/remove/from/job.click" : function (b, e) {
			e.preventDefault();
			var f = this,
			g = a(e.target),
			h = window.confirm("确定要将该候选人从项目中移出吗?");
			h && f.publish("ajax", {
				url : l.REMOVE.replace("<id>", f._json.joborder.id),
				type : "post",
				data : {
					data : JSON.stringify({
						candidate_ids : [f._json.candidate.id]
					})
				}
			}, c().done(function (a) {
					a.status ? (d.alert("success", "移除成功"), g.closest(".shortlist-steps").remove()) : d.alert("error", a.message)
				}))
		},
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var e = a(c.target),
			f = e.attr("href");
			d.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/shortlist/check.click" : function () {
			var a = this;
			a.publish("shortlist/toggle/mass/action")
		},
		"dom/action/send/confirm.click" : function () {
			var a = this,
			b = a._json,
			c = b.candidate,
			d = b.joborder,
			e = b.joborder.contacts,
			f = [],
			g = [],
			h = [],
			i = [];
			e.forEach(function (a) {
				var b,
				c = a.clientContact;
				h.push(c.id),
				f.push([c.englishName, c.chineseName].join(" ").trim()),
				c.email ? (b = c.email, i.push("email")) : c.email1 ? (b = c.email1, i.push("email1")) : c.email2 && (b = c.email2, i.push("email2")),
				g.push(b)
			}),
			a.publish("modal/email/confirm/show", {
				client : {
					id : d.client.id,
					contact : {
						ids : h,
						names : f,
						emails : g,
						types : i
					}
				},
				candidate : {
					id : c.id,
					name : [c.englishName, c.chineseName].join(" "),
					email : c.email
				},
				jobid : d.id,
				sid : a._json.id,
				jobsubmissionId : a._json.id
			})
		},
		getLabelColor : function (a) {
			var b = "";
			if (a.indexOf("Email Confirm") > -1 || a.indexOf("Send Email") > -1)
				b = "label-lightblue";
			else
				switch (a) {
				case "ClientInterview":
					b = "label-blue";
					break;
				case "Comment":
					b = "label-orange";
					break;
				case "Shortlist":
					b = "label-purple";
					break;
				case "CVSent":
					b = "label-blue";
					break;
				case "OfferSign":
					b = "label-pink";
					break;
				case "Onboard":
					b = "label-red";
					break;
				case "Rejected":
					b = "label-inverse";
					break;
				case "Invoice":
					b = "label-red"
				}
			return b
		}
	})
})