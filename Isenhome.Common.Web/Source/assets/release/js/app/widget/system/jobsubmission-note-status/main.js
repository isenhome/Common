define("app/widget/system/jobsubmission-note-status/main", ["jquery", "app/widget/system/base/options-config", "troopjs-utils/deferred", "template!./main.html"], function (a, b, c, d) {
	var e = "jobsubmission_status",
	f = "app/widget/system/jobsubmission-note-status/item";
	return b.extend(function () {
		this._type = e,
		this._itemWidget = f,
		this._template = d
	})
})