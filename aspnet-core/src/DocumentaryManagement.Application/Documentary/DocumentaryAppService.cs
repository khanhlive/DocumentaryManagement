﻿using Abp.Domain.Repositories;
using Abp.Web.Models;
using DevExtreme.AspNet.Data.ResponseModel;
using DocumentaryManagement.Authorization;
using DocumentaryManagement.Authorization.Users;
using DocumentaryManagement.Core;
using DocumentaryManagement.Documentary.Dto;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Attachment;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;
using DocumentaryManagement.Model;
using DocumentaryManagement.Models.Lib;
using DocumentaryManagement.Users.Dto;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentaryManagement.Documentary
{
    public class DocumentaryAppService : AsyncCrudAppServiceBase<AppDocumentary, DocumentaryDto, int, PagedDocumentaryRequestDto, CreateDocumentaryDto, UpdateDocumentaryDto, DataSourceLoadOptionsCustom>, IDocumentaryAppService
    {
        readonly IAttachmentRepository attachmentRepository;
        readonly IRepository<User, long> userRepository;
        public DocumentaryAppService(IDocumentaryRepository repository,
            IAttachmentRepository attachmentRepository,
            IRepository<User, long> userRepository
            ) : base(repository)
        {
            this.attachmentRepository = attachmentRepository;
            this.userRepository = userRepository;
        }
        public override async Task<DocumentaryDto> Create(CreateDocumentaryDto input)
        {
            StandardizedStringOfEntity(input);
            var stringJson = JsonConvert.SerializeObject(input.AppAttachments);
            input.AppAttachments.Clear();
            var attachments = JsonConvert.DeserializeObject<List<AppAttachments>>(stringJson);
            if (input.ApprovedType == (int)ApprovedType.Personal && input.ApprovedUserId.HasValue)
            {
                var user = this.userRepository.Get(input.ApprovedUserId.Value);
                if (user != null)
                {
                    input.ApprovedDepartmentId = user.DepartmentId;
                }
            }
            var result = await base.Create(input);
            if (result.Id > 0)
            {
                attachments.ForEach(p =>
                {
                    p.DocumentaryId = result.Id;
                    p.IsDeleted = false;
                });
                await attachmentRepository.UpdateAttachmentsAsync(attachments);
            }
            return result;
        }
        public override async Task<DocumentaryDto> Update(UpdateDocumentaryDto input)
        {
            StandardizedStringOfEntity(input);
            var stringJson = JsonConvert.SerializeObject(input.AppAttachments);
            var stringJsonDelete = JsonConvert.SerializeObject(input.AppAttachmentsDelete);
            input.AppAttachments.Clear();
            var attachments = JsonConvert.DeserializeObject<List<AppAttachments>>(stringJson);
            var attachmentsDelete = JsonConvert.DeserializeObject<List<AppAttachments>>(stringJsonDelete);
            if (input.ApprovedType == (int)ApprovedType.Personal && input.ApprovedUserId.HasValue)
            {
                var user = this.userRepository.Get(input.ApprovedUserId.Value);
                if (user != null)
                {
                    input.ApprovedDepartmentId = user.DepartmentId;
                }
            }
            var result = await base.Update(input);
            if (result.Id > 0)
            {
                attachments.ForEach(p =>
                {
                    p.DocumentaryId = result.Id;
                    p.IsDeleted = false;
                });
                if (attachmentsDelete != null && attachmentsDelete.Count > 0)
                    attachments.AddRange(attachmentsDelete.Select(p => { p.IsDeleted = true; return p; }));
                await attachmentRepository.UpdateAttachmentsAsync(attachments);
            }
            return result;
        }

        [HttpPost]
        [ActionName("approved")]
        public async Task<DocumentaryDto> Approved(ApprovedDocumentDto input)
        {
            StandardizedStringOfEntity(input);
            var document = await Repository.GetAsync(input.Id);
            if (document != null)
            {
                document.IsApproved = input.IsApproved;
                document.ApprovedContent = input.ApprovedContent;
                document.ApprovedConfirmUserId = AbpSession?.UserId;
            }
            CurrentUnitOfWork.SaveChanges();
            return MapToEntityDto(document);
        }

        [HttpPost]
        [DontWrapResult]
        [ActionName("get-devextreme")]
        public override LoadResult GetDevExtreme(DataSourceLoadOptionsCustom loadOptions)
        {
            var _type = this.GetPermissionType();
            ((IDocumentaryRepository)AbpRepository).SetSession(AbpSession);
            var filter = loadOptions.Parse<DocumentFilterOptions>();
            return ((IDocumentaryRepository)AbpRepository).GetDevExtreme(loadOptions, filter, _type);
        }


        private PermissionType GetPermissionType()
        {
            bool isDocumentManager = PermissionChecker.IsGrantedAsync(PermissionNames.Permission_DocumentManager).GetAwaiter().GetResult();
            if (isDocumentManager)
            {
                return PermissionType.DocumentManager;
            }
            else
            {
                bool isApprove = PermissionChecker.IsGrantedAsync(PermissionNames.Permission_Approved).GetAwaiter().GetResult();
                if (isApprove)
                {
                    return PermissionType.Approved;
                }
                else
                {
                    return PermissionType.Employee;
                }
            }
        }

        [HttpPost]
        [DontWrapResult]
        [ActionName("get-book-devextreme")]
        public LoadResult GetBookDevExtreme(DataSourceLoadOptionsCustom loadOptions)
        {
            var filter = loadOptions.Parse<DocumentFilterOptions>();
            return ((IDocumentaryRepository)AbpRepository).GetBookDevExtreme(loadOptions, filter);
        }

        [HttpPost]
        [DontWrapResult]
        [ActionName("get-search-devextreme")]
        public LoadResult GetSearchDevExtreme(DataSourceLoadOptionsCustom loadOptions)
        {
            var filter = loadOptions.Parse<DocumentSearchOptions>();
            ((IDocumentaryRepository)AbpRepository).SetSession(AbpSession);
            var _type = this.GetPermissionType();
            return ((IDocumentaryRepository)AbpRepository).GetSearchDevExtreme(loadOptions, filter, _type);
        }

        [HttpGet]
        [ActionName("get-user-approvedd")]
        public async Task<IEnumerable<UserDto>> GetUserApproved()
        {
            return (await ((IDocumentaryRepository)AbpRepository).GetUserApproved()).Select(p => ObjectMapper.Map<UserDto>(p));
        }
    }
}
