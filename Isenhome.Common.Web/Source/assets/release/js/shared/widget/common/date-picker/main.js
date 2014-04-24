define("shared/widget/common/date-picker/main", ["require", "jquery", "troopjs-utils/deferred", "troopjs-core/component/widget", "config", "jquery.datetimepicker"], function (a, b, c, d, e) {
	return d.extend(function (a, b, c) {
		var d = this;
		d.opt = c || {}

	}, {
		"sig/initialize" : function (c, d) {
			var f = this,
			g = {
				dateFormat : "yy-mm-dd",
				hideIfNoPrevNext : !0,
				changeYear : !0,
				changeMonth : !0,
				hasTime : !1,
				firstDay : 1,
				width : 200
			};
			g = b.extend(g, f.opt),
			e.userLang && "zh_CN" !== e.userLang ? (g.hasTime ? f.$element.datetimepicker(g) : f.$element.datepicker(g), d.resolve()) : a(["jquery.ui.i18n.datapicker.cn"], function () {
				g.hasTime ? f.$element.datetimepicker(g, b.datepicker.regional["zh-CN"]) : f.$element.datepicker(g, b.datepicker.regional["zh-CN"]),
				d.resolve()
			})
		}
	})
})