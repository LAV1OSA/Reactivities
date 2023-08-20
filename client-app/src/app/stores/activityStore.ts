import { makeAutoObservable, runInAction } from "mobx";
import { Reactivity } from "../models/reactivity";
import agent from "../api/agent";

export default class ActivityStore {
    activityRegistry = new Map<string, Reactivity>();
    selectedActivity: Reactivity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const newActivities = await agent.Reactivities.list();
            newActivities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            this.setLoadingInitial(false);
            console.log(error);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Reactivities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity: Reactivity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }
    setLoadingInitial(state: boolean) {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Reactivity) => {
        this.loading = true;
        try {
            await agent.Reactivities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Reactivity) => {
        this.loading = true;
        try {
            await agent.Reactivities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Reactivities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id)
                this.loading = false
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}