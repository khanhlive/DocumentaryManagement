using Abp.AutoMapper;
using DocumentaryManagement.Model;
using System;

namespace DocumentaryManagement.Config.Dto
{
    [AutoMapTo(typeof(AppConfig))]
    public class CreateConfigDto
    {
        public CreateConfigDto()
        {
            
        }

        public long UserId { get; set; }
        public string Singer { get; set; }
        public string ApprovedBy { get; set; }
        public string Sender { get; set; }
        public int AgencyIssuedId { get; set; }
        public string ReceivedBy { get; set; }
        public int? Type { get; set; }
        public long CreationId { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
