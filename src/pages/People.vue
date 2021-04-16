<template>
  <q-layout>
    <main-header></main-header>

    <q-page-container>
      <div>
        body
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import MainHeader from 'src/components/MainHeader.vue';

export default {
  components: { MainHeader },
  name: 'People'
};
</script>
