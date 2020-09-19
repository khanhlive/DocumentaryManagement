using Abp.AutoMapper;
using DocumentaryManagement.Authorization.Users;
using DocumentaryManagement.Model;
using System;
using System.Collections.Generic;

namespace DocumentaryManagement.Province.Dto
{
    [AutoMapTo(typeof(AppProvince))]
    public class CreateProvinceDto
    {
        public CreateProvinceDto()
        {
            Users = new HashSet<User>();
        }

        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Level { get; set; }
        public long CreationId { get; set; }
        public DateTime CreationDate { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
