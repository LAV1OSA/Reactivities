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
        public class Query : IRequest<List<Reactivity>> { }
        public class Handler : IRequestHandler<Query, List<Reactivity>>
        {
            private readonly ReactivitiesDb context;

            public Handler(ReactivitiesDb context)
            {
                this.context = context;
            }

            public async Task<List<Reactivity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Reactivities.ToListAsync();
            }
        }
    }
}
