using Abp.UI;
using DocumentaryManagement.Attachment.Dto;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Net.Http.Headers;

namespace DocumentaryManagement.Core
{
    public class FileHelperProvider
    {
        private readonly HttpRequest request;

        public FileHelperProvider(HttpRequest request)
        {
            this.request = request;
        }

        private void CreateIfNotExisted(string path)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
        }

        public CreateAttachmentDto SaveToServer()
        {
            var file = request.Form.Files[0];
            var folderName = Path.Combine("Uploads", "Files", $"{DateTime.Now.Year}", $"{DateTime.Now.Month}");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (file.Length > 0)
            {
                this.CreateIfNotExisted(pathToSave);
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string extension = Path.GetExtension(fileName);
                var newFileName = $"{Guid.NewGuid()}{extension}";
                var fullPath = Path.Combine(pathToSave, newFileName);
                var dbPath = Path.Combine(folderName, newFileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                CreateAttachmentDto attachmentDto = new CreateAttachmentDto
                {
                    FileType = extension,
                    Url = dbPath,
                    Name = fileName,
                    Size = file.Length,
                    Type = 0

                };
                return attachmentDto;
            }
            else
            {
                throw new UserFriendlyException($"Internal server error:");
            }
        }
    }
}
