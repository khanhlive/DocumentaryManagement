using Abp.EntityFrameworkCore;
using Abp.Runtime.Session;
using Abp.UI;
using DocumentaryManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Rotation
{
    public class RotationRepository : DocumentaryManagementRepositoryBase<AppRotation, long>, IRotationRepository
    {
        public RotationRepository(IDbContextProvider<DocumentaryManagementDbContext> dbContextProvider, IConfiguration configuration, IAbpSession abpSession)
            : base(dbContextProvider, configuration, abpSession)
        {

        }
        protected override IQueryable<AppRotation> SetEntityIncludes(IQueryable<AppRotation> entities)
        {
            return entities;
        }


        public override void Before_InsertUpdate(AppRotation entity)
        {

        }

        public async Task<List<AppRotation>> Send(List<AppRotation> rotations)
        {
            var data = new List<AppRotation>();
            var documentId = rotations.Any() ? rotations[0].DocumentId : 0;
            var allItems = await this.GetAllListAsync(p => p.DocumentId == documentId);
            foreach (var item in allItems.Where(p => !rotations.Any(m => m.Id == p.Id)))
            {
                Table.Remove(item);
            }
            foreach (var item in rotations)
            {
                if (item.Id > 0)
                {
                    //var rotaion = this.Get(item.Id);
                    //rotaion.us
                }
                else
                {
                    data.Add(Table.Add(item).Entity);
                }
            }
            return data;
        }

        public async Task<AppRotation> SetView(long documentId, long userId)
        {
            var item =await this.FirstOrDefaultAsync(p => p.DocumentId == documentId && p.UserId == userId);
            if (item == null)
            {
                var user = await this.Context.Users.FirstOrDefaultAsync(p => p.Id == userId);
                var itemDepartment = await this.FirstOrDefaultAsync(p => p.DocumentId == documentId && p.DepartmentId == user.DepartmentId);
                if (itemDepartment != null)
                {
                    var newItem = new AppRotation
                    {
                        CreationUserId = itemDepartment.CreationUserId,
                        DocumentId = documentId,
                        IsView = true,
                        ViewDate = DateTime.Now,
                        Date = itemDepartment.Date,
                        DepartmentId = user.Id,
                        UserId = userId

                    };
                    return this.Insert(newItem);
                }
                else
                {
                    return null;
                }
            }
            else
            {
                item.IsView = true;
                item.ViewDate = DateTime.Now;
                return await this.UpdateAsync(item);
            }
        }
    }
}
