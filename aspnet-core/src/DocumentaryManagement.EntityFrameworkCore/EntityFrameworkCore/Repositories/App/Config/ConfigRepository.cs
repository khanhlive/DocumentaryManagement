using Abp.EntityFrameworkCore;
using Abp.Runtime.Session;
using Abp.UI;
using DocumentaryManagement.Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Config
{
    public class ConfigRepository : DocumentaryManagementRepositoryBase<AppConfig>, IConfigRepository
    {
        public ConfigRepository(IDbContextProvider<DocumentaryManagementDbContext> dbContextProvider, IConfiguration configuration, IAbpSession abpSession)
            : base(dbContextProvider, configuration, abpSession)
        {

        }
        protected override IQueryable<AppConfig> SetEntityIncludes(IQueryable<AppConfig> entities)
        {
            return entities.Where(p => !p.IsDeleted);
        }


        public override void Before_InsertUpdate(AppConfig entity)
        {

        }

        public async Task<AppConfig> GetAppConfig()
        {
            var userId = this.AbpSession.UserId;
            var item = this.GetAll().FirstOrDefault(p => p.UserId == userId);
            if (item != null)
            {
                item.AgencyIssued = this.Context.AppAgencyIssued.FirstOrDefault(p => p.Id == item.AgencyIssuedId);
            }
            return await Task.FromResult(item);
        }

        public async Task<AppConfig> UpdateConfig(AppConfig appConfig)
        {
            var userId = this.AbpSession.UserId;
            var config = await this.FirstOrDefaultAsync(p => p.UserId == userId);
            if (config == null)
            {
                appConfig.Id = 0;
                appConfig.UserId = userId ?? 0;
                appConfig.CreationId = userId ?? 0;
                appConfig.CreationDate = DateTime.Now;
                return await this.InsertAsync(appConfig);
            }
            else
            {
                config.UpdatedId = userId ?? 0;
                config.UpdatedDate = DateTime.Now;
                config.Singer = appConfig.Singer;
                config.ApprovedBy = appConfig.ApprovedBy;
                config.Sender = appConfig.Sender;
                config.AgencyIssuedId = appConfig.AgencyIssuedId;
                config.ReceivedBy = appConfig.ReceivedBy;
                var count = await this.Context.SaveChangesAsync();
                return config;
            }
        }
    }
}
