using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using DocumentaryManagement.Authorization.Users;

namespace DocumentaryManagement.Sessions.Dto
{
    [AutoMapFrom(typeof(User))]
    public class UserLoginInfoDto : EntityDto<long>
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string UserName { get; set; }

        public string EmailAddress { get; set; }
        public string FullName2 { get; set; }
        public string Organization { get; set; }
        public int? ProvinceId { get; set; }
        public string Address { get; set; }
    }
}
