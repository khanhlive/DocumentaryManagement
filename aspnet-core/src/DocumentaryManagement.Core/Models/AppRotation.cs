using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentaryManagement.Model
{
    public partial class AppRotation : Entity<long>
    {
        [Column("Document_Id")]
        public long DocumentId { get; set; }
        [Column("User_Id")]
        public long? UserId { get; set; }
        [Column("Department_Id")]
        public long? DepartmentId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Date { get; set; }
        [Column("Creation_UserId")]
        public long? CreationUserId { get; set; }
    }
}
