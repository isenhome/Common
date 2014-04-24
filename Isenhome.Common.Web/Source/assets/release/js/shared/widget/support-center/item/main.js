define("shared/widget/support-center/item/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function g(a) {
		a.resolve()
	}
	var h = {
		support : "系统支持",
		bug : "系统缺陷",
		sugguestion : "建议与意见",
		consulting : "咨询服务"
	},
	i = {
		pending : "等待处理",
		processing : "处理中",
		done : "已处理"
	};
	return b.extend(function (a, b, c) {
		var d = this;
		d._json = c
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		showType : function (a) {
			return h[a]
		},
		showStatus : function (a) {
			return a ? i[a] : i.pending
		}
	})
})