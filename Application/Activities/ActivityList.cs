using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class ActivityList
    {
        public class Query : IRequest<Result<List<Reactivity>>> { }
        public class Handler : IRequestHandler<Query, Result<List<Reactivity>>>
        {
            private readonly ReactivitiesDb context;

            public Handler(ReactivitiesDb context)
            {
                this.context = context;
            }

            public async Task<Result<List<Reactivity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Reactivity>>.Success(await context.Reactivities.ToListAsync(cancellationToken));
            }
        }
    }
}
