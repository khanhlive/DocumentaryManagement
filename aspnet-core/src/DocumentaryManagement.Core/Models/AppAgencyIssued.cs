using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentaryManagement.Model
{
    public partial class AppAgencyIssued : Entity, ISoftDelete
    {
        public AppAgencyIssued()
        {
            AppConfig = new HashSet<AppConfig>();
            AppDocumentary = new HashSet<AppDocumentary>();
            AppDocumentaryPersonal = new HashSet<AppDocumentaryPersonal>();
        }
        
        [StringLength(20)]
        public string Code { get; set; }
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

        [InverseProperty("AgencyIssued")]
        public virtual ICollection<AppConfig> AppConfig { get; set; }
        [InverseProperty("AgencyIssued")]
        public virtual ICollection<AppDocumentary> AppDocumentary { get; set; }
        [InverseProperty("AgencyIssued")]
        public virtual ICollection<AppDocumentaryPersonal> AppDocumentaryPersonal { get; set; }
    }
}
