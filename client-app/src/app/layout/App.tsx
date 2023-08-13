import React, { useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { Reactivity } from '../models/reactivity';
import NavBar from './NavBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Reactivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Reactivity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Reactivities.list().then(response => {
      let activities: Reactivity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false)
    })
  }, [])

  function handleSelectActivity(id : string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleEditOrCreateActivity(activity: Reactivity){
    setSubmitting(true);
    if (activity.id) {
      agent.Reactivities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);    
      })
    } else {
      activity.id = uuid();
      agent.Reactivities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSubmitting(false);    
      })
    }
  }

  function handleDeleteActivity(id: string){
    setSubmitting(true);
    agent.Reactivities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })

  }

  if (loading) return <LoadingComponent content='Loading App'/>
  
  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop : '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleEditOrCreateActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}/>
      </Container>
    </>
  );
}

export default App;
