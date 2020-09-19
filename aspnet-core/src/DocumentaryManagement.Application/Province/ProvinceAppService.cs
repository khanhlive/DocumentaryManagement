using DocumentaryManagement.Province.Dto;
using DocumentaryManagement.Core;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Province;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.Province
{
    public class ProvinceAppService : AsyncCrudAppServiceBase<AppProvince, ProvinceDto, int, PagedProvinceRequestDto, CreateProvinceDto, UpdateProvinceDto>, IProvinceAppService
    {
        public ProvinceAppService(IProvinceRepository repository) : base(repository)
        {
            
        }
    }
}
