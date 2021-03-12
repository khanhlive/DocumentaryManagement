using Abp.UI;
using DocumentaryManagement.Attachment.Dto;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Net.Http.Headers;

namespace DocumentaryManagement.Core
{
    public class FileHelperProvider
    {
        readonly IHostingEnvironment _hostingEnvironment;
        private readonly HttpRequest request;

        public FileHelperProvider(HttpRequest request)
        {
            this.request = request;
            //_hostingEnvironment = hostingEnvironment;
        }

        private void CreateIfNotExisted(string path)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
        }
        //public string VirtualToPhysicalPath(string vPath)
        //{
        //    // Remove query string:
        //    vPath = Regex.Replace(vPath, @"\?.+", "").ToLower();

        //    // Check if file is in standard folder:
        //    var pPath = _hostingEnvironment.ma.MapPath("~" + vPath);
        //    if (System.IO.File.Exists(pPath)) return pPath;

        //    // Else check for IIS virtual directory:
        //    var siteName = _hostingEnvironment.ApplicationHost.GetSiteName();
        //    var sm = new Microsoft.Web.Administration.ServerManager();
        //    var vDirs = sm.Sites[siteName].Applications[0].VirtualDirectories;
        //    foreach (var vd in vDirs)
        //    {
        //        if (vd.Path != "/" && vPath.Contains(vd.Path.ToLower())) pPath = vPath.Replace(vd.Path.ToLower(), vd.PhysicalPath).Replace("/", "\\");
        //    }
        //    return pPath;
        //}
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
