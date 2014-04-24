define("app/widget/candidate/detail/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "template!./main.html", "shared/helper/blurb"], function (a, b, c, d, e, f, g) {
	function h() {
		var a = this,
		b = a._json,
		c = ["BEGIN:VCARD", "VERSION:2.1"];
		return c.push("FN:" + (b.englishName || b.chineseName)),
		c.push("ORG:" + b.current.client.name),
		c.push("TITLE:" + b.current.title),
		c.push("TEL;WORK;VOICE;PREF:" + b.mobile),
		c.push("EMAIL;INTERNET;PREF:" + b.email),
		c.push("NOTE", "END:VCARD"),
		m.QRCODE + c.join("%0A")
	}
	function i(a) {
		var b = this;
		b.uid !== l && b._isAdmin !== l && b.publish("ajax", {
			url : m.CANDIDATE.replace("<id>", b.uid)
		}, c().done(function (c) {
				b._json = c,
				j.call(b, a)
			}))
	}
	function j() {
		var a = this;
		a.publish("ajax", {
			url : m.TABLE
		}, c().done(function (b) {
				a.table = b,
				c(function (b) {
					a.html(f, a._json, b)
				}).done(function () {
					k.call(a)
				})
			}))
	}
	function k() {
		var b = this,
		d = b._json.id,
		f = b.$element;
		b.$noteCount = f.find(".nav-tabs .note-count"),
		b.$emailCount = f.find(".nav-tabs .email-count"),
		b.$taskCount = f.find(".nav-tabs .task-count"),
		b.$shortlistCount = f.find(".nav-tabs .shortlist-count"),
		b.$intentionCount = f.find(".nav-tabs .intention-count"),
		a('a[href="#note-tab"]').one("shown", function () {
			f.find("#note-tab").data("content", b._json).attr("data-weave", q + "(content)").weave()
		}),
		b._json.linkedin && a('a[href="#linkedin-tab"]').one("shown", function () {
			f.find(".linkedin-content").attr("data-weave", o + '("' + b._json.linkedin + '")').weave()
		}),
		a('a[href="#email-tab"]').one("shown", function () {
			f.find("#email-tab").attr("data-weave", p + '("' + d + '")').weave()
		}),
		a('a[href="#task-tab"]').one("shown", function () {
			f.find("#task-tab").attr("data-weave", r + '("' + d + '")').weave()
		}),
		a('a[href="#shortlist-tab"]').one("shown", function () {
			f.find("#shortlist-tab .activity-history").attr("data-weave", s + '("' + d + '")').weave()
		}),
		a('a[href="#target-tab"]').one("shown", function () {
			f.find("#target-tab").attr("data-weave", u + '("' + d + '", "candidate")').weave()
		}),
		a('a[href="#floating-tab"]').one("shown", function () {
			f.find("#floating-tab").attr("data-weave", t + '("' + d + '", "candidate")').weave()
		}),
		a('a[href="#floating-in-tab"]').one("shown", function () {
			f.find("#floating-in-tab").attr("data-weave", t + '("' + d + '", "clientContact")').weave()
		}),
		b.publish("ajax", {
			url : m.ISBINDED
		}, c().done(function (a) {
				a.data.binded && a.data.expire >= 0 && b._json.linkedin && f.find(".linkedin").removeClass("hide")
			})),
		b.$element.find(".qrcode-action").popover({
			html : !0,
			placement : "bottom",
			content : function () {
				var a = (new Date).getTime(),
				c = new Image;
				return c.onload = function () {
					b.$element.find(".qrcode-image-" + a).html(c).removeClass("widget-spin"),
					c.onload = null
				},
				c.onerror = function () {
					b.publish("error/log", "QR Code load error", {
						url : h.call(b)
					})
				},
				c.src = h.call(b),
				c.width = 200,
				c.height = 200,
				'<div class="widget-spin qrcode-image-' + a + '" style="width: 200px;"></div>'
			},
			trigger : "click"
		}).click(function (a) {
			a.preventDefault()
		}),
		b.isSlide && b.publish("candidate/detail/rendered"),
		e.widgetLoaded.call(b)
	}
	var l,
	m = {
		ISBINDED : "/rest/linkedin/isbinded",
		CANDIDATE : "/rest/candidate/<id>",
		DELETE : "/rest/candidate/delete",
		TABLE : "/rest/data/fields?table=candidate",
		QRCODE : "http://www.gllue.com/qrcode?text="
	},
	n = {
		email : g.t("Private email"),
		email1 : g.t("Work email"),
		email2 : g.t("Other")
	},
	o = "app/widget/candidate/detail/linkedin-tab/main",
	p = "app/widget/candidate/detail/email-tab/main",
	q = "app/widget/candidate/detail/note-tab/main",
	r = "app/widget/candidate/detail/task-tab/main",
	s = "app/widget/candidate/detail/shortlist-tab/main",
	t = "app/widget/candidate/detail/floating-tab/main",
	u = "app/widget/candidate/detail/target-tab/main";
	return b.extend(function (a, b, c) {
		var d = this;
		d.isSlide = c,
		d.isSlide ? d.subscribe("candidate/slide/detail/id", !0, function (a, b) {
			d.uid = b,
			i.call(d)
		}) : d.subscribe("detail/id/change", !0, function (a, b) {
			d.uid = b,
			i.call(d)
		})
	}, {
		"hub/candidate/show/resume" : function () {
			var a = this,
			b = a.$element.find('a[href="#resume-tab"]');
			b.parent().hasClass("active") || b.trigger("click")
		},
		"hub/candidate/show/note" : function () {
			var a = this,
			b = a.$element.find('a[href="#note-tab"]');
			b.parent().hasClass("active") || b.trigger("click")
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._isAdmin = "Admin" === b.user.role,
			i.call(c)
		},
		"dom/action.click" : a.noop,
		"dom/action/people/delete.click" : function (b, d) {
			d.preventDefault(),
			a(d.target);
			var f,
			g = this;
			if (f = window.confirm("确定要删除所选的人才吗?")) {
				var h = [g._json.id];
				g.publish("ajax", {
					url : m.DELETE,
					data : {
						data : JSON.stringify({
							ids : h
						})
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? (e.alert("success", "人才删除成功!"), window.history.back()) : e.alert("error", a.message)
					}))
			}
		},
		"dom/action/open/profile.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			f = d.attr("href");
			e.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/note.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target),
			d._json.islimited || d._isAdmin || d.publish("modal/add-note/show", {
				externalType : "candidate",
				optionType : "candidate_note_category",
				id : d._json.id,
				onSuccess : function (a) {
					"started" === d.phase && (a.data.status, a.status && d.publish("canddiate/note/tab/reload"))
				}
			})
		},
		"dom/action/email.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			if (!d._json.islimited && !d._isAdmin) {
				var e = a(c.target);
				e.find("b");
				var f = d._json,
				g = [f.englishName, f.chineseName].join(" ").trim(),
				h = e.attr("data-email"),
				i = e.attr("data-type");
				i || (f.email ? (i = "email", h = f.email) : f.email1 ? (i = "email1", h = f.email1) : f.email2 && (i = "email2", h = f.email2)),
				d.publish("modal/sendemail/show", {
					names : ['"' + g + '" ' + "[" + n[i] + "]"],
					emails : [h],
					emailTemplate : "candidate_email",
					onSuccess : function () {
						"started" === d.phase && d.publish("candidate/email/tab/reload")
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
				var f = a(c.target);
				f.find("b"),
				e.publish("modal/add/task/show", {
					name : d,
					id : e._json.id,
					onSuccess : function () {
						"started" === e.phase && e.publish("candidate/task/tab/reload")
					},
					type : "candidate"
				})
			}
		},
		"dom/action/shortlist.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			if (!d._json.islimited && !d._isAdmin) {
				var e = a(c.target);
				e.find("b");
				var f = d._json,
				g = f.id,
				h = [f.englishName, f.chineseName].join(" ").trim();
				d.publish("modal/addshortlist/show", {
					ids : [g],
					names : [h],
					onSuccess : function () {
						"started" === d.phase && d.publish("candidate/shortlist/tab/reload")
					},
					type : "people"
				})
			}
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
						"started" === d.phase && (d._json.folders = a, e.find(".muted").text(d.getFolderName(a)))
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
						"started" === c.phase && c.publish("candidate/floating/tab/reload")
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
					"started" === c.phase && c.publish("candidate/intention/tab/reload")
				}
			})
		},
		getFolderName : function (a) {
			var b = "",
			c = [];
			return a.length && (a.forEach(function (a) {
					c.push(a.name)
				}), b = c.join(", ")),
			b
		},
		"hub/candidate/action/count" : function (a, b, c) {
			var d = this;
			if (d.$element.is(":visible"))
				switch (b) {
				case "note":
					d.$noteCount && d.$noteCount.text(c);
					break;
				case "email":
					d.$emailCount && d.$emailCount.text(c);
					break;
				case "task":
					d.$taskCount && d.$taskCount.text(c);
					break;
				case "shortlist":
					d.$shortlistCount && d.$shortlistCount.text(c);
					break;
				case "intention":
					d.$intentionCount && d.$intentionCount.text(c);
					break;
				case "change":
					d.$element.find(".change-count") && d.$element.find(".change-count").text(c)
				}
		}
	})
})