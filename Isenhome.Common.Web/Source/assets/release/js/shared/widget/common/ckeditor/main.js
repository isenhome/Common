define("shared/widget/common/ckeditor/main", ["jquery", "troopjs-core/component/widget", "troopjs-utils/deferred", "troopjs-utils/when", "shared/helper/utils", "config", "ckeditor"], function (a, b, c, d, e, f) {
	function g(b) {
		var e = this,
		f = e.$element,
		g = [];
		if (e._signature) {
			var h = c();
			g.push(h.promise()),
			e.publish("ajax", {
				url : i.SIGNATURE
			}, h.done(function (a) {
					if (e.emailSignature = a.emailSignature, e.emailSignature = e.emailSignature && e.emailSignature.length ? e.emailSignature : "", !e._draft) {
						var b = e.emailSignature;
						e._origin && (b = e._origin + b),
						f.val(b)
					}
				}))
		}
		e._templateVariable && (l.variables = e._templateVariable),
		d.apply(a, g).done(function () {
			try {
				e.editor = CKEDITOR.replace(e.$element.attr("name"), l)
			} catch (a) {
				e.publish("error/log", a.message, a.stack)
			}
			b.resolve()
		})
	}
	var h;
	h = f.userLang ? f.userLang.replace("_", "-").toLowerCase() : "zh-cn";
	var i = {
		SIGNATURE : "/rest/data/userconfig/",
		EMAIL_TEMPLATE : "/rest/data/emailtemplate/",
		CHOOSE_TEMPLATE : "/rest/data/choosetemplate/<id>",
		UPLOAD : "/rest/file/upload"
	},
	j = [{
			name : "styles"
		}, {
			name : "colors"
		}, {
			name : "basicstyles",
			groups : ["basicstyles", "cleanup"]
		}, {
			name : "paragraph",
			groups : ["list", "align"]
		}, {
			name : "links"
		}, {
			name : "insert"
		}, {
			name : "clipboard",
			groups : ["clipboard", "undo"]
		}, {
			name : "tools"
		}, {
			name : "others"
		}
	],
	k = ["宋体/宋体, sans-serif", "黑体/黑体, sans-serif", "楷体/楷体， sans-serif", "微软雅黑/微软雅黑, sans-serif"].concat(CKEDITOR.config.font_names.split(";")).join(";"),
	l = {
		language : h,
		customConfig : "",
		autoGrow_onStartup : !0,
		toolbarGroups : j,
		removeButtons : "Source,Anchor,Cut,Copy,Subscript,Superscript,Save,Language,Styles,Print,NewPage,Underline,Strike,RemoveFormat",
		font_names : k,
		entities : !1,
		allowedContent : !0,
		forceEnterMode : !1,
		shiftEnterMode : CKEDITOR.ENTER_DIV,
		enterMode : CKEDITOR.ENTER_DIV,
		removePlugins : "magicline,flash,forms,find,iframe,pagebreak,smiley,specialchar,about,div,preview,elementspath,showblocks,image,justify,format,horizontalrule",
		resize_enabled : !1,
		imageUploadUrl : i.UPLOAD,
		extraPlugins : "variables,uploadImage,dragresize,autogrow"
	};
	return CKEDITOR.on("dialogDefinition", function (a) {
		var b = a.data.name,
		c = a.data.definition;
		switch (b) {
		case "image":
			c.removeContents("Link"),
			c.removeContents("advanced");
			break;
		case "link":
			c.removeContents("advanced"),
			c.removeContents("upload")
		}
	}),
	b.extend(function (a, b, c) {
		var d = this;
		d._parseTemplate = "undefined" != typeof c ? c : !1,
		d._templateVariable = a.data("variable"),
		d._parseTemplate && (d._templateVariable = a.data("templateVariable")),
		d._template = a.data("template"),
		d._signature = a.data("signature"),
		d._draft = a.data("draft"),
		d._origin = a.data("origin"),
		d.editor = null
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/stop" : function (a, b) {
			this.editor.destroy(),
			b.resolve()
		},
		"hub/email/template/switch" : function (a, b) {
			var c = this;
			c.editor.setData(b.content + c.emailSignature)
		},
		"hub/editor/reset" : function () {
			var a = this;
			a.editor.setData(a.emailSignature)
		}
	})
})