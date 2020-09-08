using Abp.Authorization;
using DocumentaryManagement.Authorization.Roles;
using DocumentaryManagement.Authorization.Users;

namespace DocumentaryManagement.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
