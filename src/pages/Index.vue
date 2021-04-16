<template>
  <q-page class="q-py-xl" style="max-width: 800px; margin: 0 auto;">
    <q-form
      ref="form"
      @submit="createTask"
      @reset="resetForm"
      class="q-gutter-md q-mb-xl"
    >
      <q-input
        v-for="(val, key, i) of taskTemp"
        :key="i"
        filled
        v-model="newTask[key]"
        :label="`Task ${key}`"
        :hint="`Detailed ${key}`"
        lazy-rules
        :rules="[val => (val && val.length > 0) || `Please add a ${key}`]"
      />

      <div>
        <q-btn label="Add" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>

    <q-list bordered class="rounded-borders q-mb-lg q-pb-md">
      <q-item-label header>Current Tasks</q-item-label>

      <template
        v-for="({ id, _version, name, category, title, description }, i) in openTasks"
      >
        <q-item :key="name">
          <q-item-section avatar top>
            <q-icon name="ti-layout-list-thumb" color="black" size="30px" />
          </q-item-section>

          <q-item-section top class="col-2 gt-sm">
            <q-item-label class="q-mt-sm">{{ category }}</q-item-label>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">{{ name }}</span>
              <span class="text-grey-8"> - {{ title }}</span>
            </q-item-label>
            <q-item-label caption lines="1">
              {{ description }}
            </q-item-label>
            <q-item-label
              lines="1"
              class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
            >
              <span class="cursor-pointer">Open Link</span>
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="ti-na"
                @click="deleteTask(id, _version)"
              />
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="ti-check"
                @click="updateTask(id)"
              />
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced :key="i" v-if="openTasks.length - 1 !== i" />
      </template>
    </q-list>

    <q-list bordered class="rounded-borders" style="background:#ececec;">
      <q-item-label header>Closed Tasks</q-item-label>

      <template
        v-for="({ id, _version, name, category, title, description }, i) in closedTasks"
      >
        <q-item :key="name">
          <q-item-section avatar top>
            <q-icon name="ti-layout-list-thumb" color="black" size="30px" />
          </q-item-section>

          <q-item-section top class="col-2 gt-sm">
            <q-item-label class="q-mt-sm">{{ category }}</q-item-label>
          </q-item-section>

          <q-item-section top style="text-decoration:line-through">
            <q-item-label lines="1">
              <span class="text-weight-medium">{{ name }}</span>
              <span class="text-grey-8"> - {{ title }}</span>
            </q-item-label>
            <q-item-label caption lines="1">
              {{ description }}
            </q-item-label>
            <q-item-label
              lines="1"
              class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
            >
              <span class="cursor-pointer">Open Link</span>
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="ti-na"
                @click="deleteTask(id, _version)"
              />
              <q-btn
                size="12px"
                flat
                dense
                round
                icon="ti-share-alt"
                @click="updateTask(id, 'open')"
              />
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced :key="i" v-if="closedTasks.length - 1 !== i" />
      </template>
    </q-list>
  </q-page>
</template>

<script>
import { API, Auth } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';
import {
  onCreateTodo,
  onUpdateTodo,
  onDeleteTodo
} from '../graphql/subscriptions';

export default {
  name: 'PageIndex',
  data() {
    return {
      taskTemp: {
        category: '',
        name: '',
        title: '',
        description: ''
      },
      newTask: {},
      tasks: [],
      error: null
    };
  },
  computed: {
    openTasks() {
      return this.tasks.filter((task) => task.status !== 'done');
    },
    closedTasks() {
      return this.tasks.filter((task) => task.status === 'done');
    }
  },
  created() {
    this.getTasks();
    this.subscribe();
  },
  methods: {
    async getTasks() {
      try {
        const {
          data: {
            listTodos: { items }
          }
        } = await API.graphql({
          query: listTodos
        });
        this.tasks = items;
      } catch (err) {
        this.error = err.message;
      }
    },
    async subscribe() {
      try {
        const { username } = await Auth.currentAuthenticatedUser();

        API.graphql({
          query: onCreateTodo,
          // variables: { owner: username }
        }).subscribe({
          next: (eventData) => {
            const task = eventData.value.data.onCreateTodo;
            if (this.tasks.some((item) => item.id === task.id)) return;
            this.tasks = [...this.tasks, task];
          }
        });

        API.graphql({
          query: onUpdateTodo,
          variables: { owner: username }
        }).subscribe({
          next: (eventData) => {
            const task = eventData.value.data.onUpdateTodo;
            this.tasks.find((item) => item.id === task.id).status = task.status;
          }
        });

        API.graphql({
          query: onDeleteTodo,
          variables: { owner: username }
        }).subscribe({
          next: (eventData) => {
            const task = eventData.value.data.onDeleteTodo;
            this.tasks.splice(
              this.tasks.findIndex((item) => item.id === task.id),
              1
            );
          }
        });
      } catch (err) {
        this.error = err.message || err;
      }

      this.notify({ error: this.error, msg: this.error });
    },
    async createTask() {
      try {
        await API.graphql({
          authMode: 'AMAZON_COGNITO_USER_POOLS',
          query: createTodo,
          variables: { input: { ...this.newTask, ...{ status: 'open' } } }
        });
        this.resetForm();
      } catch (err) {
        this.error = err;
      }

      this.notify({ error: this.error, msg: this.error || 'Task created' });
    },
    async updateTask(id, status = 'done') {
      try {
        await API.graphql({
          authMode: 'AMAZON_COGNITO_USER_POOLS',
          query: updateTodo,
          variables: { input: { id, status } }
        });
      } catch (err) {
        this.error = err.message;
      }

      this.notify({
        error: this.error,
        msg: this.error
          ? 'Could not update status'
          : `Task status updated to ${status}`
      });
    },
    async deleteTask(id, _version) {
      try {
        await API.graphql({
          authMode: 'AMAZON_COGNITO_USER_POOLS',
          query: deleteTodo,
          variables: { input: { id, _version } }
        });
      } catch (err) {
        this.error = err.message;
      }

      this.notify({
        error: this.error,
        msg: this.error ? 'Could not delete task' : 'Task deleted'
      });
    },
    notify({ error, msg }) {
      if (error) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'ti-alert',
          message: msg || error
        });
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'ti-cloud-up',
          message: msg
        });
      }
      this.error = null;
    },
    resetForm() {
      this.newTask = {};
      this.$refs.form.resetValidation();
    }
  }
};
</script>
