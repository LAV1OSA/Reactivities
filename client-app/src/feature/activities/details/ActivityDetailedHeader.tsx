import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { Reactivity } from '../../../app/models/reactivity';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Reactivity
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
    const history = useHistory();
    const { activityStore } = useStore();
    const { loading } = activityStore;

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{activity.date}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button
                    disabled={loading}
                    loading={loading}
                    onClick={() => activityStore.deleteActivity(activity.id).then(() => history.push('/activities'))}
                    color='red'
                    floated='right'>
                    Cancel Activity
                </Button>
                <Button as={Link} to={`/manage/${activity.id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})

