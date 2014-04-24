define("shared/helper/utils", ["jquery", "jquery.sticky"], function (a) {
	var b,
	c = {};
	return c.alert = function (c, d, e) {
		var f = {
			info : "st-info",
			success : "st-success",
			error : "st-error",
			notifiy : "st-notify"
		};
		a.sticky(d || "An unexpected error occured!", {
			autoclose : e !== b ? e : "error" === c || "notifiy" === c || "info" === c ? !1 : 3e3,
			position : "top-center",
			type : f[c]
		})
	},
	c.notification = function () {
		var a = {
			delay : 5e3,
			close : !0,
			icon : "",
			title : "Notification title",
			body : "Notification body"
		},
		b = function () {
			window.webkitNotifications && window.webkitNotifications.requestPermission()
		},
		c = function () {
			return 0 === window.webkitNotifications.checkPermission()
		},
		d = function (b) {
			for (var c in b)
				"undefined" != typeof a[c] && (a[c] = b[c]);
			if (window.webkitNotifications && 0 === window.webkitNotifications.checkPermission()) {
				var d = window.webkitNotifications.createNotification(a.icon, a.title, a.body);
				a.close || (d.ondisplay = function (b) {
					window.setTimeout(function () {
						b.currentTarget.cancel()
					}, parseInt(a.delay, 10))
				}),
				d.show()
			}
		};
		return {
			show : d,
			check : c,
			grant : b
		}
	}
	(),
	c.widgetLoaded = function () {
		this.$element.removeClass("widget-spin")
	},
	c.widgetLoading = function () {
		this.$element.addClass("widget-spin")
	},
	c.window = function (b) {
		b = a.extend(c.window.options, b),
		c.window.instance && c.window.instance.close(),
		c.window.instance = window.open(b.url, b.name, "height=" + b.height + ", width=" + b.width + ", top=" + b.top + ", left=" + b.left + ", toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=no")
	},
	c.window.options = {
		url : "",
		name : "New Window",
		height : "800",
		width : "600",
		top : "0",
		left : screen.width
	},
	c.window.instance = null,
	c
})