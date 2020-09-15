using AutoMapper;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.Attachment.Dto
{
    public class AttachmentMapProfile : Profile
    {
        public AttachmentMapProfile()
        {
            // Role and permission
            CreateMap<AttachmentDto, AppAttachments>();
            CreateMap<AttachmentDto, AppAttachments>().ForMember(p => p.Documentary, opt => opt.Ignore());
            CreateMap<AttachmentDto, AppAttachments>().ForMember(p => p.DocumentaryPersonal, opt => opt.Ignore());

            CreateMap<CreateAttachmentDto, AppAttachments>();
            CreateMap<CreateAttachmentDto, AppAttachments>().ForMember(x => x.Documentary, opt => opt.Ignore());
            CreateMap<CreateAttachmentDto, AppAttachments>().ForMember(p => p.DocumentaryPersonal, opt => opt.Ignore());

            CreateMap<UpdateAttachmentDto, AppAttachments>();
            CreateMap<UpdateAttachmentDto, AppAttachments>().ForMember(x => x.Documentary, opt => opt.Ignore());
            CreateMap<UpdateAttachmentDto, AppAttachments>().ForMember(p => p.DocumentaryPersonal, opt => opt.Ignore());
        }
    }
}
