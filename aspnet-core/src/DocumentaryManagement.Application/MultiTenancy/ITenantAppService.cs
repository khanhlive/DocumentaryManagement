using Abp.Application.Services;
using Abp.Application.Services.Dto;
using DocumentaryManagement.MultiTenancy.Dto;

namespace DocumentaryManagement.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

