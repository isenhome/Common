define("app/widget/job/item/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./detail.html", "template!./list.html", "template!./more-info.html", "shared/helper/utils", "shared/helper/blurb", "shared/widget/filter/query"], function (a, b, c, d, e, f, g, h, i) {
	function j(a) {
		var b = this;
		c(function (a) {
			b.viewType ? b.html(e, b._json, a) : b.html(d, b._json, a)
		}).then(function () {
			a.resolve(),
			k.call(b)
		})
	}
	function k() {
		var b = this;
		b.$noteCount = b.$element.find(".note-count"),
		b.$tagCount = b.$element.find(".tags-count"),
		b.$tagsArea = b.$element.find(".tags-area"),
		b.$tag = b.$element.find(".tags").data("onSaveTags", function (c, d) {
				c.preventDefault(),
				a.ajax({
					url : m.ADD_TAG.replace("<id>", b._json.id),
					data : {
						data : d.join(",")
					},
					type : "post",
					dataType : "json"
				}).done(function (a) {
					a.status ? (b.$tagCount.text(d.length), g.alert("success", n.ADD_TAG_SUCCESS)) : g.alert("error", a.message)
				}).fail(function () {
					g.alert("error")
				})
			}).attr("data-weave", o + "(true, true, onSaveTags)").weave(),
		b.$element.on("click", ".tagit-choice-read-only", function (c) {
			var d,
			e,
			f = a(c.target);
			d = "LI" === f[0].tagName ? f.find(".tagit-label").text() : f.text(),
			i.items.tags = "tags=" + window.encodeURIComponent(d),
			e = i.toString(),
			b.publish(p, {
				filter : e,
				page : 1
			})
		}),
		b.$element.find('[data-toggle="popover"]').popover({
			html : !0,
			placement : "top",
			content : f(b._moreInfo),
			trigger : "hover"
		}).click(function (a) {
			a.preventDefault()
		}),
		b.$element.find('[data-toggle="tooltip"]').tooltip();
		var c,
		d,
		e,
		h,
		j;
		b.$element.on("mouseenter", '[data-action="note"], [data-action="task"]', function (f) {
			var g = a(f.target);
			h = function (b) {
				clearTimeout(d),
				a(this).off(b)
			},
			j = function (c) {
				e = setTimeout(function () {
						b.publish("slide-helper/note/close"),
						a(this).off(c)
					}, 600)
			},
			a(".slide-helper").off("mouseenter.helper", h).off("mouseleave.helper", j),
			g.data("preview") && (b._json.islimited || b._isAdmin || "0" === g.text() || "0" === g.find('[class*="count"]').text() || (clearTimeout(c), clearTimeout(d), clearTimeout(e), c = setTimeout(function () {
							var a = g.data("action");
							b.publish("slide-helper/" + a + "/reload", b._json.id, "job")
						}, 500), g.on("mouseleave", function (e) {
						d = setTimeout(function () {
								b.publish("slide-helper/note/close"),
								a(".slide-helper").off("mouseenter.helper", h).off("mouseleave.helper", j)
							}, 600),
						a(".slide-helper").on("mouseenter.helper", h).on("mouseleave.helper", j),
						clearTimeout(c),
						g.off(e)
					})))
		})
	}
	var l,
	m = {
		SAVE_INVOICE : "/rest/joborder/shortlist/<id>/addinvoice",
		ADD_TAG : "/rest/joborder/<id>/addtag"
	},
	n = {
		LOAD_X_ERROR : h.t("Load x error"),
		DELETE_X_TAG_SUCCESS : h.t("Delete tag x successfully"),
		FILL_IN_X : h.t("Please fill in x"),
		NEED_NEW_TAG : h.t("Need tag"),
		ADD_TAG_SUCCESS : h.t("Add tags successfully")
	},
	o = "shared/widget/common/tagit/main",
	p = "make/route";
	return b.extend(function (b, c, d, e) {
		var f = this;
		f._json = d,
		f.viewType = e,
		f._moreInfo = function () {
			for (var a = {}, b = 1; 6 >= b; b++)
				d["ext" + b].value && (a["ext" + b] = d["ext" + b]);
			return a
		}
		(),
		f.showMoreInfo = !a.isEmptyObject(f._moreInfo),
		f.isList = arguments !== l
	}, {
		"sig/initialize" : function (a, b) {
			var c = this;
			j.call(c, b)
		},
		"hub:memory/context" : function (a, b) {
			var d = this,
			e = b.user.id;
			d._json.users.forEach(function (a) {
				return a.user.id == e ? (d._islimited = !1, !1) : void 0
			}),
			j.call(d, c())
		},
		"dom/action.click.change" : a.noop,
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
		"dom/action/task.click" : function (b, c) {
			c.preventDefault();
			var d = this;
			if (!d._json.islimited) {
				var e = a(c.target),
				f = e.find("b");
				d.publish("modal/add/task/show", {
					name : d._json.jobTitle,
					id : d._json.id,
					onSuccess : function () {
						"started" === d.phase && f.text(parseInt(f.text(), 10) + 1)
					},
					type : "joborder"
				})
			}
		},
		"dom/action/note.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = a(c.target);
			d._json.islimited || d._isAdmin || (e.closest(".dropdown").removeClass("open"), d.publish("modal/add-note/show", {
					externalType : "joborder",
					optionType : "joborder_note_category",
					id : d._json.id,
					onSuccess : function () {
						"started" === d.phase && d.$noteCount.text(parseInt(d.$noteCount.text(), 10) + 1)
					}
				}))
		},
		"dom/action/send/email" : function (b, c) {
			c.preventDefault();
			var d = this;
			if (!d._json.islimited) {
				var e,
				f = a(c.target),
				g = f.find("b"),
				h = d._json,
				i = h.contacts,
				j = [],
				k = [];
				i.forEach(function (a, b) {
					var c = a.clientContact;
					0 === b && (e = c.id),
					j.push([c.englishName, c.chineseName].join(" ").trim()),
					k.push(c.email)
				}),
				d.publish("modal/sendemail/show", {
					names : j,
					emails : k,
					emailTemplate : null,
					onSuccess : function () {
						"started" === d.phase && g.text(parseInt(g.text(), 10) + 1)
					},
					templateVariable : {
						joborder_id : d._json.id
					}
				})
			}
		},
		"hub:memory/job/set/jobAttr" : function (a, b) {
			var c = this;
			b.jobAttr = c._json
		},
		"hub/job/item/open/invoice/modal" : function (a, b) {
			var c = this,
			d = m.SAVE_INVOICE.replace("<id>", b.id);
			c.publish("modal/allocation-revenue/show", {
				saveUrl : d,
				jobAttr : c._json,
				candidate_id : c.candidateId,
				owner : b.owner,
				onSuccess : function (a) {
					"started" === c.phase && b.onSuccess && b.onSuccess(a)
				}
			})
		},
		"dom/action/toggle/tag.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$tagsArea.toggleClass("hide")
		}
	})
})