define("app/widget/modal/email-confirm/main", ["compose", "jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function h(a) {
		a.resolve()
	}
	return d.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"hub/modal/email/confirm/show" : function (a, b) {
			var c = this,
			d = c.$element;
			c.obj = b,
			c._jobsubmissionId = b.jobsubmissionId,
			b.client && (c._client = b.client),
			b.candidate && (c._candidate = b.candidate),
			b.jobid && (c._jobid = b.jobid),
			b.sid && (c._sid = b.sid),
			b.onSuccess && (c._onSuccess = b.onSuccess),
			d.modal("show")
		},
		"dom/action.click" : b.noop,
		"dom/action/confirm/candidate.click" : function (a, b) {
			b.preventDefault();
			var c = this,
			d = c._candidate.email,
			e = c._candidate.name;
			d || f.alert("info", '以下人才没有私人邮箱:<br><a href="/candidate#detail!id=' + c._candidate.id + '" target="_blank">' + e + "</a>"),
			c.$element.modal("hide"),
			c.publish("modal/sendemail/show", {
				emails : [d],
				category : "emailconfirmwithcandidate",
				jobsubmissionId : c._jobsubmissionId,
				names : ['"' + e + '" [私人]'],
				emailTemplate : "candidate_interview",
				onSuccess : function (a) {
					c._onSuccess && c._onSuccess(a),
					c.publish("modal/email/confirm/show", c.obj)
				},
				templateVariable : {
					candidate_id : c._candidate.id,
					clientcontact_id : c._client.contact.ids[0],
					job_id : c._jobid
				},
				attachment : {
					joborder : 0,
					clientcompany : 0
				}
			})
		},
		"dom/action/confirm/client.click" : function (a, b) {
			b.preventDefault();
			var c = this,
			d = c._client.contact.names,
			e = c._client.contact.emails,
			g = c._client.contact.ids,
			h = [];
			e.forEach(function (a, b) {
				a || (h.push('<a href="/candidate#detail!id=' + g[b] + '" target="_blank">' + d[b] + "</a>"), g.splice(b, 1), d.splice(b, 1))
			}),
			h.length && f.alert("info", "以下人才没有邮箱:<br>" + h.join(" ")),
			c.$element.modal("hide"),
			c.publish("modal/sendemail/show", {
				parseEmail : !0,
				individually : !1,
				emails : c._client.contact.emails,
				category : "emailconfirmwithclient",
				jobsubmissionId : c._jobsubmissionId,
				names : c._client.contact.names,
				emailTemplate : "client_interview",
				onSuccess : function (a) {
					c._onSuccess && c._onSuccess(a),
					c.publish("modal/email/confirm/show", c.obj)
				},
				templateVariable : {
					candidate_id : c._candidate.id,
					clientcontact_id : c._client.contact.ids[0],
					job_id : c._jobid
				},
				attachment : {
					joborder : 0,
					clientcompany : 0
				}
			})
		},
		"dom/action/close.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$element.modal("hide")
		}
	})
})