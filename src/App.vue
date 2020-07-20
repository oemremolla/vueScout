<script>
import AppHeader from './components/shared/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
};
</script>

<template>
  <div id="app">
    <app-header />
    <div id="main-wrapper">
      <router-view />
    </div>
  </div>
</template>

<style>
@import './assets/css/style.css';
@import './assets/css/responsive.css';
@import './assets/css/variables.scss';

</style>
