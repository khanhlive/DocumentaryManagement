using DocumentaryManagement.DocumentaryPersonal.Dto;
using DocumentaryManagement.Core;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.DocumentaryPersonal;
using DocumentaryManagement.Model;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Collections.Generic;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Attachment;
using System.Linq;

namespace DocumentaryManagement.DocumentaryPersonal
{
    public class DocumentaryPersonalAppService : AsyncCrudAppServiceBase<AppDocumentaryPersonal, DocumentaryPersonalDto, int, PagedDocumentaryPersonalRequestDto, CreateDocumentaryPersonalDto, UpdateDocumentaryPersonalDto>, IDocumentaryPersonalAppService
    {
        readonly IAttachmentRepository attachmentRepository;
        public DocumentaryPersonalAppService(IDocumentaryPersonalRepository repository, IAttachmentRepository attachmentRepository) : base(repository)
        {
            this.attachmentRepository = attachmentRepository;
        }
        public async override Task<DocumentaryPersonalDto> Create(CreateDocumentaryPersonalDto input)
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
                    p.DocumentaryPersonalId = result.Id;
                    p.IsDeleted = false;
                });
                await attachmentRepository.UpdateAttachmentsAsync(attachments);
            }
            return result;
        }
        public async override Task<DocumentaryPersonalDto> Update(UpdateDocumentaryPersonalDto input)
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
                    p.DocumentaryPersonalId = result.Id;
                    p.IsDeleted = false;
                });
                if (attachmentsDelete != null && attachmentsDelete.Count > 0)
                    attachments.AddRange(attachmentsDelete.Select(p => { p.IsDeleted = true; return p; }));
                await attachmentRepository.UpdateAttachmentsAsync(attachments);
            }
            return result;
        }
    }
}
