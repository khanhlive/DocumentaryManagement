using AutoMapper;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.Department.Dto
{
    public class DepartmentMapProfile : Profile
    {
        public DepartmentMapProfile()
        {
            // Role and permission
            CreateMap<DepartmentDto, AppDepartment>();
            //CreateMap<DepartmentDto, AppDepartment>().ForMember(p => p.AppDocumentary, opt => opt.Ignore());
            //CreateMap<DepartmentDto, AppDepartment>().ForMember(p => p.AppDocumentaryPersonal, opt => opt.Ignore());

            CreateMap<CreateDepartmentDto, AppDepartment>();
            //CreateMap<CreateDepartmentDto, AppDepartment>().ForMember(x => x.AppDocumentary, opt => opt.Ignore());
            //CreateMap<CreateDepartmentDto, AppDepartment>().ForMember(p => p.AppDocumentaryPersonal, opt => opt.Ignore());

            CreateMap<UpdateDepartmentDto, AppDepartment>();
            //CreateMap<UpdateDepartmentDto, AppDepartment>().ForMember(x => x.AppDocumentary, opt => opt.Ignore());
            //CreateMap<UpdateDepartmentDto, AppDepartment>().ForMember(p => p.AppDocumentaryPersonal, opt => opt.Ignore());
        }
    }
}
