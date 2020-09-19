using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocumentaryManagement.Model
{
    public partial class AppConfig : Entity
    {
        [Column("User_Id")]
        public long UserId { get; set; }
        [Required]
        [StringLength(250)]
        public string Singer { get; set; }
        [Required]
        [StringLength(250)]
        public string ApprovedBy { get; set; }
        [Required]
        [StringLength(250)]
        public string Sender { get; set; }
        [Column("AgencyIssued_Id")]
        public int AgencyIssuedId { get; set; }
        [Required]
        [StringLength(250)]
        public string ReceivedBy { get; set; }
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
        [InverseProperty("AppConfig")]
        public virtual AppAgencyIssued AgencyIssued { get; set; }
    }
}
