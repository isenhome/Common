define("shared/widget/root/main", ["jquery", "troopjs-core/component/widget", "shared/services/load-context", "shared/services/comet", "troopjs-utils/deferred", "shared/helper/utils", "antiscroll", "jquery.actual"], function (a, b, c, d, e, f) {
	var g,
	h = null,
	i = {
		TASK_DONE : "/rest/todo/done"
	},
	j = {
		open : function () {
			a("body").removeClass("sidebar_hidden"),
			a(".sidebar_switch").addClass("icon-on-switch").show()
		},
		close : function () {
			a("body").addClass("sidebar_hidden"),
			a(".sidebar_switch").addClass("icon-off-switch")
		},
		init : function () {
			localStorage.getItem("sidebar") || localStorage.setItem("sidebar", "shown"),
			a(window).width() > 979 ? "hidden" === localStorage.getItem("sidebar") ? (a("body").addClass("sidebar_hidden"), a(".sidebar_switch").addClass("icon-off-switch")) : (a("body").removeClass("sidebar_hidden"), a(".sidebar_switch").addClass(" icon-on-switch")) : (a("body").addClass("sidebar_hidden"), a(".sidebar_switch").removeClass("icon-on-switch").addClass("icon-off-switch")),
			a(".sidebar_switch").tooltip({
				placement : "right",
				title : function () {
					return a(this).hasClass("icon-off-switch") ? "显示侧边栏" : "隐藏侧边栏"
				}
			}),
			j.info_box(),
			a(".sidebar_switch").on("click", function () {
				a(".sidebar_switch").removeClass("icon-on-switch icon-off-switch"),
				a("body").hasClass("sidebar_hidden") ? (localStorage.setItem("sidebar", "shown"), j.open()) : (localStorage.setItem("sidebar", "hidden"), j.close()),
				j.info_box(),
				j.update_scroll(),
				a(window).resize()
			}),
			a(".sidebar .accordion-toggle").click(function (a) {
				a.preventDefault()
			}),
			window.addEventListener("storage", function (b) {
				"sidebar" === b.key && (a(".sidebar_switch").removeClass("icon-on-switch icon-off-switch"), "shown" === b.newValue ? j.open() : "hidden" === b.newValue && j.close())
			})
		},
		info_box : function () {
			var b = a(".sidebar_info"),
			c = b.actual("height");
			b.css({
				height : c
			}),
			a(".push").height(c),
			a(".sidebar_inner").css({
				"margin-bottom" : "-" + c + "px",
				"min-height" : "100%"
			})
		},
		make_active : function () {
			var b = a("#side_accordion");
			b.find(".accordion-heading").removeClass("sdb_h_active");
			var c = b.find(".accordion-body.in").prev(".accordion-heading");
			c.length && c.addClass("sdb_h_active")
		},
		make_scroll : function () {
			g = a(".antiScroll").antiscroll({
					forceVertical : !1
				}).data("antiscroll")
		},
		update_scroll : function () {
			a(".antiScroll").length && (a(window).width() > 979 ? a(".antiscroll-inner,.antiscroll-content").height(a(window).height() - 40) : a(".antiscroll-inner,.antiscroll-content").height("400px"))
		}
	};
	return b.extend(function () {
		a(window).resize(function () {
			j.update_scroll()
		})
	}, {
		"sig/initialize" : function (a, b) {
			c().start(b)
		},
		"sig/stop" : function (a, b) {
			var c = this;
			clearTimeout(c.timeout),
			b.resolve()
		},
		"hub:memory/comet/msg" : function (b, c) {
			var d = this,
			g = c.data,
			h = (new Date).getTime();
			localStorage.setItem("notification", JSON.stringify(g)),
			localStorage.removeItem("notification");
			var j = a("<div id='sticky-" + h + "'></div>"),
			k = e();
			k.done(function () {
				f.alert("notifiy", j.get(0).outerHTML, !1);
				var b = a("#sticky-" + h);
				b.find(":checkbox").bind("click", function (c) {
					a(this);
					var g = a(c.target),
					h = g.val();
					g.prop("disabled", !0),
					d.publish("ajax", {
						url : i.TASK_DONE,
						data : {
							data : JSON.stringify({
								ids : [h],
								done : !0
							})
						},
						type : "POST"
					}, e().done(function (a) {
							a.status ? b.find(".st-close").trigger("click") : f.alert("error", a.message)
						}))
				})
			}),
			j.data("json", g).attr("data-weave", "app/widget/common/notification/main(json)").weave(k)
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			b && b.user && (h = d(), h.connect("/rest/user/msg", "msg")),
			c.$element.find("[data-weave]").weave()
		},
		"hub:memory/root/register/sidebar" : function () {
			j.init(),
			j.make_active(),
			j.make_scroll(),
			j.update_scroll()
		},
		"hub:memory/root/update/sidebar" : function () {
			j.update_scroll()
		}
	})
})