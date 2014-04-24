define("app/widget/plugins/import-resume/modal/upload", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./upload.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f() {
		var a = this;
		a.$element.modal("hide")
	}
	function g() {
		var a = this;
		a.publish("ajax", {
			url : j.CHECK
		}, c().done(function (b) {
				b.total ? (a.$checkProgress.text(b.left.toFixed(2)), setTimeout(function () {
						g.call(a)
					}, 500)) : (a.publish("plugins/import-resume/ziplist/reload"), a.$checkProgress.text(0), a.$closeBtn.removeClass("invisible"), a.$checking.addClass("hide"), a.$checked.removeClass("hide"))
			}))
	}
	function h(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function i(a) {
		var b = this;
		b.$uploading = b.$element.find(".resume-uploading"),
		b.$uploaded = b.$element.find(".resume-uploaded"),
		b.$checking = b.$element.find(".resume-checking"),
		b.$checked = b.$element.find(".resume-checked"),
		b.$uploadProgress = b.$element.find(".upload-progress"),
		b.$checkProgress = b.$element.find(".check-progress"),
		b.$closeBtn = b.$element.find(".btn"),
		a.resolve()
	}
	var j = {
		CHECK : "/rest/importer/check"
	};
	return d.extend({
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"sig/start" : function (a, b) {
			i.call(this, b)
		},
		"hub/plugins/import-resume/modal/upload/show" : function () {
			var a = this,
			b = a.$element;
			a.$uploading.removeClass("hide"),
			a.$uploaded.add(a.$checking).add(a.$checked).addClass("hide"),
			b.modal({
				backdrop : "static",
				keyboard : !1
			})
		},
		"hub/plugins/import-resume/modal/upload/close" : function () {
			f.call(this)
		},
		"hub/plugins/import-resume/modal/upload/upload-progress" : function (a, b) {
			var c = this;
			c.$uploadProgress.text(b)
		},
		"hub/plugins/import-resume/modal/upload/check" : function () {
			var a = this;
			setTimeout(function () {
				a.$uploading.addClass("hide"),
				a.$uploaded.add(a.$checking).removeClass("hide"),
				g.call(a)
			}, 500)
		},
		"dom/action.click" : b.noop,
		"dom/action/close.click" : function () {
			f.call(this)
		}
	})
})