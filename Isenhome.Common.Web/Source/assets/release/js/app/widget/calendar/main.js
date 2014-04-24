define("app/widget/calendar/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/blurb", "calendar"], function (a, b, c, d, e) {
	function f() {
		var a = [];
		for (var b in l)
			l[b] && "done__eq" !== b ? a.push(b + "=" + l[b]) : l[b].length && "done__eq" === b && a.push(b + "=" + ("1" === l[b] ? 1 : ""));
		return k.LIST + "&" + a.join("&")
	}
	function g(a, b, d) {
		var e = this;
		e.publish("ajax", {
			url : j,
			data : {
				paginate_by : 200,
				start : Math.round(a.getTime() / 1e3),
				end : Math.round(b.getTime() / 1e3)
			}
		}, c().done(function (a) {
				var b,
				c,
				e,
				f,
				g = a.list,
				h = [];
				g.forEach(function (a) {
					b = a.target && a.target.name ? a.category.value + ": " + a.target.name : a.target && a.target.candidate ? a.category.value + ": " + [a.target.candidate.englishName, a.target.candidate.chineseName].join(" ") : a.category.value + ": " + a.content,
					"joborder" === a.external_type ? (e = "job", c = a.target.id, f = a.content) : "client" === a.external_type ? (e = "company", c = a.target.id, f = a.content) : a.candidate_id ? (e = "candidate", c = a.candidate_id, f = a.content) : e = null,
					h.push({
						id : a.id,
						title : b,
						start : a.date,
						end : a.date,
						prefix : e,
						type_id : c,
						allDay : a.allday,
						color : a.category.color,
						textColor : "#FFF",
						className : a.done ? "muted" : null,
						done : a.done,
						origin : a,
						content : f
					})
				}),
				d(h)
			}))
	}
	function h() {
		var a = this;
		a.publish("ajax", {
			url : k.CATEGORY
		}, c().done(function (b) {
				a._json = b,
				c(function (b) {
					a.html(d, a._json, b)
				}).done(function () {
					i.call(a)
				})
			}))
	}
	function i() {
		var a = this,
		b = new Date;
		b.getDate(),
		b.getMonth(),
		b.getFullYear(),
		j = f(),
		a.$calendar = a.$element.find("#calendar"),
		a.$calendar.fullCalendar({
			header : {
				left : "prev next",
				center : "title,today",
				right : "month,agendaWeek,agendaDay"
			},
			events : function (b, c, d) {
				g.call(a, b, c, d)
			},
			eventColor : "#BCDEEE",
			textColor : "#FFFFFF",
			firstDay : 1,
			timeFormat : {
				"" : "H:mm"
			},
			allDayText : "全天",
			monthNames : ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			monthNamesShort : ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			dayNames : ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			dayNamesShort : ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			buttonText : {
				prev : "&nbsp;&#9668;&nbsp;",
				next : "&nbsp;&#9658;&nbsp;",
				prevYear : "&nbsp;&lt;&lt;&nbsp;",
				nextYear : "&nbsp;&gt;&gt;&nbsp;",
				today : "今天",
				month : "月",
				week : "周",
				day : "天"
			},
			eventRender : function (a, b) {
				var c = a.prefix;
				c ? (b.find(".fc-event-title").wrapInner('<a target="_blank" href="/' + a.prefix + "#detail!id=" + a.type_id + '"></a>'), a.content && b.find(".fc-event-title").after('<span class="fc-event-content">' + a.content + "</span>"), b.find(".fc-event-inner").prepend('<input type="checkbox" data-action="toggle/done(' + a.id + ')">'), a.done && b.find(":checkbox").prop("checked", !0)) : (b.find(".fc-event-inner").prepend('<input type="checkbox" data-action="toggle/done(' + a.id + ')">'), a.done && b.find(":checkbox").prop("checked", !0), a.content && b.find(".fc-event-title").after('<span class="fc-event-content">' + a.content + "</span>"))
			},
			eventAfterRender : function (a, b, c) {
				("agendaDay" === c.name || "agendaWeek" === c.name) && b.height("auto")
			},
			eventClick : function (b, c) {
				var d = c.target.tagName;
				if ("INPUT" !== d && "A" !== d) {
					var e = b.origin;
					e.external_type;
					var f = e.category.code;
					"Client Interview" !== f && "Onboard" !== f && "Probation End" !== f && "Estimated Delivery Date" !== f && a.publish("modal/add/task/show", {
						type : e.external_type,
						id : e.id,
						data : e,
						onSuccess : function () {
							a.$calendar.fullCalendar("refetchEvents")
						}
					})
				}
			},
			dayClick : function (b, c, d, e) {
				var f = "month" !== e.name && c,
				g = {
					date : b,
					users : [{
							id : a._user.id,
							englishName : a._user.englishName
						}
					],
					allday : f
				};
				a.publish("modal/add/task/show", {
					data : g,
					onSuccess : function () {
						l.user_id && parseInt(l.user_id, 10) !== parseInt(a._id, 10) || a.$calendar.fullCalendar("refetchEvents")
					}
				})
			}
		}),
		a.$element.find(".btn-export-mobile").popover({
			placement : "bottom",
			html : !0,
			content : "<a href='http://support.gllue.com/?p=624' target='_blank'>查看教程</a>后,请复制以下地址: <br><span class='text-info'>" + a.exportOutlook + "</span>",
			trigger : "click"
		})
	}
	var j,
	k = {
		LIST : "/rest/todo/list?unlimited=1",
		DONE : "/rest/todo/done",
		CATEGORY : "/rest/data/options?type=todo_category"
	},
	l = {
		user_id : "",
		category : "",
		done__eq : ""
	};
	return b.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._user = b.user,
			c._id = b.user.id,
			l.user_id = c._id,
			c._publicKey = b.user.public_key,
			c.exportOutlook = "webcal://" + window.location.hostname + "/rest/calendar/ical?id=" + c._id + "&key=" + c._publicKey,
			h.call(c)
		},
		"dom/action.change.click" : a.noop,
		"dom/action/source.change" : function (b, c, d) {
			var e = this,
			g = a(c.target).val();
			l[d] = g,
			j = f(),
			e.$calendar.fullCalendar("removeEvents").fullCalendar("refresh").fullCalendar("refetchEvents")
		},
		"dom/action/toggle/done.click" : function (b, d, f) {
			d.stopPropagation();
			var g = this,
			h = a(d.target),
			i = h.is(":checked");
			g.publish("ajax", {
				url : k.DONE,
				data : {
					data : JSON.stringify({
						ids : [f],
						done : i
					})
				},
				type : "POST"
			}, c().done(function (a) {
					a.status ? (e.alert("success", "任务状态更改成功!"), i ? h.closest(".fc-event").addClass("muted") : h.closest(".fc-event").removeClass("muted")) : e.alert("error", a.message)
				}))
		},
		"dom/action/add/task.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.publish("modal/add/task/show", {
				onSuccess : function () {
					l.user_id && parseInt(l.user_id, 10) !== parseInt(c._id, 10) || c.$calendar.fullCalendar("refetchEvents")
				}
			})
		}
	})
})