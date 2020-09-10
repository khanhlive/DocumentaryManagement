using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using DocumentaryManagement.Model;
using System;
using System.Collections.Generic;

namespace DocumentaryManagement.AgencyIssued.Dto
{
    [AutoMapFrom(typeof(AppAgencyIssued))]
    public class AgencyIssuedDto : EntityDto
    {
        public AgencyIssuedDto()
        {
            AppDocumentary = new HashSet<AppDocumentary>();
            AppDocumentaryPersonal = new HashSet<AppDocumentaryPersonal>();
            AppConfig = new HashSet<AppConfig>();
        }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long CreationId { get; set; }
        public DateTime CreationDate { get; set; }
        public long? UpdatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
        
        public virtual ICollection<AppDocumentary> AppDocumentary { get; set; }
        public virtual ICollection<AppDocumentaryPersonal> AppDocumentaryPersonal { get; set; }
        public virtual ICollection<AppConfig> AppConfig { get; set; }
    }
}
