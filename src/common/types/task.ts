export interface Task {
    id: number,
    name: string
    done: boolean
    created: string
    priority: Priority
}

export enum Priority {
    LOW = "LOW",
    NORMAL = "NORMAL",
    URGENT = "URGENT"
};
