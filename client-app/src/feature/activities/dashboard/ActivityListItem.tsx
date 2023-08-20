import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Reactivity } from '../../../app/models/reactivity';
import { Link } from 'react-router-dom';

interface Props {
    activity: Reactivity;
}

export default function ActivityListItem({ activity }: Props) {  
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link}>
                                {activity.title}
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {activity.date}
                    <Icon name='marker'/> {activity.venue}
                </span>
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}