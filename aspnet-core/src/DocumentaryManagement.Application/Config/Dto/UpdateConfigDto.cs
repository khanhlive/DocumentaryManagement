using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Runtime.Session;
using DocumentaryManagement.Core;
using DocumentaryManagement.Model;
using System;

namespace DocumentaryManagement.Config.Dto
{
    [AutoMapTo(typeof(AppConfig))]
    public class UpdateConfigDto : EntityDto, IUpdateEntityDto
    {
        public long UserId { get; set; }
        public string Singer { get; set; }
        public string ApprovedBy { get; set; }
        public string Sender { get; set; }
        public int AgencyIssuedId { get; set; }
        public string ReceivedBy { get; set; }
        public int? Type { get; set; }
        public long? UpdatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public void BeforeUpdate(IAbpSession abpSession)
        {
            UpdatedId = abpSession.UserId ?? 0;
            UpdatedDate = DateTime.Now;
        }
    }
}
