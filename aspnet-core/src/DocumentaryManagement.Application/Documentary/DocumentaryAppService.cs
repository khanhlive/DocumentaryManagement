using DocumentaryManagement.Documentary.Dto;
using DocumentaryManagement.Core;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary;
using DocumentaryManagement.Model;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Collections.Generic;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Attachment;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Abp.Web.Models;
using DevExtreme.AspNet.Data.ResponseModel;
using DevExtreme.AspNet.Mvc;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;

namespace DocumentaryManagement.Documentary
{
    public class DocumentaryAppService : AsyncCrudAppServiceBase<AppDocumentary, DocumentaryDto, int, PagedDocumentaryRequestDto, CreateDocumentaryDto, UpdateDocumentaryDto, DataSourceLoadOptionsCustom>, IDocumentaryAppService
    {
        readonly IAttachmentRepository attachmentRepository;
        public DocumentaryAppService(IDocumentaryRepository repository, IAttachmentRepository attachmentRepository) : base(repository)
        {
            this.attachmentRepository = attachmentRepository;
        }
        public async override Task<DocumentaryDto> Create(CreateDocumentaryDto input)
        {
            StandardizedStringOfEntity(input);
            var stringJson = JsonConvert.SerializeObject(input.AppAttachments);
            input.AppAttachments.Clear();
            var attachments = JsonConvert.DeserializeObject<List<AppAttachments>>(stringJson);
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
        public async override Task<DocumentaryDto> Update(UpdateDocumentaryDto input)
        {
            StandardizedStringOfEntity(input);
            var stringJson = JsonConvert.SerializeObject(input.AppAttachments);
            var stringJsonDelete = JsonConvert.SerializeObject(input.AppAttachmentsDelete);
            input.AppAttachments.Clear();
            var attachments = JsonConvert.DeserializeObject<List<AppAttachments>>(stringJson);
            var attachmentsDelete = JsonConvert.DeserializeObject<List<AppAttachments>>(stringJsonDelete);
            var result = await base.Update(input);
            if (result.Id > 0)
            {
                attachments.ForEach(p =>
                {
                    p.DocumentaryId = result.Id;
                    p.IsDeleted = false;
                });
                attachments.AddRange(attachmentsDelete.Select(p => { p.IsDeleted = true; return p; }));
                await attachmentRepository.UpdateAttachmentsAsync(attachments);
            }
            return result;
        }

        [HttpPost]
        [DontWrapResult]
        [ActionName("get-devextreme")]
        public override LoadResult GetDevExtreme(DataSourceLoadOptionsCustom loadOptions)
        {
            var filter = loadOptions.Parse<DocumentFilterOptions>();
            return ((IDocumentaryRepository)AbpRepository).GetDevExtreme(loadOptions, filter);
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
            return ((IDocumentaryRepository)AbpRepository).GetSearchDevExtreme(loadOptions, filter);
        }
    }
}
