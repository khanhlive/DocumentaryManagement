using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using DocumentaryManagement.Model;
using System;

namespace DocumentaryManagement.Attachment.Dto
{
    [AutoMapFrom(typeof(AppAttachments))]
    public class AttachmentDto : EntityDto
    {
        public AttachmentDto()
        {

        }
        public int? DocumentaryId { get; set; }
        public int? DocumentaryPersonalId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public long Size { get; set; }
        public string FileType { get; set; }
        public int? CreationId { get; set; }
        public DateTime? CreationDate { get; set; }
        public bool IsDeleted { get; set; }
        public int Type { get; set; }
        
        public virtual AppDocumentary Documentary { get; set; }
        public virtual AppDocumentaryPersonal DocumentaryPersonal { get; set; }
    }
}
