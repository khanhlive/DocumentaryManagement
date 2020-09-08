using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentaryManagement.Model
{
    public partial class AppDocumentary : Entity
    {
        public AppDocumentary()
        {
            AppAttachments = new HashSet<AppAttachments>();
        }
        
        [Required]
        [StringLength(200)]
        public string Code { get; set; }
        [Required]
        [StringLength(500)]
        public string Name { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime ReleaseDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime ReceivedDate { get; set; }
        public int TextNumber { get; set; }
        [StringLength(250)]
        public string Signer { get; set; }
        [StringLength(250)]
        public string ApprovedBy { get; set; }
        [StringLength(250)]
        public string ReceivedBy { get; set; }
        [Column("DocumentType_Id")]
        public int DocumentTypeId { get; set; }
        [Column("AgencyIssued_Id")]
        public int AgencyIssuedId { get; set; }
        public int TotalPage { get; set; }
        public bool IsProcessed { get; set; }
        [StringLength(250)]
        public string CategoryName { get; set; }
        [StringLength(250)]
        public string PerformancePerson { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "ntext")]
        public string SummaryContent { get; set; }
        [Column(TypeName = "ntext")]
        public string Content { get; set; }
        public int? Type { get; set; }
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
        [InverseProperty("AppDocumentary")]
        public virtual AppAgencyIssued AgencyIssued { get; set; }
        [ForeignKey("DocumentTypeId")]
        [InverseProperty("AppDocumentary")]
        public virtual AppDocumentType DocumentType { get; set; }
        [InverseProperty("Documentary")]
        public virtual ICollection<AppAttachments> AppAttachments { get; set; }
    }
}
