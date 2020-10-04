using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.Documentary.Dto
{
    [AutoMapTo(typeof(AppDocumentary))]
    public class ApprovedDocumentDto: EntityDto
    {
        public string ApprovedContent { get; set; }
        public bool? IsApproved { get; set; }
    }
}
