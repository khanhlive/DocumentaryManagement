using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Runtime.Session;
using DocumentaryManagement.Core;
using DocumentaryManagement.Model;
using System;

namespace DocumentaryManagement.Province.Dto
{
    [AutoMapTo(typeof(AppProvince))]
    public class UpdateProvinceDto : EntityDto, IUpdateEntityDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Level { get; set; }
        public long? UpdatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public void BeforeUpdate(IAbpSession abpSession)
        {
            UpdatedId = abpSession.UserId ?? 0;
            UpdatedDate = DateTime.Now;
        }
    }
}
