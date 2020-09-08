using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using DocumentaryManagement.Configuration;
using DocumentaryManagement.Web;

namespace DocumentaryManagement.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class DocumentaryManagementDbContextFactory : IDesignTimeDbContextFactory<DocumentaryManagementDbContext>
    {
        public DocumentaryManagementDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<DocumentaryManagementDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            DocumentaryManagementDbContextConfigurer.Configure(builder, configuration.GetConnectionString(DocumentaryManagementConsts.ConnectionStringName));

            return new DocumentaryManagementDbContext(builder.Options);
        }
    }
}
