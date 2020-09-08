using AutoMapper;
using DocumentaryManagement.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocumentaryManagement.DocumentType.Dto
{
    public class DocumentTypeMapProfile : Profile
    {
        public DocumentTypeMapProfile()
        {
            // Role and permission
            CreateMap<DocumentTypeDto, AppDocumentType>();
            CreateMap<DocumentTypeDto, AppDocumentType>().ForMember(p => p.AppDocumentary, opt => opt.Ignore());
            CreateMap<DocumentTypeDto, AppDocumentType>().ForMember(p => p.AppDocumentaryPersonal, opt => opt.Ignore());

            CreateMap<CreateDocumentTypeDto, AppDocumentType>();
            CreateMap<CreateDocumentTypeDto, AppDocumentType>().ForMember(x => x.AppDocumentary, opt => opt.Ignore());
            CreateMap<CreateDocumentTypeDto, AppDocumentType>().ForMember(p => p.AppDocumentaryPersonal, opt => opt.Ignore());

            CreateMap<UpdateDocumentTypeDto, AppDocumentType>();
            CreateMap<UpdateDocumentTypeDto, AppDocumentType>().ForMember(x => x.AppDocumentary, opt => opt.Ignore());
            CreateMap<UpdateDocumentTypeDto, AppDocumentType>().ForMember(p => p.AppDocumentaryPersonal, opt => opt.Ignore());
        }
    }
}
