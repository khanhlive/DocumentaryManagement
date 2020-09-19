using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using DocumentaryManagement.Model;
using Newtonsoft.Json;
using System;

namespace DocumentaryManagement.Config.Dto
{
    [AutoMapFrom(typeof(AppConfig))]
    public class ConfigDto : EntityDto
    {
        public ConfigDto()
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
        public long? UpdatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }

        public string AgencyIssuedName
        {
            get
            {
                return this.AgencyIssued?.Name;
            }
        }

        [JsonIgnore]
        public virtual AppAgencyIssued AgencyIssued { get; set; }

    }
}
