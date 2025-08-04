<template>
    <p class="wrap">
        <div v-if="!showDeleteDialog">
            <div class="headLabel">{{ task.name }}</div>
            <p class="details">
                <div v-if="task.done"> <img src="/done.webp" class="doneIcon"> </div>
                <div v-else> <img src="/progress.png" class="progressIcon"> </div>
                <div class="createDate">{{ displayDate(task.created) }}</div>
                <div v-bind:class="priorityBackgroundColor()" class="priorityField">{{ task.priority }}</div>
            </p>
            <div class="actionButtons">
                <img src="/edit.png" @click="editTask" class="editButton">
                <img src="/delete.png" @click="deleteTask" class="deleteButton">
            </div>
        </div>
        <div v-else class="deleteDialog">
            <div class="headLabel">Delete task?</div>
            <p>
                <button @click="confirmDelete()" style="margin-right: 18px;">yes</button>
                <button @click="showDeleteDialog = false">No</button>
            </p>
        </div>
    </p>
</template>

<script setup lang="ts">
import { Priority, type Task } from '@/common/types/task'
import { useTaskStore } from '@/stores/task';
import { ref } from 'vue';

const taskStore = useTaskStore()

const props = defineProps<{ task: Task }>()

const showDeleteDialog = ref(false)

const editTask = () => {
    taskStore.editedDask = taskStore.setEditTask(props.task)
    taskStore.taskEditorOpen = true
}

const deleteTask = () => {
    showDeleteDialog.value = true
}

const confirmDelete = async () => {
    const response = await taskStore.deleteTask(props.task.id)
    if (response) {
        showDeleteDialog.value = false
    }
}

const displayDate = (created: string) => {
    const date = new Date(created).toLocaleDateString();
    const time = new Date(created).toLocaleTimeString();
    return date + ' um ' + time
}

const priorityBackgroundColor = () => {
    if (props.task.priority == Priority.LOW) {
        return "priorityLow";
    } else if (props.task.priority == Priority.NORMAL) {
        return "priorityNormal";
    } else {
        return "priorityUrgent";
    }
}

</script>

<style scoped>
.wrap {
    background-color: rgba(249, 251, 255, 0.9);
    padding-left: 10px;
    padding-top: 10px;
    border-radius: 8px;
    width: 500px;
    height: 110px;
}

.deleteDialog {
    margin-left: 35%;
    padding-top: 10px;
}

.headLabel {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 1.2rem;
    color: #46494e;
}

.details div {
    float: left;
    margin-right: 10px;
    padding: 10px;
    border-radius: 6px;
    color: #e0e5e7;
    font-family: Arial, Helvetica, sans-serif;
}

.doneIcon {
    height: 22px;
    width: 22px;
}

.progressIcon {
    margin-top: -6px;
    margin-left: -6px;
    height: 28px;
    width: 28px;
}

.actionButtons {
    margin-left: 30px;
    float: left;
}

.editButton {
    margin-top: -3px;
    cursor: pointer;
    height: 45px;
    width: 45px;
}

.deleteButton {
    padding-bottom: 5px;
    cursor: pointer;
    height: 35px;
    width: 35px;
}

.createDate {
    background-color: #5f6d82;
}

.priorityField {
    text-align: center;
    width: 70px;
}

.priorityLow {
    background-color: #9fa79f;
}

.priorityNormal {
    background-color: #6b84b1;
}

.priorityUrgent {
    background-color: #b47869;
}

button {
  background-color: #5b7891; /* Green */
  border: none;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  padding: 4px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
</style>
