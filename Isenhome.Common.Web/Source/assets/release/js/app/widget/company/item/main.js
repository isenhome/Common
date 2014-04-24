define("app/widget/company/item/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "template!./detail.html", "template!./list.html"], function (a, b, c, d, e, f, g) {
	function h() {
		var a = this;
		a.publish("ajax", {
			url : n.CLIENT.replace("<id>", a.uid)
		}, c().done(function (b) {
				a._json = b,
				i.call(a)
			}))
	}
	function i() {
		var a = this;
		a.publish("ajax", {
			url : n.NEED_VERIFY
		}, c().done(function (b) {
				a.needVerify = "1" === b[0].value,
				c(function (b) {
					a.viewType ? a.html(g, a._json, b) : a.html(f, a._json, b)
				}).done(function () {
					j.call(a)
				})
			}))
	}
	function j() {
		var b = this,
		c = b.$element;
		b.$noteCount = c.find(".note-count"),
		b.$contractCount = c.find(".contract-count"),
		b.$folderCount = c.find(".folder-count"),
		b.$shortlistCount = c.find(".job-count"),
		b.$listCheck = c.find('[data-action="list/check"]').data("json", b._json),
		c.find(".industry").tooltip();
		var d,
		e,
		f,
		g,
		h;
		b.$element.on("mouseenter", '[data-action="note"], [data-action="job"], [data-action="task"]', function (c) {
			var i = a(c.target);
			g = function (b) {
				clearTimeout(e),
				a(this).off(b)
			},
			h = function (c) {
				f = setTimeout(function () {
						b.publish("slide-helper/note/close"),
						a(this).off(c)
					}, 600)
			},
			a(".slide-helper").off("mouseenter.helper", g).off("mouseleave.helper", h),
			i.data("preview") && (b._json.islimited || b._isAdmin || "0" === i.text() || "0" === i.find('[class*="count"]').text() || (clearTimeout(d), clearTimeout(e), clearTimeout(f), d = setTimeout(function () {
							var a = i.data("action");
							b.publish("slide-helper/" + a + "/reload", b._json.id, "company")
						}, 500), i.on("mouseleave", function (c) {
						e = setTimeout(function () {
								b.publish("slide-helper/note/close"),
								a(".slide-helper").off("mouseenter.helper", g).off("mouseleave.helper", h)
							}, 600),
						a(".slide-helper").on("mouseenter.helper", g).on("mouseleave.helper", h),
						clearTimeout(d),
						i.off(c)
					})))
		})
	}
	var k,
	l = /^(http:\/\/)/i,
	m = /^(www)/i,
	n = {
		ADD_CONTRACT : "/rest/client/contractadd",
		APPROVE : "/rest/client/verify",
		CLIENT : "/rest/client/<id>",
		NEED_VERIFY : "/rest/data/configvalue?keys=client_need_verify"
	};
	return b.extend(function (a, b, c, d) {
		var e = this;
		e._json = c,
		e.viewType = d,
		e.isList = arguments[3] !== k
	}, {
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._context = b,
			i.call(c)
		},
		"hub/list/check/all" : function () {
			var a = this;
			a.$listCheck.filter(":not(:disabled)").prop("checked", !0)
		},
		"hub/list/uncheck/all" : function () {
			var a = this;
			a.$listCheck.filter(":not(:disabled)").prop("checked", !1)
		},
		"dom/action.click" : a.noop,
		"dom/action/list/check.click" : function () {
			var a = this;
			a.publish("toggle/mass/action")
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
		"dom/action/dropdown.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = e.siblings(".dropdown-menu"),
			g = a(document),
			h = e.closest(".btn-group");
			d.$element.find(".btn-group").removeClass("open"),
			h.addClass("open"),
			g.on("click.btn.dropdown", function (b) {
				var c = a(b.target);
				!c.closest(f).length && h.hasClass("open") && (h.removeClass("open"), g.off("click.btn.dropdown"))
			})
		},
		"dom/action/approve/action.click" : function (b, d) {
			var f,
			g = this,
			i = a(d.target),
			j = i.closest(".btn-group"),
			k = j.find(":radio:checked");
			f = {
				id : g._json.id,
				verifystatus : k.val()
			},
			g.publish("ajax", {
				url : n.APPROVE,
				data : {
					data : JSON.stringify(f)
				},
				type : "post"
			}, c().done(function (a) {
					a.status ? (e.alert("success", "验证操作成功"), g.uid = g._json.id, h.call(g)) : e.alert("error", a.data)
				}))
		},
		"dom/action/note.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target),
			d.publish("modal/add-note/show", {
				externalType : "client",
				optionType : "client_note_category",
				id : d._json.id,
				onSuccess : function () {
					d.$noteCount.text(parseInt(d.$noteCount.text(), 10) + 1)
				}
			})
		},
		"dom/action/add/contract.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			a(c.target),
			d._json.islimited || d.publish("modal/add/contract/show", n.ADD_CONTRACT, d._json.id, function (a) {
				a.status ? d.$contractCount.text(parseInt(d.$contractCount.text(), 10) + 1) : e.alert("error")
			})
		},
		"dom/action/add/to/folder.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = [];
			!function () {
				d._json.folders.forEach(function (a) {
					f.push(a.id)
				})
			}
			(),
			d.publish("modal/add-to-folder/show", {
				ids : [d._json.id],
				type : "client",
				folders : f,
				multiSelect : !0,
				onSuccess : function (a) {
					d._json.folders = a,
					d.$folderCount.text(a.length),
					e.find(".muted").text(d.getFolderName(a))
				}
			})
		},
		"dom/action/job.click" : function (a, b) {
			b.preventDefault()
		},
		"dom/action/task.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target),
			f = e.find("b");
			d.publish("modal/add/task/show", {
				name : d._json.name,
				id : d._json.id,
				onSuccess : function () {
					f.text(parseInt(f.text(), 10) + 1)
				},
				type : "client"
			})
		},
		parseValue : function (a) {
			return l.test(a) ? '<a href="' + a + '" target="_blank">' + a + "</a>" : m.test(a) ? '<a href="http://' + a + '" target="_blank">' + a + "</a>" : a
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