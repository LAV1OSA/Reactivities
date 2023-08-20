import axios, { AxiosError, AxiosResponse } from 'axios';
import { Reactivity } from '../models/reactivity';
import { toast } from 'react-toastify';
import { history } from '../..';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5078/api'

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status} = error.response!;
    switch (status) {
        case 400:
            toast.error('bad request');
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found')
            break;
        case 500:
            toast.error('server error');
            break;
        default:
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
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