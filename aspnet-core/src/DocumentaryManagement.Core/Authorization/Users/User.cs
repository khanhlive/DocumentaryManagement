using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Authorization.Users;
using Abp.Extensions;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.Authorization.Users
{
    public class User : AbpUser<User>
    {
        [StringLength(250)]
        public string Organization { get; set; }
        [Column("Province_Id")]
        public int? ProvinceId { get; set; }
        [StringLength(500)]
        public string Address { get; set; }
        [ForeignKey("ProvinceId")]
        [InverseProperty("Users")]
        public virtual AppProvince Province { get; set; }
        public const string DefaultPassword = "123qwe";

        public static string CreateRandomPassword()
        {
            return Guid.NewGuid().ToString("N").Truncate(16);
        }

        public static User CreateTenantAdminUser(int tenantId, string emailAddress)
        {
            var user = new User
            {
                TenantId = tenantId,
                UserName = AdminUserName,
                Name = AdminUserName,
                Surname = AdminUserName,
                EmailAddress = emailAddress,
                Roles = new List<UserRole>()
            };

            user.SetNormalizedNames();

            return user;
        }
    }
}
