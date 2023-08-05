using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Reactivities.Controllers
{
    public class ReactivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Reactivity>>> GetActivities()
        {
            return await Mediator.Send(new ActivityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reactivity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task CreateActivity(Reactivity activity)
        {
            await Mediator.Send(new Create.Command { Activity = activity });
        }

        [HttpPut("{id}")]
        public async Task EditActivity(Guid id, Reactivity activity)
        {
            activity.Id = id;
            await Mediator.Send(new Edit.Command {  Activity = activity });
        }

        [HttpDelete("{id}")]
        public async Task DeleteActivity(Guid id)
        {
            await Mediator.Send(new Delete.Command {  Id = id });
        }
    }
}
