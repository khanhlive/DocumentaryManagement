using Abp.UI;
using DocumentaryManagement.Attachment.Dto;
using DocumentaryManagement.Core;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Attachment;
using DocumentaryManagement.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace DocumentaryManagement.Attachment
{
    public class AttachmentAppService : AsyncCrudAppServiceBase<AppAttachments, AttachmentDto, int, PagedAttachmentRequestDto, CreateAttachmentDto, UpdateAttachmentDto>, IAttachmentAppService
    {
        readonly IHttpContextAccessor httpContext;
        IHostingEnvironment hostingEnvironment;
        public AttachmentAppService(IAttachmentRepository repository, IHttpContextAccessor httpContext, IHostingEnvironment hostingEnvironment) : base(repository)
        {
            this.httpContext = httpContext;
            this.hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        [ActionName("get-by-document-id")]
        public async Task<IEnumerable<AttachmentDto>> GetByDocumentaryId(int documentaryId, int type)
        {
            return (await ((IAttachmentRepository)Repository).GetByDocumentaryId(documentaryId, type)).Select(MapToEntityDto);
        }

        [HttpGet]
        [ActionName("get-by-document-personal-id")]
        public async Task<IEnumerable<AttachmentDto>> GetByDocumentaryPersonalId(int documentaryPersonalId)
        {
            return (await ((IAttachmentRepository)Repository).GetByDocumentaryPersonalId(documentaryPersonalId)).Select(MapToEntityDto);
        }

        [HttpPost, DisableRequestSizeLimit]
        //[DontWrapResult]
        public Task<AttachmentDto> Upload()
        {
            try
            {
                FileHelperProvider fileHelperProvider = new FileHelperProvider(this.httpContext.HttpContext.Request);
                CreateAttachmentDto attachmentDto = fileHelperProvider.SaveToServer();
                return base.Create(attachmentDto);
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException($"Internal server error: {ex}");
            }
        }
    }

}
