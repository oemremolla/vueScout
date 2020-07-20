<template>
  <div class="header">
    <div class="header-content container">
      <a :href="url">
        <img height="20" src="../../assets/images/logo-1.png" alt="">
      </a>
      <img height="40" src="http://api.scoutium.com/images/default_player_male.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      url: '/',
    };
  },
};
</script>

<style lang="scss">
  @import 'src/assets/css/variables';
  .header{
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $night-blue;

    &-content{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
