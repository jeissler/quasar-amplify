<template>
  <q-layout view="hHh LpR fff">
    <MainHeader>
      <q-btn
        flat
        dense
        round
        slot="left"
        icon="ti-menu"
        aria-label="Main Menu"
        @click="leftDrawerOpen = !leftDrawerOpen"
      />
      <q-btn
        flat
        dense
        round
        slot="right"
        icon="ti-settings"
        aria-label="Context Menu"
        @click="rightDrawerOpen = !rightDrawerOpen"
      />
    </MainHeader>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list class="q-mb-xl">
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      behavior="mobile"
      bordered
    >
      <q-btn
        flat
        dense
        round
        icon="ti-close"
        aria-label="Close Context Menu"
        @click="rightDrawerOpen = !rightDrawerOpen"
      />
    </q-drawer>

    <q-page-container>
      <amplify-authenticator>
        <router-view />
      </amplify-authenticator>
    </q-page-container>
  </q-layout>
</template>

<script>
import MainHeader from 'components/MainHeader';
import EssentialLink from 'components/EssentialLink.vue';

const linksData = [
  {
    title: 'Dashboards',
    caption: 'Board Settings',
    icon: 'ti-dashboard',
    link: '/'
  },
  {
    title: 'Panels',
    caption: 'Panel Configurations',
    icon: 'ti-server',
    link: '/'
  },
  {
    title: 'Data Sources',
    caption: 'Source Settings',
    icon: 'ti-zip',
    link: '/'
  },
  {
    title: 'Charts & Graphs',
    caption: 'Custom Configurations',
    icon: 'ti-bar-chart',
    link: '/'
  }
];

export default {
  name: 'MainLayout',
  components: {
    MainHeader,
    EssentialLink
  },
  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      essentialLinks: linksData
    };
  }
};
</script>
