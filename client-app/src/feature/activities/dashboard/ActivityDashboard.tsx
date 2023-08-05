import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Reactivity } from "../../../app/models/reactivity";
import ActivityList from "./ActivityList";

interface Props{
    activities : Reactivity[]
}

export default function ActivityDashboard({activities} : Props) {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities}/>
            </Grid.Column>
        </Grid>
    )
}