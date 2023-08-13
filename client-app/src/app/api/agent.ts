import axios, { AxiosResponse } from 'axios';
import { Reactivity } from '../models/reactivity';
import { error } from 'console';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)  
    })
}

axios.defaults.baseURL = 'http://localhost:5078/api'

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url:string) => axios.get<T>(url).then(responseBody),
    post: <T> (url:string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url:string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url:string) => axios.delete<T>(url).then(responseBody)
}

const Reactivities = {
    list: () => requests.get<Reactivity[]>('/reactivities'),
    details: (id: string) => requests.get<Reactivity>(`/reactivities/${id}`),
    create: (activity: Reactivity) => requests.post<void>('/reactivities', activity),
    update: (activity: Reactivity) => requests.put<void>(`/reactivities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/reactivities/${id}`)
}

const agent = {
    Reactivities
}

export default agent;