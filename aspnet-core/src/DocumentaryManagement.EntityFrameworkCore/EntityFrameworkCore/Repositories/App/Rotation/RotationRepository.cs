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
    public class RotationRepository : DocumentaryManagementRepositoryBase<AppRotation,long>, IRotationRepository
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

        public Task<List<AppRotation>> Send(List<AppRotation> rotations)
        {
            var data = new List<AppRotation>();
            var documentId = rotations.Any() ? rotations[0].DocumentId:0;
            var deleteItems = this.GetAllList(p => p.DocumentId == documentId);
            foreach (var item in deleteItems)
            {
                Table.Remove(item);
            }
            foreach (var item in rotations)
            {
                data.Add(Table.Add(item).Entity);
            }
            return Task.FromResult(data);
        }
    }
}
