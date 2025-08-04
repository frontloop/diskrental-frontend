class Response<T> {
    private response: globalThis.Response

    constructor(response: globalThis.Response) {
        this.response = response
    }

    get() {
        return this.response
    }

    ok() {
        return this.response.status === HttpStatusCode.OK
    }

    getStatusCode(): number {
        return this.response.status
    }

    getStatusText(): string {
        return this.response.statusText
    }

    async json(): Promise<T> {
        return (await this.response.json()) as T
    }
}

export class BaseClient {
    private baseUrl?: string
    private token?: string
    private tokenType?: string

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl
    }

    setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl
        return this
    }

    getBaseUrl(): string | undefined {
        return this.baseUrl
    }

    setTokenType(tokenType: string) {
        this.tokenType = tokenType
        return this
    }

    getTokenType(): string | undefined {
        return this.tokenType
    }

    private getAdditionalHeaders() {
        const headers: any = {
            'Content-Type': 'application/json',
        }
        if (this.token && this.tokenType) {
            headers['Authorization'] = this.tokenType + ' ' + this.token
        }

        return headers
    }

    private async request<T>(path: string, init?: RequestInit) {
        try {
            const response = await fetch((this.baseUrl ?? '') + path, {
                ...init,
                headers: {
                    ...this.getAdditionalHeaders(),
                    ...init?.headers,
                },
            })
            return Promise.resolve(new Response<T>(response))
        } catch (error) {
            console.log('error', error)
            return Promise.reject(error)
        }
    }

    async get<T>(path: string, queryParameters?: Record<any, any>) {
        if (queryParameters) {
            return this.request<T>(`${path}?${new URLSearchParams(queryParameters)}`, {
                method: 'GET',
            })
        }

        return this.request<T>(path, {
            method: 'GET',
        })
    }

    async post<T>(path: string, data: any, params?: Omit<RequestInit, 'method' | 'body'>) {
        return this.request<T>(path, {
            method: 'POST',
            body: JSON.stringify(data),
            ...params,
        })
    }

    async put<T>(path: string, data?: any) {
        return this.request<T>(path, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    async delete<T>(path: string, data?: any) {
        return this.request<T>(path, {
            method: 'DELETE',
            body: JSON.stringify(data),
        })
    }
}

enum HttpStatusCode {
    OK = 200,
    CREATED = 201,

}

export const RestClient = new BaseClient('http://localhost:8081/api')
