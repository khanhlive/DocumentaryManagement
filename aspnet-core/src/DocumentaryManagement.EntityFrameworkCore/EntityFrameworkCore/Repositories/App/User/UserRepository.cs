using Abp.Authorization.Users;
using Abp.EntityFrameworkCore;
using Abp.Runtime.Session;
using Abp.UI;
using DocumentaryManagement.Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.User
{
    public class UserRepository : Abp.EntityFrameworkCore.Repositories.EfCoreRepositoryBase<DocumentaryManagementDbContext, AbpUser, long>, IUserRepository
    {
        public UserRepository(IDbContextProvider<DocumentaryManagementDbContext> dbContextProvider, IConfiguration configuration, IAbpSession abpSession)
            : base(dbContextProvider, configuration, abpSession)
        {

        }
        protected override IQueryable<AppUser> SetEntityIncludes(IQueryable<AppUser> entities)
        {
            return entities.Where(p => !p.IsDeleted);
        }


        public override void Before_InsertUpdate(AppUser entity)
        {
            AppUser item = this.FirstOrDefault(p => p.Code == entity.Code && p.Id != entity.Id);
            if (entity.Id == 0)
            {
                entity.CreationDate = DateTime.Now;
                entity.CreationId = AbpSession.UserId.Value;
            }
            else
            {
                entity.UpdatedDate = DateTime.Now;
                entity.UpdatedId = AbpSession.UserId.Value;
            }
            if (item != null)
            {
                throw new UserFriendlyException($"Mã tỉnh thành: \"{entity.Code}\" đã tồn tại trong hệ thống");
            }
        }
        
    }
}
