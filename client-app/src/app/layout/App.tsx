import React, { useEffect, useState } from 'react';
 import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5078/api/reactivities').then(response => {
      setActivities(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
      <List>
        {activities.map((activity: any) => (
            <li key={activity.id}>
              {activity.title}
            </li>
          ))}
      </List>
    </div>
  );
}

export default App;
