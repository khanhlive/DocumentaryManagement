using Abp.Application.Services;
using DocumentaryManagement.Province.Dto;

namespace DocumentaryManagement.Province
{
    public interface IProvinceAppService : IAsyncCrudAppService<ProvinceDto, int, PagedProvinceRequestDto, CreateProvinceDto, UpdateProvinceDto>
    {
    }
}
