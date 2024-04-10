using Microsoft.EntityFrameworkCore;
using TesteVagaAnalistaJr.Models;

namespace TesteVagaAnalistaJr.Context;

public class AppDbContext: DbContext
{

    public DbSet<Company> Company { get; set; }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Company>(entity =>
        {
            entity.Property(c => c.Id).HasDefaultValueSql("NEWID()");
            entity.Property(c => c.FantasyName).IsRequired();
            entity.Property(c => c.CNPJ).IsRequired().HasMaxLength(14);
            entity.Property(c => c.CorporateReason).IsRequired();
            entity.Property(c => c.RegistrationDate).IsRequired();
            entity.Property(c => c.Status).IsRequired();

        });
    }
    }
