using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentaryManagement.Model
{
    public partial class AppDocumentType : Entity, ISoftDelete
    {
        public AppDocumentType()
        {
            AppDocumentary = new HashSet<AppDocumentary>();
            AppDocumentaryPersonal = new HashSet<AppDocumentaryPersonal>();
        }
        
        [Required]
        [StringLength(50)]
        public string Code { get; set; }
        [Required]
        [StringLength(250)]
        public string Name { get; set; }
        public string Description { get; set; }
        [Column("Creation_Id")]
        public long CreationId { get; set; }
        [Column("Creation_Date", TypeName = "datetime")]
        public DateTime CreationDate { get; set; }
        [Column("Updated_Id")]
        public long? UpdatedId { get; set; }
        [Column("Updated_Date", TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }

        [InverseProperty("DocumentType")]
        public virtual ICollection<AppDocumentary> AppDocumentary { get; set; }
        [InverseProperty("DocumentType")]
        public virtual ICollection<AppDocumentaryPersonal> AppDocumentaryPersonal { get; set; }
    }
}
