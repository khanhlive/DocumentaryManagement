using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using DocumentaryManagement.Authorization.Users;
using DocumentaryManagement.Model;
using System;
using System.Collections.Generic;

namespace DocumentaryManagement.Province.Dto
{
    [AutoMapFrom(typeof(AppProvince))]
    public class ProvinceDto : EntityDto
    {
        public ProvinceDto()
        {
            Users = new HashSet<User>();
        }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Level { get; set; }
        public long CreationId { get; set; }
        public DateTime CreationDate { get; set; }
        public long? UpdatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }


        public virtual ICollection<User> Users { get; set; }

    }
}
