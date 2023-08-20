using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<Reactivity>> 
        { 
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Reactivity>>
        {
            private readonly ReactivitiesDb context;

            public Handler(ReactivitiesDb context)
            {
                this.context = context;
            }

            public async Task<Result<Reactivity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Reactivities.FindAsync(request.Id);

                return Result<Reactivity>.Success(activity);
            }
        }
    }
}
