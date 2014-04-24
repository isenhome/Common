using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Isenhome.Common.Web.Areas.rest.Controllers
{
    public class dataController : Controller
    {
        public JsonResult links()
        {
            var obj = new List<object>();
            obj.Add(new { name = "苏州金色未来投资咨询有限公司", value = "http://www.golden-future.com.cn/" });
            return Json(obj, JsonRequestBehavior.AllowGet);
        }
    }
}
