define("app/widget/dashboard/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "jquery.ui"], function (a, b, c, d, e) {
	function f() {
		var a = this;
		c(function (b) {
			a.html(d, b)
		}).done(function () {
			g.call(a)
		})
	}
	function g() {
		var b = this,
		c = b.$element,
		d = c.find(".w-container").children();
		b.$widgetsPad = b.$element.find(".widgets-pad"),
		b.dashboard_config.forEach(function (a) {
			var b = c.find('[data-column="' + a.column + '"]');
			a.widgets.forEach(function (a) {
				b.append('<div class="w-box" data-widget="' + a + '" data-weave="app/widget/dashboard/' + a + '/main"></div>')
			}),
			b.find("[data-weave]").weave()
		}),
		d.sortable({
			connectWith : d,
			handle : ".w-box-header",
			helper : function () {
				return a("<div></div>")
			},
			update : function (a, c) {
				var d = c.item,
				e = d.data("type");
				e && d.removeAttr("data-type data-toggle").removeClass("widget-icon ui-draggable").addClass("w-box").attr("data-widget", e).attr("data-weave", "app/widget/dashboard/" + e + "/main").weave(),
				b.publish("dashboard/widget/update")
			}
		}),
		b.$element.find(".list-widget-icon div").draggable({
			connectToSortable : d,
			helper : "clone",
			revert : "invalid",
			start : function () {
				b.$element.toggleClass("widgets-editing")
			},
			stop : function () {
				b.$element.toggleClass("widgets-editing")
			}
		}),
		b.$element.find('[data-toggle="tooltip"]').tooltip({
			placement : "top"
		})
	}
	var h = {
		LISTVIEW : "/rest/user/listview"
	},
	i = [{
			column : 1,
			widgets : ["revenue", "note"]
		}, {
			column : 2,
			widgets : ["task", "tutorial"]
		}
	];
	return b.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			c.dashboard_config = b.user.listview.dashboard && b.user.listview.dashboard.config ? b.user.listview.dashboard.config : i,
			f.call(c)
		},
		"hub:memory/dashboard/disable/widget/icon" : function (a, b) {
			var c = this;
			b && c.$element.find('[data-type="' + b + '"]').draggable("disable")
		},
		"hub:memory/dashboard/enable/widget/icon" : function (a, b) {
			var c = this;
			b && c.$element.find('[data-type="' + b + '"]').draggable("enable")
		},
		"hub/dashboard/widget/update" : function () {
			var b = this,
			d = b.$element,
			f = [];
			d.find("[data-column]").each(function () {
				var b = a(this),
				c = [];
				b.find("[data-widget]").each(function () {
					c.push(a(this).data("widget"))
				}),
				f.push({
					column : b.data("column"),
					widgets : c
				})
			}),
			b.publish("ajax", {
				url : h.LISTVIEW,
				data : {
					data : JSON.stringify({
						list : "dashboard",
						key : "config",
						value : f
					})
				},
				type : "post"
			}, c().done(function (a) {
					a.status || e.alert("error", a.message)
				}))
		},
		"dom/action.click.mouseover.mouseout" : a.noop,
		"dom/action/toggle/pad.click" : function (b, c) {
			var d = this,
			e = a(c.target);
			d.$element.toggleClass("widgets-editing"),
			e.find(".fa").toggleClass("fa-caret-up fa-caret-down")
		}
	})
})