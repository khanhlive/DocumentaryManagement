using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentaryManagement.Model
{
    public partial class AppDocumentaryPersonal : Entity
    {
        public AppDocumentaryPersonal()
        {
            AppAttachments = new HashSet<AppAttachments>();
        }
        
        [Required]
        [StringLength(200)]
        public string Code { get; set; }
        [Required]
        [StringLength(500)]
        public string Name { get; set; }
        [Column("DocumentType_Id")]
        public int DocumentTypeId { get; set; }
        [Column("AgencyIssued_Id")]
        public int AgencyIssuedId { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "ntext")]
        public string SummaryContent { get; set; }
        [Column(TypeName = "ntext")]
        public string Content { get; set; }
        [Column(TypeName = "ntext")]
        public string Abridgment { get; set; }
        [Column("Creation_Id")]
        public long CreationId { get; set; }
        [Column("Creation_Date", TypeName = "datetime")]
        public DateTime CreationDate { get; set; }
        [Column("Updated_Id")]
        public long? UpdatedId { get; set; }
        [Column("Updated_Date", TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }

        [ForeignKey("AgencyIssuedId")]
        [InverseProperty("AppDocumentaryPersonal")]
        public virtual AppAgencyIssued AgencyIssued { get; set; }
        [ForeignKey("DocumentTypeId")]
        [InverseProperty("AppDocumentaryPersonal")]
        public virtual AppDocumentType DocumentType { get; set; }
        [InverseProperty("DocumentaryPersonal")]
        public virtual ICollection<AppAttachments> AppAttachments { get; set; }
    }
}
