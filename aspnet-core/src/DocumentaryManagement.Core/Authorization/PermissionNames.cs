namespace DocumentaryManagement.Authorization
{
    public static class PermissionNames
    {
        public const string Pages_Tenants = "Pages.Tenants";

        public const string Pages_Users = "Pages.Users";

        public const string Pages_Roles = "Pages.Roles";

        public const string Pages_SearchDocumentAway = "Pages.SearchDocumentAway";

        public const string Pages_SearchDocumentInternal = "Pages.SearchDocumentInternal";

        public const string Pages_SearchDocumentArrived = "Pages.SearchDocumentArrived";

        public const string Pages_SearchEDocument = "Pages.SearchEDocument";

        public const string Pages_BookDocumentAway = "Pages.BookDocumentAway";

        public const string Pages_BookDocumentInternal = "Pages.BookDocumentInternal";

        public const string Pages_BookDocumentArrived = "Pages.BookDocumentArrived";

        public const string Pages_BookEDocument = "Pages.BookEDocument";

        public const string Pages_DocumentPersonal = "Pages.DocumentPersonal";

        public const string Pages_DocumentAway = "Pages.DocumentAway";

        public const string Pages_DocumentInternal = "Pages.DocumentInternal";

        public const string Pages_DocumentArrived = "Pages.DocumentArrived";

        public const string Pages_EDocument = "Pages.EDocument";

        public const string Pages_Province = "Pages.Province";

        public const string Pages_DocumentType = "Pages.DocumentType";

        public const string Pages_AgencyIssued = "Pages.AgencyIssued";

        public const string Pages_Department = "Pages.Department";

        public const string Pages_Config = "Pages.Config";

        public const string Pages_Profile = "Pages.Profile";

        public const string Permission_Approved = "Permission.Approved";

        public const string Permission_DocumentManager = "Permission.DocumentManager";
    }

    public enum PermissionType
    {
        Admin = 1,
        DocumentManager = 2,
        Approved = 3,
        Employee = 4
    }
}
