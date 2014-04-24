define("app/widget/system/education-background/main", ["jquery", "app/widget/system/base/options-config", "troopjs-utils/deferred", "template!./main.html"], function (a, b, c, d) {
	var e = "education_background",
	f = "app/widget/system/education-background/item";
	return b.extend(function () {
		this._type = e,
		this._itemWidget = f,
		this._template = d
	})
})