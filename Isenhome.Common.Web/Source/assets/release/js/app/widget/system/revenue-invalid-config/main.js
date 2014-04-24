define("app/widget/system/revenue-invalid-config/main", ["jquery", "app/widget/system/base/options-config", "troopjs-utils/deferred", "template!./main.html"], function (a, b, c, d) {
	var e = "invoice_invalid_reason",
	f = "app/widget/system/revenue-invalid-config/item";
	return b.extend(function () {
		this._type = e,
		this._itemWidget = f,
		this._template = d
	})
})