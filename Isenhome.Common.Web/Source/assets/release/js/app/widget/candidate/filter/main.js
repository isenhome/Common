define("app/widget/candidate/filter/main", ["compose", "jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "template!app/widget/common/custom-filters/main.html", "shared/widget/filter/query", "shared/helper/utils", "shared/helper/blurb", "config"], function (a, b, c, d, e, f, g, h, i, j, k) {
	function l() {
		h.addAttr({
			keyword : function (a) {
				var b = a.find("input").val();
				b ? this.addQuery("keyword", "keyword=" + window.encodeURIComponent(b)) : this.deleteQuery("keyword")
			},
			attachment : function (a) {
				var b = a.find("select").val(),
				c = a.find('[name="has_attachment"]:checked');
				b.length ? this.addQuery("attachment_type", "attachment_type=" + window.encodeURIComponent(b)) : this.deleteQuery("attachment_type"),
				c.length ? this.addQuery("has_attachment", "has_attachment=" + c.val()) : this.deleteQuery("has_attachment")
			},
			note : function (a) {
				var b = a.find("input").val().trim();
				b.length ? this.addQuery("note", "note=" + window.encodeURIComponent(b)) : this.deleteQuery("note")
			},
			note_related : function (a) {
				var b = a.find('[name="note_user"]').val(),
				c = a.find('[name="note_category"]').val();
				c ? this.addQuery("note_category", "note_category=" + c) : this.addQuery("note_category", ""),
				b.length ? this.addQuery("note_user", "note_user=" + window.encodeURIComponent(b)) : this.deleteQuery("note_user"),
				a.find('[name="has_note"]:checked').length ? this.addQuery("has_note", "has_note=" + window.encodeURIComponent(a.find('[name="has_note"]:checked').val())) : this.deleteQuery("has_note")
			},
			name : function (a) {
				var b = a.find("input").val().trim();
				b.length && this.addQuery("name", "name=" + encodeURIComponent(b))
			},
			school : function (a) {
				var b = a.find("input").val().trim();
				b.length && this.addQuery("school", "school=" + encodeURIComponent(b))
			},
			major : function (a) {
				var b = a.find("input").val().trim();
				b.length && this.addQuery("major", "major=" + encodeURIComponent(b))
			},
			degree : function (a) {
				var b = a.find("select").val().trim();
				b.length && this.addQuery("degree", "degree=" + encodeURIComponent(b))
			},
			folder_id : function (a) {
				var b = a.find('[name="folder_id"]').val();
				b.length && this.addQuery("folder_id", "folder_id=" + b)
			},
			email : function (a) {
				var c = b.trim(a.find("input").val());
				c.length && this.addQuery("email", "email=" + window.encodeURIComponent(c))
			},
			mobile : function (a) {
				var c = a.find("input").val().trim();
				c.length && (b('[data-query="mobile"]').removeClass("hide").find("span").text(c), this.addQuery("mobile", "mobile=" + encodeURIComponent(c)))
			},
			company_name : function (a) {
				var b = a.find('[name="company_name"]').val().trim();
				b.length && (this.addQuery("company_name", "company_name=" + encodeURIComponent(b)), this.addQuery("current", "current=" + a.find("input:radio:checked").val()))
			},
			company_industry : function (a) {
				var b = a.find('[name="company_industry"]').val();
				b.length && (this.addQuery("company_industry", "company_industry=" + b), this.addQuery("current", "current=" + a.find("input:radio:checked").val()))
			},
			function_id : function (a) {
				var b = a.find('[name="function_id"]').val();
				b.length && (this.addQuery("function_id", "function_id=" + b), this.addQuery("current", "current=" + a.find("input:radio:checked").val()))
			},
			title : function (a) {
				var b = a.find('[name="title"]').val().trim();
				b.length && (this.addQuery("title", "title=" + encodeURIComponent(b)), this.addQuery("current", "current=" + a.find("input:radio:checked").val()))
			},
			city : function (a) {
				var b = a.find('[name="location_id"]').val(),
				c = a.find('[name="city_id"]').val();
				b.length ? this.addQuery("location_id", "location_id=" + b) : this.deleteQuery("location_id"),
				c.length ? this.addQuery("city_id", "city_id=" + c) : this.deleteQuery("city_id")
			},
			team_id : function (a) {
				var b = a.find('[name="team_id"]').val();
				b.length && this.addQuery("team_id", "team_id=" + b)
			},
			salary : function (a) {
				var b = a.find('input[name="from"]').val().trim(),
				c = a.find('input[name="to"]').val().trim();
				b.length && c.length && this.addQuery("salary", "annualSalary__gte=" + encodeURIComponent(b * q) + "&annualSalary__lte=" + encodeURIComponent(c * q))
			},
			tags : function (a) {
				var b = a.find("input").val();
				b && this.addQuery("tags", "tags=" + window.encodeURIComponent(b))
			},
			status__eq : function (a) {
				var b = a.find("select").val();
				b.length && this.addQuery("status__eq", "status__eq=" + b)
			},
			birthday : function (a) {
				var b = a.find('[name="birthday"]').val();
				b.length && this.addQuery("birthday", "birthday=" + b)
			},
			user : function (a) {
				var b = a.find('select[name="type"]').val(),
				c = a.find('select[name="name"]').val();
				b.length && c.length && this.addQuery("user", b + "=" + c)
			},
			update : function (a) {
				var b = a.find('input[name="from"]').val(),
				c = a.find('input[name="to"]').val();
				b && c && this.addQuery("update", "lastUpdateDate__gt=" + b + "&lastUpdateDate__lt=" + c)
			},
			age : function (a) {
				var b = parseInt(a.find('[name="from"]').val(), 10),
				c = parseInt(a.find('[name="to"]').val(), 10);
				if (b && c) {
					var d = s.YEAR - b,
					e = s.YEAR - c;
					return b > c ? (i.alert("error", "First 'Age' should be less than second 'Age'."), void 0) : (this.addQuery("age", "dateOfBirth__year_gt=" + encodeURIComponent(e) + "&dateOfBirth__year_lt=" + encodeURIComponent(d)), void 0)
				}
			},
			type__eq : function (a) {
				var b = a.find(":radio:checked"),
				c = b.val();
				c && this.addQuery("type__eq", "type__eq=" + c)
			},
			is_mpc : function (a) {
				var b = a.find(":checkbox");
				b.is(":checked") ? this.addQuery("is_mpc", "is_mpc=1") : this.deleteQuery("is_mpc")
			},
			gender : function (a) {
				var b,
				c = a.find(":radio").filter(":checked");
				c.length && (b = c.val(), this.addQuery("gender", "gender=" + b))
			},
			ext : function (a) {
				var b = a.find('select[name="ext-type"] :selected').val(),
				c = a.find("input").val();
				b.length && c.length && this.addQuery("ext", b + "=" + window.encodeURIComponent(c))
			},
			has_distinct : function (a) {
				var b = a.find(":checked").val();
				b.length && this.addQuery("has_distinct", "has_distinct=" + window.encodeURIComponent(b))
			},
			work_start : function (a) {
				var b = a.find('[name="work_start__year_gt"]').val().trim(),
				c = a.find('[name="work_start__year_lt"]').val().trim();
				c.length && (b.length ? this.addQuery("work_start", "work_start__year_gt=" + (s.YEAR - c) + "&work_start__year_lt=" + (s.YEAR - b)) : this.addQuery("work_start", "work_start__year_eq=" + (s.YEAR - c)))
			},
			last_work_start : function (a) {
				var b = a.find('[name="last_work_start__year_gt"]').val().trim(),
				c = a.find('[name="last_work_start__year_lt"]').val().trim();
				c.length && (b.length ? this.addQuery("work_start", "last_work_start__year_gt=" + (s.YEAR - c) + "&last_work_start__year_lt=" + (s.YEAR - b)) : this.addQuery("work_start", "last_work_start__year_eq=" + (s.YEAR - c)))
			}
		})
	}
	function m() {
		var a = this;
		this.ageFrom = null,
		this.maxYear = null,
		this.ageTo = null,
		this.minYear = null,
		this.salaryFrom = null,
		this.salaryTo = null,
		this.city = null,
		this.updateFrom = null,
		this.updateTo = null,
		a.company_industry = null,
		a.industry_name = null,
		a.function_id = null,
		a.function_name = null
	}
	function n(a) {
		var c = this,
		i = [],
		j = d(),
		k = d();
		i.push(j.promise(), k.promise()),
		c.publish("ajax", {
			url : u.STATUS
		}, j.done(function (a) {
				c._status = a
			})),
		c.publish("ajax", {
			url : u.TABLE
		}, k.done(function (a) {
				c._fields = a
			})),
		e.apply(b, i).done(function () {
			d(function (a) {
				c.html(f, c._json, a)
			}).done(function () {
				c._fields.forEach(function (a) {
					var d = b(g(a)),
					e = {};
					c.$element.find(".nav .filter-toggle").before(d),
					d.find("[data-weave]").weave(),
					e[a.mapping] = b.proxy(t[a.type], a),
					h.addAttr(e)
				}),
				o.call(c, a)
			})
		})
	}
	function o(a) {
		var b = this;
		b.folderWidget = b.$element.find('[data-name="folder"]').woven()[0],
		b.$status = b.$element.find('[name="status__eq"]'),
		b.$workingStatus = b.$element.find('[data-action="working/status"]'),
		b.$current = b.$element.find(".current"),
		b._status.forEach(function (a) {
			b.$status.append('<option value="' + a.code + '">' + a.value + "</option>")
		}),
		a.resolve()
	}
	function p(a) {
		var c,
		d,
		e,
		f = this,
		g = a[0],
		i = a[1];
		switch (g.indexOf("lastUpdateDate") > -1 && (g = g.substring(0, g.indexOf("_"))), (g.indexOf("work_start") > -1 || g.indexOf("last_work_start") > -1) && (g = g.substring(0, g.indexOf("__"))), /ext/.test(g) && (g = "ext"), g) {
		case "ext":
			var j = f.$element.find('[name="' + a[0] + '"]');
			j.prop("tagName"),
			j.attr("type");
			var k = f.$element.find('li.dropdown a[data-mapping="' + a[0] + '"]').text();
			f.$element.find('[data-query="' + a[0] + '"]').remove(),
			f.$element.find(".save-filter").before('<span class="tag label label-info deletable" data-query="' + a[0] + '" data-action="tag/remove">' + k + ": " + window.decodeURIComponent(i) + ' <i class="icon-remove-small icon-transparent"></i></span>'),
			h.addQuery(a[0], a[0] + "=" + i);
			break;
		case "work_start":
			"work_start__year_eq" === a[0] && (f.$element.find('[data-query="work_start"]').removeClass("hide").find("span").text(s.YEAR - window.decodeURIComponent(i)), h.addQuery("work_start", "work_start__year_eq=" + i), f.work_start_from = null, f.work_start_from_condition = null, f.work_start_to = null, f.work_start_to_condition = null),
			"work_start__year_lt" === a[0] && (f.work_start_from = s.YEAR - window.decodeURIComponent(i), f.work_start_from_condition = i),
			"work_start__year_gt" === a[0] && (f.work_start_to = s.YEAR - window.decodeURIComponent(i), f.work_start_to_condition = i),
			f.work_start_to && f.work_start_from && (f.$element.find('[data-query="work_start"]').removeClass("hide").find("span").text(f.work_start_from + "-" + f.work_start_to), h.addQuery("work_start", "work_start__year_lt=" + f.work_start_from_condition + "&" + "work_start__year_gt=" + f.work_start_to_condition), f.work_start_from = null, f.work_start_from_condition = null, f.work_start_to = null, f.work_start_to_condition = null);
			break;
		case "last_work_start":
			"last_work_start__year_eq" === a[0] && (f.$element.find('[data-query="last_work_start"]').removeClass("hide").find("span").text(s.YEAR - window.decodeURIComponent(i)), h.addQuery("last_work_start", "last_work_start__year_eq=" + i), f.last_work_start_from = null, f.last_work_start_from_condition = null, f.last_work_start_to = null, f.last_work_start_to_condition = null),
			"last_work_start__year_lt" === a[0] && (f.last_work_start_from = s.YEAR - window.decodeURIComponent(i), f.last_work_start_from_condition = i),
			"last_work_start__year_gt" === a[0] && (f.last_work_start_to = s.YEAR - window.decodeURIComponent(i), f.last_work_start_to_condition = i),
			f.last_work_start_to && f.last_work_start_from && (f.$element.find('[data-query="last_work_start"]').removeClass("hide").find("span").text(f.last_work_start_from + "-" + f.last_work_start_to), h.addQuery("last_work_start", "last_work_start__year_lt=" + f.last_work_start_from_condition + "&" + "last_work_start__year_gt=" + f.last_work_start_to_condition), f.last_work_start_from = null, f.last_work_start_from_condition = null, f.last_work_start_to = null, f.last_work_start_to_condition = null);
			break;
		case "current":
			e = f.$workingStatus.filter('[value="' + i + '"]').eq(0).next().text(),
			f.$element.find(".current").text(e),
			h.addQuery("current", "current=" + i);
			break;
		case "dateOfBirth__year_gt":
		case "dateOfBirth__year_lt":
			"dateOfBirth__year_gt" === g ? (f.ageTo = s.YEAR - i, f.minYear = i) : "dateOfBirth__year_lt" === g && (f.ageFrom = s.YEAR - i, f.maxYear = i),
			f.maxYear && f.minYear && (f.$element.find('[data-query="age"]').removeClass("hide").find("span").text(decodeURIComponent(f.ageFrom) + " - " + decodeURIComponent(f.ageTo)), h.addQuery("age", "dateOfBirth__year_gt=" + f.minYear + "&dateOfBirth__year_lt=" + f.maxYear));
			break;
		case "annualSalary__gte":
		case "annualSalary__lte":
			"annualSalary__gte" === g ? f.salaryFrom = i : "annualSalary__lte" === g && (f.salaryTo = i),
			f.salaryFrom && f.salaryTo && (f.$element.find('[data-query="salary"]').removeClass("hide").find("span").text(decodeURIComponent(f.salaryFrom) / q + v.CURRENCY_UNIT + " - " + decodeURIComponent(f.salaryTo) / q + v.CURRENCY_UNIT), h.addQuery("salary", "annualSalary__gte=" + f.salaryFrom + "&annualSalary__lte=" + f.salaryTo));
			break;
		case "user_id":
		case "owner__eq":
		case "addedBy__eq":
		case "share_id":
			d = f.$element.find('select[name="type"]').find('[value="' + g + '"]').text(),
			c = f.$element.find('select[name="name"]').find('[value="' + i + '"]').text(),
			f.$element.find('[data-query="user"]').removeClass("hide").find("span").text(c + " " + d),
			h.addQuery("user", g + "=" + i);
			break;
		case "lastUpdateDate":
			if (a[0].indexOf("gt") > -1 || a[0].indexOf("lt") > -1) {
				if (a[0].indexOf("gt") > -1 ? f.updateFrom = i : a[0].indexOf("lt") > -1 && (f.updateTo = i), f.updateFrom && f.updateTo)
					return f.$element.find('[data-query="update"]').removeClass("hide").find("span").text(f.updateFrom + " - " + f.updateTo), h.addQuery("update", "lastUpdateDate__gt=" + f.updateFrom + "&lastUpdateDate__lt=" + f.updateTo), void 0
			} else
				f.$element.find('a[data-action="lastupdate"]').each(function () {
					return b(this).attr("href").substring(1) == a[0] + "=" ? (c = b(this).text(), !1) : void 0
				}), f.$element.find('[data-query="update"]').removeClass("hide").find("span").text(c), h.addQuery("update", a[0] + "=");
			break;
		case "type__eq":
			"contact" === a[1] ? c = "客户联系人" : "coldcall" === a[1] ? c = "Cold Call" : "candidate" === a[1] && (c = "候选人"),
			f.$element.find('[data-query="type__eq"]').removeClass("hide").find("span").text(c),
			h.addQuery("type__eq", "type__eq=" + i);
			break;
		case "gender":
		case "has_attachment":
		case "has_note":
		case "has_distinct":
		case "is_mpc":
			c = f.$element.find('[name="' + g + '"]').filter('[value="' + i + '"]').next().text(),
			f.$element.find('[data-query="' + g + '"]').removeClass("hide").find("span").text(c),
			h.addQuery(g, g + "=" + i);
			break;
		case "note_user":
		case "status__eq":
		case "attachment_type":
		case "birthday":
		case "note_category":
		case "degree":
			c = f.$element.find('[name="' + g + '"]').find('[value="' + window.decodeURIComponent(i) + '"]').text(),
			f.$element.find('[data-query="' + g + '"]').removeClass("hide").find("span").text(c),
			h.addQuery(g, g + "=" + i);
			break;
		case "team_id":
		case "location_id":
		case "city_id":
		case "folder_id":
		case "company_industry":
		case "function_id":
			c = f.$element.find('[data-name="' + g + '"]').woven()[0].getNodeNameById(window.decodeURIComponent(i)),
			f.$element.find('[data-query="' + g + '"]').removeClass("hide").find("span").text(c),
			h.addQuery(g, g + "=" + i);
			break;
		case "byfilter":
			break;
		default:
			f.$element.find('[data-query="' + g + '"]').removeClass("hide").find("span").text(window.decodeURIComponent(i)),
			h.addQuery(g, g + "=" + i)
		}
	}
	var q,
	r = new Date,
	s = {
		YEAR : r.getFullYear(),
		MONTH : r.getMonth(),
		DATE : r.getDate(),
		DAY : r.getDay()
	},
	t = {
		text : function (a) {
			var b = a.find("input").val();
			b.length && h.addQuery(this.mapping, this.mapping + "=" + window.encodeURIComponent(b))
		},
		dropdown : function (a) {
			var b = a.find("select").val();
			b.length && h.addQuery(this.mapping, this.mapping + "=" + window.encodeURIComponent(b))
		},
		multiline : function (a) {
			var b = a.find("input").val();
			b.length && h.addQuery(this.mapping, this.mapping + "=" + window.encodeURIComponent(b))
		},
		radio : function (a) {
			var b = a.find("input:checked").val();
			b.length && h.addQuery(this.mapping, this.mapping + "=" + window.encodeURIComponent(b))
		},
		checkbox : function (a) {
			var c = a.find("input:checked"),
			d = [];
			c.length && (c.each(function () {
					d.push(b(this).val())
				}), d = d.join(","), h.addQuery(this.mapping, this.mapping + "=" + window.encodeURIComponent(d)))
		},
		date : function (a) {
			var b = a.find("input").val();
			b.length && h.addQuery(this.mapping, this.mapping + "=" + window.encodeURIComponent(b))
		}
	},
	u = {
		SAVE_FILTER : "/rest/data/queryfilter/candidate/add",
		STATUS : "/rest/data/options?type=candidate_status",
		TABLE : "/rest/data/fields?table=candidate"
	},
	v = {
		CURRENCY_UNIT : j.t("Currency unit")
	};
	switch (k.userLang) {
	case "zh_CN":
		q = 1e4;
		break;
	case "en":
		q = 1e3;
		break;
	default:
		q = 1e4
	}
	return c.extend(function () {
		var a = this;
		m.call(a),
		h.url = u.SAVE_FILTER,
		a._setFilter = p,
		l.call(a)
	}, {
		extFields : ["ext1", "ext2", "ext3", "ext4", "ext5", "ext6"],
		"sig/initialize" : function (a, b) {
			n.call(this, b)
		},
		"hub:momery/filter/set" : a.around(function (a) {
			return function (b, c) {
				a.call(this, b, c),
				m.call(this)
			}
		}),
		"dom/action.change" : b.noop,
		"dom/action/lastupdate.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target);
			b('[data-query="update"]').removeClass("hide").find("span").text(d.text()),
			h.addQuery("update", d.attr("href").substring(1)),
			d.closest("form").find("button").trigger("click")
		},
		"dom/action/radio/uncheckable.click" : function (a, c) {
			var d = b(c.target);
			d.data("checked") ? (d.prop("checked", !1), d.data("checked", !1)) : (d.prop("checked", !0), d.data("checked", !0))
		},
		"dom/action/working/status.change" : function (a, c) {
			var d = this,
			e = b(c.target),
			f = e.val();
			d.$workingStatus.filter('[value="' + f + '"]').prop("checked", !0)
		}
	})
})