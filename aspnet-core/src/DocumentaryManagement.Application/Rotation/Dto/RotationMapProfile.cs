using AutoMapper;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.Rotation.Dto
{
    public class RotationMapProfile : Profile
    {
        public RotationMapProfile()
        {
            // Role and permission
            CreateMap<RotationDto, AppRotation>();            
        }
    }
}
