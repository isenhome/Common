define("app/widget/common/select2/main", ["require", "jquery", "config", "select2"], function (a, b, c) {
	return c.userLang && "zh_CN" !== c.userLang || a(["select2.zh-CN"], function () {}),
	b
})