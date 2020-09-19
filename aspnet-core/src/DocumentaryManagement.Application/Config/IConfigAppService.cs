using Abp.Application.Services;
using DocumentaryManagement.Config.Dto;

namespace DocumentaryManagement.Config
{
    public interface IConfigAppService : IAsyncCrudAppService<ConfigDto, int, PagedConfigRequestDto, CreateConfigDto, UpdateConfigDto>
    {
    }
}
