<template>
  <q-header elevated>
    <q-toolbar>
      <slot name="left"></slot>

      <q-toolbar-title>
        DashBuilder Alpha v0.1
      </q-toolbar-title>

      <nav class="q-pr-xl">
        <q-tabs align="left">
          <q-route-tab to="/page1" label="Pin One" />
          <q-route-tab to="/page2" label="Pin Two" />
          <q-route-tab to="/page3" label="Pin Three" />
        </q-tabs>
      </nav>

      <slot name="right"></slot>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'MainHeader'
};
</script>
