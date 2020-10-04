using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using DocumentaryManagement.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DocumentaryManagement.Department.Dto
{
    [AutoMapFrom(typeof(AppDepartment))]
    public class DepartmentDto : EntityDto
    {
        public DepartmentDto()
        {

        }
        [Required]
        [StringLength(20)]
        public string Code { get; set; }
        [Required]
        [StringLength(250)]
        public string Name { get; set; }
        [StringLength(500)]
        public string Description { get; set; }
        
        public int? CreationId { get; set; }
        public DateTime? CreationDate { get; set; }
        public int? UpdatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
        
    }
}
