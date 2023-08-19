import { makeAutoObservable, runInAction } from "mobx";
import { Reactivity } from "../models/reactivity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class ActivityStore{
    activityRegistry = new Map<string, Reactivity>();
    selectedActivity: Reactivity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        try{
            const newActivities = await agent.Reactivities.list();
            newActivities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id, activity);
              })
            this.setLoadingInitial(false);
        }catch(error)
        {
            this.setLoadingInitial(false);
            console.log(error);
        }
    }

    setLoadingInitial(state: boolean){
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async(activity: Reactivity) =>{
        this.loading = true;
        activity.id = uuid();
        try{
            await agent.Reactivities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async(activity: Reactivity) => {
        this.loading = true;
        try{
            await agent.Reactivities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async(id: string) => {
        this.loading = true;
        try{
            await agent.Reactivities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id)
                if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}