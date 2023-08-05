using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly ReactivitiesDb context;

            public Handler(ReactivitiesDb context)
            {
                this.context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Reactivities.FindAsync(request.Id);
                
                context.Remove(activity);

                await context.SaveChangesAsync();
            }
        }
    }
}
