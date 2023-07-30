using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Reactivities.Controllers
{
    public class ReactivitiesController : BaseApiController
    {
        private readonly ReactivitiesDb dbContext;

        public ReactivitiesController(ReactivitiesDb dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Reactivity>>> GetActivities()
        {
            return await dbContext.Reactivities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reactivity>> GetActivity(Guid id)
        {
            return await dbContext.Reactivities.FindAsync(id);
        }
    }
}
