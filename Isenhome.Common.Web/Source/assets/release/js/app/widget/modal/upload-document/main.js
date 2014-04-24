define("app/widget/modal/upload-document/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e) {
	function f() {
		var a = this;
		a.$btnFile.data("json", {
			multiple : !0,
			data : {
				type : "document"
			},
			beforeUpload : function () {
				return a.$folder.val().length ? (this.data.folder_id = a.$folder.val(), !0) : (e.alert("error", "请先选择文件夹!"), !1)
			},
			beforeSubmit : function () {
				this.$controls = a.$btnFile.closest(".controls"),
				this.$controls.addClass("text_line")
			},
			success : function (b) {
				this.$controls.removeClass("text_line"),
				b.status ? (a._onSuccess && a._onSuccess(b), e.alert("success", "文档上传成功!"), a.$element.modal("hide")) : e.alert("error", b.message)
			},
			error : function () {
				this.$controls.removeClass("text_line")
			}
		}).attr("data-weave", "shared/widget/common/upload/main(json)").weave()
	}
	function g(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function h(a) {
		var b = this;
		b.$form = b.$element.find("form"),
		b.$folder = b.$element.find('[name="folder"]'),
		b.$btnFile = b.$element.find(".upload-file"),
		b.folderWidget = b.$element.find('[data-name="folder"]').woven()[0],
		f.call(b),
		a.resolve()
	}
	return c.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"hub:memory/update/document/folder" : function (a, b) {
			var c = this;
			c.folderWidget.loadData(b)
		},
		"hub/modal/upload-document/show" : function (a, b) {
			var c = this,
			d = c.$element;
			c._onSuccess = b.onSuccess,
			d.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/close.click" : function () {
			var a = this;
			a.$element.modal("hide")
		}
	})
})