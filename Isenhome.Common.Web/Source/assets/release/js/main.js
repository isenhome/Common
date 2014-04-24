require.config({
	paths : {
		"troopjs-bundle" : "/source/assets/libs/troopjs/1.0.9-16/troopjs-bundle",
		jquery172 : "jquery.1.7.2.amd",
		bootstrap: "/source/assets/libs/bootstrap/2.3.1.2/bootstrap.min",
		typeahead: "/source/assets/libs/typeahead/0.9.3/typeahead.min",
		"jquery.ui": "/source/assets/libs/jquery.ui/1.8.20.2/jquery-ui.min",
		"jquery.ui.i18n.datapicker.cn": "/source/assets/libs/jquery.ui/1.8.20.2/i18n/jquery.ui.datepicker-zh-CN.min",
		"jquery.cookie": "/source/assets/libs/jquery.cookie/1.3/jquery.cookie.min",
		antiscroll: "/source/assets/libs/antiscroll/antiscroll.min",
		"jquery.actual": "/source/assets/libs/jquery/jquery.actual.min",
		"jquery.qtip": "/source/assets/libs/qtip/jquery.qtip",
		"jquery.sticky": "/source/assets/libs/jquery/sticky.min",
		calendar: "/source/assets/libs/fullcalendar/1.6.4/fullcalendar.min",
		"jquery.validate": "/source/assets/libs/jquery.validate/1.11.1/jquery.validate.min",
		"jquery.validate.extend": "/source/assets/libs/jquery.validate/1.11.1/additional-methods.min",
		"jquery.form": "/source/assets/libs/jquery/jquery.form",
		redactor: "/source/assets/libs/redactor/9.1.8/redactor.min",
		"jquery.datetimepicker": "/source/assets/libs/jquery/jquery-ui-timepicker-addon",
		"jquery.datatables": "/source/assets/libs/jquery.datatables/1.9.4-1/jquery.dataTables.min",
		"jquery.datatables.ColVis": "/source/assets/libs/jquery.datatables/extras/ColVis-1.1.0",
		"jquery.datatables.ColReorder": "/source/assets/libs/jquery.datatables/extras/ColReorder-1.1.0",
		"jquery.datatables.fixedColumns": "/source/assets/libs/jquery.datatables/extras/fixedColumns-2.5.0",
		"jquery.datatables.fixedheader": "/source/assets/libs/jquery/FixedHeader.min",
		i18n: "/source/assets/libs/i18n/1.7.1/i18next.amd.min",
		"jquery.inputmask": "/source/assets/libs/inputmask/1.2.4/jquery.inputmask.min",
		"jquery.tagit": "/source/assets/libs/tag-it/2.0.4/tag-it.min",
		"jquery.autosize": "/source/assets/libs/jquery.autosize/1.18.2/jquery.autosize.min",
		spin: "/source/assets/libs/ladda/0.8.0/spin.min",
		ladda: "/source/assets/libs/ladda/0.8.0/ladda.min",
		"jquery.tree": "/source/assets/libs/jquery.tree/0.17-1/tree.jquery.min",
		treetable: "/source/assets/libs/treetable/3.0.2/jquery.treetable.min",
		"bootstrap.editable": "/source/assets/libs/bootstrap-editable/1.4.5/bootstrap-editable.min",
		select2: "/source/assets/libs/select2/3.4.2/select2.min",
		"select2.zh-CN": "/source/assets/libs/select2/3.4.2/select2_locale_zh-CN",
		hilitor: "/source/assets/libs/hilitor/hilitor.min",
		nv: "/source/assets/libs/nvd3/0.0.1a/nv.d3.min",
		d3: "/source/assets/libs/nvd3/0.0.1a/d3.v2",
		flot: "/source/assets/libs/flot/0.8.1/jquery.flot.min",
		"flot.resize": "/source/assets/libs/flot/0.8.1/jquery.flot.resize.min",
		"flot.time": "/source/assets/libs/flot/0.8.1/jquery.flot.time.min",
		"flot.selection": "/source/assets/libs/flot/0.8.1/jquery.flot.selection.min",
		videojs: "/source/assets/libs/videojs/4.2.2/video.min",
		plupload: "/source/assets/libs/plupload/2.1.0/plupload.full.min",
		"plupload.queue": "/source/assets/libs/plupload/2.1.0/jquery.plupload.queue/jquery.plupload.queue.min",
		ckeditor: "/source/assets/libs/ckeditor/4.3.2/ckeditor"
	},
	map : {
		"*" : {
			template : "troopjs-requirejs/template",
			jquery : "jquery172"
		}
	},
	shim : {
		bootstrap : ["jquery", "jquery.ui"],
		"jquery.ui.i18n.datapicker.cn" : ["jquery"],
		"jquery.ui" : ["jquery"],
		"jquery.cookie" : ["jquery"],
		antiscroll : ["jquery"],
		"jquery.actual" : ["jquery"],
		"jquery.qtip" : ["jquery"],
		"jquery.sticky" : ["jquery"],
		calendar : ["jquery"],
		"jquery.validate" : ["jquery"],
		"jquery.validate.extend" : ["jquery", "jquery.validate"],
		select2 : ["jquery"],
		"jquery.form" : ["jquery"],
		redactor : ["jquery"],
		"jquery.tagit" : ["jquery", "jquery.ui"],
		"jquery.datatables" : ["jquery"],
		"jquery.datatables.fixedheader" : {
			deps : ["jquery", "jquery.datatables"],
			exports : "FixedHeader"
		},
		"jquery.datatables.ColVis" : ["jquery", "jquery.datatables"],
		"jquery.datatables.ColReorder" : ["jquery", "jquery.datatables"],
		"jquery.datatables.fixedColumns" : {
			deps : ["jquery", "jquery.datatables"],
			exports : "FixedColumns"
		},
		"jquery.inputmask" : ["jquery"],
		"jquery.datetimepicker" : ["jquery", "jquery.ui", "bootstrap"],
		nv : ["d3"],
		ladda : ["spin"],
		"jquery.tree" : ["jquery"],
		"bootstrap.editable" : {
			deps : ["jquery", "bootstrap"],
			init : function () {
				var a = $.fn.editabletypes.select;
				$.extend(a.prototype, {
					renderList : function () {
						this.$input.empty();
						var a = function (b, c) {
							if ($.isArray(c))
								for (var d = 0; d < c.length; d++)
									c[d].children ? b.append(a($("<optgroup>", {
												label : c[d].text
											}), c[d].children)) : b.append($("<option>", {
											value : c[d].code
										}).text(c[d].value));
							return b
						};
						a(this.$input, this.sourceData),
						this.setClass(),
						this.$input.on("keydown.editable", function (a) {
							13 === a.which && $(this).closest("form").submit()
						})
					},
					value2htmlFinal : function (a, b) {
						var c = "",
						d = $.fn.editableutils.itemsByValue(a, this.sourceData, "code");
						d.length && (c = d[0].text),
						$(b).text(c)
					}
				})
			}
		},
		typeahead : ["jquery"],
		treetable : ["jquery"],
		flot : ["jquery"],
		"flot.resize" : ["flot"],
		"flot.time" : ["flot"],
		"flot.selection" : ["flot"],
		videojs : {
			init : function () {
			    videojs.options.flash.swf = "/source/assets/libs/videojs/4.2.2/video-js.swf"
			}
		},
		plupload : ["jquery"],
		"plupload.queue" : ["plupload"]
	},
	waitSeconds : 30
}), requirejs.onError = function () {
	alert("页面加载失败,请刷新页面")
}, require(["require", "jquery", "troopjs-bundle", "bootstrap"], function (a, b) {
	"use strict";
	a(["troopjs-jquery/weave", "troopjs-jquery/destroy", "troopjs-jquery/action", "troopjs-jquery/resize", "troopjs-jquery/dimensions", "troopjs-jquery/hashchange"], function () {
		b(document).ready(function () {
			b("body").weave()
		})
	})
});
