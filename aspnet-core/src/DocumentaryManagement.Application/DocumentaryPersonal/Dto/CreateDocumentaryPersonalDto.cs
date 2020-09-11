using Abp.AutoMapper;
using DocumentaryManagement.Model;
using System;

namespace DocumentaryManagement.DocumentaryPersonal.Dto
{
    [AutoMapTo(typeof(AppDocumentaryPersonal))]
    public class CreateDocumentaryPersonalDto
    {
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
    }
}
