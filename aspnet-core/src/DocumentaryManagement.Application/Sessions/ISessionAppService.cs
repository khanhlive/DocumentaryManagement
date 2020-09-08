using System.Threading.Tasks;
using Abp.Application.Services;
using DocumentaryManagement.Sessions.Dto;

namespace DocumentaryManagement.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
