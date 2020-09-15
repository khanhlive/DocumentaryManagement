using AutoMapper;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.Documentary.Dto
{
    public class DocumentaryMapProfile : Profile
    {
        public DocumentaryMapProfile()
        {
            // Role and permission
            CreateMap<DocumentaryDto, AppDocumentary>();
            CreateMap<DocumentaryDto, AppDocumentary>().ForMember(p => p.AppAttachments, opt => opt.Ignore());
            CreateMap<DocumentaryDto, AppDocumentary>().ForMember(p => p.AgencyIssued, opt => opt.Ignore());
            CreateMap<DocumentaryDto, AppDocumentary>().ForMember(p => p.DocumentType, opt => opt.Ignore());

            CreateMap<CreateDocumentaryDto, AppDocumentary>();
            CreateMap<CreateDocumentaryDto, AppDocumentary>().ForMember(x => x.AgencyIssued, opt => opt.Ignore());
            //CreateMap<CreateDocumentaryDto, AppDocumentary>().ForMember(p => p.AppAttachments, opt => opt.Ignore());
            CreateMap<CreateDocumentaryDto, AppDocumentary>().ForMember(p => p.DocumentType, opt => opt.Ignore());

            CreateMap<UpdateDocumentaryDto, AppDocumentary>();
            CreateMap<UpdateDocumentaryDto, AppDocumentary>().ForMember(x => x.AgencyIssued, opt => opt.Ignore());
            //CreateMap<UpdateDocumentaryDto, AppDocumentary>().ForMember(p => p.AppAttachments, opt => opt.Ignore());
            CreateMap<UpdateDocumentaryDto, AppDocumentary>().ForMember(p => p.DocumentType, opt => opt.Ignore());
        }
    }
}
