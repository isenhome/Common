define("app/widget/candidate/add/main", ["jquery", "shared/widget/base/main", "troopjs-utils/uri", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "template!./linkedin-candidate.html", "template!./attachments.html", "shared/helper/utils", "shared/helper/validate", "shared/helper/blurb", "config", "jquery.form", "bootstrap.editable"], function (a, b, c, d, e, f, g, h, i, j, k) {
	function l(a) {
		var b = this,
		c = b.$element.find(".f_req:not(.always):not(.experience)");
		a ? (c.removeClass("hide"), b.$element.find(".not-required:not(.experience)").addClass("required").removeClass("not-required"), b.publish("experience/switch/rules", !0)) : (c.addClass("hide"), b.$element.find(".required:not(.experience)").removeClass("required").addClass("not-required"), b.publish("experience/switch/rules", !1))
	}
	function m() {
		var b = this,
		c = {
			mobile : {
				phone : !0,
				checkDuplicate : {
					url : "/rest/candidate/check",
					type : "post",
					checkType : "mobile",
					dataFilter : function (a) {
						var c = JSON.parse(a),
						d = c.data === D ? !0 : !1,
						e = b.$mobile;
						return d || b._json.mobile === c.data.mobile ? (e.closest(".control-group").find(".duplicate-info").addClass("hide"), '"true"') : (n.call(b, e, c.data), '" "')
					}
				}
			},
			email : {
				email : !0,
				checkDuplicate : {
					url : "/rest/candidate/check",
					type : "post",
					checkType : "email",
					dataFilter : function (a) {
						var c = JSON.parse(a),
						d = c.data === D ? !0 : !1,
						e = b.$email;
						return d || b._json.email === c.data.email ? (e.closest(".control-group").find(".duplicate-info").addClass("hide"), '"true"') : (n.call(b, e, c.data), '" "')
					}
				}
			},
			email1 : {
				checkDuplicate : {
					url : "/rest/candidate/check",
					type : "post",
					checkType : "email",
					dataFilter : function (a) {
						var c = JSON.parse(a),
						d = c.data === D ? !0 : !1,
						e = b.$email;
						return d || b._json.email === c.data.email ? (e.closest(".control-group").find(".duplicate-info").addClass("hide"), '"true"') : (n.call(b, e, c.data), '" "')
					}
				}
			},
			email2 : {
				checkDuplicate : {
					url : "/rest/candidate/check",
					type : "post",
					checkType : "email",
					dataFilter : function (a) {
						var c = JSON.parse(a),
						d = c.data === D ? !0 : !1,
						e = b.$email;
						return d || b._json.email === c.data.email ? (e.closest(".control-group").find(".duplicate-info").addClass("hide"), '"true"') : (n.call(b, e, c.data), '" "')
					}
				}
			},
			linkedin : {
				linkedin : !0,
				checkDuplicate : {
					url : "/rest/candidate/check",
					type : "post",
					checkType : "linkedin",
					dataFilter : function (a) {
						var c = JSON.parse(a),
						d = c.data === D ? !0 : !1,
						e = b.$linkedin;
						return d || b._json.linkedin === c.data.linkedin ? (e.closest(".control-group").find(".duplicate-info").addClass("hide"), '"true"') : (n.call(b, e, c.data), '" "')
					}
				}
			},
			owner : {
				required : !0
			},
			annualSalary : {
				number : !0,
				min : 0,
				max : 1e4
			}
		};
		b.mandatory.englishName_or_chineseName && (c = a.extend(!0, c, {
					englishName : {
						require_from_group : [1, ".fill-one-name"]
					},
					chineseName : {
						require_from_group : [1, ".fill-one-name"]
					}
				})),
		j(b.$form, {
			rules : c,
			messages : {
				mobile : {
					require_from_group : "邮箱或手机必须填写一项"
				},
				email : {
					require_from_group : "邮箱或手机必须填写一项"
				}
			}
		})
	}
	function n(a, b) {
		var c = a.closest(".control-group").find(".duplicate-info").removeClass("hide");
		c.data("json", {
			islimited : b.islimited,
			candidate : {
				id : b.id,
				englishName : b.englishName,
				chineseName : b.chineseName,
				title : b.title,
				company : b.company
			},
			owner : {
				id : b.owner.id,
				englishName : b.owner.englishName,
				chineseName : b.owner.chineseName
			}
		}).attr("data-weave", G + "(json)").weave()
	}
	function o(b) {
		var c,
		d = this;
		c = a.isArray(b) ? b : b.split(",");
		for (var e = c.length; e--; )
			d.$tags.tagit("createTag", c[e])
	}
	function p(a) {
		this.$email.val(a),
		this.$email.blur()
	}
	function q(a) {
		this.$chineseName.val(a)
	}
	function r(a) {
		this.$englishName.val(a)
	}
	function s(a) {
		this.$mobile.val(a),
		this.$mobile.blur()
	}
	function t(a) {
		this.$gender.filter('[value="' + a + '"]').prop("checked", !0)
	}
	function u(a) {
		this.$linkedin.val(a)
	}
	function v(a) {
		var b = a.split("-"),
		c = b[0],
		d = b[1],
		e = b[2];
		c && this.$year.val(c).trigger("change"),
		d && this.$month.val(d),
		e && this.$day.val(e)
	}
	function w(a) {
		var b = this;
		a.email && p.call(b, a.email),
		a.chineseName && q.call(b, a.chineseName),
		a.englishName && r.call(b, a.englishName),
		a.mobile && s.call(b, a.mobile),
		a.tags && o.call(b, a.tags),
		a.gender && t.call(b, Boolean(parseInt(a.gender, 10))),
		a.dateOfBirth && v.call(b, a.dateOfBirth),
		a.linkedin && u.call(b, a.linkedin),
		a.education.length && b.publish("education/reset", a.education),
		a.experiences.length && (a.city && (a.experiences[0].city = a.city), b.publish("experience/reset", a.experiences))
	}
	function x() {
		var b = this;
		b.$btnFile.data("json", {
			multiple : !0,
			data : {
				type : "candidate"
			},
			beforeSubmit : function (a, c, d) {
				b.$btnFile.prev().addClass("hide"),
				this.$controls = b.$btnFile.closest(".controls"),
				this.$controls.addClass("text_line");
				var e = JSON.parse(d.data.data);
				e.tag = b.$attachmentType.val(),
				d.data.data = JSON.stringify(e)
			},
			success : function (c) {
				if (b.$btnFile.prev().removeClass("hide"), this.$controls.removeClass("text_line"), c.status) {
					var d = a(h(c.data));
					b.$attachmentList.append(d),
					b.$attachmentList.closest(".controls").removeClass("hide"),
					d.find('a[data-action*="attachment/preview"]').eq(0).trigger("click"),
					d.find("[data-weave]").weave(),
					c.data.forEach(function (a, c) {
						0 === c && !b.editMode && a.extract && w.call(b, a.extract),
						b._attachmentsUuidname.push(a.uuidname)
					})
				} else
					i.alert("error", c.message)
			},
			error : function () {
				this.$controls.removeClass("text_line")
			}
		}).attr("data-weave", "shared/widget/common/upload/main(json)").weave()
	}
	function y(b) {
		var c = this,
		e = {},
		f = [];
		c.publish("ajax", {
			url : I.TEMP_FILE.replace("<uuidname>", b)
		}, d().done(function (b) {
				var d = a(h(b));
				c.$attachmentList.append(d),
				c.$attachmentList.closest(".controls").removeClass("hide"),
				d.find("[data-weave]").weave();
				for (var g = 0, i = b.length; i > g; g++) {
					var j = b[g];
					j.extract.englishName || delete j.extract.englishName,
					j.extract.chineseName || delete j.extract.chineseName,
					e = a.extend(!0, j.extract, e),
					f = a.extend(!0, f, j.extract.tags),
					d.find('.controls a[data-action*="attachment/preview').eq(0).data("guess", e).data("tags", f),
					c._attachmentsUuidname.push(j.uuidname)
				}
				d.find('a[data-action*="attachment/preview"]').eq(0).trigger("click"),
				w.call(c, e),
				o.call(c, f)
			}))
	}
	function z() {
		var a = this;
		a.editMode !== D && a.userId !== D && a.publish("ajax", {
			url : I.CONFIG_KEYS
		}, d().done(function (b) {
				a.mandatory = JSON.parse(b[0].value),
				a.publish("experience/mandatory", a.mandatory),
				a.editMode ? A.call(a) : B.call(a)
			}))
	}
	function A() {
		var a = this;
		a.publish("ajax", {
			url : I.CANDIDATE.replace("<id>", a._cid)
		}, d().done(function (b) {
				a._json = b,
				B.call(a)
			}))
	}
	function B() {
		var a = this;
		d(function (b) {
			a.html(f, a._json, b)
		}).then(function () {
			C.call(a)
		})
	}
	function C() {
		var b = this,
		e = b.$element.find("form").eq(1),
		f = "",
		g = null,
		j = c(window.location.hash.replace(/^#/, ""));
		if (b.$form = e, b.$attachments = a("#attachments"), b.$type = e.find('[name="type"]'), b.$email = a("#email"), b.$chineseName = a("#chineseName"), b.$englishName = a("#englishName"), b.$gender = a('[name="gender"]:radio'), b.$mobile = a('[name="mobile"]'), b.$location = e.find('[name="location"]'), b.locationWidget = e.find('[data-name="location"]'), b.$city = e.find('[name="city"]'), b.$city1 = e.find('[name="city1"]'), b.$city2 = e.find('[name="city2"]'), b.$year = a("#birthYear"), b.$month = a("#birthMonth"), b.$day = a("#birthDay"), b.$linkedin = a("#linkedin"), b.$ajaxLoader = b.$element.find(".icon-loading-circle"), b.$linkedinArea = b.$element.find(".linkedin-candidate"), b.$tags = b.$element.find("#tags"), b.$btnFile = b.$element.find(".upload-file"), b.$expBlock = e.find(".experience-block"), b.$eduBlock = e.find(".education-block"), b.$education = e.find("#education"), b.$school = e.find("#school"), b.$job = e.find('[name="job"]'), b.$controlShare = e.find(".control-share"), b.$mpc = e.find('[name="is_mpc"]'), b.$attachmentList = b.$element.find(".attachment-list"), b.$attachmentType = b.$element.find('[name="attachment-type"]'), x.call(b), b.publish("ajax", {
				url : I.ISBINDED
			}, d().done(function (a) {
					a.data.binded && a.data.expire >= 0 ? e.find(".has-linkedin").removeClass("hide") : e.find(".no-linkedin").removeClass("hide")
				})), b.editMode && (b.$gender.filter('[value="' + b._json.gender + '"]').prop("checked", !0), f = b._json.share, g = b._json.tags, b.userId !== b._json.owner.id && b.$controlShare.data("disabled", !0), b.publish("ajax", {
					url : I.GET_ATTACHMENTS.replace("<id>", b._cid)
				}, d().done(function (c) {
						var d = a(h(c));
						b.$attachmentList.append(d),
						d.find("[data-weave]").weave(),
						b.$attachmentList.closest(".controls").removeClass("hide")
					}))), b.$controlShare.data("json", f).attr("data-weave", H + "(json)").weave(), b.$expBlock.data("json", a.isEmptyObject(b._json.experiences) ? null : b._json.experiences).attr("data-weave", E + "(json)").weave(d().done(function () {
					var a = b.$type.filter(":checked").data("checked", !0);
					if ("coldcall" === a.val() && l.call(b, !1), j.path)
						for (var c = j.path, e = 0, f = c.length; f > e; e++)
							if (c[e].match(/^company=(\d+)/)) {
								b.publish("ajax", {
									url : I.COMPANY.replace("<id>", RegExp.$1)
								}, d().done(function (a) {
										b.$element.find('[name*="company-"]').eq(0).val(a.name)
									}));
								break
							}
				})), b.$eduBlock.data("json", a.isEmptyObject(b._json.education) ? null : b._json.education).attr("data-weave", F + "(json)").weave(), b.uuidname && y.call(b, b.uuidname), j.path)
			for (var k = j.path, n = 0, o = k.length; o > n; n++)
				if (k[n].match(/^job=(\d+)/)) {
					b.$job.val(RegExp.$1).trigger("change");
					break
				}
		m.call(b),
		b.$element.find("form").eq(0).editable({
			selector : "span.label",
			mode : "inline",
			emptytext : "未知",
			source : I.CATEGORY,
			sourceCache : !0,
			url : I.EDIT_CATE,
			params : function (a) {
				return a.id = a.pk,
				a.tag = a.value,
				delete a.value,
				delete a.pk,
				delete a.name, {
					data : JSON.stringify(a)
				}
			},
			success : function (b) {
				a(this).css("background-color", b.data.tag.color).text(b.data.tag.value)
			},
			error : function (a) {
				var b = JSON.parse(a.responseText);
				i.alert("error", b.message)
			}
		}),
		b.$element.find(".custom-fields").data("json", b._json).attr("data-weave", "app/widget/common/custom-fields/main('candidate', json)").weave(),
		i.widgetLoaded.call(b)
	}
	var D,
	E = "app/widget/candidate/add/experience/main",
	F = "app/widget/candidate/add/education/main",
	G = "app/widget/common/share-request/main",
	H = "shared/widget/common/add-share/main",
	I = {
		ADD : "/rest/candidate/add",
		LIST : "/rest/data/<type>/list",
		CANDIDATE : "/rest/candidate/<id>",
		ISBINDED : "/rest/linkedin/isbinded",
		SEARCH_LINKEDIN : "/rest/linkedin/search?first-name=<firstName>&last-name=<lastName>",
		TEMP_FILE : "/rest/file/list/temp/<uuidname>",
		CONFIG_KEYS : "/rest/data/configvalue?keys=candidate_require_fields",
		MERGE_ATTACHMENT : "/rest/file/bind_candidate",
		GET_ATTACHMENTS : "/rest/file/list/candidate/<id>",
		CATEGORY : "/rest/data/options?type=candidate_attachment_category",
		EDIT_CATE : "/rest/file/edit",
		COMPANY : "/rest/client/<id>"
	},
	J = {
		SUCCESSFULLY : k.t("Operate successfully")
	};
	return b.extend(function () {
		this._attachmentsUuidname = []
	}, {
		"hub:memory/add/id/change" : function (a, b) {
			var c = this;
			c._cid = b,
			c.uuidname = D,
			c._json = {},
			c.editMode = c._cid !== D ? !0 : !1,
			c.subscribe("context", !0, function (a, b) {
				switch (c.userId = b.user.id, b.user.lang) {
				case "cn":
					c.currencyEx = 1e4;
					break;
				case "en":
					c.currencyEx = 1e3;
					break;
				default:
					c.currencyEx = 1e4
				}
				z.call(c)
			})
		},
		"hub:memory/add/other/change" : function (a, b) {
			var c = this;
			b && (c.uuidname = b, c.editMode = !1, c.subscribe("context", !0, function (a, b) {
					switch (c.userId = b.user.id, b.user.lang) {
					case "cn":
						c.currencyEx = 1e4;
						break;
					case "en":
						c.currencyEx = 1e3;
						break;
					default:
						c.currencyEx = 1e4
					}
					z.call(c)
				}))
		},
		"hub:memory/location/set" : function (a, b) {
			var c = this;
			c.$location.val() || c.locationWidget.woven()[0].selectById(b)
		},
		"hub/merge/attachment" : function (a, b, c) {
			var e = this;
			return e._attachmentsUuidname.length ? (c.prop("disabled", !0), e.publish("ajax", {
					url : I.MERGE_ATTACHMENT,
					data : {
						data : JSON.stringify({
							candidate_id : b,
							uuidname : e._attachmentsUuidname
						})
					},
					type : "post"
				}, d().done(function (a) {
						a.status ? i.alert("success", J.SUCCESSFULLY) : i.alert("error", a.message)
					})), void 0) : (i.alert("error", "No file selected!"), void 0)
		},
		"dom/action.click.change" : a.noop,
		"dom/action/people/type.click" : function (b, c) {
			var d = this,
			e = a(c.target);
			"coldcall" === e.val() ? l.call(d, !1) : l.call(d, !0)
		},
		"dom/action/linkedin.change" : function (b, c) {
			var d = a(c.target),
			e = "",
			f = /^(.*)(\/)$/,
			g = d.val();
			e = g.replace(f, "$1"),
			g.length && !/^http:\/\/.*/.test(e) && (e = "http://" + e),
			d.val(e)
		},
		"dom/action/attachment/preview.click" : function (b, c, d) {
			c.preventDefault();
			var e = this;
			a(c.target),
			e.publish("slide-helper/attachment/reload", d)
		},
		"dom/action/history/back.click" : function (a, b) {
			b.preventDefault(),
			window.history.back()
		},
		"dom/action/auto/match.click" : function (b, c) {
			c.preventDefault();
			var e = this,
			f = a(c.target);
			f.closest(".controls");
			var h = e.$englishName.val().trim().length ? e.$englishName.val().trim().split(" ") : null,
			j = h ? h[0] : "",
			k = h && h[1] ? h[1] : "";
			f.addClass("hide"),
			e.$ajaxLoader.removeClass("hide"),
			e.$linkedinArea.children().remove(),
			e.publish("ajax", {
				url : I.SEARCH_LINKEDIN.replace("<firstName>", j).replace("<lastName>", k)
			}, d().done(function (a) {
					if (a.status) {
						if (a.data && a.data.people && a.data.people._total) {
							var b = g(a.data.people.values);
							e.$linkedinArea.html(b),
							e.linkedinCandidates = a.data.people.values
						}
					} else
						401 === a.message ? i.alert("error", 'Linkedin绑定已过期，请点击<a href="/bind/oauth" tagert="_blank">此处</a>重新绑定!') : i.alert("error", a.message)
				}).always(function () {
					f.removeClass("hide"),
					e.$ajaxLoader.addClass("hide")
				}))
		},
		"dom/action/pick/candidate.click" : function (a, b, c, d) {
			b.preventDefault();
			var e = this,
			f = e.linkedinCandidates[c],
			g = {
				city : null,
				experiences : []
			};
			e.$linkedinArea.children().remove(),
			d ? (e.$linkedin.val(d), e.$form.validate().element("#linkedin")) : alert("该候选人没有共享Linkedin主页!"),
			f && f.positions && f.positions._total && f.positions.values.forEach(function (a) {
				g.experiences.push({
					start : a.startDate.year + "-" + a.startDate.month,
					company : a.company.name,
					end : a.isCurrent ? null : a.endDate.year + "-" + a.endDate.month,
					is_current : a.isCurrent,
					title : a.title || ""
				})
			}),
			w.call(e, g)
		},
		"dom/action/candidate/add.click" : function (b, c) {
			c.preventDefault();
			var e = this,
			f = a(c.target);
			if (e.$form.valid() && e.$form.valid()) {
				var g,
				h = function () {
					var b = [];
					return e.$element.find('[name="share_with"]').each(function () {
						var c = a(this),
						d = c.val(),
						e = function () {
							var a;
							return c.next().find("select").length ? a = c.next().find("select").val() : c.next().find("input").length && (a = c.next().find("input").val()),
							a
						}
						();
						b.push({
							type : d,
							value : e
						})
					}),
					b
				}
				(),
				j = a("#birthYear").val(),
				k = a("#birthMonth").val(),
				l = a("#birthDay").val();
				g = j ? j + "-" + (k || "01") + "-" + (l || "01") : null;
				var m = function () {
					var a = null;
					return e.$gender.filter(":checked").length && (a = "true" === e.$gender.filter(":checked").val()),
					a
				}
				(),
				n = function () {
					var b = [],
					c = e.$expBlock.find(".experience-item");
					return c.each(function () {
						var c = a(this),
						d = c.data("id"),
						e = c.find('[name*="current"]').is(":checked") ? 1 : 0,
						f = c.find('[name*="started-year"]').val() + "-" + c.find('[name*="started-month"]').val(),
						g = e ? null : c.find('[name*="ended-year"]').val() + "-" + c.find('[name*="ended-month"]').val(),
						h = c.find('[name*="company"]').val().trim();
						h.length && b.push({
							is_current : e,
							company_name : c.find('[name*="company"]').val().trim(),
							title : c.find('[name*="title"]').val().trim(),
							company_industry : c.find('[name*="company-industry"]').val(),
							start : f ? f.replace(/-$/, "") : f,
							end : g ? g.replace(/-$/, "") : g,
							company_city : c.find('[name*="company-city"]').val(),
							id : d,
							"function" : c.find("[name*=function1]").val(),
							function2 : c.find("[name*=function2]").val(),
							function3 : c.find("[name*=function3]").val(),
							description : c.find('[name*="description"]').val()
						})
					}),
					b
				}
				(),
				o = function () {
					var b = [],
					c = e.$eduBlock.find(".education-item");
					return c.each(function () {
						var c = a(this),
						d = c.data("id"),
						e = c.find('[name*="current"]').is(":checked") ? 1 : 0,
						f = c.find('[name*="started-year"]').val() + "-" + c.find('[name*="started-month"]').val(),
						g = e ? null : c.find('[name*="ended-year"]').val() + "-" + c.find('[name*="ended-month"]').val(),
						h = c.find('[name*="school"]').val().trim(),
						i = c.find('[name*="major"]').val().trim(),
						j = c.find('[name*="degree"]').val().trim();
						b.push({
							is_current : e,
							school : h,
							major : i,
							degree : j,
							start : f ? f.replace(/-$/, "") : f,
							end : g ? g.replace(/-$/, "") : g,
							id : d
						})
					}),
					b
				}
				(),
				p = function () {
					var b = [];
					return e.$element.find(".attachment-item").each(function () {
						b.push(a(this).data("id"))
					}),
					b.join(",")
				}
				(),
				q = {
					englishName : a("#englishName").val().trim(),
					chineseName : a("#chineseName").val().trim(),
					dateOfBirth : g,
					monthNull : !k,
					dayNull : !l,
					gender : m,
					annualSalary : a("#annualSalary").val() * e.currencyEx,
					tags : e.$tags.val(),
					location : e.$location.val(),
					city : e.$city.val(),
					city1 : e.$city1.val(),
					city2 : e.$city2.val(),
					email : e.$email.val().trim(),
					email1 : e.$element.find('[name="email1"]').val().trim(),
					email2 : e.$element.find('[name="email2"]').val().trim(),
					mobile : e.$mobile.val().trim(),
					mobile1 : e.$element.find('[name="mobile1"]').val().trim(),
					mobile2 : e.$element.find('[name="mobile2"]').val().trim(),
					type : e.$type.filter(":checked").val(),
					owner : a("#owner").val(),
					attachments : p,
					shares : h,
					linkedin : e.$linkedin.val().trim(),
					experiences : n,
					education : o,
					address : a("#address").val().trim(),
					is_mpc : e.$mpc.is(":checked") ? 1 : 0,
					folder_id : e.$element.find('[name="folder"]').val(),
					joborder_id : e.$job.val()
				};
				e.$element.find(".custom-fields .control-group").each(function () {
					var b = a(this),
					c = b.find('[name*="ext"]'),
					d = c.attr("name"),
					e = c.attr("type");
					q[d] = "radio" === e ? c.filter(":checked").val() : "checkbox" === e ? function () {
						var b = [];
						return c.filter(":checked").each(function () {
							b.push(a(this).val())
						}),
						b.join(",")
					}
					() : c.val().trim()
				}),
				e.editMode && (q.id = e._json.id),
				e.publish("ajax", {
					url : I.ADD,
					data : {
						data : JSON.stringify(q)
					},
					type : "post"
				}, d().done(function (a) {
						a.status ? (i.alert("success", J.SUCCESSFULLY), window.location.hash = e.editMode ? "detail!id=" + e._json.id : "list") : i.alert("error", a.message)
					}), f)
			}
		},
		"dom/action/remove/field.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".controls").addClass("hide");
			e.find("input").val(""),
			e.find('[data-woven*="shared/widget/common/comtree/main"]').length && e.find('[data-woven*="shared/widget/common/comtree/main"]').woven()[0].reset()
		},
		"dom/action/add/fn.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".control-group").find(".controls").filter(".hide").eq(0);
			return e.length ? (e.removeClass("hide"), void 0) : (alert("Add up to three items"), void 0)
		},
		"dom/action/add/city.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.closest(".control-group").find(".controls").filter(".hide").eq(0);
			return e.length ? (e.removeClass("hide"), void 0) : (alert("Add up to three items"), void 0)
		},
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = d.attr("href");
			i.window({
				url : e,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/remove/attachment.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			e = window.confirm("确定要删除此附件吗?");
			e && (1 === d.closest(".controls").find("li").length && d.closest(".controls").addClass("hide"), d.closest("li").remove())
		},
		"dom/action/show/paste/modal.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish("modal/paste-resume/show", {
				onSuccess : function (a) {
					var b = a.data.replace(/^.*file=(.*)$/, "$1");
					y.call(c, b)
				}
			})
		}
	})
})