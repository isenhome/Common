define("troopjs-requirejs/template!shared/widget/auth/linkedin/main.html", [], function () {
	return function (a) {
		var b = "",
		c = a.data;
		return b += "",
		b += a && a.isbinded ? '<div class="pull-right">    <button class="btn" data-action="revoke" data-weave="shared/helper/translation" data-i18n="Cancel Authorize"></button></div><div class="thumbnail pull-left">    <img alt="' + c.formattedName + '" src="' + (c.pictureUrl ? c.pictureUrl : "http://s.c.lnkd.licdn.com/scds/common/u/img/icon/icon_no_photo_50x50.png") + '" width="50" height="50"></div>    <div class="span6">    <p>        <span class="name-title">' + c.formattedName + "</span>    </p>    <p>Gllue招聘管理系统已经绑定了您的LinkedIn账号！</p></div>" : '<span class="pull-left linkedin-logo-large">LINKEDIN</span><a href="/rest/linkedin/oauth?return_url=bind/oauth" class="btn pull-right" data-weave="shared/helper/translation" data-i18n="Authorize"></a>'
	}
}),define("troopjs-requirejs/template!shared/widget/auth/main.html", [], function () {
	return function () {
		var a = '<h3 class="heading" data-weave="shared/helper/translation" data-i18n="Authorize SNS"></h3><h4>Linkedin</h4><div class="well widget-spin clearfix" data-weave="shared/widget/auth/linkedin/main"></div>';
		return a
	}
}),define("troopjs-requirejs/template!shared/widget/common/add-share/main.html", [], function () {
	return function (a) {
		var b = '<label class="control-label" data-weave="shared/helper/translation" data-i18n="Share with"></label><div class="controls text_line ';
		return a && (b += "hide"),
		b += '">    <a href="#" data-action="share/add" class="addshare" data-weave="shared/helper/translation" data-i18n="Add"></a></div>'
	}
}),define("troopjs-requirejs/template!shared/widget/common/add-share/share.html", [], function () {
	return function (a) {
		var b = '<div class="controls add-share">    <select name="share_with" class="input-small" data-action="share/with.change" ';
		return a && (b += 'disabled="disabled"'),
		b += '>        <option value="people" data-weave="shared/helper/translation" data-i18n="share with people">People</option>        <option value="team" data-weave="shared/helper/translation" data-i18n="share with team">Team</option>        <option value="everyone" data-weave="shared/helper/translation" data-i18n="share with everyone">Everyone</option>    </select>    <div class="share-to">    </div>        ',
		a || (b += '    <a href="#" class="remove" data-action="share/remove">    	<span class="icon-remove"></span>    </a>    '),
		b += "</div>"
	}
}),define("troopjs-requirejs/template!shared/widget/common/comtree/main.html", [], function () {
	return function (a) {
		var b = '<input type="hidden" ';
		return a && (b += 'name="' + a + '"'),
		b += '><a href="#" class="comtree-title" data-action="toggle/drop"><span data-weave="shared/helper/translation" data-i18n="Please select"></span><b></b></a><div class="comtree-drop">    <div class="comtree-drop-inner">        <div class="search">            <input type="text" data-action="comtree/search" autocomplate="false">            </div>                <div class="comtree-tree"></div>    </div></div>'
	}
}),define("troopjs-requirejs/template!shared/widget/common/quick-search/main.html", [], function () {
	return function () {
		var a = '<form data-action="submit">    <input type="text" style="width: 320px;" name="name" autocomplete="off" data-action="quick/search" data-i18n="Please enter Name or ID" data-weave="shared/helper/translation(\'placeholder\')">    <div class="quick-search-suggestion hide">    </div></form>';
		return a
	}
}),define("troopjs-requirejs/template!shared/widget/common/quick-search/suggestion.html", [], function () {
	return function (a) {
		var b,
		c = "",
		d = a.client,
		e = a.candidate,
		f = a.joborder,
		g = 0;
		if (c += '<ul class="unstyled">    ', e.length) {
			for (c += "    ", g = 0, b = e.length; b > g; g++) {
				c += "    ";
				var h = e[g];
				c += '    <li class="suggestion-item ',
				g === b - 1 && (c += "splitter"),
				c += '" data-url="/candidate#detail!id=' + h.id + '">        ',
				g || (c += '        <strong class="kind" data-weave="shared/helper/translation" data-i18n="People"></strong>        '),
				c += '        <div class="item-wrap">            <div><span class="name">' + [h.englishName, h.chineseName].join(" ").trim() + "</span> (" + h.mobile + ")</div>            ",
				h.current && (c += '            <div class="muted">                ', h.current.title && (c += "                " + h.current.title + "                 "), c += "                ", h.current.client && (c += "                at                " + h.current.client.name + "                "), c += "            </div>            "),
				c += "        </div>    </li>    "
			}
			c += "    "
		}
		if (c += "    ", d.length) {
			for (c += "    ", g = 0, b = d.length; b > g; g++) {
				c += "    ";
				var i = d[g];
				c += '    <li class="suggestion-item ',
				g === b - 1 && (c += "splitter"),
				c += '" data-url="/company#detail!id=' + i.id + '">        ',
				g || (c += '        <strong class="kind" data-weave="shared/helper/translation" data-i18n="Company"></strong>        '),
				c += '        <div class="item-wrap">            <div><span class="name">' + i.name + "</span> ",
				i.city && (c += "(" + i.city.name + ")"),
				c += "</div>            ",
				(i.name1 || i.name2) && (c += '            <div class="muted">                ', i.name1 && (c += "                " + i.name1 + "                 "), c += "                ", i.name2 && (c += "                " + i.name2 + "                "), c += "            </div>            "),
				c += "        </div>    </li>    "
			}
			c += "    "
		}
		if (c += "    ", f.length) {
			for (c += "    ", g = 0, b = f.length; b > g; g++) {
				c += "    ";
				var j = f[g];
				c += '    <li class="suggestion-item ',
				g === b - 1 && (c += "splitter"),
				c += '" data-url="/job#detail!id=' + j.id + '">        ',
				g || (c += '        <strong class="kind" data-weave="shared/helper/translation" data-i18n="Job"></strong>        '),
				c += '        <div class="item-wrap">            <div><span class="name">' + j.jobTitle + '</span></div>            <div>                <span class="muted">' + j.client.name + "</span>            </div>        </div>    </li>    "
			}
			c += "    "
		}
		return c += "</ul>"
	}
}),define("troopjs-requirejs/template!shared/widget/common/select-template/main.html", [], function () {
	return function (a) {
		var b = '<option value="" data-weave="shared/helper/translation" data-i18n="Please select"></option>';
		if (a.user.length) {
			b += '<optgroup data-weave="shared/helper/translation(\'label\')" data-i18n="Personal Template">';
			for (var c = 0, d = a.user.length; d > c; c++) {
				b += "";
				var e = a.user[c];
				b += '<option value="' + e.id + '">' + e.name + "</option>"
			}
			b += "</optgroup>"
		}
		if (b += "", a.system.length) {
			b += '<optgroup data-weave="shared/helper/translation(\'label\')" data-i18n="System Template">';
			for (var c = 0, d = a.system.length; d > c; c++) {
				b += "";
				var f = a.system[c];
				b += '<option value="' + f.id + '">' + f.name + "</option>"
			}
			b += "</optgroup>"
		}
		return b
	}
}),define("troopjs-requirejs/template!shared/widget/common/upload/main.html", [], function () {
	return function () {
		var a = '<span class="btn btn-file">    <span class="fileupload-new" data-weave="shared/helper/translation" data-i18n="Select file"></span>    <input type="file" name="file" data-action="fileupload"></span><div class="progress progress-striped active hide">    <div class="bar"></div></div>';
		return a
	}
}),define("troopjs-requirejs/template!shared/widget/common/user-list/main.html", [], function () {
	return function (a) {
		var b = "",
		c = 0,
		d = a.length;
		for (b += '<option value=""></option>'; d > c; c += 1)
			b += '    <option value="' + a[c].id + '">' + a[c].name + "</option>";
		return b
	}
}),define("troopjs-requirejs/template!shared/widget/feedback/quick-post/main.html", [], function () {
	return function () {
		var a = '<div class="handle">    <a href="#" data-action="quick/post" data-weave="shared/helper/translation" data-i18n="Feedback"></a></div>';
		return a
	}
}),define("troopjs-requirejs/template!shared/widget/header/main.html", [], function () {
	return function (a) {
		var b = "",
		c = a.user.role.toUpperCase(),
		d = "REGULAR" === c,
		e = "FINANCE" === c,
		f = "ADMIN" === c;
		return b += '<div class="navbar-inner">    <span id="logo">        <span class="gllue">Gllue</span>    </span>    <div class="container-fluid">        <ul class="nav pull-right right-nav">            ',
		"Linkedin" !== this.config.clientType && (b += '            <li>                <a href="/mail/center#list/filter!mbox=inbox/page!1" class="icon" data-weave="shared/helper/translation(\'title\')" data-i18n="Email">                    <span class="label">                        <span>' + a.email_count + '</span>                        <i class="icon-envelope icon-white"></i>                    </span>                </a>            </li>            <li>                <a href="/calendar" class="icon" data-weave="shared/helper/translation(\'title\')" data-i18n="Calendar">                    <span class="label">                        <span>' + a.calendar_count + '</span>                        <i class="icon-calendar icon-white"></i>                    </span>                </a>            </li>            <li>                <a href="/task" class="icon" data-weave="shared/helper/translation(\'title\')" data-i18n="Todo">                    <span class="label">                        <span>' + a.todo_count + '</span>                        <i class="icon-ticked icon-white"></i>                    </span>                </a>            </li>            <li>                <a href="/notification-center" class="icon" data-weave="shared/helper/translation(\'title\')" data-i18n="Notification center">                    <span class="label">                        <span>' + a.message_count + '</span>                        <i class="icon-bell icon-white"></i>                    </span>                </a>            </li>            <li>                <a href="/floating" class="icon" title="Floating">                    <span class="label">                        <span>' + a.floating_count + '</span>                        <i class="icon-floating icon-white"></i>                    </span>                </a>            </li>            ', d && (b += '            <li class="dropdown">                <a href="#" class="dropdown-toggle icon" data-toggle="dropdown" data-weave="shared/helper/translation(\'title\')" data-i18n="Add new">                    <span class="label"><i class="icon-plus icon-white"></i></span>                </a>                <ul class="dropdown-menu">                    <li><a href="/candidate#add" data-weave="shared/helper/translation" data-i18n="New People"></a></li>                    <li><a href="/company#add" data-weave="shared/helper/translation" data-i18n="New Company"></a></li>                    <li><a href="/job#add" data-weave="shared/helper/translation" data-i18n="Add a Job"></a></li>                    <li><a href="/import/excel" data-i18n="Excel Import Center" data-weave="shared/helper/translation"></a></li>                    <li><a href="/mass/import" data-weave="shared/helper/translation" data-i18n="Mass import people"></a></li>                </ul>            </li>            '), b += "            ", "Linkedin" !== this.config.clientType && (d || f) && (b += '            <li>                <a href="#" class="icon" data-i18n="Search" data-action="quick/search/show" data-weave="shared/helper/translation(\'title\')">                    <span class="label">                        <i class="icon-search icon-white"></i>                    </span>                </a>            </li>            '), b += "            "),
		b += '            <li class="divider-vertical hidden-phone hidden-tablet"></li>            <li class="dropdown">                <a href="#" class="dropdown-toggle" data-toggle="dropdown">' + a.user.englishName + '<b class="caret"></b></a>                <ul class="dropdown-menu">                                        ',
		b += "Linkedin" !== this.config.clientType ? '                    <li><a href="/my/profile" data-weave="shared/helper/translation" data-i18n="Personal Settings"></a></li>                    <li class="dropdown">                        <a href="/extension">                            <span data-weave="shared/helper/translation" data-i18n="App Center"></span>                        </a>                    </li>                    <!-- <li><a href="/user" data-weave="shared/helper/translation" data-i18n="Internal Contacts"></a></li> -->                    ' : '                    <li><a href="/password" data-weave="shared/helper/translation" data-i18n="System settings"></a></li>                    ',
		b += '                    <li class="divider"></li>                    <li><a href="/support-center" data-weave="shared/helper/translation" data-i18n="Gllue Support"></a></li>                    <li><a href="http://www.gllue.com/" target="_blank" data-weave="shared/helper/translation" data-i18n="Gllue Software"></a></li>                    <li class="divider"></li>                    <li><a href="/" data-action="logout" data-weave="shared/helper/translation" data-i18n="Logout"></a></li>                </ul>            </li>        </ul>        <a data-target=".nav-collapse" data-toggle="collapse" class="btn_menu">            <span class="icon-list-alt icon-white"></span>        </a>                <div class="nav-collapse collapse">            <ul class="nav">                ',
		"Linkedin" !== this.config.clientType ? (b += "                ", d && (b += '                <li>                    <a href="/dashboard">                        <span data-weave="shared/helper/translation" data-i18n="Home Page"></span>                    </a>                </li>                <li>                    <a href="/candidate#list"><span data-weave="shared/helper/translation" data-i18n="People"></span></a>                </li>                <li>                    <a href="/company#list"><span data-weave="shared/helper/translation" data-i18n="Company"></span></a>                </li>                <li>                    <a href="/job#list" data-weave="shared/helper/translation" data-i18n="jobs"></a>                </li>                '), b += "                ", e && (b += '                <li>                    <a href="/invoice" data-weave="shared/helper/translation" data-i18n="invoices"></a>                </li>                '), b += "                ", f && (b += '                <li class="dropdown">                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span data-weave="shared/helper/translation" data-i18n="Security Center"></span> <b class="caret"></b></a>                    <ul class="dropdown-menu">                        <li><a href="/login/log" data-weave="shared/helper/translation" data-i18n="Login Log"></a></li>                        <li><a href="/user/activity" data-weave="shared/helper/translation" data-i18n="User Activity"></a></li>                        <li><a href="/ip/privacy" data-weave="shared/helper/translation" data-i18n="用户IP访问限制"></a></li>                        <li><a href="/anti/duplication" data-weave="shared/helper/translation" data-i18n="数据防复制"></a></li>                        <li><a href="/invoice/email" data-weave="shared/helper/translation" data-i18n="财务信息邮件通知"></a></li>                    </ul>                </li>                <li>                    <a href="/user" data-weave="shared/helper/translation" data-i18n="User Management"></a>                </li>                <li>                    <a href="/setting" data-weave="shared/helper/translation" data-i18n="System Management"></a>                </li>                <li>                    <a href="/candidate#list"><span data-weave="shared/helper/translation" data-i18n="People"></span></a>                </li>                <li>                    <a href="/company" data-weave="shared/helper/translation" data-i18n="Company"></a>                </li>                '), b += '                <li class="dropdown">                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span data-weave="shared/helper/translation" data-i18n="Reportings"></span> <b class="caret"></b></a>                    <ul class="dropdown-menu">                        <li><a href="/revenue" data-weave="shared/helper/translation" data-i18n="Revenue"></a></li>                        <li><a href="/kpi" data-weave="shared/helper/translation" data-i18n="KPI - Main Reporting"></a></li>                        <li><a href="/kpi#?type=note" data-weave="shared/helper/translation" data-i18n="KPI - Note"></a></li>                        <li><a href="/kpi#?type=job" data-weave="shared/helper/translation" data-i18n="KPI - Job"></a></li>                        <li><a href="/kpi#?type=attachment" data-weave="shared/helper/translation" data-i18n="KPI - Attachment"></a></li>                        <li><a href="/kpi#?type=task" data-weave="shared/helper/translation" data-i18n="KPI - Task"></a></li>                        <li><a href="/kpi#?type=company">                            KPI - <span data-weave="shared/helper/translation" data-i18n="Company"></span>                        </a></li>                    </ul>                </li>                <li>                    <a href="/document" data-weave="shared/helper/translation" data-i18n="Document"></a>                </li>                ', this._linkedinCountDown >= 0 && (b += '                <li class="dropdown">                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">                        <span data-weave="shared/helper/translation" data-i18n="Gllue Data"></span> <b class="caret"></b>                    </a>                    <ul class="dropdown-menu">                        <li><a href="/data-center/people" data-weave="shared/helper/translation" data-i18n="Gllue people"></a></li>                        <li><a href="/data-center/company" data-weave="shared/helper/translation" data-i18n="Gllue companies"></a></li>                        <li><a href="/data-center/report" data-weave="shared/helper/translation" data-i18n="Reportings"></a></li>                        <li><a target="_blank" href="http://support.gllue.com/?p=1241" data-weave="shared/helper/translation" data-i18n="Tutorial"></a></li>                    </ul>                </li>                '), b += "                ") : b += '                <li>                    <a href="/data-center/people"><span data-weave="shared/helper/translation" data-i18n="People"></span></a>                </li>                <li>                    <a href="/data-center/company"><span data-weave="shared/helper/translation" data-i18n="Company"></span></a>                </li>                <li><a href="/data-center/report" data-weave="shared/helper/translation" data-i18n="Reportings"></a></li>                ',
		b += "            </ul>        </div>        ",
		"Linkedin" !== this.config.clientType && (d || f) && (b += '        <div class="quick-search hide" data-weave="shared/widget/common/quick-search/main">        </div>        '),
		b += "    </div></div>"
	}
}),define("troopjs-requirejs/template!shared/widget/login/main.html", [], function () {
	return function (a) {
		var b = "",
		c = a.links;
		if (b += '<header>    <span id="logo">        <span class="gllue">Gllue</span>    </span></header><table>    <tr>        <td class="recommend">            <div class="outer">                <div class="inner">                    <p>                        <span>推荐浏览器：Google Chrome</span>                    </p>                    <p>                        <a href="http://down.tech.sina.com.cn/download/d_load.php?d_id=40975&down_id=3&ip=116.231.235.36" target="_blank">Windows版下载</a>                        <a href="http://down.tech.sina.com.cn/download/d_load.php?d_id=43718&down_id=5&ip=116.231.235.36" target="_blank">Mac版下载</a>                    </p>                </div>            </div>        </td>        <td>            <div class="login_box">                <form id="login_form">                    <div class="top_b" data-weave="shared/helper/translation" data-i18n="Sign in to Gllue"></div>                        <div class="alert alert-error alert-login hide">                        Username or Password is incorrect.                    </div>                    <div class="cnt_b">                        <div class="formRow">                            <div class="input-prepend">                                <span class="add-on"><i class="icon-user"></i></span><input type="text" id="email" name="email" placeholder="Email" />                            </div>                        </div>                        <div class="formRow">                            <div class="input-prepend">                                <span class="add-on"><i class="icon-lock"></i></span><input type="password" id="password" name="password" placeholder="Password"/>                            </div>                        </div>                        <div class="formRow clearfix">                            <label class="checkbox"><input type="checkbox" name="remember" id="remember"/> <span data-weave="shared/helper/translation" data-i18n="Remember me"></span></label>                        </div>                    </div>                    <div class="btm_b clearfix">                        <button class="btn btn-primary pull-right btn-login" data-weave="shared/helper/translation" data-i18n="Sign In"></button>                    </div>                  </form>            </div>                        </td>    </tr></table>', c.length) {
			b += '<div class="friend-links">    <p>链接</p>    <p>        ';
			for (var d = 0, e = c.length; e > d; d++)
				b += '        <a href="' + c[d].value + '" target="_blank">' + c[d].name + "</a>        ";
			b += "    </p></div>"
		}
		return b += '<div class="copyright">    <p>谷露招聘管理系统 &copy; 2012 - 2014 Gllue Software</p>    <p>软件著作权登记号 <a href="/copyright" data-action="open/window">2012SR131257</a></p></div>'
	}
}),define("troopjs-requirejs/template!shared/widget/modal/add-to-folder/edit-folder.html", [], function () {
	return function () {
		var a = '<div class="modal-header">    <button type="button" class="close" data-dismiss="modal">×</button>    <h3 data-weave="shared/helper/translation" data-i18n="Folder"></h3></div><div class="modal-body">    <form class="form-horizontal">    	<fieldset>    		<div class="control-group">    			<label class="control-label">    				<span data-weave="shared/helper/translation" data-i18n="Folder name"></span>    			</label>    			<div class="controls">    				<input type="text" class="input-medium required" name="name">    			</div>    		</div>            ';
		return "Linkedin" !== this.config.clientType && (a += '            <div class="control-group control-share"></div>            '),
		a += '    	</fieldset>    </form></div><div class="modal-footer">    <button class="btn btn-danger btn-delete hide" data-action="save" data-weave="shared/helper/translation" data-i18n="Delete"></button>    <button class="btn btn-primary btn-confirm hide" data-action="save" data-weave="shared/helper/translation" data-i18n="Save"></button></div>'
	}
}),define("troopjs-requirejs/template!shared/widget/modal/add-to-folder/main.html", [], function () {
	return function () {
		var a = '<div class="modal-header">    <button type="button" class="close" data-dismiss="modal">×</button>    <h3 class="add" data-weave="shared/helper/translation" data-i18n="Add to Folder"></h3>    <h3 class="edit" data-weave="shared/helper/translation" data-i18n="Edit folder"></h3></div><div class="modal-body" style="position: relative; height: 300px;">    <p>        <a href="#" data-action="add/folder" data-i18n="New Folder" data-weave="shared/helper/translation"></a>    </p>    <div class="folder-tree"></div>    <ul class="context-menu hide">        <li>            <a href="#" data-weave="shared/helper/translation" data-i18n="Edit folder" data-action="folder/action(\'updateNode\')"></a>        </li>        <li class="normal-action">            <a href="#" data-weave="shared/helper/translation" data-i18n="Add folder after this" data-action="folder/action(\'addNodeAfter\')"></a>        </li>        <li class="normal-action">            <a href="#" data-weave="shared/helper/translation" data-i18n="Add child folder" data-action="folder/action(\'appendNode\')"></a>        </li>        <li>            <a href="#" data-weave="shared/helper/translation" data-i18n="Delete folder" data-action="folder/action(\'removeNode\')"></a>        </li>    </ul></div><div class="modal-footer">    <span class="pull-left"><a href="http://support.gllue.com/?p=866" target="_blank" data-weave="shared/helper/translation" data-i18n="Tutorial"></a></span>    <button class="btn" data-action="close" data-weave="shared/helper/translation" data-i18n="Close"></button>    <button class="btn btn-primary add" data-action="save" data-weave="shared/helper/translation" data-i18n="Save"></button></div>';
		return a
	}
}),define("troopjs-requirejs/template!shared/widget/modal/authenticator/main.html", [], function () {
	return function () {
		var a = '<div class="modal-header">    <button type="button" class="close" data-dismiss="modal">×</button>    <h3>动态身份验证</h3></div><div class="modal-body">    <form>        <ol>            <li>                在移动设备上安装身份验证器            </li>            <li>                打开身份验证器应用，扫描条形码添加账户                <div class="goog-authenticator clearfix">                    <img class="barcode" width="100" height="100">                    <div>                        <p>                            身份验证器不能扫条码或加载做错误请输入，<br>                            请手动添加以下账号                        </p>                        <p>                            账户：<span class="username"></span>                        </p>                        <p>                            密钥：<span class="secretkey"></span>                        </p>                    </div>                </div>            </li>            <li>                输入身份证验证器自动生成的动态验证码<br>                <div class="goog-authentize">                    <p>                        <input type="text" class="input-medium" name="code">                        <button class="btn btn-primay" data-action="auth">验证并开启</button>                    </p>                </div>            </li>        </ol>    </form></div><div class="modal-footer">    <button class="btn" data-action="cancel" data-weave="shared/helper/translation" data-i18n="Close"></button></div>';
		return a
	}
}),define("troopjs-requirejs/template!shared/widget/modal/email-signature/main.html", [], function () {
	return function () {
		var a = '<div class="modal-header">    <button type="button" class="close" data-dismiss="modal">×</button>    <h3 data-weave="shared/helper/translation" data-i18n="Email Signature"></h3></div><div class="modal-body">    <form action="#" class="form-horizontal" id="email-signaure-form">        <textarea name="signature" data-signature="true" data-weave="shared/widget/common/ckeditor/main"></textarea>    </form></div><div class="modal-footer">    <button class="btn action" data-dismiss="modal" data-weave="shared/helper/translation" data-i18n="Cancel"></button>    <button class="btn btn-primary action" data-action="save" data-weave="shared/helper/translation" data-i18n="Save" form="email-signaure-form"></button></div>';
		return a
	}
}),define("troopjs-requirejs/template!shared/widget/modal/feedback-quick-post/main.html", [], function () {
	return function () {
		var a = '<div class="modal-header">    <button type="button" class="close" data-dismiss="modal">×</button>    <h3 data-weave="shared/helper/translation" data-i18n="Feedback"></h3></div><div class="modal-body">    <form action="#" class="form-horizontal" id="feedback-quick-post-form">        <div class="control-group">            <label class="control-label">                <span data-weave="shared/helper/translation" data-i18n="Type"></span>                <span class="f_req">*</span>            </label>            <div class="controls">                <select name="type" class="input-medium required">                    <option value="" data-weave="shared/helper/translation" data-i18n="Please select"></option>                    <option value="support">系统支持</option>                    <option value="bug">系统缺陷</option>                    <option value="sugguestion">建议与意见</option>                    <option value="consulting">咨询服务</option>                </select>            </div>        </div>        <div class="control-group">            <label class="control-label">                <span data-weave="shared/helper/translation" data-i18n="Subject"></span>                <span class="f_req">*</span>            </label>            <div class="controls">                <input type="text" name="subject" class="span4 required">            </div>        </div>        <div class="control-group formSep">            <label class="control-label">                <span data-weave="shared/helper/translation" data-i18n="Content"></span>                <span class="f_req">*</span>            </label>            <div class="controls">                <textarea name="content" cols="30" rows="5" class="span4 required"></textarea>            </div>        </div>    </form>    <form action="#" class="form-horizontal" type="post" enctype="multipart/form-data">        <fieldset>            <div class="control-group">                <label class="control-label" data-weave="shared/helper/translation" data-i18n="Attachment"></label>                <div class="controls">                    <span class="upload-file"></span>                </div>                <div class="controls text_line hide">                    <ul class="unstyled attachment-list"></ul>                </div>            </div>        </fieldset>    </form></div><div class="modal-footer">    <button class="btn btn-primary" data-action="save" data-weave="shared/helper/translation" data-i18n="Send" form="feedback-quick-post-form"></button></div>';
		return a
	}
}),define("troopjs-requirejs/template!shared/widget/modal/feedback-quick-post/attachment.html", [], function () {
	return function (a) {
		for (var b = "", c = 0, d = a.length; d > c; c++) {
			b += "";
			var e = a[c];
			b += '<li>    <span data-id="' + e.uuidname + '" class="attachment-item file-type-icon ' + e.ext.toLowerCase() + '">' + e.originname + '</span>    <a href="#" data-action="remove/attachment"><span class="icon-remove"></span></a></li>'
		}
		return b
	}
}),define("troopjs-requirejs/template!shared/widget/page-route/list.html", [], function () {
	return function (a) {
		var b = '<div class="search_page">    <div id="filter-container" class="well well-small" data-weave="' + a.app + "/widget/" + a.type + '/filter/main"></div>    <div data-weave="' + a.app + "/widget/" + a.type + '/list/main"></div></div>    ';
		return b
	}
}),define("troopjs-requirejs/template!shared/widget/page-route/detail.html", [], function () {
	return function (a) {
		var b = '<div class="row-fluid widget-spin" data-weave="' + a.app + "/widget/" + a.type + '/detail/main"></div>';
		return b
	}
}),define("troopjs-requirejs/template!shared/widget/page-route/add.html", [], function () {
	return function (a) {
		var b = '<div class="row-fluid widget-spin" data-weave="' + a.app + "/widget/" + a.type + '/add/main"></div>';
		return b
	}
}),define("troopjs-requirejs/template!shared/widget/page-route/merge.html", [], function () {
	return function (a) {
		var b = '<div class="row-fluid widget-spin" data-weave="' + a.app + "/widget/" + a.type + '/merge/main"></div>';
		return b
	}
}),define("troopjs-requirejs/template!shared/widget/pagination/main.html", [], function () {
	return function (a) {
		var b = "",
		c = a.current,
		d = a.pages,
		e = a.count,
		f = 0;
		for (b += '<span class="summary pull-left">    <span data-weave="shared/helper/translation" data-i18n="Total"></span>: ' + this.formatCurrency(e) + ' <span data-weave="shared/helper/translation" data-i18n="results"></span></span><span class="pull-right">    <label class="muted">&nbsp;<span data-weave="shared/helper/translation" data-i18n="Goto"></span>        <input type="text" class="page" data-action="page/go/to">        <span data-weave="shared/helper/translation" data-i18n="Page"></span>    </label></span><ul class="paging pull-right clearfix">    <li ', 1 === c && (b += 'class="disabled"'), b += '>        <a href="#" data-action="page/number(' + (c - 1) + ')" data-weave="shared/helper/translation" data-i18n="Prev"></a>    </li>    ', c - 1 > 1 ? b += '    <li><a href="#" data-action="page/number(1)">1</a></li>    <li class="disabled"><a href="javascript:void(0);">...</a></li>    ' : 1 === c - 1 && (b += '    <li><a href="#" data-action="page/number(1)">1</a></li>    '), b += "    ", f; 3 > f; f++)
			b += "    ", d >= c + f && (b += "    <li ", c == c + f && (b += 'class="disabled"'), b += '>        <a href="#" data-action="page/number(' + (c + f) + ')">' + (c + f) + "</a>    </li>    "), b += "    ";
		return b += "    ",
		d - c > 3 ? b += '    <li class="disabled"><a href="javascript:void(0);">...</a></li>    <li><a href="#" data-action="page/number(' + d + ')">' + d + "</a></li>    " : 3 === d - c && (b += '    <li><a href="#" data-action="page/number(' + d + ')">' + d + "</a></li>    "),
		b += "    <li ",
		c === d && (b += 'class="disabled"'),
		b += '>        <a href="#" data-action="page/number(' + (c + 1) + ')" data-weave="shared/helper/translation" data-i18n="Next"></a>    </li></ul>'
	}
}),define("troopjs-requirejs/template!shared/widget/side-bar/admin/main.html", [], function () {
	return function (a) {
		var b = '<ul class="nav nav-list">    ',
		c = a.type;
		return b += "    ",
		"profile" === c ? (b += '    <li class="nav-header" >        <a href="#" data-action="nav/header">            <b class="icon-expandable"></b>            <span data-weave="shared/helper/translation" data-i18n="Personal Settings"></span>        </a>    </li>    ', "Linkedin" !== this.config.clientType && (b += '    <li><a href="/my/profile" data-weave="shared/helper/translation" data-i18n="User Profile"></a></li>    '), b += '    <li><a href="/password" data-weave="shared/helper/translation" data-i18n="System Password"></a></li>    ', "Linkedin" !== this.config.clientType && (b += '    <li><a href="/email" data-weave="shared/helper/translation" data-i18n="Email Setting"></a></li>    <li><a href="/personal-email-template" data-weave="shared/helper/translation" data-i18n="Email Template Setting"></a></li>    '), b += '    <li><a href="/preference" data-weave="shared/helper/translation" data-i18n="System Language"></a></li>    <li><a href="/bind/oauth" data-weave="shared/helper/translation" data-i18n="Authorize SNS"></a></li>    ') : "userManagement" === c ? b += '    <li class="nav-header">        <a href="#" data-action="nav/header">            <b class="icon-expandable"></b>            <span data-weave="shared/helper/translation" data-i18n="User Management"></span>        </a>    </li>    <li><a href="/user" data-weave="shared/helper/translation" data-i18n="User Profile"></a></li>    ' : "admin" === c ? b += '    <li class="nav-header">        <a href="#" data-action="nav/header">            <b class="icon-expandable"></b>            <span data-weave="shared/helper/translation" data-i18n="System Management"></span>        </a>    </li>    <li><a href="/setting#type=company-info" data-weave="shared/helper/translation" data-i18n="公司信息设置"></a></li>    <li><a href="/setting#type=core-config" data-weave="shared/helper/translation" data-i18n="核心参数设置"></a></li>    <li><a href="/setting#type=email-config" data-weave="shared/helper/translation" data-i18n="邮件: 服务器设置"></a></li>    <li><a href="/setting#type=email-template-config" data-weave="shared/helper/translation" data-i18n="邮件: 模板设置"></a></li>    <li><a href="/setting#type=people-note-config" data-weave="shared/helper/translation" data-i18n="人才: 备注类型设置"></a></li>    <li><a href="/setting#type=people-status-config" data-weave="shared/helper/translation" data-i18n="人才: 备注状态设置"></a></li>    <li><a href="/setting#type=candidate-fields" data-weave="shared/helper/translation" data-i18n="人才: 新增字段"></a></li>    <li><a href="/setting#type=education-background" data-weave="shared/helper/translation" data-i18n="人才: 学历设置"></a></li>    <li><a href="/setting#type=candidate-required-fields" data-weave="shared/helper/translation" data-i18n="人才: 必填字段设置"></a></li>    <li><a href="/setting#type=task-category-config" data-weave="shared/helper/translation" data-i18n="任务: 类型设置"></a></li>    <li><a href="/setting#type=company-fields" data-weave="shared/helper/translation" data-i18n="公司: 新增字段"></a></li>    <li><a href="/setting#type=company-note-config" data-weave="shared/helper/translation" data-i18n="公司: 备注类型设置"></a></li>    <li><a href="/setting#type=valid-new-company" data-weave="shared/helper/translation" data-i18n="公司: 客户审核设置"></a></li>    <li><a href="/setting#type=joborder-fields" data-weave="shared/helper/translation" data-i18n="项目: 新增字段"></a></li>    <li><a href="/setting#type=job-note-config" data-weave="shared/helper/translation" data-i18n=" 项目: 备注类型设置"></a></li>    <li><a href="/setting#type=jobsubmission-note-config" data-weave="shared/helper/translation" data-i18n="项目流程: 备注类型设置"></a></li>    <li><a href="/setting#type=jobsubmission-note-status" data-weave="shared/helper/translation" data-i18n="项目流程: 备注状态设置"></a></li>    <li><a href="/setting#type=revenue-invalid-config" data-weave="shared/helper/translation" data-i18n="项目流程: 业绩作废原因设置"></a></li>    <li><a href="/setting#type=document-permission" data-weave="shared/helper/translation" data-i18n="文档: 权限设置"></a></li>    <li><a href="/setting#type=attachment-type" data-weave="shared/helper/translation" data-i18n="附件: 类型设置"></a></li>    <li><a href="/setting#type=license" data-weave="shared/helper/translation" data-i18n="License Management"></a></li>    ' : "extension" === c ? b += '    <li class="nav-header">        <a href="#" data-action="nav/header">            <b class="icon-expandable"></b>            <span data-weave="shared/helper/translation" data-i18n="System Plugins"></span>        </a>    </li>    <li><a href="#">全部插件</a></li>    <li><a href="#">已启用插件</a></li>    <li><a href="#">未启用插件</a></li>    ' : "security" === c && (b += '    <li class="nav-header">        <a href="#" data-action="nav/header">            <b class="icon-expandable"></b>            <span data-weave="shared/helper/translation" data-i18n="Security Center"></span>        </a>    </li>    <li><a href="/login/log" data-weave="shared/helper/translation" data-i18n="Login Log"></a></li>    <li><a href="/user/activity" data-weave="shared/helper/translation" data-i18n="User Activity"></a></li>    <li><a href="/ip/privacy" data-weave="shared/helper/translation" data-i18n="用户IP访问限制"></a></li>    <li><a href="/anti/duplication" data-weave="shared/helper/translation" data-i18n="数据防复制"></a></li>    <li><a href="/invoice/email" data-weave="shared/helper/translation" data-i18n="财务信息邮件通知"></a></li>    '),
		b += "</ul>"
	}
}),define("troopjs-requirejs/template!shared/widget/side-bar/main.html", [], function () {
	return function () {
		var a = '<span class="sidebar_switch"></span><div class="sidebar">    <div class="antiScroll">        <div class="antiscroll-inner">            <div class="antiscroll-content">                <div class="sidebar_inner hide">                </div>            </div>        </div>    </div></div>';
		return a
	}
}),define("troopjs-requirejs/template!shared/widget/side-bar/saved-filter/main.html", [], function () {
	return function (a) {
		var b = "",
		c = a.savedFilters;
		if (b += "", "document" !== this._type) {
			if (b += '<ul class="nav nav-list saved-filter" data-name="favorite-filter">    <li class="nav-header" id="saved-searchs">        <a href="#" data-action="nav/header">            <b class="icon-expandable"></b>            <span data-weave="shared/helper/translation" data-i18n="Saved Searches"></span>        </a>    </li>    ', c) {
				b += "    ";
				for (var d = 0, e = c.length; e > d; d++)
					b += '    <li class="nav-filter">        <span class="icon-remove-small icon-transparent" data-action="filter/delete" data-filter="' + c[d].name + '" data-id="' + c[d].id + '"></span>        <a  href="#" data-href="' + c[d].query + "&byfilter=" + c[d].id + '" data-action="filter" data-id="' + c[d].id + '" class="search-item"><i class="icon-search icon-blue"></i> ' + c[d].name + '<sapn class="pull-right">' + c[d].count + '</sapn></a>        <span class="icon-move-ns icon-blue"></span>    </li>    ';
				b += "    "
			}
			b += "</ul>"
		}
		return b += "",
		("candidate" === this._type || "client" === this._type || "document" === this._type) && (b += '<ul class="nav nav-list folder-list" data-action="folder/list" data-name="folder-list">    <li class="nav-header">        <a href="#" data-action="nav/header">            <b class="icon-expandable"></b>            <span data-weave="shared/helper/translation" data-i18n="Folder"></span>            <span class="edit hide" data-weave="shared/helper/translation" data-i18n="Edit" data-action="edit/folder"></span>        </a>    </li>    <li class="folder-tree">    </li></ul>'),
		b
	}
}),define("troopjs-requirejs/template!shared/widget/side-bar/saved-filter/saved-filter.html", [], function () {
	return function (a) {
		var b = '<li class="nav-filter">	<span class="icon-remove-small icon-transparent hide" data-action="filter/delete" data-filter="' + a.name + '" data-id="' + a.id + '"></span>	<a href="#" data-href="' + a.query + "&byfilter=" + a.id + '" data-action="filter" data-id="' + a.id + '" class="search-item"><i class="icon-search icon-blue"></i> ' + a.name + '<sapn class="pull-right">' + a.count + '</sapn></a>	<span class="icon-move-ns icon-blue"></span></li>';
		return b
	}
}),define("troopjs-requirejs/template!shared/widget/support-center/detail/main.html", [], function () {
	return function (a) {
		var b = "",
		c = a.items,
		d = a.email;
		b += '<p class="clearfix">    <a href="javascript:history.back();" class="btn pull-right">        <i class="icon-arrow-left"></i>    </a></p><div class="chat_box">    <div class="chat_content">        <div class="chat_heading clearfix">            ' + a.title + " - " + this.showStatus(a.status) + '        </div>                <div class="msg_window">            <ul class="unstyled bubble-wrap">                ';
		for (var e = 0, f = c.length; f > e; e++) {
			b += "                ";
			var g = c[e];
			b += '                <li>                    <div class="bubble-main ',
			b += g.email === d ? "pull-right" : "pull-left",
			b += '">                        <p class="bubble-content">                            ' + (g.content.replace("", "<br>").replace("", "<br>") || "&nbsp;") + "                            <br>                            ";
			for (var h = 0, i = g.attachments.length; i > h; h++)
				b += '                            <a href="/rest/user/issue_attachment_download?_id=' + a._id + "&uuidname=" + g.attachments[h].uuidname + '" target="_blank">' + g.attachments[h].originname + "</a>                            ";
			b += '                        </p>                    </div>                    <span class="tips ',
			b += g.email === d ? "pull-right" : "pull-left",
			b += '">' + g.date + "</span>                </li>                "
		}
		return b += '                           </ul>        </div>                <div class="chat_editor_box clearfix">            <textarea name="content" data-action="content" data-weave="shared/widget/common/autosize/main"></textarea>            <div class="clearfix">                <ul class="unstyled attachment-list"></ul>                <form action="#" class="form-horizontal" type="post" enctype="multipart/form-data">                    <fieldset>                        <span class="upload-file"></span>                        <button class="btn btn-primary btn-send disabled pull-right" data-action="send" data-weave="shared/helper/translation" data-i18n="Send"></button>                    </fieldset>                </form>            </div>        </div>    </div></div>'
	}
}),define("troopjs-requirejs/template!shared/widget/support-center/detail/attachment.html", [], function () {
	return function (a) {
		for (var b = "", c = 0, d = a.length; d > c; c++) {
			b += "";
			var e = a[c];
			b += '<li>    <span data-id="' + e.uuidname + '" class="attachment-item file-type-icon ' + e.ext.toLowerCase() + '">' + e.originname + '</span>    <a href="#" data-action="remove/attachment"><span class="icon-remove"></span></a></li>'
		}
		return b
	}
}),define("troopjs-requirejs/template!shared/widget/support-center/detail/new-message.html", [], function () {
	return function (a) {
		for (var b = '<li class="hide">    <div class="bubble-main pull-right">        <p class="bubble-content">        	' + (a.content || "&nbsp;") + "        	<br>        	", c = 0, d = a.attachments.length; d > c; c++)
			b += '            <a href="/rest/user/issue_attachment_download?_id=' + a._id + "&uuidname=" + a.attachments[c].uuidname + '" target="_blank">' + a.attachments[c].originname + "</a>            ";
		return b += '        </p>    </div>    <span class="tips pull-right" data-weave="shared/helper/translation" data-i18n="Just now"></span></li>'
	}
}),define("troopjs-requirejs/template!shared/widget/support-center/filter/main.html", [], function () {
	return function () {
		var a = '<ul class="nav nav-pills line_sep">    <li class="dropdown">        <a href="#" data-action="dropdown" data-weave="shared/helper/translation" data-i18n="Subject"></a>        <div class="dropdown-menu filter-content">            <form action="#" class="form-horizontal">                <div class="control-group">                    <input type="text" class="input-medium" autocomplete="off">                </div>                <button class="btn" type="submit" data-action="form(\'title\')" data-weave="shared/helper/translation" data-i18n="Add"></button>            </form>        </div>    </li>    <li class="divider"></li>    <li class="dropdown">        <a href="#" data-action="dropdown" data-weave="shared/helper/translation" data-i18n="Feedback Type"></a>        <div class="dropdown-menu filter-content">            <form action="#" class="form-horizontal">                <div class="control-group">                    <select name="type" class="input-large">                        <option value="support">系统支持</option>                        <option value="bug">系统缺陷</option>                        <option value="sugguestion">建议与意见</option>                        <option value="consulting">咨询服务</option>                    </select>                </div>                <button class="btn" type="submit" data-action="form(\'type\')" data-weave="shared/helper/translation" data-i18n="Add"></button>            </form>        </div>    </li>    <li class="divider"></li>    <li class="dropdown">        <a href="#" data-action="dropdown" data-weave="shared/helper/translation" data-i18n="Status"></a>        <div class="dropdown-menu filter-content">            <form action="#" class="form-horizontal">                <div class="control-group">                    <select name="status" class="input-large">                        <option value="pending">等待处理</option>                        <option value="processing">处理中</option>                        <option value="done">已处理</option>                    </select>                </div>                <button class="btn" type="submit" data-action="form(\'status\')" data-weave="shared/helper/translation" data-i18n="Add"></button>            </form>        </div>    </li></ul><p class="sepH_b">    <span class="tag label label-info deletable hide" data-query="title" data-action="tag/remove"><b data-weave="shared/helper/translation" data-i18n="Subject"></b>: <span></span> <i class="icon-remove-small icon-transparent"></i></span>    <span class="tag label label-info deletable hide" data-query="type" data-action="tag/remove"><b data-weave="shared/helper/translation" data-i18n="Feedback Type"></b>: <span></span> <i class="icon-remove-small icon-transparent"></i></span>    <span class="tag label label-info deletable hide" data-query="status" data-action="tag/remove"><b data-weave="shared/helper/translation" data-i18n="Status"></b>: <span></span> <i class="icon-remove-small icon-transparent"></i></span>    <span class="tag label label-info deletable hide" data-query="date" data-action="tag/remove"><b data-weave="shared/helper/translation" data-i18n="Added Date"></b>: <span></span> <i class="icon-remove-small icon-transparent"></i></span></p><p class="sepH_b">    <button class="btn" data-action="filter/search" data-weave="shared/helper/translation" data-i18n="Search"></button></p>';
		return a
	}
}),define("troopjs-requirejs/template!shared/widget/support-center/item/main.html", [], function () {
	return function (a) {
		var b = "<td></td><td>" + this.showType(a.type) + '</td><td><a href="/support-center#detail!id=' + a._id + '">' + a.title + "</a></td><td>" + this.formatDate(a.date) + "</td><td>" + this.showStatus(a.status) + "</td>";
		return b
	}
}),define("troopjs-requirejs/template!shared/widget/support-center/list/main.html", [], function () {
	return function () {
		var a = '<div class="well well-small action-bar clearfix">        <div class="pull-right">        <span>显示: </span>        <select class="sort input-small" data-weave="shared/widget/list-paginate/main(' + this._listType + ')" data-action="paginate">            <option value="10">10</option>            <option value="25">25</option>            <option value="50">50</option>        </select>        <select class="sort input-medium" data-weave="shared/widget/list-ordering/main(' + this._listType + ')" data-action="ordering">            <option value="-date">按添加时间倒序</option>            <option value="date">按添加时间顺序</option>            <option value="-status">按状态倒序</option>            <option value="status">按状态顺序</option>            <option value="-type">按反馈类型倒序</option>            <option value="type">按反馈类型顺序</option>            <option value="title">按主题排序</option>        </select>    </div></div><!-- pagination --><div class="pagination clearfix hide" data-weave="shared/widget/pagination/main(\'' + this._listType + '\')"></div><div class="loading-area widget-spin">    <table class="table table_vam table-bl">        <colgroup>            <col width="30">            <col>            <col>            <col>            <col>        </colgroup>        <thead>            <tr>                <th></th>                <th data-weave="shared/helper/translation" data-i18n="Feedback Type"></th>                <th data-weave="shared/helper/translation" data-i18n="Subject"></th>                <th data-weave="shared/helper/translation" data-i18n="Added Date"></th>                <th data-weave="shared/helper/translation" data-i18n="Status"></th>            </tr>        </thead>        <tbody class="list-container">        </tbody>    </table></div><!-- pagination --><div class="pagination clearfix hide" data-weave="shared/widget/pagination/main(\'' + this._listType + "')\"></div>";
		return a
	}
}),define("troopjs-requirejs/template!shared/widget/system/password/main.html", [], function () {
	return function () {
		var a = '<h3 class="heading" data-weave="shared/helper/translation" data-i18n="Modify Password"></h3><form action="#" class="form-horizontal">    <div class="control-group">        <label for="originpass" class="control-label" data-weave="shared/helper/translation" data-i18n="Current Password"></label>        <div class="controls">            <input type="password" name="originpass" />        </div>    </div>    <div class="control-group">        <label for="newpass" class="control-label" data-weave="shared/helper/translation" data-i18n="New Password"></label>        <div class="controls">            <input type="password" name="newpass" />        </div>    </div>    <div class="control-group">        <label for="confirmpass" class="control-label" data-weave="shared/helper/translation" data-i18n="Confirm New Password"></label>        <div class="controls">            <input type="password" name="confirmpass" />        </div>    </div>    <div class="control-group formSep">        <div class="controls">            <button class="btn btn-primary" data-action="save" data-weave="shared/helper/translation" data-i18n="Save"></button>        </div>    </div></form><!--<div>    <h3 class="heading">动态身份验证</h3>    <p>该功能已关闭，建议开启以更好保护账户数据安全</p>    <p>        <button class="btn btn-primary" data-action="open/authenticator">开启</button>    </p>    <ol>        <li>            什么是动态身份验证<br/>            动态身份验证之：将您的移动设备与谷露招聘系统的帐号绑定。每次登陆，不仅需要输入登录密码，还需要输入移动设备为您生成的一次性动态验证码。这样，即使登录密码泄露，攻击者由于没有您的移动设备，仍然无法登录系统，保证您的数据安全。</li>        <li>            工作原理<br>            谷露招聘管理系统借助Google身份验证器，在您的移动设备生成动态验证码。Google身份验证器是一个开源的移动设备应用程序，安装并与您的账号绑定后，它便可根据时间（无需手机流量、完全免费）为您的账号生成一次性动态验证码。        </li>        <li>            如何安装Google身份验证器<br>            <ul>                <li>                    Android移动设备：<a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS5nb29nbGUuYW5kcm9pZC5hcHBzLmF1dGhlbnRpY2F0b3IyIl0.">点击这里</a>                </li>                <li>                    iOS移动设备：<a href="http://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8">点击这里</a>                </li>                <li>                    Windows Phone：<a href="http://www.windowsphone.com/en-US/apps/021dd79f-0598-e011-986b-78e7d1fa76f8">点击这里</a>                </li>                <li>                    Symbian或者其它支持Java ME的设备：<a href="http://code.google.com/p/lwuitgauthj2me/">点击这里</a>                </li>                <li>                    WebOS：<a href="http://gregstoll.dyndns.org/gauth/">点击这里</a>                </li>            </ul>        </li>    </ol></div>-->';
		return a
	}
}),define("troopjs-requirejs/template!shared/widget/system/preference/main.html", [], function () {
	return function () {
		var a = '<h3 class="heading" data-weave="shared/helper/translation" data-i18n="Preference"></h3><form action="#" class="form-horizontal">    <fieldset>        <div class="control-group">            <label class="control-label" data-weave="shared/helper/translation" data-i18n="System Language"></label>            <div class="controls">                <label class="radio inline">                    <input type="radio" value="zh_CN" name="language"> 简体中文                </label>                <label class="radio inline">                    <input type="radio" value="en" name="language"> English                </label>            </div>        </div>        <div class="control-group">            <label class="control-label"></label>            <div class="controls">                <button class="btn" data-action="save" data-weave="shared/helper/translation" data-i18n="Save"></button>                     </div>        </div>    </fieldset></form>';
		return a
	}
})