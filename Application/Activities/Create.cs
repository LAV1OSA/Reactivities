using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Reactivity Activity { get; set; }
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
                context.Reactivities.Add(request.Activity);

                await context.SaveChangesAsync();
            }
        }
    }
}
