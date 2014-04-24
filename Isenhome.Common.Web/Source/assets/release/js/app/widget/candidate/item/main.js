define("app/widget/candidate/item/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/widget/filter/query", "template!./detail.html", "template!./list.html", "shared/helper/utils", "shared/helper/blurb", "shared/helper/validate", "bootstrap.editable"], function (a, b, c, d, e, f, g, h) {
		function i() {
			var a = this,
			b = a._json,
			c = ["BEGIN:VCARD", "VERSION:2.1"];
			return c.push("FN:" + (b.englishName || b.chineseName)),
			c.push("ORG:" + b.current.client.name),
			c.push("TITLE:" + b.current.title),
			c.push("TEL;WORK;VOICE;PREF:" + b.mobile),
			c.push("EMAIL;INTERNET;PREF:" + b.email),
			c.push("NOTE", "END:VCARD"),
			q.QRCODE + c.join("%0A")
		}
		function j(a) {
			var b = this;
			c(function (a) {
				b.viewType ? b.html(f, b._json, a) : c(function (a) {
					b._json.experience_count > 1 ? b.publish("ajax", {
						url : q.EXPERIENCE.replace("<id>", b._json.id)
					}, c().done(function (c) {
							b._json.working_experience = c,
							a.resolve()
						})) : a.resolve()
				}).done(function () {
					b.html(e, b._json, a)
				})
			}).then(function () {
				k.call(b, a)
			})
		}
		function k(b) {
			var e = this,
			f = e.$element;
			e._json.id;
			var h = e._json;
			e.$listCheck = f.find('[data-action="list/check"]').data("json", h),
			e.$noteCount = f.find(".note-count"),
			e.$floatCount = f.find(".floating-count"),
			e.$targetCount = f.find(".target-count"),
			e.$folderCount = f.find(".folder-count"),
			e.$lastUpdate = f.find(".update-date"),
			e.$interviewForm = f.find(".interview-form"),
			e.$tagsArea = f.find(".tags-area"),
			e.$tagCount = f.find(".tags-count"),
			e.$tag = f.find(".tags").data("onSaveTags", function (a, b) {
					a.preventDefault(),
					e.publish("ajax", {
						url : q.ADD_TAG.replace("<id>", e._json.id),
						data : {
							data : b.join(",")
						},
						type : "post",
						dataType : "json"
					}, c().done(function (a) {
							a.status ? (e.$tagCount.text(b.length), g.alert("success", r.SUCCESSFULLY)) : g.alert("error", a.message)
						}))
				}).attr("data-weave", s + "(true, " + !e._json.islimited + ", onSaveTags)").weave(),
			e.$element.on("click", ".tagit-choice-read-only", function (b) {
				var c,
				f,
				g = a(b.target);
				c = "LI" === g[0].tagName ? g.find(".tagit-label").text() : g.text(),
				d.items.tags = "tags=" + window.encodeURIComponent(c),
				f = d.toString(),
				e.publish(t, {
					filter : f,
					page : 1
				})
			}),
			e.$element.find(".qrcode-action").popover({
				html : !0,
				placement : "bottom",
				content : function () {
					var a = (new Date).getTime(),
					b = new Image;
					return b.onload = function () {
						e.$element.find(".qrcode-image-" + a).html(b).removeClass("widget-spin"),
						b.onload = null
					},
					b.onerror = function () {
						e.publish("error/log", "QR Code load error", {
							url : i.call(e)
						})
					},
					b.src = i.call(e),
					b.width = 200,
					b.height = 200,
					'<div class="widget-spin qrcode-image-' + a + '" style="width: 200px;"></div>'
				},
				trigger : "click"
			}).click(function (a) {
				a.preventDefault()
			}),
			e.$element.find("a.salary").editable({
				emptytext : "未知",
				validate : function (a) {
					return isNaN(a) ? r.ANNUAL_NUMBER : 0 > a ? r.NUMBER_SMALL : a > 1e4 ? r.NUMBER_LARGE : void 0
				},
				display : function (b) {
					b && (arguments[1] ? a(this).html(r.CURRENCY_SYM + " " + b + " " + r.CURRENCY_UNIT) : a(this).html(r.CURRENCY_SYM + " " + b / m + " " + r.CURRENCY_UNIT))
				},
				pk : e._json.id,
				url : q.ADD,
				params : function (a) {
					return a.annualSalary = a.value * m,
					a.id = a.pk,
					a.simple = 1,
					delete a.value,
					delete a.pk,
					delete a.name, {
						data : JSON.stringify(a)
					}
				},
				success : function (a) {
					a.status ? g.alert("success", r.SUCCESSFULLY) : g.alert("error", a.message)
				},
				error : function (a) {
					var b = JSON.parse(a.responseText);
					g.alert("error", b.message)
				},
				inputclass : "input-mini",
				disabled : e._json.islimited || e._isAdmin
			}).on("shown", function (b, c) {
				if (c && a(this).data("value")) {
					var d = a(this).text().match(/((\d+)(\.(\d+))?)/);
					d && c.$form.find("input").val(d[1])
				}
				c && c.$form.find("input").closest("div").after('<span style="display: inline-block; margin: 6px 0 0 5px;">' + r.CURRENCY_UNIT + "</span>")
			});
			var j,
			k;
			e.$element.on("mouseenter", 'a.title, a[data-action="note"]', function (b) {
				var c = a(b.target);
				"A" !== c.prop("tagName") && (c = c.closest("a")),
				e._json.islimited || "0" === c.find('[class*="count"]').text() || (j = function (b) {
					clearTimeout(o),
					a(this).off(b)
				}, k = function (b) {
					p = setTimeout(function () {
							e.publish("slide-helper/detail/close"),
							a(this).off(b)
						}, 600)
				}, a(".slide-helper").off("mouseenter.helper", j).off("mouseleave.helper", k), clearTimeout(n), clearTimeout(o), clearTimeout(p), n = setTimeout(function () {
							var a = "note" === c.attr("data-action");
							e.publish("slide-helper/detail/reload", e._json.id, "candidate", a)
						}, 500), c.on("mouseleave", function (b) {
						clearTimeout(n),
						o = setTimeout(function () {
								e.publish("slide-helper/detail/close"),
								a(".slide-helper").off("mouseenter.helper", j).off("mouseleave.helper", k)
							}, 600),
						a(".slide-helper").on("mouseenter.helper", j).on("mouseleave.helper", k),
						c.off(b)
					}))
			}),
			e.$element.find('[data-toggle="tooltip"]').tooltip(),
			b && b.resolve()
		}
		var l,
		m,
		n,
		o,
		p,
		q = {
			ADD : "/rest/candidate/add",
			REQUEST_SHARE : "/rest/candidate/<id>/requestshare",
			ADD_INTERVIEW : "/rest/candidate/<id>/addinterview",
			ADD_FOLLOWUP : "/rest/candidate/<id>/addfollowup",
			ADD_TAG : "/rest/candidate/<id>/addtag",
			QRCODE : "http://www.gllue.com/qrcode?text=",
			TABLE : "/rest/data/fields?table=candidate",
			EXPERIENCE : "/rest/candidate/experience/<id>"
		},
		r = {
			SUCCESSFULLY : h.t("Operate successfully"),
			CURRENCY_SYM : h.t("Currency symbol"),
			CURRENCY_UNIT : h.t("Currency unit"),
			ANNUAL_NUMBER : h.t("Annual salary must be a number"),
			NUMBER_SMALL : h.t("The number is too small"),
			NUMBER_LARGE : h.t("The number is too large"),
			email : h.t("Private email"),
			email1 : h.t("Work email"),
			email2 : h.t("Other")
		},
		s = "shared/widget/common/tagit/main",
		t = "make/route";
		return b.extend(function (b, c, d, e, f) {
			var g = this;
			g._json = d,
			g._moreInfo = function () {
				var a = {};
				d.city && (a.city = d.city),
				d.city1 && (a.city1 = d.city1),
				d.city2 && (a.city2 = d.city2),
				null !== d.gender && (a.gender = d.gender),
				d.address && (a.address = d.address),
				d.work_years && (a.work_years = d.work_years);
				for (var b = 1; 20 >= b; b++)
					d["ext" + b] && d["ext" + b].value && (a["ext" + b] = d["ext" + b]);
				return a
			}
			(),
			g.showMoreInfo = !a.isEmptyObject(g._moreInfo),
			g.viewType = e,
			g.hideContact = f !== l ? f : !0,
			g.isList = !(arguments[3] == l && arguments[4] === l)
		}, {
			"sig/initialize" : function (a, b) {
				var d = this;
				d.publish("ajax", {
					url : q.TABLE
				}, c().done(function (a) {
						d.table = a,
						b.resolve()
					}))
			},
			"sig/stop" : function (a, b) {
				var c = this;
				clearTimeout(n),
				clearTimeout(o),
				clearTimeout(p),
				c.publish("slide/helper/close"),
				b.resolve()
			},
			"hub:memory/context" : function (a, b) {
				var c = this;
				switch (c._context = b, c._isAdmin = "Admin" === b.user.role, c.actions = b.user.listview.candidate.action_display, b.user.lang) {
				case "cn":
					m = 1e4;
					break;
				case "en":
					m = 1e3;
					break;
				default:
					m = 1e4
				}
				j.call(c)
			},
			"hub/list/check/all" : function () {
				var a = this;
				a.$listCheck.length && a.$listCheck.filter(":not(:disabled)").prop("checked", !0)
			},
			"hub/list/uncheck/all" : function () {
				var a = this;
				a.$listCheck.length && a.$listCheck.filter(":not(:disabled)").prop("checked", !1)
			},
			"hub/candidate/action/toggle" : function (a, b) {
				var c = this;
				c.$element.find("." + b + "-action").toggleClass("hide")
			},
			"dom/action.click.change" : a.noop,
			"dom/action/note.click" : function (b, c) {
				c.preventDefault();
				var d = this;
				a(c.target),
				d._json.islimited || d._isAdmin || d.publish("modal/add-note/show", {
					externalType : "candidate",
					optionType : "candidate_note_category",
					id : d._json.id,
					onSuccess : function (a) {
						if ("started" === d.phase) {
							var b = a.data.status;
							d.publish("add/note/count"),
							d.$noteCount.text(parseInt(d.$noteCount.text(), 10) + 1),
							d.$lastUpdate.text(a.data.lastUpdate);
							var c = d.$element.find(".search_item_tags .status").eq(0);
							b && c.css("background-color", b.color).text(b.value)
						}
					}
				})
			},
			"dom/action/email.click" : function (b, c) {
				c.preventDefault();
				var d = this,
				e = a(c.target),
				f = e.attr("data-email");
				if (!d._json.islimited && !d._isAdmin) {
					var g = e.find("b"),
					h = d._json,
					i = [h.englishName, h.chineseName].join(" ").trim(),
					j = e.attr("data-type");
					j || (h.email ? (j = "email", f = h.email) : h.email1 ? (j = "email1", f = h.email1) : h.email2 && (j = "email2", f = h.email2)),
					d.publish("modal/sendemail/show", {
						names : ['"' + i + '" [' + r[j] + "]"],
						emails : [f],
						emailTemplate : "candidate_email",
						onSuccess : function () {
							"started" === d.phase && (g.text(parseInt(g.text(), 10) + 1), d.publish("candidate/email/tab/reload"))
						},
						attachment : {
							joborder : 0,
							clientcompany : 0
						},
						templateVariable : {
							candidate_id : d._json.id
						}
					})
				}
			},
			"dom/action/task.click" : function (b, c, d) {
				c.preventDefault();
				var e = this;
				if (!e._json.islimited && !e._isAdmin) {
					var f = a(c.target),
					g = f.find("b");
					e.publish("modal/add/task/show", {
						name : d,
						id : e._json.id,
						onSuccess : function () {
							"started" === e.phase && (e.publish("candidate/task/tab/reload"), g.text(parseInt(g.text(), 10) + 1))
						},
						type : "candidate"
					})
				}
			},
			"dom/action/shortlist.click" : function (b, c) {
				c.preventDefault();
				var d = this;
				if (!d._json.islimited && !d._isAdmin) {
					var e = a(c.target),
					f = e.find("b"),
					g = d._json,
					h = g.id,
					i = [g.englishName, g.chineseName].join(" ").trim();
					d.publish("modal/addshortlist/show", {
						ids : [h],
						names : [i],
						onSuccess : function () {
							"started" === d.phase && (d.publish("candidate/shortlist/tab/reload"), f.text(parseInt(f.text(), 10) + 1))
						},
						type : "people"
					})
				}
			},
			"dom/action/request/share.click" : function (b, d, e) {
				d.preventDefault();
				var f = this,
				h = a(d.target),
				i = window.confirm("确认要请求共享此候选人?");
				i && f.publish("ajax", {
					url : q.REQUEST_SHARE.replace("<id>", e)
				}, c().done(function (a) {
						"started" === f.phase && (a.status ? (g.alert("success", r.SUCCESSFULLY), h.closest(".request-share").addClass("request-sending")) : g.alert("error", "Request share error: " + a.message))
					}))
			},
			"dom/action/open/linkedin.click" : function (a, b) {
				b.preventDefault();
				var c = this;
				c.publish("modal/linkedin-preview/show")
			},
			"dom/action/add/to/folder.click" : function (b, c) {
				c.preventDefault();
				var d = this,
				e = a(c.target),
				f = [];
				d._json.islimited || d._isAdmin || (function () {
					d._json.folders.forEach(function (a) {
						f.push(a.id)
					})
				}
					(), d.publish("modal/add-to-folder/show", {
						ids : [d._json.id],
						type : "candidate",
						folders : f,
						multiSelect : !0,
						onSuccess : function (a) {
							"started" === d.phase && (d._json.folders = a, d.$folderCount.text(a.length), e.find(".muted").text(d.getFolderName(a)))
						}
					}))
			},
			"dom/action/floating.click" : function (a, b) {
				b.preventDefault();
				var c = this;
				if (!c._json.islimited && !c._isAdmin) {
					var d = c._json,
					e = [d.englishName, d.chineseName].join(" ").trim();
					c.publish("modal/add-floating/show", {
						names : [e],
						onSuccess : function () {
							"started" === c.phase && (c.publish("candidate/floating/tab/reload"), c.$floatCount.text(parseInt(c.$floatCount.text(), 10) + 1))
						},
						attachment : [{
								name : e,
								id : c._json.id
							}
						],
						checkAttachment : !0
					})
				}
			},
			"dom/action/target.click" : function (a, b) {
				b.preventDefault();
				var c = this;
				c._json.islimited || c._isAdmin || c.publish("modal/target-company/show", {
					id : c._json.id,
					onSuccess : function () {
						"started" === c.phase && (c.publish("candidate/intention/tab/reload"), c.$targetCount.text(parseInt(c.$targetCount.text(), 10) + 1))
					}
				})
			},
			"dom/action/toggle/tags.click" : function (a, b) {
				b.preventDefault();
				var c = this;
				c.$tagsArea.toggleClass("hide")
			},
			"dom/action/profile/open.click" : function (b, c) {
				c.preventDefault();
				var d = a(c.target),
				e = d.attr("href");
				g.window({
					url : e,
					name : "User Profile",
					width : "1024"
				})
			},
			"dom/action/list/check.click" : function () {
				var a = this;
				a.publish("toggle/mass/action")
			},
			getFolderName : function (a) {
				var b = "",
				c = [];
				return a.length && (a.forEach(function (a) {
						c.push(a.name)
					}), b = c.join(", ")),
				b
			}
		})
	})