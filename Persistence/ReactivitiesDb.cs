using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ReactivitiesDb : DbContext
    {
        public ReactivitiesDb(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Reactivity> Reactivities { get; set; }
    }
}