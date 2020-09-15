using AutoMapper;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.DocumentaryPersonal.Dto
{
    public class DocumentaryPersonalMapProfile : Profile
    {
        public DocumentaryPersonalMapProfile()
        {
            // Role and permission
            CreateMap<DocumentaryPersonalDto, AppDocumentaryPersonal>();
            CreateMap<DocumentaryPersonalDto, AppDocumentaryPersonal>().ForMember(p => p.AppAttachments, opt => opt.Ignore());
            CreateMap<DocumentaryPersonalDto, AppDocumentaryPersonal>().ForMember(p => p.AgencyIssued, opt => opt.Ignore());
            CreateMap<DocumentaryPersonalDto, AppDocumentaryPersonal>().ForMember(p => p.DocumentType, opt => opt.Ignore());

            CreateMap<CreateDocumentaryPersonalDto, AppDocumentaryPersonal>();
            CreateMap<CreateDocumentaryPersonalDto, AppDocumentaryPersonal>().ForMember(x => x.AgencyIssued, opt => opt.Ignore());
            //CreateMap<CreateDocumentaryPersonalDto, AppDocumentaryPersonal>().ForMember(p => p.AppAttachments, opt => opt.Ignore());
            CreateMap<CreateDocumentaryPersonalDto, AppDocumentaryPersonal>().ForMember(p => p.DocumentType, opt => opt.Ignore());

            CreateMap<UpdateDocumentaryPersonalDto, AppDocumentaryPersonal>();
            CreateMap<UpdateDocumentaryPersonalDto, AppDocumentaryPersonal>().ForMember(x => x.AgencyIssued, opt => opt.Ignore());
            //CreateMap<UpdateDocumentaryPersonalDto, AppDocumentaryPersonal>().ForMember(p => p.AppAttachments, opt => opt.Ignore());
            CreateMap<UpdateDocumentaryPersonalDto, AppDocumentaryPersonal>().ForMember(p => p.DocumentType, opt => opt.Ignore());
        }
    }
}
