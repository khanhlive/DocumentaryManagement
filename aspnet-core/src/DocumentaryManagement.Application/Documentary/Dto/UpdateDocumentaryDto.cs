using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Runtime.Session;
using DocumentaryManagement.Attachment.Dto;
using DocumentaryManagement.Core;
using DocumentaryManagement.Model;
using System;
using System.Collections.Generic;

namespace DocumentaryManagement.Documentary.Dto
{
    [AutoMapTo(typeof(AppDocumentary))]
    public class UpdateDocumentaryDto : EntityDto, IUpdateEntityDto
    {
        public UpdateDocumentaryDto()
        {
            AppAttachments = new HashSet<UpdateAttachmentDto>();
            AppAttachmentsDelete = new HashSet<UpdateAttachmentDto>();
        }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime ReleaseDate { get; set; }
        public DateTime ReceivedDate { get; set; }
        public string TextNumber { get; set; }
        public string Signer { get; set; }
        public string ApprovedBy { get; set; }
        public string ReceivedBy { get; set; }
        public int DocumentTypeId { get; set; }
        public int AgencyIssuedId { get; set; }
        public int TotalPage { get; set; }
        public bool IsProcessed { get; set; }
        public string CategoryName { get; set; }
        public string PerformancePerson { get; set; }
        public string Description { get; set; }
        public string SummaryContent { get; set; }
        public string Content { get; set; }
        public int? Type { get; set; }
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
