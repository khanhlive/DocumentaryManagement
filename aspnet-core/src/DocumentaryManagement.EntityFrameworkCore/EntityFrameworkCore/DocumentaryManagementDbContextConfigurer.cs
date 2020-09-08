using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace DocumentaryManagement.EntityFrameworkCore
{
    public static class DocumentaryManagementDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<DocumentaryManagementDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<DocumentaryManagementDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
