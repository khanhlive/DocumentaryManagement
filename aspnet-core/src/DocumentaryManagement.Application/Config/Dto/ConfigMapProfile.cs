using AutoMapper;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.Config.Dto
{
    public class ConfigMapProfile : Profile
    {
        public ConfigMapProfile()
        {
            // Role and permission
            CreateMap<ConfigDto, AppConfig>();
            //CreateMap<ConfigDto, AppConfig>().ForMember(p => p.Users, opt => opt.Ignore());

            CreateMap<CreateConfigDto, AppConfig>();
            //CreateMap<CreateConfigDto, AppConfig>().ForMember(x => x.Users, opt => opt.Ignore());

            CreateMap<UpdateConfigDto, AppConfig>();
            //CreateMap<UpdateConfigDto, AppConfig>().ForMember(x => x.Users, opt => opt.Ignore());
        }
    }
}
