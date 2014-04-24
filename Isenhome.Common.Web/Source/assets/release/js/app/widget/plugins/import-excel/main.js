define("app/widget/plugins/import-excel/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f() {
		var a = this;
		a.$btnFile.data("json", {
			model : "candidate",
			url : i.IMPORT,
			beforeSubmit : function (b) {
				a.$progressControl.removeClass("hide"),
				a.$result.addClass("hide"),
				a.$hasFailed.add(a.$noFailed).addClass("hide"),
				a.fileName = b[0].value.name
			},
			uploadProgress : function (b, c, d, e) {
				a.$progressControl.find(".bar").width(e + "%")
			},
			success : function (b) {
				a.timeout = setTimeout(function () {
						a.$progressControl.addClass("hide")
					}, 500),
				a.$result.removeClass("hide"),
				b.status ? (a.uuidname = b.data.uuidname, a.$fileName.html('<a href="' + i.DOWNLOAD + a.uuidname + '">' + a.fileName + "</a>"), a.$total.text(b.data.total), a.$failed.text(b.data.failed), b.data.failed ? (a.$hasFailed.removeClass("hide"), a.$noFailed.find(".btn").addClass("disabled")) : (a.$noFailed.removeClass("hide"), a.$noFailed.find(".btn").removeClass("disabled"))) : e.alert("error", b.message)
			},
			error : function () {
				a.timeout = setTimeout(function () {
						a.$progressControl.addClass("hide")
					}, 500)
			},
			validate : function (a) {
				return /\.csv$/i.test(a.name) ? !0 : !1
			},
			onValidateError : function () {
				e.alert("error", "文件必须是csv格式文件")
			}
		}).attr("data-weave", "shared/widget/common/upload/main(json)").weave()
	}
	function g(a) {
		var b = this;
		b.html(d, a)
	}
	function h(a) {
		var b = this,
		c = b.$element;
		b.$btnFile = c.find(".upload-file"),
		b.$result = c.find(".control-result"),
		b.$progressControl = c.find(".control-progress"),
		b.$total = c.find(".total-item"),
		b.$failed = c.find(".failed-item"),
		b.$hasFailed = c.find(".has-failed"),
		b.$noFailed = c.find(".no-failed"),
		b.$fileName = c.find(".file-name"),
		f.call(b),
		a.resolve()
	}
	var i = {
		IMPORT : "/rest/importer/upload",
		DOWNLOAD : "/rest/file/download/"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"sig/stop" : function (a, b) {
			var c = this;
			clearTimeout(c.timeout),
			b.resolve()
		},
		"dom/action.click" : a.noop,
		"dom/action/import/to/system.click" : function (b, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target);
			f.publish("ajax", {
				url : i.IMPORT,
				data : {
					data : JSON.stringify({
						model : "candidate",
						uuidname : f.uuidname
					})
				},
				type : "post"
			}, c().done(function (a) {
					a.status && (a.data.failed ? (f.$fileName.find("a").attr("href", i.DOWNLOAD + a.data.uuidname), f.$total.text(a.data.total), f.$failed.text(a.data.failed), e.alert("success", "导入失败！"), f.$hasFailed.removeClass("hide"), f.$noFailed.addClass("hide")) : (e.alert("success", "导入成功！"), f.$result.addClass("hide")))
				}), g)
		}
	})
})