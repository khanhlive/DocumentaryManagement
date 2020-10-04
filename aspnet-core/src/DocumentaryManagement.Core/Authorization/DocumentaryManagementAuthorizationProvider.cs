using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace DocumentaryManagement.Authorization
{
    public class DocumentaryManagementAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
            context.CreatePermission(PermissionNames.Pages_AgencyIssued, L("Pages_AgencyIssued"));
            context.CreatePermission(PermissionNames.Pages_BookDocumentArrived, L("Pages_BookDocumentArrived"));
            context.CreatePermission(PermissionNames.Pages_BookDocumentAway, L("Pages_BookDocumentAway"));
            context.CreatePermission(PermissionNames.Pages_Config, L("Pages_Config"));
            context.CreatePermission(PermissionNames.Pages_Department, L("Pages_Department"));
            context.CreatePermission(PermissionNames.Pages_DocumentArrived, L("Pages_DocumentArrived"));
            context.CreatePermission(PermissionNames.Pages_DocumentAway, L("Pages_DocumentAway"));
            context.CreatePermission(PermissionNames.Pages_DocumentPersonal, L("Pages_DocumentPersonal"));
            context.CreatePermission(PermissionNames.Pages_DocumentType, L("Pages_DocumentType"));
            context.CreatePermission(PermissionNames.Pages_Profile, L("Pages_Profile"));
            context.CreatePermission(PermissionNames.Pages_Province, L("Pages_Province"));
            context.CreatePermission(PermissionNames.Pages_SearchDocumentArrived, L("Pages_SearchDocumentArrived"));
            context.CreatePermission(PermissionNames.Pages_SearchDocumentAway, L("Pages_SearchDocumentAway"));
            context.CreatePermission(PermissionNames.Permission_Approved, L("Permission_Approved"));
            context.CreatePermission(PermissionNames.Permission_DocumentManager, L("Permission_DocumentManager"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, DocumentaryManagementConsts.LocalizationSourceName);
        }
    }
}
