using Abp.AutoMapper;
using DocumentaryManagement.Model;
using System;

namespace DocumentaryManagement.AgencyIssued.Dto
{
    [AutoMapTo(typeof(AppDocumentType))]
    public class CreateAgencyIssuedDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long CreationId { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
