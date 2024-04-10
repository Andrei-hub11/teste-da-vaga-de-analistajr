using Microsoft.EntityFrameworkCore;
using TesteVagaAnalistaJr.Context;
using TesteVagaAnalistaJr.Services;

var builder = WebApplication.CreateBuilder(args);


{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin",
       builder => builder.WithOrigins("http://localhost:5173")
                         .AllowAnyMethod()
                         .AllowAnyHeader().AllowCredentials());
    });

    builder.Services.AddDbContext<AppDbContext>(options =>
    {
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("DefaultConnection"),
            // para maior resiliência em caso de falhas transitórias
            sqlServerOptions => sqlServerOptions.EnableRetryOnFailure());
    });

    builder.Services.AddHttpContextAccessor();
    builder.Services.AddTransient<CompanyService>();
    builder.Services.AddAutoMapper(typeof(Program));

    builder.Services
    .AddControllers()
       .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
}

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
