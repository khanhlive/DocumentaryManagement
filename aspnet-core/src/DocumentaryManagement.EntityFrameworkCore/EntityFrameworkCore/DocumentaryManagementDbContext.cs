using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using DocumentaryManagement.Authorization.Roles;
using DocumentaryManagement.Authorization.Users;
using DocumentaryManagement.MultiTenancy;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.EntityFrameworkCore
{
    public class DocumentaryManagementDbContext : AbpZeroDbContext<Tenant, Role, User, DocumentaryManagementDbContext>
    {
        /* Define a DbSet for each entity of the application */

        public DocumentaryManagementDbContext(DbContextOptions<DocumentaryManagementDbContext> options)
            : base(options)
        {
        }

        #region DbSet
        public virtual DbSet<AppAgencyIssued> AppAgencyIssued { get; set; }
        public virtual DbSet<AppAttachments> AppAttachments { get; set; }
        public virtual DbSet<AppConfig> AppConfig { get; set; }
        public virtual DbSet<AppDocumentType> AppDocumentType { get; set; }
        public virtual DbSet<AppDocumentary> AppDocumentary { get; set; }
        public virtual DbSet<AppDocumentaryPersonal> AppDocumentaryPersonal { get; set; }
        public virtual DbSet<AppProvince> AppProvince { get; set; }
        #endregion

        #region OnModelCreating
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<AppAgencyIssued>(entity =>
            {
                entity.Property(e => e.Code).IsUnicode(false);
            });

            modelBuilder.Entity<AppAttachments>(entity =>
            {
                entity.Property(e => e.FileType).IsUnicode(false);

                entity.HasOne(d => d.Documentary)
                    .WithMany(p => p.AppAttachments)
                    .HasForeignKey(d => d.DocumentaryId)
                    .HasConstraintName("FK_AppAttachments_AppDocumentary");

                entity.HasOne(d => d.DocumentaryPersonal)
                    .WithMany(p => p.AppAttachments)
                    .HasForeignKey(d => d.DocumentaryPersonalId)
                    .HasConstraintName("FK_AppAttachments_AppDocumentaryPersonal");
            });

            modelBuilder.Entity<AppConfig>(entity =>
            {
                entity.HasOne(d => d.AgencyIssued)
                    .WithMany(p => p.AppConfig)
                    .HasForeignKey(d => d.AgencyIssuedId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AppConfig_AppAgencyIssued");
            });

            modelBuilder.Entity<AppDocumentType>(entity =>
            {
                entity.Property(e => e.Code).IsUnicode(false);
            });

            modelBuilder.Entity<AppDocumentary>(entity =>
            {
                entity.Property(e => e.Code).IsUnicode(false);

                entity.HasOne(d => d.AgencyIssued)
                    .WithMany(p => p.AppDocumentary)
                    .HasForeignKey(d => d.AgencyIssuedId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AppDocumentary_AppAgencyIssued");

                entity.HasOne(d => d.DocumentType)
                    .WithMany(p => p.AppDocumentary)
                    .HasForeignKey(d => d.DocumentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AppDocumentary_AppDocumentType");
            });

            modelBuilder.Entity<AppDocumentaryPersonal>(entity =>
            {
                entity.Property(e => e.Code).IsUnicode(false);

                entity.HasOne(d => d.AgencyIssued)
                    .WithMany(p => p.AppDocumentaryPersonal)
                    .HasForeignKey(d => d.AgencyIssuedId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AppDocumentaryPersonal_AppAgencyIssued");

                entity.HasOne(d => d.DocumentType)
                    .WithMany(p => p.AppDocumentaryPersonal)
                    .HasForeignKey(d => d.DocumentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AppDocumentaryPersonal_AppDocumentType");
            });

            modelBuilder.Entity<AppProvince>(entity =>
            {
                entity.Property(e => e.Code).IsUnicode(false);
            });
        }

        #endregion
    }
}
