using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using DocumentaryManagement.Model;
using System;

namespace DocumentaryManagement.DocumentType.Dto
{
    [AutoMapTo(typeof(AppDocumentType))]
    public class UpdateDocumentTypeDto : EntityDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long CreationId { get; set; }
        public DateTime CreationDate { get; set; }
        public long? UpdatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
