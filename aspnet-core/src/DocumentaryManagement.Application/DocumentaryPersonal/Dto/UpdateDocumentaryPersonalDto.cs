using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Runtime.Session;
using DocumentaryManagement.Attachment.Dto;
using DocumentaryManagement.Core;
using DocumentaryManagement.Model;
using System;
using System.Collections.Generic;

namespace DocumentaryManagement.DocumentaryPersonal.Dto
{
    [AutoMapTo(typeof(AppDocumentaryPersonal))]
    public class UpdateDocumentaryPersonalDto : EntityDto, IUpdateEntityDto
    {
        public UpdateDocumentaryPersonalDto()
        {
            AppAttachments = new HashSet<UpdateAttachmentDto>();
        }
        public string Code { get; set; }
        public string Name { get; set; }
        public int DocumentTypeId { get; set; }
        public int AgencyIssuedId { get; set; }
        public string Description { get; set; }
        public string SummaryContent { get; set; }
        public string Content { get; set; }
        public string Abridgment { get; set; }
        public long? UpdatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public virtual ICollection<UpdateAttachmentDto> AppAttachments { get; set; }
        public virtual ICollection<UpdateAttachmentDto> AppAttachmentsDelete { get; set; }

        public void BeforeUpdate(IAbpSession abpSession)
        {
            UpdatedId = abpSession.UserId ?? 0;
            UpdatedDate = DateTime.Now;
        }
    }
}
