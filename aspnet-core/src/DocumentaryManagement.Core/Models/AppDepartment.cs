using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentaryManagement.Model
{
    public partial class AppDepartment : Entity, ISoftDelete
    {
        [Required]
        [StringLength(20)]
        public string Code { get; set; }
        [Required]
        [StringLength(250)]
        public string Name { get; set; }
        [StringLength(500)]
        public string Description { get; set; }
        [Column("Creation_Id")]
        public int? CreationId { get; set; }
        [Column("Creation_Date", TypeName = "datetime")]
        public DateTime? CreationDate { get; set; }
        [Column("Updated_Id")]
        public int? UpdatedId { get; set; }
        [Column("Updated_Date", TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
