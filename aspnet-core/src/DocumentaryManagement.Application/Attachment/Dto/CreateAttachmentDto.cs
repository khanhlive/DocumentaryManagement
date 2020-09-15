using Abp.AutoMapper;
using DocumentaryManagement.Model;
using System;

namespace DocumentaryManagement.Attachment.Dto
{
    [AutoMapTo(typeof(AppAttachments))]
    public class CreateAttachmentDto
    {
        public int? DocumentaryId { get; set; }
        public int? DocumentaryPersonalId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public long Size { get; set; }
        public string FileType { get; set; }
        public int? CreationId { get; set; }
        public DateTime? CreationDate { get; set; }
        public int Type { get; set; }
        
    }
}
