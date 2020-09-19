using Abp.Domain.Repositories;
using DocumentaryManagement.Model;
using System.Threading.Tasks;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Config
{
    public interface IConfigRepository : IRepository<AppConfig>
    {
        Task<AppConfig> GetAppConfig();
        Task<AppConfig> UpdateConfig(AppConfig appConfig);
    }
}
