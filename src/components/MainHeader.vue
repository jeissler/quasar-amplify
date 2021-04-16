<template>
  <q-header elevated>
    <q-toolbar style="min-height:100px;">
      <slot></slot>

      <q-toolbar-title>
        Quasar/Amplify App
      </q-toolbar-title>

      <nav class="q-pr-xl">
        <router-link to="/" class="q-pr-sm">
          Tasks
        </router-link>
        <router-link to="/strapi">
          People
        </router-link>
      </nav>

      <div>Quasar v{{ $q.version }}</div>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'MainHeader'
};
</script>
