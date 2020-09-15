using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Runtime.Session;
using DocumentaryManagement.Core;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.Attachment.Dto
{
    [AutoMapTo(typeof(AppAttachments))]
    public class UpdateAttachmentDto : EntityDto, IUpdateEntityDto
    {
        public int? DocumentaryId { get; set; }
        public int? DocumentaryPersonalId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public long Size { get; set; }
        public string FileType { get; set; }
        public int Type { get; set; }

        public void BeforeUpdate(IAbpSession abpSession)
        {
        }
    }
}
