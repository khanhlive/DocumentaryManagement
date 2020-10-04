using Abp.AutoMapper;
using DocumentaryManagement.Model;
using System;
using System.ComponentModel.DataAnnotations;

namespace DocumentaryManagement.Department.Dto
{
    [AutoMapTo(typeof(AppDepartment))]
    public class CreateDepartmentDto
    {
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
    }
}
