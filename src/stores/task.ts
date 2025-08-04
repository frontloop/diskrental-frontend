import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Task } from '@/common/types/task'
import { Priority } from '@/common/types/task'
import { TaskClient } from '@/api/TaskClient'

export const useTaskStore = defineStore('task', () => {
    const getEmptyTask = () => {
        return {id: -1, name: '', done: false, created: '', priority: Priority.NORMAL}
    }
    const editedDask = ref<Task>(getEmptyTask())
    const taskList = ref<Array<Task>>([])
    const taskEditorOpen = ref<boolean>(false)
    const taskClient: TaskClient = new TaskClient()

    async function getAll() {
        try {
        const response = await taskClient.getAll()
        if (response) {
            taskList.value = response;
        }
        } catch (error) {
            return false
        }
    }

    const save = async () => {
        try {
            const response = await taskClient.save(editedDask.value)
            if (!response || response == null) throw new Error('Task konnte nicht gespeichert werden')
                getAll();
                resetEditedTask()
                return true
        } catch (error) {
            return false
        }
    }

    const create = async () => {
        try {
            const response = await taskClient.create(editedDask.value)
            if (!response || response == null) throw new Error('Task konnte nicht angelegt werden')
                getAll();
                resetEditedTask()
                return true
        } catch (error) {
            return false
        }
    }

    const deleteTask = async (id: number) => {
        try {
            const response = await taskClient.delete(id)
            if (!response || response == null) throw new Error('Task konnte nicht gelöscht werden')
                getAll();
                return true
        } catch (error) {
            return false
        }
    }

    const setEditTask = (original: Task) => {
        return { id: original.id, name: original.name, done: original.done, created: original.created, priority: original.priority }
    }

    const resetEditedTask = () => {
        editedDask.value = getEmptyTask()
    }

    return {
        editedDask,
        taskList,
        taskEditorOpen,
        create,
        save,
        getAll,
        resetEditedTask,
        setEditTask,
        deleteTask,
    }
})
