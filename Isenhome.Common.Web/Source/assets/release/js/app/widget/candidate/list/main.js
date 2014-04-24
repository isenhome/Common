define("app/widget/candidate/list/main", ["jquery", "shared/widget/list/base", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils", "shared/helper/blurb", "jquery.datatables.ColVis", "jquery.datatables.ColReorder"], function (a, b, c, d, e, f, g) {
		function h(b) {
			var f = this,
			g = [],
			h = c(),
			j = c();
			g.push(h.promise(), j.promise()),
			f.publish("ajax", {
				url : i.CONFIG
			}, h.done(function (a) {
					f._hideContact = "1" === a[0].value
				})),
			f.publish("ajax", {
				url : i.TABLE
			}, j.done(function (a) {
					f.table = a
				})),
			d.apply(a, g).done(function () {
				c(function (a) {
					f.html(e, a)
				}).done(function () {
					f.$container = f.$element.find(".list-container"),
					f.$massActions = f.$element.find(".mass-action .btn"),
					f.$toggleAll = f.$element.find('[data-action="list/toggle/all"]'),
					f.$listview = f.$element.find('[data-action="listview"]'),
					f.$toggleAction = f.$element.find(".actions-toggle-button"),
					f.$table = f.$element.find("table"),
					f.viewType ? (f.$listview.addClass("table-view").find("span").attr("class", "icon-sqaures"), f.$toggleAction.addClass("hide")) : (f.$listview.addClass("detail-view").find("span").attr("class", "icon-list"), f.$toggleAction.removeClass("hide")),
					f.$element.tooltip({
						selector : '[data-toggle="tooltip"]',
						trigger : "hover"
					}),
					b.resolve()
				})
			})
		}
		var i = {
			LIST : "/rest/candidate/list?",
			DETELE : "/rest/candidate/delete",
			CONFIG : "/rest/data/configvalue?keys=hide_contactinfo",
			TABLE : "/rest/data/fields?table=candidate",
			LISTVIEW : "/rest/user/listview"
		},
		j = {
			SUCCESSFUL : g.t("Operate successfully"),
			Columns : g.t("Columns"),
			email : g.t("Private email"),
			email1 : g.t("Work email"),
			email2 : g.t("Other")
		},
		k = ["email", "email1", "email2"],
		l = "app/widget/candidate/item/main";
		return b.extend(function () {
			this._url = i.LIST,
			this._listType = "candidate"
		}, {
			render : function (a) {
				h.call(this, a || c())
			},
			appendItems : function (b) {
				var e = this;
				if (e.$toggleAll.prop("checked", !1), e.$toggleAll.prop("indeterminate", !1), e.viewType) {
					var f = [];
					e.$table && e.$table.fnClearTable && (e.$table.fnClearTable(), e.$table.fnDestroy()),
					b.forEach(function (a) {
						var b = c();
						f.push(b.promise()),
						e.$container.append("<tr></tr>"),
						e.$container.children().last().data("json", a).attr("data-weave", l + "(json, " + e.viewType + ", " + e._hideContact + ")").weave(b)
					}),
					d.apply(a, f).done(function () {
						var a = {
							sDom : "Ctr",
							bProcessing : !0,
							bSort : !1,
							bLengthChange : !1,
							bSearchable : !1,
							bPaginate : !1,
							bDestroy : !0,
							sScrollX : "100%",
							bScrollCollapse : !0,
							oColVis : {
								aiExclude : [0],
								buttonText : j.Columns,
								fnStateChange : function (a, b) {
									e.columns = e.columns || [],
									b ? e.columns = e.columns.filter(function (b) {
											return b !== a
										}) : e.columns.push(a),
									e.columns.sort(),
									e.publish("ajax", {
										url : i.LISTVIEW,
										type : "post",
										data : {
											data : JSON.stringify({
												list : e._listType,
												key : "columns",
												value : e.columns
											})
										}
									}, c())
								}
							},
							fnInitComplete : function () {
								e.$element.find(".action-bar .pull-right .ColVis_MasterButton").remove(),
								e.$element.find(".action-bar .pull-right").append(e.$element.find(".ColVis_MasterButton")),
								e.$element.find(".ColVis").remove()
							}
						};
						e.columns ? a.aoColumnDefs = [{
								bVisible : !1,
								aTargets : e.columns
							}
						] : (e.columns = function () {
							for (var a = [], b = e.$table.find("thead th").length - 1, d = b - e.table.length; b > d; b--)
								a.push(b);
							return a.sort(),
							e.publish("ajax", {
								url : i.LISTVIEW,
								type : "post",
								data : {
									data : JSON.stringify({
										list : e._listType,
										key : "columns",
										value : a
									})
								}
							}, c()),
							a
						}
							(), a.aoColumnDefs = [{
									bVisible : !1,
									aTargets : e.columns
								}
							]),
						e.$table.dataTable(a)
					})
				} else
					b.forEach(function (a) {
						e.$container.append('<div class="search_item clearfix"></div>'),
						e.$container.children().last().data("json", a).attr("data-weave", l + "(json, " + e.viewType + ", " + e._hideContact + ")").weave()
					})
			},
			"dom/action/mass/send/mail" : function (b, c, d) {
				c.preventDefault();
				var e = this,
				g = a(c.target),
				h = null,
				i = k;
				if (!g.hasClass("disabled")) {
					var m,
					n,
					o = e.$element.find('[data-action="list/check"]').filter(":checked"),
					p = [],
					q = [],
					r = [];
					d && (i = [d]),
					o.each(function () {
						n = a(this).data("json"),
						m = [n.englishName, n.chineseName].join(" ").trim(),
						i.length > 1 && (n.email ? d = "email" : n.email1 ? d = "email1" : n.email2 && (d = "email2")),
						n[d] ? (p.push(n[d]), q.push('"' + m + '" [' + j[d] + "]")) : r.push('<a href="/candidate#detail!id=' + n.id + '" target="_blank">' + m + "</a>")
					}),
					r.length && (i.length > 1 ? f.alert("info", "以下人才没有任何邮箱:<br>" + r.join(", ")) : f.alert("info", "以下人才没有" + j[d] + "邮箱:<br>" + r.join(", ")));
					var s = {
						names : q,
						emails : p,
						onSuccess : function () {
							o.closest('[data-woven*="' + l + '"]').find(".email-count").each(function () {
								var b = a(this);
								b.text(parseInt(b.text(), 10) + 1)
							})
						},
						emailTemplate : "candidate_email",
						attachment : {
							joborder : 0,
							clientcompany : 0
						}
					};
					o.length && (h = o.data("json").id, s.candidate_id = h),
					e.publish("modal/sendemail/show", s)
				}
			},
			"dom/action/mass/edit.click" : function (b, c) {
				c.preventDefault();
				var d = this,
				e = a(c.target);
				if (!e.hasClass("disabled")) {
					var f = d.$element.find('[data-action="list/check"]').filter(":checked"),
					g = [];
					f.each(function () {
						g.push(a(this).data("json").id)
					}),
					d.publish("modal/mass-edit/show", g, function () {
						d.publish("list/reload")
					})
				}
			},
			"dom/action/mass/to/folder.click" : function (b, c) {
				c.preventDefault();
				var d = this,
				e = a(c.target);
				if (!e.hasClass("disabled")) {
					var f = d.$element.find('[data-action="list/check"]').filter(":checked"),
					g = [];
					f.each(function () {
						g.push(a(this).data("json").id)
					}),
					d.publish("modal/add-to-folder/show", {
						ids : g,
						type : "candidate",
						multiSelect : !0,
						onSuccess : function (b) {
							f.each(function () {
								a(this).data("json").folders = b
							}),
							f.closest('[data-woven*="' + l + '"]').find(".folder-count").text(b.length).closest("a").find(".muted").text(d.getFolderName(b))
						}
					})
				}
			},
			"dom/action/mass/add/shortlist.click" : function (b, c) {
				c.preventDefault();
				var d = this,
				e = a(c.target);
				if (!e.hasClass("disabled")) {
					var g = d.$element.find('[data-action="list/check"]').filter(":checked"),
					h = [],
					i = [];
					g.each(function () {
						var b = a(this).data("json");
						h.push(b.id),
						i.push([b.englishName, b.chineseName].join(" ").trim())
					}),
					d.publish("modal/addshortlist/show", {
						ids : h,
						names : i,
						onSuccess : function (a) {
							for (var b, c = a.data, d = g.closest('[data-woven*="' + l + '"]').find(".shortlist-count"), e = 0, h = c.length; h > e; e++)
								b = c[e].status, b ? d.eq(e).text(parseInt(d.eq(e).text(), 10) + 1) : f.alert("info", i[e] + ": " + c[e].msg)
						},
						type : "people"
					})
				}
			},
			"dom/action/mass/floating.click" : function (b, c) {
				c.preventDefault();
				var d = this,
				e = a(c.target);
				if (!e.hasClass("disabled")) {
					var f = d.$element.find('[data-action="list/check"]').filter(":checked"),
					g = [],
					h = [];
					f.each(function () {
						var b = a(this).data("json"),
						c = [b.englishName, b.chineseName].join(" ").trim();
						h.push(c),
						g.push({
							name : c,
							id : b.id
						})
					}),
					d.publish("modal/add-floating/show", {
						names : h,
						onSuccess : function () {
							f.closest('[data-woven*="' + l + '"]').find(".floating-count").each(function () {
								var b = a(this);
								b.text(parseInt(b.text(), 10) + 1)
							})
						},
						attachment : g,
						checkAttachment : !0
					})
				}
			},
			"dom/action/mass/delete.click" : function (b, d) {
				d.preventDefault();
				var e,
				g = this,
				h = a(d.target);
				if (!h.hasClass("disabled") && (e = window.confirm("确定要删除所选的人才吗?"))) {
					var j = g.$element.find('[data-action="list/check"]').filter(":checked"),
					k = [];
					j.each(function () {
						k.push(a(this).data("json").id)
					}),
					g.publish("ajax", {
						url : i.DETELE,
						data : {
							data : JSON.stringify({
								ids : k
							})
						},
						type : "post"
					}, c().done(function (a) {
							a.status ? (f.alert("success", "人才删除成功!"), j.closest('[data-woven*="' + l + '"]').remove()) : f.alert("error", a.message)
						}))
				}
			},
			"dom/action/act/toggle.change" : function (b, c) {
				var d = this,
				e = a(c.target);
				d.publish("candidate/action/toggle", e.attr("name"))
			},
			"dom/action/dropdown.click" : function (b, c) {
				c.preventDefault();
				var d = this,
				e = a(c.target),
				f = e.siblings(".dropdown-menu"),
				g = a(document),
				h = e.closest(".dropdown");
				d.$element.find(".btn-group").removeClass("open"),
				h.addClass("open"),
				g.on("click.btn.dropdown", function (b) {
					var c = a(b.target);
					!c.closest(f).length && h.hasClass("open") && (h.removeClass("open"), g.off("click.btn.dropdown"))
				})
			},
			"dom/action/save/acts.click" : function (b, d) {
				d.preventDefault();
				var e = this,
				g = a(d.target),
				h = {};
				g.closest("form").find(":checkbox").each(function () {
					h[a(this).attr("name")] = a(this).is(":checked")
				}),
				e.publish("ajax", {
					url : i.LISTVIEW,
					data : {
						data : JSON.stringify({
							list : "candidate",
							key : "action_display",
							value : h
						})
					},
					type : "post"
				}, c().done(function (a) {
						a.status ? (e.$element.find(".dropdown").removeClass("open"), f.alert("success", j.SUCCESSFUL)) : f.alert("error", a.message)
					}), g)
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