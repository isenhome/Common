using System.Web.Mvc;

namespace Isenhome.Common.Web.Areas.rest
{
    public class restAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "rest";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "rest_default",
                "rest/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
