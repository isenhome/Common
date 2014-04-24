define("app/widget/modal/paste-resume/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/blurb", "shared/helper/validate"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.html(d, a)
	}
	function h(a) {
		var b = this;
		b.$name = b.$element.find('[name="name"]'),
		b.$content = b.$element.find("textarea"),
		b.validate(b.$element.find("form")),
		a.resolve()
	}
	var i = {
		SAVE : "/rest/file/htmlfile"
	};
	return {
		SUCCESSFUL : f.t("Operate successfully")
	},
	c.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"hub/modal/paste-resume/show" : function (a, b) {
			var c = this;
			c._onSuccess = b.onSuccess,
			c._externalId = b.external_id,
			c.publish("editor/reset"),
			c.$element.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (c, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target);
			f.publish("ajax", {
				url : i.SAVE,
				data : {
					data : JSON.stringify({
						html : ["<html><head><title></title></head><body>" + CKEDITOR.instances[f.$content.attr("name")].getData() + "</body></html>"],
						originname : f.$name.val().trim(),
						external_id : f._externalId
					})
				},
				type : "post"
			}, b().done(function (a) {
					a.status ? f._onSuccess(a) : e.alert(a.message),
					f.$element.modal("hide")
				}), g)
		}
	})
})