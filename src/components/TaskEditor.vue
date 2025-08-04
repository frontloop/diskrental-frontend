<template>
    <div class="wrap">
        <p class="fieldLabel">Name</p>
        <input v-model="taskStore.editedDask.name" placeholder="edit me" class="name-input" />
        <p>
            <label class="fieldLabel">Done:</label>
            <input type="checkbox" v-model="taskStore.editedDask.done">
        </p>
        <div v-if="taskStore.editedDask.id == -1">
            <label class="fieldLabel">Priority: </label>
            <input type="radio" name="priority" id="priority_low" value="LOW" style="accent-color: green;" v-model="taskStore.editedDask.priority">
            <label for="one">Low</label>
            <input type="radio" name="priority" id="priority_normal" value="NORMAL" style="accent-color: blue;" v-model="taskStore.editedDask.priority">
            <label for="one">Normal</label>
            <input type="radio" name="priority" id="priority_urgent" value="URGENT" style="accent-color: red;" v-model="taskStore.editedDask.priority">
            <label for="one">Urgent</label>
        </div>
        <p class="buttons">
            <button @click="save">save</button>
            <button @click="cancel">cancel</button>
        </p>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task';

const taskStore = useTaskStore()

const emit = defineEmits(['ontasksaved'])

const save = async () => {
    if (taskStore.editedDask.name != '') {
        if (taskStore.editedDask.id > -1) {
            await taskStore.save();
        } else {
            await taskStore.create()
        }
        emit('ontasksaved')
    }
}

const cancel = () => {
    taskStore.resetEditedTask()
    taskStore.taskEditorOpen = false
}
</script>

<style scoped>
.wrap {
    background-color: #d0dce6;
    border-radius: 15px;
    border: 2px solid #ececec;
    padding: 20px;
}

.wrap div {
    color: rgb(51, 53, 55);
}

.fieldLabel {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #595a5c;
    margin-bottom: 2px;
}

label {
    font-family: Arial, Helvetica, sans-serif;
    color: #595a5c;
}

.buttons {
  display: flex;
  margin-left: 25%;
  margin-top: 30px;
  gap: 40px;
}

.name-input {
    width: 400px;
}

button {
  background-color: #5b7891; /* Green */
  border: none;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
</style>