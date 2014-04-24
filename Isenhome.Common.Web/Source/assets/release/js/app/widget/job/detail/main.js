define("app/widget/job/detail/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "template!./main.html", "shared/helper/blurb", "redactor"], function (a, b, c, d, e, f, g) {
	function h() {
		var a = this;
		a._json.users.forEach(function (b) {
			return b.user.id == a._currentUserId ? (a._islimited = !1, !1) : void 0
		})
	}
	function i() {
		var b = this,
		e = [],
		f = c(),
		g = c();
		e.push(f.promise(), g.promise()),
		b.publish("ajax", {
			url : l.JOBORDER + b.uid
		}, f.done(function (a) {
				b._json = a,
				b.consultants = function () {
					for (var a = [], c = b._json.users, d = c.length; d--; ) {
						var e = c[d].user;
						a.filter(function (a) {
							return a.id === e.id
						}).length || a.push({
							id : e.id,
							name : e.englishName
						})
					}
					return a
				}
				(),
				h.call(b)
			})),
		b.publish("ajax", {
			url : "/rest/joborder/" + b.uid + "/shortlist"
		}, g.done(function (a) {
				b._shortlistJson = a
			})),
		d.apply(a, e).then(function () {
			j.call(b)
		})
	}
	function j() {
		var a = this;
		c(function (b) {
			a.html(f, a._json, b)
		}).done(function () {
			k.call(a)
		})
	}
	function k() {
		var b = this,
		d = b.$element;
		a('a[href="#job-note-tab"]').one("shown", function () {
			d.find("#job-note-tab").data("reference", b._json).attr("data-weave", "app/widget/job/detail/note-tab/main(reference)").weave()
		}),
		a('a[href="#targets"]').one("shown", function () {
			d.find("#targets").attr("data-weave", "app/widget/job/detail/targets-tab/main(" + b._json.id + ")").weave()
		}),
		a('a[href="#task-tab"]').one("shown", function () {
			d.find("#task-tab").attr("data-weave", "app/widget/job/detail/task-tab/main(" + b._json.id + ")").weave()
		}),
		a('a[href="#email-tab"]').one("shown", function () {
			d.find("#email-tab").attr("data-weave", m + '("' + b._json.id + '")').weave()
		}),
		c(function (a) {
			d.find(".search_item").data("json", b._json).attr("data-weave", "app/widget/job/item/main(json)").weave(a)
		}).done(function () {
			b.$live = a("#live-candidates"),
			b._shortlistJson.filter(function (a) {
				return "Rejected" !== a.currentStatus
			}),
			b.$live.data("json", b._json).data("items", b._shortlistJson).data("islimited", b._islimited).attr("data-weave", "app/widget/job/detail/live-job/main(json, items, islimited)").weave();
			var c = b._shortlistJson.length;
			d.find(".live-count").text(c)
		}).done(function () {
			e.widgetLoaded.call(b)
		})
	}
	var l = {
		SEND_CV : "/rest/joborder/<id>/sendcvstoclient",
		JOBORDER : "/rest/joborder/"
	},
	m = "app/widget/job/detail/email-tab/main",
	n = {
		email : g.t("Private email"),
		email1 : g.t("Work email"),
		email2 : g.t("Other")
	};
	return b.extend(function () {
		this._islimited = !0
	}, {
		"hub:memory/detail/id/change" : function (a, b) {
			var c = this;
			c.uid = b,
			i.call(c)
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._currentUserId = b.user.id
		},
		"hub/show/living" : function (a, b) {
			var c = this;
			c.$element.find('[href="#live-candidates"]').trigger("click"),
			c.$live.find("input:text").val(b).trigger("change")
		},
		"hub/show/rejected" : function (a, b) {
			var c = this;
			c.$element.find('[href="#rejected"]').trigger("click"),
			c.$rejected.find("input:text").val(b).trigger("change")
		},
		"dom/action.click.input.change.keydown.keyup" : a.noop,
		"dom/action/search.input.change.keydown.keyup" : function (b, c, d) {
			var e,
			f = this,
			g = a(c.target),
			h = a.trim(g.val()).toLowerCase();
			"live" === d ? e = f.$live.find(".shortlist-steps") : "rejected" === d && (e = f.$rejected.find(".shortlist-steps")),
			e.each(function () {
				var b = a(this),
				c = b.find(".searchable");
				c.each(function () {
					var c = a(this),
					d = c.text().toLowerCase();
					return d.indexOf(h) > -1 ? (b.closest(".shortlist-steps").removeClass("hide"), !1) : (b.closest(".shortlist-steps").addClass("hide"), void 0)
				})
			})
		},
		"dom/action/note/edit.click" : function () {
			var b = this;
			b.$jobnote.redactor({
				focus : !0,
				buttons : ["bold", "italic", "deleted", "|", "unorderedlist", "orderedlist", "outdent", "indent", "|", "alignment", "|", "horizontalrule"],
				plugins : ["fontfamily", "fontsize", "fontcolor"],
				linebreaks : !0,
				autoresize : !0,
				minHeight : 300
			}),
			a(".jobnote .btn").toggleClass("hide")
		},
		"dom/action/note/save.click" : function (b, d) {
			var f = this,
			g = a(d.target),
			h = f.$jobnote.redactor("get"),
			i = {
				id : f.uid,
				client : {
					id : f._json.client.id
				},
				note : h
			};
			f.$jobnote.redactor("destroy"),
			a(".jobnote .btn").toggleClass("hide"),
			f.publish("ajax", {
				url : "/rest/joborder/add",
				data : {
					data : JSON.stringify(i)
				},
				type : "post"
			}, c().done(function (a) {
					a.status ? e.alert("success", "Saving job note success.") : e.alert("error", a.message)
				}), g)
		},
		"dom/action/batch.click" : function (b, c) {
			c.preventDefault();
			var d,
			f = this,
			g = a(c.target),
			h = l.SEND_CV.replace("<id>", f._json.id),
			i = a("#live-candidates").find(":checkbox[name=candidates]:checked"),
			j = {},
			k = [];
			if (!g.hasClass("disabled")) {
				i.each(function () {
					j[this.value] = a(this).closest(".shortlist-steps").find(".candidate-name").text(),
					k.push(a(this).data("sid"))
				});
				var m,
				o,
				p = f._json,
				q = p.contacts,
				r = [],
				s = [],
				t = [];
				q.forEach(function (a) {
					var b,
					c,
					d = a.clientContact;
					o = [d.englishName, d.chineseName].join(" ").trim(),
					d.email ? (b = "email", c = d.email) : d.email1 ? (b = "email1", c = d.email1) : d.email2 && (b = "email2", c = d.email2),
					c ? (m || (m = d.id), r.push('"' + o + '" [' + n.email1 + "]"), s.push(c)) : t.push('<a href="/candidate#detail!id=' + d.id + '" target="_blank">' + o + "</a>")
				}),
				t.length && e.alert("info", "以下人才没有邮箱:<br>" + t.join(", "));
				var u = [];
				f.consultants.forEach(function (a) {
					u.push({
						id : a.id,
						text : a.name
					})
				}),
				d = {
					parseEmail : !0,
					individually : !1,
					sender : u,
					myId : f._currentUserId,
					id : p.id,
					names : r,
					emails : s,
					cvSendUrl : h,
					type : "cv_sent",
					emailTemplate : "cv_sent",
					category : "CV Sent",
					refreshPage : !0,
					sids : k,
					attachment : {
						candidate : j
					},
					checkAttachment : !0,
					skipSend : !0,
					templateVariable : {
						clientcontact_id : m,
						job_id : p.id
					}
				},
				f.publish("modal/sendemail/show", d)
			}
		},
		"dom/action/mass/send/email.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = d.$live.is(":visible") ? d.$live.find(":checkbox[name=candidates]:checked") : d.$rejected.find(":checkbox[name=candidates]:checked"),
			g = [],
			h = [],
			i = null;
			if (!e.hasClass("disabled")) {
				f.each(function () {
					var b = a(this).data("json").candidate;
					g.push(b.email),
					h.push([b.englishName, b.chineseName].join(" ").trim())
				});
				var j = {
					names : h,
					emails : g,
					emailTemplate : "candidate_email",
					attachment : {
						joborder : 0,
						clientcompany : 0
					}
				};
				f.length && (i = f.data("json").id, j.candidate_id = i),
				d.publish("modal/sendemail/show", j)
			}
		},
		"dom/action/add/shortlist.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = d.$live.is(":visible") ? d.$live.find(":checkbox[name=candidates]:checked") : d.$rejected.find(":checkbox[name=candidates]:checked"),
			g = [],
			h = [];
			e.hasClass("disabled") || (f.each(function () {
					var b = a(this).data("json").candidate;
					g.push(b.id),
					h.push([b.englishName, b.chineseName].join(" ").trim())
				}), d.publish("modal/addshortlist/show", {
					ids : g,
					names : h,
					type : "people"
				}))
		},
		"dom/action/floating/cv.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = d.$live.is(":visible") ? d.$live.find(":checkbox[name=candidates]:checked") : d.$rejected.find(":checkbox[name=candidates]:checked"),
			g = [],
			h = [];
			e.hasClass("disabled") || (f.each(function () {
					var b = a(this).data("json").candidate,
					c = [b.englishName, b.chineseName].join(" ").trim();
					h.push(c),
					g.push({
						name : c,
						id : b.id
					})
				}), d.publish("modal/add-floating/show", {
					names : h,
					attachment : g,
					checkAttachment : !0
				}))
		},
		"dom/action/add/to/folder.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = d.$live.is(":visible") ? d.$live.find(":checkbox[name=candidates]:checked") : d.$rejected.find(":checkbox[name=candidates]:checked"),
			g = [];
			e.hasClass("disabled") || (f.each(function () {
					g.push(a(this).data("json").candidate.id)
				}), d.publish("modal/add-to-folder/show", {
					ids : g,
					type : "candidate",
					multiSelect : !0
				}))
		}
	})
})