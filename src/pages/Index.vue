<template>
  <q-page class="q-py-xl">
    <q-list bordered class="rounded-borders q-mb-lg q-pb-md">
      <q-item-label header>Active Panels</q-item-label>

      <template
        v-for="({ id, _version, name, category, title, description }, i) in activePanels"
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
                @click="deletePanel(id, _version)"
              />
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="ti-check"
                @click="updatePanel(id)"
              />
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced :key="i" v-if="activePanels.length - 1 !== i" />
      </template>
    </q-list>

    <q-list bordered class="rounded-borders q-mb-xl" style="background:#ececec;">
      <q-item-label header>Disabled Panels</q-item-label>

      <template
        v-for="({ id, _version, name, category, title, description }, i) in disabledPanels"
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
                @click="deletePanel(id, _version)"
              />
              <q-btn
                size="12px"
                flat
                dense
                round
                icon="ti-share-alt"
                @click="updatePanel(id, 'open')"
              />
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced :key="i" v-if="disabledPanels.length - 1 !== i" />
      </template>
    </q-list>

    <q-separator class="q-my-xl" />

    <section class="q-mb-lg" style="max-width: 800px; margin: 0 auto;">
      <q-btn
        flat
        dense
        round
        :icon="editorOpen ? 'ti-close' : 'ti-plus'"
        aria-label="Close Panel Editor"
        @click="editorOpen = !editorOpen"
      />
      <p v-if="!editorOpen">Add Panel</p>

      <q-form
        v-if="editorOpen"
        ref="form"
        @submit="createPanel"
        @reset="resetForm"
        class="q-gutter-md"
      >
        <q-input
          v-for="(val, key, i) of PanelTemp"
          :key="i"
          filled
          v-model="newPanel[key]"
          :label="`Panel ${key}`"
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
    </section>
  </q-page>
</template>

<script>
import { API } from 'aws-amplify';
import { createPanel, updatePanel, deletePanel } from '../graphql/mutations';
import { listPanels } from '../graphql/queries';

export default {
  name: 'PageIndex',
  data() {
    return {
      PanelTemp: {
        category: '',
        title: '',
        description: '',
        dataSource: 0
      },
      newPanel: {},
      panels: [],
      error: null,
      editorOpen: true
    };
  },
  created() {
    this.getPanels();
  },
  computed: {
    activePanels() {
      return this.panels.filter((panel) => panel.status !== 'done');
    },
    disabledPanels() {
      return this.panels.filter((panel) => panel.status === 'done');
    }
  },
  methods: {
    async getPanels() {
      try {
        const {
          data: {
            listPanels: { items }
          }
        } = await API.graphql({
          authMode: 'AMAZON_COGNITO_USER_POOLS',
          query: listPanels
        });
        this.panels = items;
      } catch (err) {
        this.error = err.message;
      }
    },
    async createPanel() {
      try {
        const { data } = await API.graphql({
          authMode: 'AMAZON_COGNITO_USER_POOLS',
          query: createPanel,
          variables: { input: { ...this.newPanel, ...{ status: 'open' } } }
        });
        this.updateLocalState(data.createPanel, 'create');
        this.resetForm();
      } catch (err) {
        this.error = err;
      }

      this.notify({ error: this.error, msg: this.error || 'Panel created' });
    },
    async updatePanel(id, status = 'done') {
      try {
        const { data } = await API.graphql({
          authMode: 'AMAZON_COGNITO_USER_POOLS',
          query: updatePanel,
          variables: { input: { id, status } }
        });
        this.updateLocalState(data.updatePanel, 'update');
      } catch (err) {
        this.error = err.message;
      }

      this.notify({
        error: this.error,
        msg: this.error
          ? 'Could not update status'
          : `Panel status updated to ${status}`
      });
    },
    async deletePanel(id, _version) {
      try {
        const { data } = await API.graphql({
          authMode: 'AMAZON_COGNITO_USER_POOLS',
          query: deletePanel,
          variables: { input: { id, _version } }
        });
        this.updateLocalState(data.deletePanel, 'delete');
      } catch (err) {
        this.error = err.message;
      }

      this.notify({
        error: this.error,
        msg: this.error ? 'Could not delete panel' : 'Panel deleted'
      });
    },
    updateLocalState(panel, op) {
      switch (op) {
        case 'update':
          this.panels.find((item) => item.id === panel.id).status = panel.status;
          break;
        case 'delete':
          this.panels.splice(this.panels.findIndex((item) => item.id === panel.id), 1);
          break;
        default: // create
          if (this.panels.some((item) => item.id === panel.id)) return;
          this.panels = [...this.panels, panel];
      }
    },
    // static methods
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
      this.newPanel = {};
      this.$refs.form.resetValidation();
    }
  }
};
</script>
