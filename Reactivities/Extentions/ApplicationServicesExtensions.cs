using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Reactivities.Extentions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen();
            services.AddLogging();
            services.AddDbContext<ReactivitiesDb>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("SqlServerCoonection"));
            });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(typeof(ActivityList.Handler).Assembly);
            });
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}
