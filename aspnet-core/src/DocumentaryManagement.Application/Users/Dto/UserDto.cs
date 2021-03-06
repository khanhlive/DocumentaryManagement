using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using DocumentaryManagement.Authorization.Users;

namespace DocumentaryManagement.Users.Dto
{
    [AutoMapFrom(typeof(User))]
    public class UserDto : EntityDto<long>
    {
        //public UserDto()
        //{
        //    this.RoleNames = new string[] { };
        //}
        [Required]
        [StringLength(AbpUserBase.MaxUserNameLength)]
        public string UserName { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxSurnameLength)]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(AbpUserBase.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }

        public bool IsActive { get; set; }        

        public DateTime? LastLoginTime { get; set; }

        public DateTime CreationTime { get; set; }

        public string[] RoleNames { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string FullName2 { get; set; }

        [StringLength(AbpUserBase.MaxSurnameLength)]
        public string Organization { get; set; }

        public int? ProvinceId { get; set; }

        [StringLength(AbpUserBase.MaxSurnameLength)]
        public string Address { get; set; }

        [StringLength(11)]
        public string PhoneNumber { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }
}
