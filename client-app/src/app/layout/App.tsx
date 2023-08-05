import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Reactivity } from '../models/reactivity';
import NavBar from './NavBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Reactivity[]>([]);

  useEffect(() => {
    axios.get<Reactivity[]>('http://localhost:5078/api/reactivities').then(response => {
      setActivities(response.data);
    })
  }, [])

  return (
    <>
      <NavBar/>
      <Container style={{marginTop : '7em'}}>
        <ActivityDashboard activities={activities}/>
      </Container>
    </>
  );
}

export default App;
