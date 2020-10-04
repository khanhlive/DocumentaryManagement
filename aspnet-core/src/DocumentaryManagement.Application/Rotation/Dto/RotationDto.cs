using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Runtime.Session;
using DocumentaryManagement.Core;
using DocumentaryManagement.Model;
using System;
using System.Collections.Generic;

namespace DocumentaryManagement.Rotation.Dto
{
    [AutoMapFrom(typeof(AppRotation))]
    public class RotationDto : EntityDto<long>, IUpdateEntityDto
    {
        public RotationDto()
        {
            
        }
        public long DocumentId { get; set; }
        public long? UserId { get; set; }
        public long? DepartmentId { get; set; }
        public DateTime? Date { get; set; }

        public void BeforeUpdate(IAbpSession abpSession)
        {
            
        }
    }
}
