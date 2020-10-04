using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Runtime.Session;
using DocumentaryManagement.Core;
using DocumentaryManagement.Model;
using System;
using System.ComponentModel.DataAnnotations;

namespace DocumentaryManagement.Department.Dto
{
    [AutoMapTo(typeof(AppDepartment))]
    public class UpdateDepartmentDto : EntityDto, IUpdateEntityDto
    {
        [Required]
        [StringLength(20)]
        public string Code { get; set; }
        [Required]
        [StringLength(250)]
        public string Name { get; set; }
        [StringLength(500)]
        public string Description { get; set; }
        
        public int? UpdatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public void BeforeUpdate(IAbpSession abpSession)
        {
            UpdatedId = (int?)abpSession.UserId;
            UpdatedDate = DateTime.Now;
        }
    }
}
