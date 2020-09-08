using Microsoft.AspNetCore.Antiforgery;
using DocumentaryManagement.Controllers;

namespace DocumentaryManagement.Web.Host.Controllers
{
    public class AntiForgeryController : DocumentaryManagementControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
