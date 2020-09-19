using AutoMapper;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.Province.Dto
{
    public class ProvinceMapProfile : Profile
    {
        public ProvinceMapProfile()
        {
            // Role and permission
            CreateMap<ProvinceDto, AppProvince>();
            CreateMap<ProvinceDto, AppProvince>().ForMember(p => p.Users, opt => opt.Ignore());

            CreateMap<CreateProvinceDto, AppProvince>();
            CreateMap<CreateProvinceDto, AppProvince>().ForMember(x => x.Users, opt => opt.Ignore());

            CreateMap<UpdateProvinceDto, AppProvince>();
            CreateMap<UpdateProvinceDto, AppProvince>().ForMember(x => x.Users, opt => opt.Ignore());
        }
    }
}
