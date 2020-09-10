using AutoMapper;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.AgencyIssued.Dto
{
    public class AgencyIssuedMapProfile : Profile
    {
        public AgencyIssuedMapProfile()
        {
            // Role and permission
            CreateMap<AgencyIssuedDto, AppAgencyIssued>();
            CreateMap<AgencyIssuedDto, AppAgencyIssued>().ForMember(p => p.AppDocumentary, opt => opt.Ignore());
            CreateMap<AgencyIssuedDto, AppAgencyIssued>().ForMember(p => p.AppDocumentaryPersonal, opt => opt.Ignore());

            CreateMap<CreateAgencyIssuedDto, AppAgencyIssued>();
            CreateMap<CreateAgencyIssuedDto, AppAgencyIssued>().ForMember(x => x.AppDocumentary, opt => opt.Ignore());
            CreateMap<CreateAgencyIssuedDto, AppAgencyIssued>().ForMember(p => p.AppDocumentaryPersonal, opt => opt.Ignore());

            CreateMap<UpdateAgencyIssuedDto, AppAgencyIssued>();
            CreateMap<UpdateAgencyIssuedDto, AppAgencyIssued>().ForMember(x => x.AppDocumentary, opt => opt.Ignore());
            CreateMap<UpdateAgencyIssuedDto, AppAgencyIssued>().ForMember(p => p.AppDocumentaryPersonal, opt => opt.Ignore());
        }
    }
}
