using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace DocumentaryManagement.Controllers
{
    public abstract class DocumentaryManagementControllerBase: AbpController
    {
        protected DocumentaryManagementControllerBase()
        {
            LocalizationSourceName = DocumentaryManagementConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
