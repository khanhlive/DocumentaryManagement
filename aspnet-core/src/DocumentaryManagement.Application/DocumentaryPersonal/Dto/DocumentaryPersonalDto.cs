using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using DocumentaryManagement.Model;
using System;
using System.Collections.Generic;

namespace DocumentaryManagement.DocumentaryPersonal.Dto
{
    [AutoMapFrom(typeof(AppDocumentaryPersonal))]
    public class DocumentaryPersonalDto : EntityDto
    {
        public DocumentaryPersonalDto()
        {
            AppAttachments = new HashSet<AppAttachments>();
        }
        public string Code { get; set; }
        public string Name { get; set; }
        public int DocumentTypeId { get; set; }
        public int AgencyIssuedId { get; set; }
        public string Description { get; set; }
        public string SummaryContent { get; set; }
        public string Content { get; set; }
        public string Abridgment { get; set; }
        public long CreationId { get; set; }
        public DateTime CreationDate { get; set; }
        public long? UpdatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }
        
        public virtual AppAgencyIssued AgencyIssued { get; set; }
        public virtual AppDocumentType DocumentType { get; set; }
        public virtual ICollection<AppAttachments> AppAttachments { get; set; }
    }
}
