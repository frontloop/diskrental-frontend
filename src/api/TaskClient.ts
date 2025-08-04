import { RestClient } from '../api/BaseClient'
import type { Task } from '../common/types/task'

export class TaskClient {
    private endpoint = '/task'

    async create(data: Task): Promise<Task | null> {
        return this.handleResponse(await RestClient.post<Task>(this.endpoint + '/create', data))
    }

    async save(data: Task): Promise<Task | null> {
        return this.handleResponse(await RestClient.put<Task>(this.endpoint + '/' + data.id + '/save', data))
    }

    async getAll(): Promise<Task[] | null> {
        return this.handleResponse(await RestClient.get<Task[]>(this.endpoint + '/all'))
    }

    async delete(id: number): Promise<Task | null> {
        return this.handleResponse(await RestClient.delete<Task>(this.endpoint + '/delete', id))
    }

    async handleResponse(response: any): Promise<any | null> {
        if (response.ok()) {
            return await response.json()
        } else {
            return Promise.reject()
        }
    }
}
