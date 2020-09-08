﻿using Abp.EntityFrameworkCore;
using Abp.Runtime.Session;
using Abp.UI;
using DocumentaryManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.DocumentType
{
    public class DocumentTypeRepository : DocumentaryManagementRepositoryBase<AppDocumentType>, IDocumentTypeRepository
    {
        public DocumentTypeRepository(IDbContextProvider<DocumentaryManagementDbContext> dbContextProvider, IConfiguration configuration, IAbpSession abpSession)
            : base(dbContextProvider, configuration, abpSession)
        {

        }
        protected override IQueryable<AppDocumentType> SetEntityIncludes(DbSet<AppDocumentType> entities)
        {
            return entities.Where(p => !p.IsDeleted);
        }


        public override void Before_InsertUpdate(AppDocumentType entity)
        {
            AppDocumentType item = this.FirstOrDefault(p => p.Code == entity.Code && p.Id != entity.Id);
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
                throw new UserFriendlyException($"Mã loại văn bản: \"{entity.Code}\" đã tồn tại trong hệ thống");
            }
        }

        public override void Delete(AppDocumentType entity)
        {
            base.Delete(entity);
        }
    }
}