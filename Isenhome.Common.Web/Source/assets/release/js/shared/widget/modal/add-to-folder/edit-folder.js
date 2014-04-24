define("shared/widget/modal/add-to-folder/edit-folder", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./edit-folder.html", "shared/helper/utils", "shared/helper/validate", "config"], function (a, b, c, d, e, f, g) {
	function h(a) {
		var b = this;
		b.html(d, a)
	}
	function i(a) {
		var c = this,
		d = c.$element,
		e = d.find(".control-share");
		c.$form = d.find("form"),
		c.$name = d.find('[name="name"]'),
		c.$btnDelete = d.find(".btn-delete"),
		c.$btnConfirm = d.find(".btn-confirm"),
		f(c.$form),
		d.on("hidden", function () {
			c.$name.val(""),
			c._onSuccess && c._onSuccess(c._res)
		}),
		"Linkedin" !== c.config.clientType && e.attr("data-weave", "shared/widget/common/add-share/main").weave(b().done(function () {
				c.shareWidget = e.woven()[0]
			})),
		a.resolve()
	}
	var j,
	k = {
		ADD_FOLDER : "/rest/folder/add",
		DELETE_FOLDER : "/rest/folder/delete"
	};
	return c.extend({
		config : g,
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"sig/start" : function (a, b) {
			i.call(this, b)
		},
		"hub/modal/add-to-folder/edit-folder/show" : function (a, b) {
			var c = this,
			d = c.$element;
			switch (c._res = null, c._type = b.type, c._node = b.node, c._operation = b.operation, c._share = b.share, c._onSuccess = b.onSuccess, c._operation) {
			case "new":
				c.$btnConfirm.removeClass("hide"),
				c.$btnDelete.addClass("hide"),
				"Linkedin" !== c.config.clientType && c.shareWidget.loadShare([]);
				break;
			case "updateNode":
				c.$name.val(c._node.name),
				c.$btnConfirm.removeClass("hide"),
				c.$btnDelete.addClass("hide"),
				"Linkedin" !== this.config.clientType && c.shareWidget.loadShare(c._node.share);
				break;
			case "appendNode":
				c.$btnConfirm.removeClass("hide"),
				c.$btnDelete.addClass("hide"),
				"Linkedin" !== c.config.clientType && c.shareWidget.loadShare(c._node.share);
				break;
			case "addNodeAfter":
				c.$btnConfirm.removeClass("hide"),
				c.$btnDelete.addClass("hide"),
				"Linkedin" !== c.config.clientType && c.shareWidget.loadShare([]);
				break;
			case "removeNode":
				c.$name.val(c._node.name),
				c.$btnConfirm.addClass("hide"),
				c.$btnDelete.removeClass("hide"),
				"Linkedin" !== c.config.clientType && c.shareWidget.loadShare(c._node.share)
			}
			d.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (c, d) {
			d.preventDefault();
			var f,
			g = this,
			h = g.$name.val().trim(),
			i = k.ADD_FOLDER;
			if (g.$form.valid()) {
				var l = function () {
					var b = [];
					return "Linkedin" !== g.config.clientType && a('[name="share_with"]').each(function () {
						var c = a(this),
						d = c.val(),
						e = function () {
							var a;
							return c.next().find("select").length ? a = c.next().find("select").val() : c.next().find("input").length && (a = c.next().find("input").val()),
							a
						}
						();
						b.push({
							type : d,
							value : e
						})
					}),
					b
				}
				(),
				m = {
					external_type : g._type,
					name : h,
					share : l
				};
				switch (g._operation) {
				case "new":
					m.parent_id = null;
					break;
				case "updateNode":
					m.id = g._node.id,
					m.parent_id = g._node.parent_id;
					break;
				case "appendNode":
					m.parent_id = g._node.id;
					break;
				case "addNodeAfter":
					m.parent_id = g._node.parent_id;
					break;
				case "removeNode":
					m.id = g._node.id,
					i = k.DELETE_FOLDER,
					f = window.confirm("确定要删除该文件夹吗?")
				}
				(f === j || f) && g.publish("ajax", {
					url : i,
					type : "post",
					data : {
						data : JSON.stringify(m)
					}
				}, b().done(function (a) {
						g.$element.modal("hide"),
						a.status ? (g.publish("side-bar/update/folder"), e.alert("success", "文件夹编辑成功!"), g._res = {
								label : h,
								id : a.data,
								share : l
							}) : e.alert("error", a.message)
					}))
			}
		}
	})
})