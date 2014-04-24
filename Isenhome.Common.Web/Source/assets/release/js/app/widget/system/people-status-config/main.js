define("app/widget/system/people-status-config/main", ["jquery", "app/widget/system/base/options-config", "troopjs-utils/deferred", "template!./main.html"], function (a, b, c, d) {
	var e = "candidate_status",
	f = "app/widget/system/people-status-config/item";
	return b.extend(function () {
		this._type = e,
		this._itemWidget = f,
		this._template = d
	})
})