using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentaryManagement.Model
{
    public partial class AppAttachments : Entity
    {
        [Column("Documentary_Id")]
        public int? DocumentaryId { get; set; }
        [Column("DocumentaryPersonal_Id")]
        public int? DocumentaryPersonalId { get; set; }
        [StringLength(250)]
        public string Name { get; set; }
        [StringLength(500)]
        public string Url { get; set; }
        public long Size { get; set; }
        [Required]
        [StringLength(50)]
        public string FileType { get; set; }
        [Column("Creation_Id")]
        public int? CreationId { get; set; }
        [Column("Creation_Date", TypeName = "datetime")]
        public DateTime? CreationDate { get; set; }
        public bool IsDeleted { get; set; }
        public int Type { get; set; }

        [ForeignKey("DocumentaryId")]
        [InverseProperty("AppAttachments")]
        public virtual AppDocumentary Documentary { get; set; }
        [ForeignKey("DocumentaryPersonalId")]
        [InverseProperty("AppAttachments")]
        public virtual AppDocumentaryPersonal DocumentaryPersonal { get; set; }
    }
}
