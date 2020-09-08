using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using DocumentaryManagement.Roles.Dto;
using DocumentaryManagement.Users.Dto;

namespace DocumentaryManagement.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
